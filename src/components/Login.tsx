import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { GOOGLE_SCOPES } from '../services/googleApi';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = async (credentialResponse: any) => {
    try {
      // Verify the token with Google's API
      const response = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + credentialResponse.credential);
      const data = await response.json();

      if (data.email_verified) {
        // Request additional scopes
        const scopeString = GOOGLE_SCOPES.join(' ');
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
          import.meta.env.VITE_GOOGLE_CLIENT_ID
        }&redirect_uri=${window.location.origin}/oauth2callback&response_type=token&scope=${encodeURIComponent(
          scopeString
        )}&state=${credentialResponse.credential}`;

        // Store the ID token temporarily
        sessionStorage.setItem('temp_id_token', credentialResponse.credential);
        
        // Redirect to Google's consent screen
        window.location.href = authUrl;
      } else {
        setError('Email not verified');
      }
    } catch (error) {
      setError('Authentication failed');
      console.error('Token verification failed:', error);
    }
  };

  const handleError = () => {
    setError('Login failed. Please try again.');
  };

  // Handle OAuth callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      const state = params.get('state');

      if (accessToken && state) {
        try {
          // Verify the state matches our stored ID token
          const storedIdToken = sessionStorage.getItem('temp_id_token');
          if (state === storedIdToken) {
            // Get user info using the ID token
            const response = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + state);
            const userData = await response.json();

            // Store the access token and user data
            login(userData, accessToken);
            sessionStorage.removeItem('temp_id_token');

            // Redirect to the attempted page or dashboard
            const from = (location.state as any)?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
          } else {
            setError('Invalid state parameter');
          }
        } catch (error) {
          setError('Failed to complete authentication');
          console.error('OAuth callback error:', error);
        }
      }
    };

    if (window.location.pathname === '/oauth2callback') {
      handleOAuthCallback();
    }
  }, [location, login, navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Welcome</h1>
        {error && (
          <div style={{
            color: '#f44336',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          theme="filled_blue"
          shape="rectangular"
          text="signin_with"
          size="large"
        />
      </div>
    </div>
  );
};

export default Login; 
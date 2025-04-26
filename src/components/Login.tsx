import { useAuth } from '../hooks/useAuth';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const Login = () => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    // TODO: Implement Google OAuth login
    const mockUserData = {
      email: 'test@example.com',
      name: 'Test User',
      picture: 'https://via.placeholder.com/150',
    };
    login(mockUserData, 'mock-token');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 
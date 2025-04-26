import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, isAuthenticated, login, logout, refreshToken } = context;

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout: handleLogout,
    refreshToken,
  };
}; 
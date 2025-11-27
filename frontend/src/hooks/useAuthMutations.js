import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export const useAuthMutations = () => {
  const navigate = useNavigate();

  const { setUser, setProfile } = useAuth()

  const redirectByRole = (role) => {
    if (role === 'herder') navigate('/herder-dashboard');
    else if (role === 'farmer') navigate('/farmer-dashboard');
    else if (role === 'admin') navigate('/admin-dashboard');
    else navigate('/404');
  };

  const signUpWithEmail = useMutation({
    mutationFn: (userData) => AuthService.signUpWithEmail(userData),
  
    onSuccess: (data) => {
      console.log("Signup success data:", data);
  
      if (data.user && data.profile) {
        setUser(data.user);
        setProfile(data.profile);
        redirectByRole(data.profile.role);
      }
    },
  
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });
  

  const signInWithEmail = useMutation({
    mutationFn: ({ email, password }) =>
      AuthService.signInWithEmail(email, password),
    onSuccess: (data) => {
      if (data.user && data.profile) {
        redirectByRole(data.profile.role);
      }
    },

    onError: (err) => {
      console.error("Sign-in error:", err);
    }
  });

  const sendMagicLink = useMutation({
    mutationFn: (userData) => 
      AuthService.sendMagicLink(userData),
  });

  const signOut = useMutation({
    mutationFn: AuthService.signOut,
    onSuccess: () => {
      navigate('/login');
    },
  });

  const sendPasswordReset = useMutation({
    mutationFn: AuthService.sendPasswordReset,
  });

  return {
    signUpWithEmail,
    signInWithEmail,
    sendMagicLink,
    signOut,
    sendPasswordReset,
  };
};
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth';

export const useAuthMutations = () => {
  const navigate = useNavigate();

  const redirectByRole = (role) => {
    if (role === 'herder') navigate('/herder-dashboard');
    else if (role === 'farmer') navigate('/farmer-dashboard');
    else if (role === 'admin') navigate('/admin-dashboard');
    else navigate('/404');
  };

  const signInWithGoogle = useMutation({
    mutationFn: ({ role, isNew }) => AuthService.signInWithGoogle(role, isNew),
    onSuccess: (data, variables) => {
      if (data.user) redirectByRole(data.profile.role);
      console.log('this is data from usemutation', data)
    },
  });

  const signUpWithEmail = useMutation({
    mutationFn: ({ email, password, role, isNew }) =>
      AuthService.signUpWithEmail(email, password, role, isNew),
    onSuccess: (data, variables) => {
      if (data.user) redirectByRole(data.role);
      
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
  });

  const sendMagicLink = useMutation({
    mutationFn: ({ email, role, isNew }) => AuthService.sendMagicLink(email, role, isNew),
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
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    sendMagicLink,
    signOut,
    sendPasswordReset,
  };
};
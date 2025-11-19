import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { UserService } from './user';
import { APIConfig } from './config';

export class AuthService {
  static actionCodeSettings = {
    url: window.location.origin + '/login',
    handleCodeInApp: true,
  };

  static async setAuthToken(token) {
    APIConfig.authToken = token;
  }

  static async signInWithGoogle(role = null, isNew = false) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await this.setAuthToken(token);

      let profile = null;
      try {
        // Only create profile if isNew is truthy
        if (isNew && role) {
          profile = await UserService.createProfile({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            role,
          });
        } else {
          // Fetch existing profile for login
          profile = await UserService.getProfile(result.user.uid);

          if (!profile) throw new Error('User needs to create a profile')
        }
      } catch (error) {
        console.error('Profile operation error:', error.message);
      }

      return { user: result.user, profile, error: null };
    } catch (error) {
      return { user: null, profile: null, error: error.message };
    }
  }

  static async signUpWithEmail(email, password, role, isNew = false) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      await this.setAuthToken(token);

      let profile = null;
      try {
        if (isNew && role) {
          profile = await UserService.createProfile({
            uid: result.user.uid,
            email: result.user.email,
            role,
          });
        }
      } catch (error) {
        console.error('Profile creation error:', error.message);
      }

      return {
        user: result.user,
        profile: profile,
        error: null,
      };
    } catch (error) {
      return { user: null, profile: null, error: error.message };
    }
  }

  static async signInWithEmail(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      await this.setAuthToken(token);

      let profile = null;
      try {
        profile = await UserService.getProfile(result.user.uid);
      } catch (error) {
        console.error('Profile fetch error:', error.message);
      }

      return {
        user: result.user,
        profile: profile,
        error: null,
      };
    } catch (error) {
      return { user: null, profile: null, error: error.message };
    }
  }

  // Send Magic Link with conditional profile creation flag
  static async sendMagicLink(email, role = null, isNew = false) {
    try {
      await sendSignInLinkToEmail(auth, email, this.actionCodeSettings);
      
      window.localStorage.setItem('emailForSignIn', email);
      if (role) {
        window.localStorage.setItem('roleForSignIn', role);
      }
      if (isNew) {
        window.localStorage.setItem('isNewForSignIn', 'true');
      }
      
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Complete Magic Link Sign In with conditional profile creation
  static async completeMagicLinkSignIn(url) {
    try {
      if (isSignInWithEmailLink(auth, url)) {
        let email = window.localStorage.getItem('emailForSignIn');
        const role = window.localStorage.getItem('roleForSignIn');
        const isNew = window.localStorage.getItem('isNewForSignIn') === 'true';

        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        const result = await signInWithEmailLink(auth, email, url);
        const token = await result.user.getIdToken();
        await this.setAuthToken(token);

        let profile = null;

        try {
          // Only create profile if isNew is truthy
          if (isNew && role) {
            profile = await UserService.createProfile({
              uid: result.user.uid,
              email: result.user.email,
              role,
            });
          } else {
            profile = await UserService.getProfile(result.user.uid);
          }
        } catch (error) {
          console.error('Profile operation error:', error.message);
        }

        // Clean up localStorage
        window.localStorage.removeItem('emailForSignIn');
        window.localStorage.removeItem('roleForSignIn');
        window.localStorage.removeItem('isNewForSignIn');

        return { user: result.user, profile, error: null };
      }
      return { user: null, profile: null, error: 'Invalid sign-in link' };
    } catch (error) {
      return { user: null, profile: null, error: error.message };
    }
  }

  static async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async signOut() {
    try {
      await signOut(auth);
      UserService.clearAuthToken();
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
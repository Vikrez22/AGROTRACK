import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../config/firebase';
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

  static async signUpWithEmail(userData) {
    try {
      const { email, password, role, displayName, phoneNumber, state, lga, isNew = false } = userData;
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      await this.setAuthToken(token);

      let profile = null;
      try {
        if (isNew && role) {
          profile = await UserService.createProfile({
            uid: result.user.uid,
            email: result.user.email,
            displayName,
            phoneNumber,
            state,
            LGA: lga,
            role,
          });
        }
      } catch (profileError) {
        console.error('Profile creation error:', profileError.message);
        try {
          await result.user.delete();
          console.log('Firebase Auth user deleted due to profile creation failure.');
        } catch (deleteError) {
          console.error('Failed to delete Firebase user after profile error:', deleteError);
        }
        throw profileError
      }

      return {
        user: result.user,
        profile: profile.profile,
        error: null,
      };
    } catch (error) {
      console.error('User error:', error.message);
      throw error
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
        throw error
      }

      return {
        user: result.user,
        profile: profile,
        error: null,
      };

    } catch (error) {
      console.error('User error:', error.message);
      throw error
    }
  }

  // Send Magic Link with conditional profile creation flag
  static async sendMagicLink(userData) {
    try {
      const { email, role = null, displayName = null, phoneNumber = null, state = null, lga = null, isNew = false } = userData;
      
      await sendSignInLinkToEmail(auth, email, this.actionCodeSettings);
      
      window.localStorage.setItem('emailForSignIn', email);
      if (role) {
        window.localStorage.setItem('roleForSignIn', role);
      }
      if (displayName) {
        window.localStorage.setItem('displayNameForSignIn', displayName);
      }
      if (phoneNumber) {
        window.localStorage.setItem('phoneNumberForSignIn', phoneNumber);
      }
      if (state) {
        window.localStorage.setItem('stateForSignIn', state);
      }
      if (lga) {
        window.localStorage.setItem('lgaForSignIn', lga);
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
        const displayName = window.localStorage.getItem('displayNameForSignIn');
        const phoneNumber = window.localStorage.getItem('phoneNumberForSignIn');
        const state = window.localStorage.getItem('stateForSignIn');
        const lga = window.localStorage.getItem('lgaForSignIn');
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
              displayName,
              phoneNumber,
              state,
              lga,
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
        window.localStorage.removeItem('displayNameForSignIn');
        window.localStorage.removeItem('phoneNumberForSignIn');
        window.localStorage.removeItem('stateForSignIn');
        window.localStorage.removeItem('lgaForSignIn');
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
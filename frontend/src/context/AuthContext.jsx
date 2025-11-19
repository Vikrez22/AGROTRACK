import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth";
import { UserService } from "../services/user";
import { auth } from "../config/firebase";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    

    console.log('token is', token, profile)

    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, async (user) => {
          setUser(user);
          setLoading(false);
          if (user) {
            const userProfile = await UserService.getProfile(user.uid);
            setProfile(userProfile);

            console.log('profile data from context', userProfile)
          }
        });
      
        const unsubToken = onIdTokenChanged(auth, async (user) => {
          if (user) {
            const token = await user.getIdToken();
            AuthService.setAuthToken(token);
            setToken(token);
          } else {
            AuthService.setAuthToken(null);
          }
        });
      
        return () => {
          unsubAuth();
          unsubToken();
        };
      }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                role: profile?.role || null,
                loading,
                isAuthenticated: !!user,
                token,
                profile
            }}
        >
          {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
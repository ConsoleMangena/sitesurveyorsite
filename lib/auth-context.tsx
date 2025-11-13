"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { account } from "./appwrite";
import { Models, OAuthProvider } from "appwrite";

interface UserProfile {
  username?: string;
  organization?: string;
  userType?: string;
  city?: string;
  country?: string;
}

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, profile: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    if (!account) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    if (!account) {
      throw new Error("Authentication is not configured.");
    }
    await account.createEmailPasswordSession(email, password);
    await checkUser();
  }

  async function register(email: string, password: string, name: string, profile: UserProfile) {
    if (!account) {
      throw new Error("Authentication is not configured.");
    }
    await account.create("unique()", email, password, name);
    await login(email, password);
    // Store additional profile information in user preferences
    await account.updatePrefs(profile);
    await checkUser();
  }

  async function loginWithGithub() {
    if (!account) {
      throw new Error("Authentication is not configured.");
    }
    // Redirect-based OAuth flow; ensure these URLs are allowed in Appwrite redirect URLs
    const successUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined;
    const failureUrl = typeof window !== 'undefined' ? `${window.location.origin}/login/` : undefined;
    await account.createOAuth2Session(OAuthProvider.Github, successUrl, failureUrl);
  }

  async function logout() {
    if (!account) {
      setUser(null);
      return;
    }
    await account.deleteSession("current");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithGithub }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

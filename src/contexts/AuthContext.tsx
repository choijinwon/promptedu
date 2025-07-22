'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithGitHub: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // 관리자 권한 체크 함수
  const checkAdminStatus = (user: User | null) => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    // 관리자 이메일 목록 (실제 운영 시에는 데이터베이스에서 관리)
    const adminEmails = [
      'admin@openprompt.com',
      'choijinwon@gmail.com',
      'test@admin.com'
    ];

    const isAdminUser = adminEmails.includes(user.email?.toLowerCase() || '');
    setIsAdmin(isAdminUser);
  };

  // 로컬 스토리지에서 사용자 정보 복원
  const restoreUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('tempUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          return true;
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('tempUser');
        }
      }
    }
    return false;
  };

  // 사용자 정보를 로컬 스토리지에 저장
  const saveUserToStorage = (userData: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tempUser', JSON.stringify(userData));
    }
  };

  // 로컬 스토리지에서 사용자 정보 삭제
  const removeUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tempUser');
    }
  };

  useEffect(() => {
    // 초기 세션 가져오기
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        checkAdminStatus(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error('Failed to get session:', error);
        // Supabase 에러 시 로컬 스토리지에서 복원 시도
        const restored = restoreUserFromStorage();
        if (!restored) {
          setLoading(false);
        }
      }
    };

    // Supabase가 설정된 경우에만 세션 가져오기
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://demo.supabase.co') {
      getSession();

      // 인증 상태 변경 리스너
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          checkAdminStatus(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    } else {
      // Supabase 미설정 시 로컬 스토리지에서 복원
      console.log('Supabase not configured, checking local storage...');
      const restored = restoreUserFromStorage();
      if (restored) {
        console.log('User restored from local storage');
        checkAdminStatus(user);
      } else {
        console.log('No user found in local storage');
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Supabase가 설정되지 않은 경우 임시 처리
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co') {
        console.warn('Supabase가 설정되지 않았습니다. 임시 로그인을 진행합니다.');
        // 임시 사용자 생성 (실제로는 인증되지 않음)
        const tempUser = {
          id: 'temp-' + Date.now(),
          email,
          user_metadata: { name: '임시 사용자' },
        };
        setUser(tempUser as any);
        saveUserToStorage(tempUser); // 로컬 스토리지에 저장
        return { error: null };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error('Login error:', error);
      return { error: { message: '로그인 중 오류가 발생했습니다.' } };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Supabase가 설정되지 않은 경우 임시 처리
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co') {
        console.warn('Supabase가 설정되지 않았습니다. 임시 회원가입을 진행합니다.');
        // 임시 사용자 생성 (실제로는 저장되지 않음)
        const tempUser = {
          id: 'temp-' + Date.now(),
          email,
          user_metadata: { name },
        };
        setUser(tempUser as any);
        saveUserToStorage(tempUser); // 로컬 스토리지에 저장
        return { error: null };
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      return { error };
    } catch (error) {
      console.error('Signup error:', error);
      return { error: { message: '회원가입 중 오류가 발생했습니다.' } };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { error };
    } catch (error) {
      console.error('Google OAuth error:', error);
      return { 
        error: { 
          message: 'Google 로그인을 설정할 수 없습니다. Supabase 프로젝트를 설정해주세요.' 
        } 
      };
    }
  };

  const signInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { error };
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      return { 
        error: { 
          message: 'GitHub 로그인을 설정할 수 없습니다. Supabase 프로젝트를 설정해주세요.' 
        } 
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      // 로컬 스토리지에서도 사용자 정보 삭제
      setUser(null);
      setSession(null);
      removeUserFromStorage();
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const updateProfile = async (updates: any) => {
    try {
      // Supabase가 설정되지 않은 경우 임시 처리
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co') {
        console.warn('Supabase가 설정되지 않았습니다. 임시 프로필 업데이트를 진행합니다.');
        // 로컬 스토리지에서 사용자 정보 업데이트
        const currentUser = user;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            user_metadata: {
              ...currentUser.user_metadata,
              ...updates.data,
            },
          };
          setUser(updatedUser);
          saveUserToStorage(updatedUser);
        }
        return { error: null };
      }

      const { error } = await supabase.auth.updateUser(updates);
      return { error };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: { message: '프로필 업데이트 중 오류가 발생했습니다.' } };
    }
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGitHub,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
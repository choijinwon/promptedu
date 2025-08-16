import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables are not set');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// 데이터베이스 연결 상태 확인
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection error:', error);
    return false;
  }
};

// 사용자 인증 함수
export const authenticateUser = async (email: string, password: string) => {
  try {
    // Supabase Auth를 사용한 로그인
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Supabase auth error:', error);
      return null;
    }

    return data.user;
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return null;
  }
};

// 사용자 정보 조회
export const getUserById = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ User fetch error:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('❌ User fetch error:', error);
    return null;
  }
};

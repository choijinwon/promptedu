import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables are not set');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseKey);
}

export const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// 데이터베이스 연결 확인 함수
export const checkSupabaseConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // 간단한 쿼리로 연결 확인
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

// 사용자 인증 함수 (Supabase 사용)
export const authenticateUser = async (email: string, password: string) => {
  try {
    console.log('🔍 Authenticating user with Supabase:', email);
    
    // Supabase Auth를 사용한 로그인
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Supabase auth error:', error);
      return null;
    }

    console.log('✅ User authenticated successfully');
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
      console.error('❌ Error fetching user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    return null;
  }
};

// 사용자 이메일로 조회
export const getUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('❌ Error fetching user by email:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching user by email:', error);
    return null;
  }
};

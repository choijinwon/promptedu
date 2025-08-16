import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 환경변수 검증
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables are not set');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', !!supabaseKey);
  throw new Error('Supabase environment variables are required');
}

// Supabase 클라이언트 생성 (서비스 롤 키 사용)
export const supabase = createClient(supabaseUrl, serviceRoleKey || supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

// 데이터베이스 연결 확인 함수 (테이블 존재 여부와 관계없이)
export const checkSupabaseConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...');
    console.log('🔍 Supabase URL:', supabaseUrl ? 'SET' : 'NOT_SET');
    console.log('🔍 Service Role Key:', serviceRoleKey ? 'SET' : 'NOT_SET');
    
    // 간단한 연결 테스트 - 시스템 정보 조회
    const { data, error } = await supabase
      .rpc('version');
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error details:', error.details);
      console.error('❌ Error hint:', error.hint);
      
      // 다른 방법으로 연결 테스트
      try {
        const { error: testError } = await supabase
          .from('users')
          .select('id')
          .limit(1);
        
        if (testError) {
          console.error('❌ Table access failed:', testError);
          // 테이블이 없는 경우도 연결은 성공으로 간주
          if (testError.code === 'PGRST116') {
            console.log('⚠️ Table does not exist, but connection is working');
            return true;
          }
          return false;
        }
        
        console.log('✅ Supabase connection successful');
        return true;
      } catch (tableError) {
        console.error('❌ Table test failed:', tableError);
        return false;
      }
    }
    
    console.log('✅ Supabase connection successful');
    console.log('✅ Version data:', data);
    return true;
  } catch (error) {
    console.error('❌ Supabase connection error:', error);
    console.error('❌ Error type:', typeof error);
    console.error('❌ Error message:', error instanceof Error ? error.message : String(error));
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

// 사용자 아이디(username)로 조회
export const getUserByUsername = async (username: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.error('❌ Error fetching user by username:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('❌ Error fetching user by username:', error);
    return null;
  }
};

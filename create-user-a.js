const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables from .env file
function loadEnv() {
  const envContent = fs.readFileSync('.env', 'utf8');
  const env = {};
  
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').replace(/^"|"$/g, '');
      env[key.trim()] = value.trim();
    }
  });
  
  return env;
}

const env = loadEnv();

// 새로운 클라이언트 생성 (Anon Key 사용)
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: { persistSession: false },
    db: { schema: 'public' }
  }
);

async function createUserA() {
  console.log('🔄 a@test.com 사용자 생성 중...');
  
  try {
    // a@test.com 사용자 생성
    const userA = {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // 고정 UUID
      email: 'a@test.com',
      username: 'atest',
      name: '테스트 사용자 A',
      role: 'USER',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data: createdUser, error: createError } = await supabase
      .from('users')
      .insert(userA)
      .select('*')
      .single();
    
    if (createError) {
      console.log('❌ 사용자 생성 실패:', createError.message);
      
      // 이미 존재하는 경우 조회
      if (createError.message.includes('duplicate key')) {
        console.log('📋 이미 존재하는 사용자 조회 중...');
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('*')
          .eq('email', 'a@test.com')
          .single();
        
        if (selectError) {
          console.log('❌ 기존 사용자 조회 실패:', selectError.message);
        } else {
          console.log('✅ 기존 사용자 조회 성공:', existingUser);
        }
      }
    } else {
      console.log('✅ a@test.com 사용자 생성 성공!');
      console.log('👤 사용자 정보:', {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        name: createdUser.name
      });
    }
    
  } catch (error) {
    console.log('💥 예외:', error.message);
  }
}

createUserA();

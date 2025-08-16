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

// 새 클라이언트 생성 (기존 설정 무시)
const newSupabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL, // 대시보드에서 직접 복사
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,     // 대시보드에서 직접 복사
  {
    auth: { persistSession: false },
    db: { schema: 'public' }
  }
);

// 설정 확인
console.log('🔍 새 클라이언트 설정 확인:');
console.log('URL:', env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Anon Key:', env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '설정됨' : '누락됨');
console.log('클라이언트:', newSupabase ? '생성됨' : '생성 실패');

async function freshTest() {
  console.log('\n🆕 새 클라이언트 테스트...');
  
  try {
    // Categories 테스트
    console.log('1️⃣ Categories 테스트:');
    const { data: categories, error: catError } = await newSupabase
      .from('categories')
      .select('*');
      
    if (catError) {
      console.log('❌ Categories 실패:', catError.message);
      console.log('❌ 에러 코드:', catError.code);
    } else {
      console.log('🎉 Categories 성공!', categories.length, '개 카테고리');
      console.log('📋 카테고리 목록:', categories.map(c => c.name).join(', '));
    }

    // Users 테스트
    console.log('\n2️⃣ Users 테스트:');
    const { data: users, error: usersError } = await newSupabase
      .from('users')
      .select('*');
      
    if (usersError) {
      console.log('❌ Users 실패:', usersError.message);
      console.log('❌ 에러 코드:', usersError.code);
    } else {
      console.log('🎉 Users 성공!', users.length, '개 사용자');
      if (users.length > 0) {
        console.log('📋 첫 번째 사용자:', users[0].email || users[0].id);
      }
    }

    // Prompts 테스트
    console.log('\n3️⃣ Prompts 테스트:');
    const { data: prompts, error: promptError } = await newSupabase
      .from('prompts')
      .select('*');
      
    if (promptError) {
      console.log('❌ Prompts 실패:', promptError.message);
      console.log('❌ 에러 코드:', promptError.code);
    } else {
      console.log('🎉 Prompts 성공!', prompts.length, '개 프롬프트');
      if (prompts.length > 0) {
        console.log('📋 첫 번째 프롬프트:', prompts[0].title);
      }
    }
  } catch (err) {
    console.log('💥 예외:', err.message);
  }
}

freshTest();

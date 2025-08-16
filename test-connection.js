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

// Create Supabase client with service role key
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

// supabase 연결 설정 확인
console.log('🔍 Supabase 설정 확인:');
console.log('URL:', env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Service Role Key:', env.SUPABASE_SERVICE_ROLE_KEY ? '설정됨' : '누락됨');
console.log('Anon Key:', env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '설정됨' : '누락됨');

// 연결 객체 확인
console.log('Supabase 인스턴스:', supabase ? '생성됨' : '생성 실패');

// 테스트 코드
async function testConnection() {
  console.log('\n🔄 Supabase 연결 테스트 시작...');
  
  try {
    // Categories 테스트
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*');
    
    if (catError) {
      console.log('❌ Categories 오류:', catError.message);
    } else {
      console.log(`✅ Categories 성공: ${categories.length}개 카테고리`);
      console.log('   카테고리:', categories.map(c => c.name).join(', '));
    }

    // Prompts 테스트  
    const { data: prompts, error: promptError } = await supabase
      .from('prompts')
      .select('*');
      
    if (promptError) {
      console.log('❌ Prompts 오류:', promptError.message);
    } else {
      console.log(`✅ Prompts 성공: ${prompts.length}개 프롬프트`);
    }
    
  } catch (error) {
    console.log('❌ 연결 테스트 실패:', error.message);
  }
}

testConnection();

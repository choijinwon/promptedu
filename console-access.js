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

console.log('🔧 환경 변수 확인:');
console.log('URL:', env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Service Role Key 존재:', !!env.SUPABASE_SERVICE_ROLE_KEY);
console.log('Anon Key 존재:', !!env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Create Supabase client with service role key
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function testDatabase() {
  console.log('\n🔍 Supabase 데이터베이스 연결 테스트 시작...\n');
  
  try {
    // 1. 기본 연결 테스트
    console.log('1️⃣ 기본 연결 테스트:');
    const { data: authData, error: authError } = await supabase.auth.getUser();
    console.log('Auth 테스트:', authError ? '❌ ' + authError.message : '✅ 성공');
    
    // 2. Users 테이블 테스트
    console.log('\n2️⃣ Users 테이블 테스트:');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError) {
      console.log('❌ Users 테이블 접근 실패:', usersError.message);
    } else {
      console.log('✅ Users 테이블 접근 성공, 레코드 수:', users?.length || 0);
      if (users && users.length > 0) {
        console.log('   첫 번째 사용자:', users[0].email || users[0].id);
      }
    }
    
    // 3. Categories 테이블 테스트
    console.log('\n3️⃣ Categories 테이블 테스트:');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5);
    
    if (categoriesError) {
      console.log('❌ Categories 테이블 접근 실패:', categoriesError.message);
      
      // 테이블 존재 여부 확인 시도
      console.log('\n🛠️ 테이블 존재 여부 확인:');
      try {
        const { data: tableCheck, error: tableError } = await supabase
          .from('pg_tables')
          .select('tablename')
          .eq('schemaname', 'public')
          .eq('tablename', 'categories');
        
        if (tableError) {
          console.log('❌ 테이블 확인 실패:', tableError.message);
        } else {
          console.log('📋 테이블 존재 여부:', tableCheck?.length > 0 ? '존재함' : '존재하지 않음');
        }
      } catch (e) {
        console.log('❌ 테이블 확인 중 오류:', e.message);
      }
    } else {
      console.log('✅ Categories 테이블 접근 성공, 레코드 수:', categories?.length || 0);
      if (categories && categories.length > 0) {
        console.log('   첫 번째 카테고리:', categories[0].name);
      }
    }
    
    // 4. Prompts 테이블 테스트
    console.log('\n4️⃣ Prompts 테이블 테스트:');
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('*')
      .limit(5);
    
    if (promptsError) {
      console.log('❌ Prompts 테이블 접근 실패:', promptsError.message);
    } else {
      console.log('✅ Prompts 테이블 접근 성공, 레코드 수:', prompts?.length || 0);
    }
    
    // 5. RLS 정책 확인 시도
    console.log('\n5️⃣ RLS 정책 확인:');
    try {
      const { data: policies, error: policyError } = await supabase
        .from('pg_policies')
        .select('*')
        .eq('schemaname', 'public')
        .in('tablename', ['categories', 'prompts']);
      
      if (policyError) {
        console.log('❌ RLS 정책 확인 실패:', policyError.message);
      } else {
        console.log('📋 RLS 정책 수:', policies?.length || 0);
        policies?.forEach(policy => {
          console.log(`   - ${policy.tablename}: ${policy.policyname}`);
        });
      }
    } catch (e) {
      console.log('❌ RLS 정책 확인 중 오류:', e.message);
    }
    
    // 6. 권한 확인 시도
    console.log('\n6️⃣ 권한 확인:');
    try {
      const { data: privileges, error: privError } = await supabase
        .from('information_schema.table_privileges')
        .select('*')
        .eq('table_schema', 'public')
        .in('table_name', ['categories', 'prompts']);
      
      if (privError) {
        console.log('❌ 권한 확인 실패:', privError.message);
      } else {
        console.log('📋 테이블 권한:');
        privileges?.forEach(priv => {
          console.log(`   - ${priv.table_name}: ${priv.privilege_type} (${priv.grantee})`);
        });
      }
    } catch (e) {
      console.log('❌ 권한 확인 중 오류:', e.message);
    }
    
  } catch (error) {
    console.error('💥 예상치 못한 오류:', error.message);
  }
}

testDatabase();

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// 환경 변수 로드
function loadEnv() {
  const envPath = '.env';
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^"|"$/g, '');
        envVars[key] = value;
      }
    });
    
    return envVars;
  }
  return {};
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Checking RLS status...');
console.log('URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRLS() {
  try {
    // RLS 상태 확인
    console.log('\n📊 Checking RLS status...');
    
    const { data: rlsStatus, error: rlsError } = await supabase
      .from('pg_tables')
      .select('schemaname, tablename, rowsecurity')
      .eq('tablename', 'categories')
      .or('tablename.eq.prompts');

    if (rlsError) {
      console.log('❌ Failed to check RLS status:', rlsError.message);
    } else {
      console.log('✅ RLS status:', rlsStatus);
    }

    // 테이블 권한 확인
    console.log('\n📊 Checking table permissions...');
    
    const { data: permissions, error: permError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['categories', 'prompts']);

    if (permError) {
      console.log('❌ Failed to check permissions:', permError.message);
    } else {
      console.log('✅ Table permissions:', permissions);
    }

    // 직접 테이블 접근 시도
    console.log('\n📊 Testing direct table access...');
    
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .limit(1);
    
    console.log('Categories access:', { count: categories?.length, error: categoriesError?.message });

    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('id, title, type')
      .limit(1);
    
    console.log('Prompts access:', { count: prompts?.length, error: promptsError?.message });

    // 카테고리 생성 시도
    console.log('\n📊 Testing category creation...');
    
    const { data: createdCategory, error: createError } = await supabase
      .from('categories')
      .insert({
        name: 'RLS 테스트 카테고리',
        description: 'RLS 설정 테스트용',
        slug: 'rls-test-category'
      })
      .select('id, name, slug')
      .single();

    if (createError) {
      console.log('❌ Category creation failed:', createError.message);
    } else {
      console.log('✅ Category created successfully:', createdCategory);
      
      // 생성된 카테고리 삭제
      await supabase
        .from('categories')
        .delete()
        .eq('slug', 'rls-test-category');
      console.log('🗑️ Test category deleted');
    }

  } catch (error) {
    console.error('❌ Error checking RLS:', error);
  }
}

checkRLS();

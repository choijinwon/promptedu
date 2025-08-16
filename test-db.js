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
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing database connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT SET');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  try {
    // 1. Users 테이블 테스트
    console.log('\n📊 Testing users table...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, username')
      .limit(1);
    
    console.log('Users result:', { count: users?.length, error: usersError?.message });

    // 2. Categories 테이블 테스트
    console.log('\n📊 Testing categories table...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .limit(1);
    
    console.log('Categories result:', { count: categories?.length, error: categoriesError?.message });

    // 3. Prompts 테이블 테스트
    console.log('\n📊 Testing prompts table...');
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('id, title, type')
      .limit(1);
    
    console.log('Prompts result:', { count: prompts?.length, error: promptsError?.message });

    // 4. 카테고리 생성 테스트
    console.log('\n📊 Testing category creation...');
    try {
      const { data: createdCategory, error: createError } = await supabase
        .from('categories')
        .insert({
          name: 'CLI 테스트 카테고리',
          description: 'CLI에서 생성한 테스트 카테고리',
          slug: 'cli-test-category'
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
          .eq('slug', 'cli-test-category');
        console.log('🗑️ Test category deleted');
      }
    } catch (createTestError) {
      console.log('❌ Category creation test failed:', createTestError.message);
    }

  } catch (error) {
    console.error('❌ Error in database test:', error);
  }
}

testDatabase();

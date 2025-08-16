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
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY; // 서비스 롤 키 사용

console.log('🔧 Fixing RLS settings...');
console.log('URL:', supabaseUrl);
console.log('Using service role key:', supabaseKey ? 'YES' : 'NO');

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixRLS() {
  try {
    console.log('\n📊 Disabling RLS on categories table...');
    
    // RLS 비활성화
    const { error: disableCategoriesError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE categories DISABLE ROW LEVEL SECURITY;'
    });
    
    if (disableCategoriesError) {
      console.log('❌ Failed to disable RLS on categories:', disableCategoriesError.message);
    } else {
      console.log('✅ RLS disabled on categories table');
    }

    console.log('\n📊 Disabling RLS on prompts table...');
    
    const { error: disablePromptsError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE prompts DISABLE ROW LEVEL SECURITY;'
    });
    
    if (disablePromptsError) {
      console.log('❌ Failed to disable RLS on prompts:', disablePromptsError.message);
    } else {
      console.log('✅ RLS disabled on prompts table');
    }

    // 또는 정책 생성
    console.log('\n📊 Creating policies for categories...');
    
    const { error: categoriesPolicyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY IF NOT EXISTS "categories_select_policy" ON categories FOR SELECT USING (true);
        CREATE POLICY IF NOT EXISTS "categories_insert_policy" ON categories FOR INSERT WITH CHECK (true);
      `
    });
    
    if (categoriesPolicyError) {
      console.log('❌ Failed to create categories policies:', categoriesPolicyError.message);
    } else {
      console.log('✅ Categories policies created');
    }

    console.log('\n📊 Creating policies for prompts...');
    
    const { error: promptsPolicyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY IF NOT EXISTS "prompts_select_policy" ON prompts FOR SELECT USING (true);
        CREATE POLICY IF NOT EXISTS "prompts_insert_policy" ON prompts FOR INSERT WITH CHECK (true);
      `
    });
    
    if (promptsPolicyError) {
      console.log('❌ Failed to create prompts policies:', promptsPolicyError.message);
    } else {
      console.log('✅ Prompts policies created');
    }

    // 테스트
    console.log('\n📊 Testing after RLS fix...');
    
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .limit(1);
    
    console.log('Categories test:', { count: categories?.length, error: categoriesError?.message });

    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('id, title, type')
      .limit(1);
    
    console.log('Prompts test:', { count: prompts?.length, error: promptsError?.message });

  } catch (error) {
    console.error('❌ Error fixing RLS:', error);
  }
}

fixRLS();

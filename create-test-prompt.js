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

async function createTestPrompt() {
  console.log('🔄 테스트 프롬프트 생성 중...');
  
  try {
    // 먼저 사용자 ID 가져오기
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (usersError || !users || users.length === 0) {
      console.log('❌ 사용자를 찾을 수 없습니다:', usersError?.message);
      return;
    }
    
    const userId = users[0].id;
    console.log('👤 사용자 ID:', userId);
    
    // 카테고리 ID 가져오기
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'productivity')
      .limit(1);
    
    if (categoriesError || !categories || categories.length === 0) {
      console.log('❌ 카테고리를 찾을 수 없습니다:', categoriesError?.message);
      return;
    }
    
    const categoryId = categories[0].id;
    console.log('📂 카테고리 ID:', categoryId);
    
    // 테스트 프롬프트 생성
    const testPrompt = {
      title: '테스트 공유 프롬프트',
      description: '테스트용 공유 프롬프트입니다. 무료로 사용할 수 있습니다.',
      content: '이것은 테스트용 프롬프트 내용입니다. 실제 사용을 위한 프롬프트가 아닙니다.',
      price: 0,
      category_id: categoryId,
      author_id: userId,
      tags: ['test', 'sample'],
      type: 'SHARED',
      is_public: true,
      status: 'PENDING',
      views: 0,
      downloads: 0,
      rating: 0,
      rating_count: 0
    };
    
    const { data: createdPrompt, error: createError } = await supabase
      .from('prompts')
      .insert(testPrompt)
      .select('*')
      .single();
    
    if (createError) {
      console.log('❌ 프롬프트 생성 실패:', createError.message);
    } else {
      console.log('✅ 테스트 프롬프트 생성 성공!');
      console.log('📝 프롬프트 ID:', createdPrompt.id);
      console.log('📝 제목:', createdPrompt.title);
      console.log('📝 상태:', createdPrompt.status);
    }
    
  } catch (error) {
    console.log('💥 예외:', error.message);
  }
}

createTestPrompt();

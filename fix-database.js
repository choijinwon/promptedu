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

async function fixDatabase() {
  console.log('🔧 데이터베이스 수정 시작...\n');
  
  try {
    // 1. 현재 상태 확인
    console.log('1️⃣ 현재 상태 확인:');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    console.log('Users 테이블:', usersError ? '❌ ' + usersError.message : `✅ ${users?.length || 0}개 레코드`);
    
    // 2. Categories 테이블 확인
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);
    
    console.log('Categories 테이블:', categoriesError ? '❌ ' + categoriesError.message : `✅ ${categories?.length || 0}개 레코드`);
    
    // 3. Prompts 테이블 확인
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('*')
      .limit(1);
    
    console.log('Prompts 테이블:', promptsError ? '❌ ' + promptsError.message : `✅ ${prompts?.length || 0}개 레코드`);
    
    // 4. 테이블 생성 시도 (RPC 사용)
    console.log('\n2️⃣ 테이블 생성 시도:');
    
    // Categories 테이블이 없으면 생성 시도
    if (categoriesError && categoriesError.message.includes('permission denied')) {
      console.log('🛠️ Categories 테이블 생성 중...');
      
      // 직접 INSERT로 테스트
      const { data: testInsert, error: insertError } = await supabase
        .from('categories')
        .insert({
          name: '테스트 카테고리',
          description: '테스트용 카테고리',
          slug: 'test-category'
        })
        .select('*')
        .single();
      
      if (insertError) {
        console.log('❌ Categories 테이블 생성 실패:', insertError.message);
        console.log('💡 Supabase 대시보드에서 직접 SQL을 실행해야 합니다.');
        console.log('📋 실행할 SQL:');
        console.log(`
-- Categories 테이블 생성
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 비활성화
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- 샘플 데이터 삽입
INSERT INTO categories (name, description, slug) VALUES
('프로덕티비티', '업무 효율성과 생산성을 높이는 프롬프트', 'productivity'),
('창작 도구', '글쓰기, 디자인, 콘텐츠 제작을 위한 프롬프트', 'creative'),
('학습 도구', '교육, 학습, 지식 습득을 위한 프롬프트', 'education'),
('비즈니스', '마케팅, 영업, 경영을 위한 프롬프트', 'business'),
('개발 도구', '프로그래밍, 코딩, 기술 관련 프롬프트', 'development'),
('일상 생활', '일상에서 유용한 프롬프트', 'lifestyle'),
('엔터테인먼트', '재미있고 창의적인 프롬프트', 'entertainment'),
('건강 관리', '건강, 운동, 웰빙 관련 프롬프트', 'health')
ON CONFLICT (name) DO NOTHING;
        `);
      } else {
        console.log('✅ Categories 테이블 생성 성공!');
        
        // 테스트 데이터 삭제
        await supabase
          .from('categories')
          .delete()
          .eq('slug', 'test-category');
        console.log('🗑️ 테스트 데이터 삭제 완료');
      }
    }
    
    // Prompts 테이블이 없으면 생성 시도
    if (promptsError && promptsError.message.includes('permission denied')) {
      console.log('🛠️ Prompts 테이블 생성 중...');
      console.log('💡 Prompts 테이블도 Supabase 대시보드에서 생성해야 합니다.');
      console.log('📋 실행할 SQL:');
      console.log(`
-- Prompts 테이블 생성
CREATE TABLE IF NOT EXISTS prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    price INTEGER DEFAULT 0 CHECK (price >= 0),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tags TEXT[] DEFAULT '{}',
    type VARCHAR(20) DEFAULT 'MARKETPLACE' CHECK (type IN ('MARKETPLACE', 'SHARED')),
    is_public BOOLEAN DEFAULT true,
    is_approved BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'DRAFT')),
    views INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 비활성화
ALTER TABLE prompts DISABLE ROW LEVEL SECURITY;
      `);
    }
    
    // 5. 최종 확인
    console.log('\n3️⃣ 최종 확인:');
    const { data: finalCategories, error: finalError } = await supabase
      .from('categories')
      .select('*');
    
    if (finalError) {
      console.log('❌ 최종 확인 실패:', finalError.message);
      console.log('\n🚨 해결 방법:');
      console.log('1. https://supabase.com/dashboard/project/pahwayjrezkkgixykqpe 접속');
      console.log('2. SQL Editor 클릭');
      console.log('3. 위의 SQL 명령어들을 실행');
      console.log('4. 완료 후 "테스트해줘"라고 말씀해주세요');
    } else {
      console.log('✅ 최종 확인 성공! Categories 레코드 수:', finalCategories?.length || 0);
      console.log('📋 Categories 목록:');
      finalCategories?.forEach(cat => {
        console.log(`  - ${cat.name} (${cat.slug})`);
      });
    }
    
  } catch (error) {
    console.error('💥 예상치 못한 오류:', error.message);
  }
}

fixDatabase();

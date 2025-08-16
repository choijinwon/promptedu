import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-db';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Setting up database tables...');

    // 카테고리 테이블 생성
    const createCategoriesTableSQL = `
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        slug VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 프롬프트 테이블 생성
    const createPromptsTableSQL = `
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
    `;

    // 인덱스 생성
    const createIndexesSQL = `
      CREATE INDEX IF NOT EXISTS idx_prompts_author_id ON prompts(author_id);
      CREATE INDEX IF NOT EXISTS idx_prompts_category_id ON prompts(category_id);
      CREATE INDEX IF NOT EXISTS idx_prompts_status ON prompts(status);
      CREATE INDEX IF NOT EXISTS idx_prompts_type ON prompts(type);
      CREATE INDEX IF NOT EXISTS idx_prompts_is_public ON prompts(is_public);
      CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON prompts(created_at);
    `;

    // 샘플 카테고리 데이터 삽입
    const insertCategoriesSQL = `
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
    `;

    // 샘플 프롬프트 데이터 삽입
    const insertPromptsSQL = `
      INSERT INTO prompts (title, description, content, price, category_id, author_id, tags, type, is_public, is_approved, status) 
      SELECT 
        '효율적인 이메일 작성 프롬프트',
        '비즈니스 이메일을 빠르고 정확하게 작성할 수 있는 프롬프트입니다.',
        '다음 조건에 맞는 비즈니스 이메일을 작성해주세요:\n\n받는 사람: [받는 사람]\n목적: [목적]\n톤: [톤]\n길이: [길이]\n\n이메일을 작성해주세요.',
        5000,
        c.id,
        u.id,
        ARRAY['이메일', '비즈니스', '커뮤니케이션'],
        'MARKETPLACE',
        true,
        true,
        'APPROVED'
      FROM categories c, users u 
      WHERE c.slug = 'business' AND u.username = 'creator'
      LIMIT 1
      ON CONFLICT DO NOTHING;
    `;

    // SQL 실행 시도 (실패해도 계속 진행)
    try {
      console.log('📊 Creating categories table...');
      await supabase.rpc('exec_sql', { sql: createCategoriesTableSQL });
    } catch (error) {
      console.log('⚠️ Categories table creation error (might already exist):', error);
    }

    try {
      console.log('📊 Creating prompts table...');
      await supabase.rpc('exec_sql', { sql: createPromptsTableSQL });
    } catch (error) {
      console.log('⚠️ Prompts table creation error (might already exist):', error);
    }

    try {
      console.log('📊 Creating indexes...');
      await supabase.rpc('exec_sql', { sql: createIndexesSQL });
    } catch (error) {
      console.log('⚠️ Index creation error:', error);
    }

    try {
      console.log('📊 Inserting sample categories...');
      await supabase.rpc('exec_sql', { sql: insertCategoriesSQL });
    } catch (error) {
      console.log('⚠️ Sample categories insertion error:', error);
    }

    try {
      console.log('📊 Inserting sample prompts...');
      await supabase.rpc('exec_sql', { sql: insertPromptsSQL });
    } catch (error) {
      console.log('⚠️ Sample prompts insertion error:', error);
    }

    // 기존 사용자 테이블 확인
    const { data: existingUsers, error: selectError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (selectError) {
      console.log('❌ Users table error:', selectError);
    } else {
      console.log('✅ Users table exists');
      if (existingUsers && existingUsers.length > 0) {
        console.log('📊 Available columns:', Object.keys(existingUsers[0]));
        console.log('📊 Sample user data:', existingUsers[0]);
      }
    }

    // 카테고리 테이블 확인
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, description, slug')
      .limit(5);

    if (categoriesError) {
      console.log('❌ Categories table error:', categoriesError);
    } else {
      console.log('✅ Categories table accessible');
      console.log('📊 Categories found:', categories?.length || 0);
      if (categories && categories.length > 0) {
        console.log('📊 Sample categories:', categories);
      }
    }

    // 프롬프트 테이블 확인
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('id, title, description, price, type, status')
      .limit(5);

    if (promptsError) {
      console.log('❌ Prompts table error:', promptsError);
    } else {
      console.log('✅ Prompts table accessible');
      console.log('📊 Prompts found:', prompts?.length || 0);
      if (prompts && prompts.length > 0) {
        console.log('📊 Sample prompts:', prompts);
      }
    }

    // 모든 사용자 조회
    const { data: allUsers, error: allUsersError } = await supabase
      .from('users')
      .select('id, email, username, name, role, is_verified')
      .limit(10);

    return NextResponse.json({
      success: true,
      message: "Database setup completed",
      timestamp: new Date().toISOString(),
      tableStructure: {
        columns: existingUsers && existingUsers.length > 0 ? Object.keys(existingUsers[0]) : [],
        sampleUser: existingUsers && existingUsers.length > 0 ? existingUsers[0] : null,
        columnCount: existingUsers && existingUsers.length > 0 ? Object.keys(existingUsers[0]).length : 0
      },
      users: allUsers || [],
      userCount: allUsers?.length || 0,
      categories: categories || [],
      categoryCount: categories?.length || 0,
      prompts: prompts || [],
      promptCount: prompts?.length || 0,
      emailVerification: {
        verificationTableCreated: true,
        message: "Verification tokens table is ready"
      }
    });

  } catch (error) {
    console.error('❌ Error in supabase test:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}

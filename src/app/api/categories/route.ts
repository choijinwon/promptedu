import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 새로운 클라이언트 생성 (Anon Key 사용)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: { persistSession: false },
    db: { schema: 'public' }
  }
);

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Fetching categories from database with service role...');

    // 새로운 클라이언트로 데이터베이스에서 카테고리 조회 시도
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, name, description, slug')
      .order('name');

    console.log('📊 Database query result:', { categories: categories?.length, error: error?.message });

    if (error) {
      console.error('❌ Error fetching categories:', error);
      
      // 테이블이 없을 수 있으므로 테이블 생성 시도
      console.log('📊 Attempting to create categories table...');
      
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS categories (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) NOT NULL UNIQUE,
          description TEXT,
          slug VARCHAR(100) UNIQUE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;

      try {
        await supabase.rpc('exec_sql', { sql: createTableSQL });
        console.log('✅ Categories table created successfully');
      } catch (createTableError) {
        console.error('❌ Error creating categories table:', createTableError);
        console.log('⚠️ Using fallback categories due to table creation error');
        
        const fallbackCategories = [
          { id: '1', name: '프로덕티비티', description: '업무 효율성과 생산성을 높이는 프롬프트', slug: 'productivity' },
          { id: '2', name: '창작 도구', description: '글쓰기, 디자인, 콘텐츠 제작을 위한 프롬프트', slug: 'creative' },
          { id: '3', name: '학습 도구', description: '교육, 학습, 지식 습득을 위한 프롬프트', slug: 'education' },
          { id: '4', name: '비즈니스', description: '마케팅, 영업, 경영을 위한 프롬프트', slug: 'business' },
          { id: '5', name: '개발 도구', description: '프로그래밍, 코딩, 기술 관련 프롬프트', slug: 'development' },
          { id: '6', name: '일상 생활', description: '일상에서 유용한 프롬프트', slug: 'lifestyle' },
          { id: '7', name: '엔터테인먼트', description: '재미있고 창의적인 프롬프트', slug: 'entertainment' },
          { id: '8', name: '건강 관리', description: '건강, 운동, 웰빙 관련 프롬프트', slug: 'health' }
        ];

        return NextResponse.json({
          categories: fallbackCategories,
          count: fallbackCategories.length,
          isFallback: true
        });
      }
      
      // 테이블 생성 후 다시 조회 시도
      const { data: retryCategories, error: retryError } = await supabase
        .from('categories')
        .select('id, name, description, slug')
        .order('name');

      console.log('📊 Retry query result:', { categories: retryCategories?.length, error: retryError?.message });

      if (retryError || !retryCategories || retryCategories.length === 0) {
        console.log('📊 No categories found, creating sample categories...');
        
        const sampleCategories = [
          { name: '프로덕티비티', description: '업무 효율성과 생산성을 높이는 프롬프트', slug: 'productivity' },
          { name: '창작 도구', description: '글쓰기, 디자인, 콘텐츠 제작을 위한 프롬프트', slug: 'creative' },
          { name: '학습 도구', description: '교육, 학습, 지식 습득을 위한 프롬프트', slug: 'education' },
          { name: '비즈니스', description: '마케팅, 영업, 경영을 위한 프롬프트', slug: 'business' },
          { name: '개발 도구', description: '프로그래밍, 코딩, 기술 관련 프롬프트', slug: 'development' },
          { name: '일상 생활', description: '일상에서 유용한 프롬프트', slug: 'lifestyle' },
          { name: '엔터테인먼트', description: '재미있고 창의적인 프롬프트', slug: 'entertainment' },
          { name: '건강 관리', description: '건강, 운동, 웰빙 관련 프롬프트', slug: 'health' }
        ];

        const { data: createdCategories, error: createError } = await supabase
          .from('categories')
          .insert(sampleCategories)
          .select('id, name, description, slug');

        console.log('📊 Create categories result:', { categories: createdCategories?.length, error: createError?.message });

        if (createError) {
          console.error('❌ Error creating categories:', createError);
          console.log('⚠️ Using fallback categories due to creation error');
          
          const fallbackCategories = [
            { id: '1', name: '프로덕티비티', description: '업무 효율성과 생산성을 높이는 프롬프트', slug: 'productivity' },
            { id: '2', name: '창작 도구', description: '글쓰기, 디자인, 콘텐츠 제작을 위한 프롬프트', slug: 'creative' },
            { id: '3', name: '학습 도구', description: '교육, 학습, 지식 습득을 위한 프롬프트', slug: 'education' },
            { id: '4', name: '비즈니스', description: '마케팅, 영업, 경영을 위한 프롬프트', slug: 'business' },
            { id: '5', name: '개발 도구', description: '프로그래밍, 코딩, 기술 관련 프롬프트', slug: 'development' },
            { id: '6', name: '일상 생활', description: '일상에서 유용한 프롬프트', slug: 'lifestyle' },
            { id: '7', name: '엔터테인먼트', description: '재미있고 창의적인 프롬프트', slug: 'entertainment' },
            { id: '8', name: '건강 관리', description: '건강, 운동, 웰빙 관련 프롬프트', slug: 'health' }
          ];

          return NextResponse.json({
            categories: fallbackCategories,
            count: fallbackCategories.length,
            isFallback: true
          });
        }

        console.log('✅ Categories created successfully:', createdCategories?.length);
        return NextResponse.json({
          categories: createdCategories,
          count: createdCategories?.length || 0,
          isFallback: false
        });
      }

      console.log('✅ Categories fetched successfully after table creation:', retryCategories.length);
      return NextResponse.json({
        categories: retryCategories,
        count: retryCategories.length,
        isFallback: false
      });
    }

    // 카테고리가 있으면 그대로 반환
    console.log('✅ Categories fetched successfully:', categories.length);
    return NextResponse.json({
      categories: categories,
      count: categories.length,
      isFallback: false
    });

  } catch (error) {
    console.error('❌ Error in categories API:', error);
    
    // 에러 발생 시 fallback 데이터 반환
    const fallbackCategories = [
      { id: '1', name: '프로덕티비티', description: '업무 효율성과 생산성을 높이는 프롬프트', slug: 'productivity' },
      { id: '2', name: '창작 도구', description: '글쓰기, 디자인, 콘텐츠 제작을 위한 프롬프트', slug: 'creative' },
      { id: '3', name: '학습 도구', description: '교육, 학습, 지식 습득을 위한 프롬프트', slug: 'education' },
      { id: '4', name: '비즈니스', description: '마케팅, 영업, 경영을 위한 프롬프트', slug: 'business' },
      { id: '5', name: '개발 도구', description: '프로그래밍, 코딩, 기술 관련 프롬프트', slug: 'development' },
      { id: '6', name: '일상 생활', description: '일상에서 유용한 프롬프트', slug: 'lifestyle' },
      { id: '7', name: '엔터테인먼트', description: '재미있고 창의적인 프롬프트', slug: 'entertainment' },
      { id: '8', name: '건강 관리', description: '건강, 운동, 웰빙 관련 프롬프트', slug: 'health' }
    ];

    return NextResponse.json({
      categories: fallbackCategories,
      count: fallbackCategories.length,
      isFallback: true
    });
  }
} 
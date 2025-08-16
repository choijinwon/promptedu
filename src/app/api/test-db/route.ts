import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-db';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing database connection...');

    // 1. users 테이블 테스트
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, username')
      .limit(1);

    console.log('📊 Users test:', { count: users?.length, error: usersError?.message });

    // 2. categories 테이블 테스트
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .limit(1);

    console.log('📊 Categories test:', { count: categories?.length, error: categoriesError?.message });

    // 3. prompts 테이블 테스트
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('id, title, type')
      .limit(1);

    console.log('📊 Prompts test:', { count: prompts?.length, error: promptsError?.message });

    // 4. 직접 카테고리 생성 테스트
    let createTestResult = null;
    try {
      const { data: createdCategory, error: createError } = await supabase
        .from('categories')
        .insert({
          name: '테스트 카테고리',
          description: '데이터베이스 연결 테스트용',
          slug: 'test-category'
        })
        .select('id, name, slug')
        .single();

      createTestResult = { success: true, data: createdCategory, error: null };
      console.log('✅ Category creation test successful:', createdCategory);

      // 생성된 테스트 카테고리 삭제
      await supabase
        .from('categories')
        .delete()
        .eq('slug', 'test-category');

    } catch (createTestError) {
      createTestResult = { success: false, data: null, error: createTestError };
      console.log('❌ Category creation test failed:', createTestError);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      tests: {
        users: {
          count: users?.length || 0,
          error: usersError?.message || null,
          success: !usersError
        },
        categories: {
          count: categories?.length || 0,
          error: categoriesError?.message || null,
          success: !categoriesError
        },
        prompts: {
          count: prompts?.length || 0,
          error: promptsError?.message || null,
          success: !promptsError
        },
        createTest: createTestResult
      }
    });

  } catch (error) {
    console.error('❌ Error in database test:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}

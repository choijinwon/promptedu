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

// GET /api/shared-prompts - 공유 프롬프트 목록 조회 (무료만)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    console.log('🔍 Fetching shared prompts with params:', { page, limit, category, search, sortBy, sortOrder });

    // 기본 쿼리 - 공유 프롬프트만 (무료, 승인된 것)
    let query = supabase
      .from('prompts')
      .select(`
        id,
        title,
        description,
        content,
        price,
        type,
        is_public,
        status,
        views,
        downloads,
        rating,
        rating_count,
        created_at
      `)
      .eq('type', 'SHARED')  // 공유 프롬프트만
      .eq('price', 0)        // 무료만
      .eq('status', 'APPROVED')  // 승인된 것만
      .eq('is_public', true);    // 공개된 것만

    // 카테고리 필터 (임시 비활성화)
    // if (category && category !== 'all') {
    //   query = query.eq('categories.slug', category);
    // }

    // 검색 필터
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // 정렬
    let orderColumn = 'created_at';
    switch (sortBy) {
      case 'downloads':
        orderColumn = 'downloads';
        break;
      case 'rating':
        orderColumn = 'rating';
        break;
      case 'views':
        orderColumn = 'views';
        break;
      case 'createdAt':
        orderColumn = 'created_at';
        break;
      default:
        orderColumn = 'created_at';
    }

    query = query.order(orderColumn, { ascending: sortOrder === 'asc' });

    // 페이지네이션
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: prompts, error, count } = await query;

    if (error) {
      console.error('❌ Error fetching shared prompts:', error);
      console.log('⚠️ Using fallback data due to database error');
      
      // 에러 발생 시 fallback 데이터 반환
      const fallbackPrompts = [
        {
          id: 'fallback_1',
          title: '무료 프롬프트 1',
          description: '무료로 사용할 수 있는 프롬프트입니다.',
          content: '무료 프롬프트 내용입니다.',
          price: 0,
          type: 'SHARED',
          is_public: true,
          status: 'PENDING',
          views: 300,
          downloads: 150,
          rating: 4.5,
          rating_count: 25,
          created_at: new Date().toISOString(),
          categories: {
            id: '1',
            name: '일반',
            slug: 'general'
          },
          users: {
            id: '1',
            username: 'free_user_1',
            name: '무료 작성자 1'
          }
        },
        {
          id: 'fallback_2',
          title: '무료 프롬프트 2',
          description: '마케팅용 무료 프롬프트입니다.',
          content: '마케팅용 무료 프롬프트 내용입니다.',
          price: 0,
          type: 'SHARED',
          is_public: true,
          status: 'PENDING',
          views: 450,
          downloads: 200,
          rating: 4.8,
          rating_count: 30,
          created_at: new Date().toISOString(),
          categories: {
            id: '2',
            name: '마케팅',
            slug: 'marketing'
          },
          users: {
            id: '2',
            username: 'free_user_2',
            name: '무료 작성자 2'
          }
        },
        {
          id: 'fallback_3',
          title: '무료 프롬프트 3',
          description: '개발용 무료 프롬프트입니다.',
          content: '개발용 무료 프롬프트 내용입니다.',
          price: 0,
          type: 'SHARED',
          is_public: true,
          status: 'PENDING',
          views: 180,
          downloads: 80,
          rating: 4.2,
          rating_count: 15,
          created_at: new Date().toISOString(),
          categories: {
            id: '3',
            name: '개발',
            slug: 'development'
          },
          users: {
            id: '3',
            username: 'free_user_3',
            name: '무료 작성자 3'
          }
        }
      ];

      return NextResponse.json({
        prompts: fallbackPrompts,
        pagination: {
          page,
          limit,
          total: fallbackPrompts.length,
          totalPages: Math.ceil(fallbackPrompts.length / limit),
        },
        isFallback: true
      });
    }

    // 데이터베이스에서 조회 실패 시 하드코딩된 데이터 반환
    if (!prompts || prompts.length === 0) {
      console.log('⚠️ No shared prompts found in database, using fallback data');
      
      const fallbackPrompts = [
        {
          id: 'fallback_1',
          title: '무료 프롬프트 1',
          description: '무료로 사용할 수 있는 프롬프트입니다.',
          content: '무료 프롬프트 내용입니다.',
          price: 0,
          type: 'SHARED',
          is_public: true,
          status: 'PENDING',
          views: 300,
          downloads: 150,
          rating: 4.5,
          rating_count: 25,
          created_at: new Date().toISOString(),
          categories: {
            id: '1',
            name: '일반',
            slug: 'general'
          },
          users: {
            id: '1',
            username: 'free_user_1',
            name: '무료 작성자 1'
          }
        },
        {
          id: 'fallback_2',
          title: '무료 프롬프트 2',
          description: '마케팅용 무료 프롬프트입니다.',
          content: '마케팅용 무료 프롬프트 내용입니다.',
          price: 0,
          type: 'SHARED',
          is_public: true,
          status: 'PENDING',
          views: 450,
          downloads: 200,
          rating: 4.8,
          rating_count: 30,
          created_at: new Date().toISOString(),
          categories: {
            id: '2',
            name: '마케팅',
            slug: 'marketing'
          },
          users: {
            id: '2',
            username: 'free_user_2',
            name: '무료 작성자 2'
          }
        },
        {
          id: 'fallback_3',
          title: '무료 프롬프트 3',
          description: '개발용 무료 프롬프트입니다.',
          content: '개발용 무료 프롬프트 내용입니다.',
          price: 0,
          type: 'SHARED',
          is_public: true,
          status: 'PENDING',
          views: 180,
          downloads: 80,
          rating: 4.2,
          rating_count: 15,
          created_at: new Date().toISOString(),
          categories: {
            id: '3',
            name: '개발',
            slug: 'development'
          },
          users: {
            id: '3',
            username: 'free_user_3',
            name: '무료 작성자 3'
          }
        }
      ];

      return NextResponse.json({
        prompts: fallbackPrompts,
        pagination: {
          page,
          limit,
          total: fallbackPrompts.length,
          totalPages: Math.ceil(fallbackPrompts.length / limit),
        },
        isFallback: true
      });
    }

    console.log('✅ Shared prompts fetched successfully:', { count: prompts.length });

    return NextResponse.json({
      prompts: prompts,
      pagination: {
        page,
        limit,
        total: count || prompts.length,
        totalPages: Math.ceil((count || prompts.length) / limit),
      },
      isFallback: false
    });

  } catch (error) {
    console.error('❌ Error in shared prompts API:', error);
    return NextResponse.json(
      { error: '공유 프롬프트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

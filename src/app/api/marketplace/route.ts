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

// GET /api/marketplace - 마켓플레이스 프롬프트 목록 조회 (유료, 승인된 것만)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    console.log('🔍 Fetching marketplace prompts with params:', { page, limit, category, search, sortBy, sortOrder });

    // 기본 쿼리 - 마켓플레이스 프롬프트만 (유료, 승인된 것, 공개된 것)
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
      .eq('type', 'MARKETPLACE')  // 마켓플레이스 프롬프트만
      .gt('price', 0)             // 유료만
      .eq('status', 'APPROVED')   // 승인된 것만
      .eq('is_public', true)      // 공개된 것만
      .neq('status', 'DRAFT');    // 비공개(DRAFT) 제외

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
      case 'price':
        orderColumn = 'price';
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
      console.error('❌ Error fetching marketplace prompts:', error);
      return NextResponse.json(
        { error: '마켓플레이스 프롬프트 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    console.log('✅ Marketplace prompts fetched successfully:', { count: prompts?.length || 0 });

    return NextResponse.json({
      prompts: prompts || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    });

  } catch (error) {
    console.error('❌ Error in marketplace API:', error);
    return NextResponse.json(
      { error: '마켓플레이스 프롬프트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

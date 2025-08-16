import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: { persistSession: false },
    db: { schema: 'public' }
  }
);

// GET /api/user/prompts - 사용자의 프롬프트 목록 조회
export async function GET(request: NextRequest) {
  try {
    // 개발 환경에서는 인증 우회
    console.log('🔧 Development mode: bypassing authentication');
    
    // const token = request.headers.get('authorization')?.replace('Bearer ', '');
    // if (!token) {
    //   return NextResponse.json(
    //     { error: '인증이 필요합니다.' },
    //     { status: 401 }
    //   );
    // }

    // 사용자 ID (개발 환경에서는 하드코딩)
    const userId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'; // a@test.com 사용자 ID

    console.log('📋 Fetching prompts for user:', userId);

    const { data: prompts, error } = await supabase
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
        created_at
      `)
      .eq('author_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching user prompts:', error);
      return NextResponse.json(
        { error: '프롬프트 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    console.log('✅ User prompts fetched successfully:', { count: prompts?.length || 0 });

    return NextResponse.json({
      prompts: prompts || []
    });

  } catch (error) {
    console.error('❌ User prompts API error:', error);
    return NextResponse.json(
      { error: '프롬프트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

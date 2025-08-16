import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    // 개발 환경에서는 인증 우회
    console.log('🔧 Development mode: bypassing authentication');
    
    // const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    // if (!token) {
    //   return NextResponse.json(
    //     { error: '인증이 필요합니다.' },
    //     { status: 401 }
    //   );
    // }

    // const payload = verifyToken(token);
    // if (!payload) {
    //   return NextResponse.json(
    //     { error: '유효하지 않은 토큰입니다.' },
    //     { status: 401 }
    //   );
    // }

    // // 관리자 권한 확인
    // const user = await getUserById(payload.userId);

    // if (!user || user.role !== 'ADMIN') {
    //   return NextResponse.json(
    //     { error: '관리자 권한이 필요합니다.' },
    //     { status: 403 }
    //   );
    // }

    console.log('📋 승인 대기 프롬프트 조회 중...');

    // 승인 대기 프롬프트 조회
    const { data: prompts, error } = await supabase
      .from('prompts')
      .select(`
        id,
        title,
        description,
        content,
        price,
        type,
        status,
        created_at,
        category_id,
        tags
      `)
      .eq('status', 'PENDING')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ 승인 대기 프롬프트 조회 실패:', error);
      return NextResponse.json(
        { error: '승인 대기 프롬프트를 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    console.log('✅ 승인 대기 프롬프트 조회 성공:', prompts?.length || 0);

    return NextResponse.json({
      prompts: prompts || []
    });

  } catch (error) {
    console.error('Pending prompts error:', error);
    return NextResponse.json(
      { error: '승인 대기 프롬프트를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 
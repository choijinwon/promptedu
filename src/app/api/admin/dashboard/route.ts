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

    // if (payload.role !== 'ADMIN') {
    //   return NextResponse.json(
    //     { error: '관리자 권한이 필요합니다.' },
    //     { status: 403 }
    //   );
    // }

    // 실제 데이터베이스에서 통계를 가져오는 로직
    console.log('📊 실제 데이터베이스에서 통계 조회 중...');

    // 1. 총 사용자 수
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (usersError) {
      console.error('❌ 사용자 수 조회 실패:', usersError);
    }

    // 2. 총 프롬프트 수 (거부된 것 제외)
    const { count: totalPrompts, error: promptsError } = await supabase
      .from('prompts')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'REJECTED');

    if (promptsError) {
      console.error('❌ 프롬프트 수 조회 실패:', promptsError);
    }

    // 3. 승인 대기 프롬프트 수
    const { count: pendingPrompts, error: pendingError } = await supabase
      .from('prompts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'PENDING');

    if (pendingError) {
      console.error('❌ 대기 프롬프트 수 조회 실패:', pendingError);
    }

    // 4. 승인된 프롬프트 수
    const { count: approvedPrompts, error: approvedError } = await supabase
      .from('prompts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'APPROVED');

    if (approvedError) {
      console.error('❌ 승인된 프롬프트 수 조회 실패:', approvedError);
    }

    // 5. 거부된 프롬프트 수
    const { count: rejectedPrompts, error: rejectedError } = await supabase
      .from('prompts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'REJECTED');

    if (rejectedError) {
      console.error('❌ 거부된 프롬프트 수 조회 실패:', rejectedError);
    }

    // 6. 총 수익 (승인된 유료 프롬프트의 가격 합계)
    const { data: revenueData, error: revenueError } = await supabase
      .from('prompts')
      .select('price')
      .eq('status', 'APPROVED')
      .gt('price', 0);

    let totalRevenue = 0;
    if (!revenueError && revenueData) {
      totalRevenue = revenueData.reduce((sum, prompt) => sum + (prompt.price || 0), 0);
    } else {
      console.error('❌ 수익 조회 실패:', revenueError);
    }

    // 7. 최근 활동 (최근 생성된 프롬프트)
    const { data: recentPrompts, error: recentError } = await supabase
      .from('prompts')
      .select('id, title, created_at, status')
      .order('created_at', { ascending: false })
      .limit(5);

    let recentActivity: Array<{
      id: string;
      type: string;
      message: string;
      timestamp: string;
    }> = [];
    if (!recentError && recentPrompts) {
      recentActivity = recentPrompts.map(prompt => ({
        id: prompt.id,
        type: 'prompt_created',
        message: `새 프롬프트 "${prompt.title}"가 등록되었습니다. (${prompt.status})`,
        timestamp: prompt.created_at,
      }));
    } else {
      console.error('❌ 최근 활동 조회 실패:', recentError);
    }

    console.log('✅ 통계 조회 완료:', {
      totalUsers: totalUsers || 0,
      totalPrompts: totalPrompts || 0,
      pendingPrompts: pendingPrompts || 0,
      approvedPrompts: approvedPrompts || 0,
      rejectedPrompts: rejectedPrompts || 0,
      totalRevenue: totalRevenue || 0
    });

    return NextResponse.json({
      stats: {
        totalUsers: totalUsers || 0,
        totalPrompts: totalPrompts || 0,
        pendingPrompts: pendingPrompts || 0,
        approvedPrompts: approvedPrompts || 0,
        rejectedPrompts: rejectedPrompts || 0,
        totalRevenue: totalRevenue || 0,
        monthlyRevenue: Math.floor((totalRevenue || 0) * 0.3), // 임시로 30%로 설정
      },
      recentActivity: recentActivity
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: '대시보드 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

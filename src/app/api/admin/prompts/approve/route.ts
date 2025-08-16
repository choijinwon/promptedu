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

// POST /api/admin/prompts/approve - 프롬프트 승인
export async function POST(request: NextRequest) {
  try {
    // 개발 환경에서는 인증 우회
    console.log('🔧 Development mode: bypassing authentication');

    const { promptId, action } = await request.json();

    if (!promptId) {
      return NextResponse.json(
        { error: '프롬프트 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: '유효하지 않은 액션입니다. (approve 또는 reject)' },
        { status: 400 }
      );
    }

    console.log(`🔄 프롬프트 ${action} 처리 중:`, promptId);

    // 프롬프트 상태 업데이트
    const newStatus = action === 'approve' ? 'APPROVED' : 'REJECTED';
    
    const { data, error } = await supabase
      .from('prompts')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', promptId)
      .select('id, title, status')
      .single();

    if (error) {
      console.error('❌ 프롬프트 상태 업데이트 실패:', error);
      return NextResponse.json(
        { error: '프롬프트 상태 업데이트에 실패했습니다.' },
        { status: 500 }
      );
    }

    console.log('✅ 프롬프트 상태 업데이트 성공:', data);

    return NextResponse.json({
      success: true,
      message: `프롬프트가 ${action === 'approve' ? '승인' : '거부'}되었습니다.`,
      prompt: data
    });

  } catch (error) {
    console.error('❌ Error in approve/reject API:', error);
    return NextResponse.json(
      { error: '프롬프트 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
}

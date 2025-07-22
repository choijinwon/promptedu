import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabase 클라이언트 초기화 (환경 변수가 없으면 null)
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// POST /api/prompts/[id]/like - 좋아요 토글
export async function POST(request: NextRequest) {
  try {
    // Supabase가 설정되지 않은 경우 오류 반환
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase가 설정되지 않았습니다.' },
        { status: 503 }
      );
    }

    // id 추출: /api/prompts/[id]/like
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    // .../api/prompts/[id]/like
    const idIndex = segments.findIndex(seg => seg === 'prompts') + 1;
    const id = segments[idIndex];

    const body = await request.json();
    const { userId, action } = body; // action: 'like' | 'unlike'

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 현재 좋아요 상태 확인
    const { data: currentPrompt } = await supabase
      .from('shared_prompts')
      .select('likes')
      .eq('id', id)
      .single();

    if (!currentPrompt) {
      return NextResponse.json(
        { error: '프롬프트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 좋아요 수 업데이트
    const newLikes = action === 'like' 
      ? currentPrompt.likes + 1 
      : Math.max(0, currentPrompt.likes - 1);

    const { data, error } = await supabase
      .from('shared_prompts')
      .update({ likes: newLikes })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('좋아요 업데이트 오류:', error);
      return NextResponse.json(
        { error: '좋아요 업데이트 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      data,
      message: action === 'like' ? '좋아요가 추가되었습니다.' : '좋아요가 취소되었습니다.'
    });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 
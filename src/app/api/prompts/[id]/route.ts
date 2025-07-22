import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabase 클라이언트 초기화 (환경 변수가 없으면 null)
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// GET /api/prompts/[id] - 특정 프롬프트 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Supabase가 설정되지 않은 경우 오류 반환
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase가 설정되지 않았습니다.' },
        { status: 503 }
      );
    }

    const { id } = params;

    // 조회수 증가
    await supabase
      .from('shared_prompts')
      .update({ views: supabase.rpc('increment', { row_id: id, column_name: 'views' }) })
      .eq('id', id);

    const { data, error } = await supabase
      .from('shared_prompts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('프롬프트 조회 오류:', error);
      return NextResponse.json(
        { error: '프롬프트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT /api/prompts/[id] - 프롬프트 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Supabase가 설정되지 않은 경우 오류 반환
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase가 설정되지 않았습니다.' },
        { status: 503 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const {
      title,
      description,
      category,
      template,
      variables,
      isPublic
    } = body;

    // 필수 필드 검증
    if (!title || !template) {
      return NextResponse.json(
        { error: '제목과 템플릿은 필수입니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('shared_prompts')
      .update({
        title,
        description: description || '',
        category: category || '일반',
        template,
        variables: variables || [],
        is_public: isPublic || false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('프롬프트 수정 오류:', error);
      return NextResponse.json(
        { error: '프롬프트 수정 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/prompts/[id] - 프롬프트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Supabase가 설정되지 않은 경우 오류 반환
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase가 설정되지 않았습니다.' },
        { status: 503 }
      );
    }

    const { id } = params;

    const { error } = await supabase
      .from('shared_prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('프롬프트 삭제 오류:', error);
      return NextResponse.json(
        { error: '프롬프트 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: '프롬프트가 삭제되었습니다.' });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 
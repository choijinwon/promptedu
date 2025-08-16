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

// PATCH /api/prompts/[id] - 프롬프트 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const promptId = params.id;
    const body = await request.json();
    
    console.log('🔧 Development mode: bypassing authentication');
    console.log('📝 Updating prompt:', promptId, body);

    // 개발 환경에서는 인증 우회
    // const token = request.headers.get('authorization')?.replace('Bearer ', '');
    // if (!token) {
    //   return NextResponse.json(
    //     { error: '인증이 필요합니다.' },
    //     { status: 401 }
    //   );
    // }

    // 수정 가능한 필드들
    const updateData: any = {};
    
    if (body.title !== undefined) {
      updateData.title = body.title.trim();
    }
    
    if (body.description !== undefined) {
      updateData.description = body.description.trim();
    }
    
    if (body.content !== undefined) {
      updateData.content = body.content.trim();
    }
    
    if (body.is_public !== undefined) {
      updateData.is_public = body.is_public;
    }
    
    if (body.status !== undefined) {
      updateData.status = body.status;
    }

    // 수정할 데이터가 없으면 에러
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: '수정할 데이터가 없습니다.' },
        { status: 400 }
      );
    }

    // 프롬프트 수정
    const { data: prompt, error } = await supabase
      .from('prompts')
      .update(updateData)
      .eq('id', promptId)
      .select('id, title, description, is_public, status, updated_at')
      .single();

    if (error) {
      console.error('❌ Error updating prompt:', error);
      return NextResponse.json(
        { error: '프롬프트 수정에 실패했습니다.' },
        { status: 500 }
      );
    }

    console.log('✅ Prompt updated successfully:', prompt);

    return NextResponse.json({
      message: '프롬프트가 성공적으로 수정되었습니다.',
      prompt
    });

  } catch (error) {
    console.error('❌ Prompt update API error:', error);
    return NextResponse.json(
      { error: '프롬프트 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// GET /api/prompts/[id] - 개별 프롬프트 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const promptId = params.id;
    
    console.log('📋 Fetching prompt:', promptId);

    const { data: prompt, error } = await supabase
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
        created_at,
        updated_at
      `)
      .eq('id', promptId)
      .single();

    if (error) {
      console.error('❌ Error fetching prompt:', error);
      return NextResponse.json(
        { error: '프롬프트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    console.log('✅ Prompt fetched successfully:', prompt);

    return NextResponse.json({
      prompt
    });

  } catch (error) {
    console.error('❌ Prompt fetch API error:', error);
    return NextResponse.json(
      { error: '프롬프트 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
} 
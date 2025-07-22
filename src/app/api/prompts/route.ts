import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabase 클라이언트 초기화 (서비스 키가 없으면 anon key 사용)
const supabase = supabaseUrl && (supabaseServiceKey || supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey!)
  : null;

// GET /api/prompts - 프롬프트 목록 조회
export async function GET(request: NextRequest) {
  try {
    // Supabase가 설정되지 않은 경우 빈 결과 반환
    if (!supabase) {
      return NextResponse.json({
        data: [],
        count: 0,
        pagination: {
          limit: 50,
          offset: 0,
          hasMore: false
        }
      });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isPublic = searchParams.get('isPublic');
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('shared_prompts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // 필터 적용
    if (category) {
      query = query.eq('category', category);
    }
    if (isPublic !== null) {
      query = query.eq('is_public', isPublic === 'true');
    }
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('프롬프트 조회 오류:', error);
      return NextResponse.json(
        { error: '프롬프트 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      count,
      pagination: {
        limit,
        offset,
        hasMore: data && data.length === limit
      }
    });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/prompts - 새 프롬프트 생성
export async function POST(request: NextRequest) {
  try {
    // Supabase가 설정되지 않은 경우 오류 반환
    if (!supabase) {
      return NextResponse.json(
        { error: '⚠️ Supabase 환경 변수가 설정되지 않았습니다. 실제 Supabase 프로젝트를 설정해주세요.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      category,
      template,
      variables,
      isPublic,
      userId,
      authorName
    } = body;

    // 필수 필드 검증
    if (!title || !template || !userId) {
      return NextResponse.json(
        { error: '제목, 템플릿, 사용자 ID는 필수입니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('shared_prompts')
      .insert({
        title,
        description: description || '',
        category: category || '일반',
        template,
        variables: variables || [],
        is_public: isPublic || false,
        user_id: userId,
        author_name: authorName || '익명 사용자',
        likes: 0,
        views: 0
      })
      .select()
      .single();

    if (error) {
      console.error('프롬프트 생성 오류:', error);
      return NextResponse.json(
        { error: '프롬프트 생성 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 
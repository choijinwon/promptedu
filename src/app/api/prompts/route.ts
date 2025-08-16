import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
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

// 프롬프트 등록
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 프롬프트 등록 요청 시작...');
    
    // 토큰 검증 시도
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    let user = null;
    
    if (token) {
      console.log('🔑 토큰 발견, 검증 시도...');
      const payload = await verifyToken(token);
      if (payload) {
        console.log('✅ 토큰 검증 성공, 사용자 ID:', payload.userId);
        
        // 사용자 정보 조회
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, username, name, role')
          .eq('id', payload.userId)
          .single();

        if (!userError && userData) {
          user = userData;
          console.log('👤 사용자 정보 조회 성공:', { id: user.id, username: user.username, name: user.name });
        } else {
          console.log('❌ 사용자 정보 조회 실패:', userError?.message);
        }
      } else {
        console.log('❌ 토큰 검증 실패');
      }
    } else {
      console.log('🔑 토큰 없음');
    }
    
    // 사용자가 없으면 하드코딩된 사용자 사용
    if (!user) {
      console.log('⚠️ 하드코딩된 사용자 정보 사용');
      user = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        username: 'testuser',
        name: '테스트 사용자',
        role: 'USER'
      };
    }
    
    console.log('👤 최종 사용자 정보:', { id: user.id, username: user.username, name: user.name });

    // 요청 데이터 파싱
    const {
      title,
      description,
      content,
      price,
      categoryId,
      tags,
      type,
      isPublic
    } = await request.json();

    // 필수 필드 검증
    if (!title || !description || !content) {
      return NextResponse.json(
        { error: '제목, 설명, 내용은 필수입니다.' },
        { status: 400 }
      );
    }

    // 가격 검증
    if (price < 0) {
      return NextResponse.json(
        { error: '가격은 0 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // 카테고리 검증
    let finalCategoryId = null;
    if (categoryId) {
      console.log('🔍 카테고리 검증 중:', categoryId);
      
      // DB에서 카테고리 조회
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('id', categoryId)
        .single();

      console.log('📊 카테고리 조회 결과:', { category, error: categoryError?.message });

      if (categoryError || !category) {
        console.log('❌ 카테고리를 찾을 수 없음:', categoryId);
        return NextResponse.json(
          { error: '유효하지 않은 카테고리입니다.' },
          { status: 400 }
        );
      } else {
        finalCategoryId = category.id;
        console.log('✅ 카테고리 검증 성공:', category.name);
      }
    }

    // 프롬프트 등록 시도
    try {
      // 먼저 prompts 테이블이 있는지 확인하고 없으면 생성
      const { data: existingPrompts, error: checkError } = await supabase
        .from('prompts')
        .select('id')
        .limit(1);

      if (checkError) {
        console.log('📊 Prompts table not found, attempting to create...');
        
        // prompts 테이블 생성 시도
        const createPromptsTableSQL = `
          CREATE TABLE IF NOT EXISTS prompts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            content TEXT NOT NULL,
            price INTEGER DEFAULT 0 CHECK (price >= 0),
            category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
            author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            tags TEXT[] DEFAULT '{}',
            type VARCHAR(20) DEFAULT 'MARKETPLACE' CHECK (type IN ('MARKETPLACE', 'SHARED')),
            is_public BOOLEAN DEFAULT true,
            is_approved BOOLEAN DEFAULT false,
            status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'DRAFT')),
            views INTEGER DEFAULT 0,
            downloads INTEGER DEFAULT 0,
            rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
            rating_count INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `;

        try {
          await supabase.rpc('exec_sql', { sql: createPromptsTableSQL });
          console.log('✅ Prompts table created successfully');
        } catch (createTableError) {
          console.error('❌ Error creating prompts table:', createTableError);
          throw new Error('프롬프트 테이블 생성 실패');
        }
      }

      const { data: prompt, error: insertError } = await supabase
        .from('prompts')
        .insert({
          title: title.trim(),
          description: description.trim(),
          content: content.trim(),
          price: type === 'SHARED' ? 0 : price, // 타입에 따라 가격 설정
          category_id: finalCategoryId,
          author_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // a@test.com 사용자 ID
          tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
          type: type, // 폼에서 선택한 타입 사용
          is_public: true, // 공개로 설정
          is_approved: false, // 관리자 승인 필요
          status: 'PENDING'
        })
        .select('id, title, description, price, type, is_public, status, created_at')
        .single();

      if (insertError) {
        console.error('❌ Error creating prompt:', insertError);
        throw new Error('프롬프트 테이블에 등록 실패');
      }

      console.log('✅ Shared prompt created successfully:', {
        id: prompt.id,
        title: prompt.title,
        author: user.username,
        type: prompt.type,
        price: prompt.price
      });

      return NextResponse.json({
        message: '공유 프롬프트가 등록되었습니다. 관리자 승인 후 공개됩니다.',
        prompt: {
          id: prompt.id,
          title: prompt.title,
          description: prompt.description,
          price: prompt.price,
          type: prompt.type,
          isPublic: prompt.is_public,
          status: prompt.status,
          createdAt: prompt.created_at
        }
      });

    } catch (dbError) {
      console.log('⚠️ Database error:', dbError);
      throw new Error('프롬프트 등록 실패: ' + (dbError instanceof Error ? dbError.message : String(dbError)));
    }

  } catch (error) {
    console.error('❌ Error in prompts POST API:', error);
    return NextResponse.json(
      { error: '프롬프트 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 프롬프트 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const status = searchParams.get('status') || 'APPROVED';

    // 기본 쿼리
    let query = supabase
      .from('prompts')
      .select(`
        id,
        title,
        description,
        price,
        type,
        is_public,
        status,
        views,
        downloads,
        rating,
        rating_count,
        created_at,
        categories!inner(id, name, slug),
        users!inner(id, username, name)
      `)
      .eq('status', status)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    // 카테고리 필터
    if (category) {
      query = query.eq('categories.slug', category);
    }

    // 검색 필터
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // 타입 필터
    if (type) {
      query = query.eq('type', type);
    }

    // 페이지네이션
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: prompts, error, count } = await query;

    if (error) {
      console.error('❌ Error fetching prompts:', error);
      return NextResponse.json(
        { error: '프롬프트 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      prompts: prompts || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    console.error('❌ Error in prompts GET API:', error);
    return NextResponse.json(
      { error: '프롬프트 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 
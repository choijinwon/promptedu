import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabase 클라이언트 초기화 (환경 변수가 없으면 null)
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// GET /api/profile - 사용자 프로필 조회
export async function GET(request: NextRequest) {
  try {
    // Supabase가 설정되지 않은 경우 기본 프로필 반환
    if (!supabase) {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId');
      
      if (!userId) {
        return NextResponse.json(
          { error: '사용자 ID가 필요합니다.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        data: {
          user_id: userId,
          name: '익명 사용자',
          bio: '',
          avatar_url: '',
          website: '',
          location: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('프로필 조회 오류:', error);
      return NextResponse.json(
        { error: '프로필 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 프로필이 없으면 기본 프로필 반환
    if (!data) {
      return NextResponse.json({
        data: {
          user_id: userId,
          name: '익명 사용자',
          bio: '',
          avatar_url: '',
          website: '',
          location: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
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

// POST /api/profile - 프로필 생성 또는 업데이트
export async function POST(request: NextRequest) {
  try {
    // Supabase가 설정되지 않은 경우 오류 반환
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase가 설정되지 않았습니다.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      userId,
      name,
      bio,
      avatarUrl,
      website,
      location
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 기존 프로필 확인
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    let result;
    if (existingProfile) {
      // 프로필 업데이트
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: name || '익명 사용자',
          bio: bio || '',
          avatar_url: avatarUrl || '',
          website: website || '',
          location: location || '',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('프로필 업데이트 오류:', error);
        return NextResponse.json(
          { error: '프로필 업데이트 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      result = data;
    } else {
      // 새 프로필 생성
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          name: name || '익명 사용자',
          bio: bio || '',
          avatar_url: avatarUrl || '',
          website: website || '',
          location: location || ''
        })
        .select()
        .single();

      if (error) {
        console.error('프로필 생성 오류:', error);
        return NextResponse.json(
          { error: '프로필 생성 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      result = data;
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 
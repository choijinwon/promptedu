import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST: 로그인/로그아웃 기록
export async function POST(req: NextRequest) {
  try {
    const { user_id, type } = await req.json();
    if (!user_id || !type) {
      return NextResponse.json({ error: 'user_id와 type이 필요합니다.' }, { status: 400 });
    }
    if (type === 'login') {
      // 로그인: 새 row 생성
      const { error } = await supabase.from('admin_users_log').insert({ user_id, login_time: new Date().toISOString() });
      if (error) throw error;
      return NextResponse.json({ success: true });
    } else if (type === 'logout') {
      // 로그아웃: 해당 user의 마지막 row에 logout_time 업데이트
      const { data, error } = await supabase
        .from('admin_users_log')
        .select('id')
        .eq('user_id', user_id)
        .is('logout_time', null)
        .order('login_time', { ascending: false })
        .limit(1)
        .single();
      if (error || !data) {
        return NextResponse.json({ error: '로그아웃 기록을 찾을 수 없습니다.' }, { status: 404 });
      }
      const { error: updateError } = await supabase
        .from('admin_users_log')
        .update({ logout_time: new Date().toISOString() })
        .eq('id', data.id);
      if (updateError) throw updateError;
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'type은 login 또는 logout이어야 합니다.' }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// GET: 최근 접속/로그아웃 시간 조회
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
    if (!user_id) {
      return NextResponse.json({ error: 'user_id가 필요합니다.' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('admin_users_log')
      .select('login_time, logout_time')
      .eq('user_id', user_id)
      .order('login_time', { ascending: false })
      .limit(1)
      .single();
    if (error || !data) {
      return NextResponse.json({ error: '기록이 없습니다.' }, { status: 404 });
    }
    return NextResponse.json({ login_time: data.login_time, logout_time: data.logout_time });
  } catch (e) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
} 
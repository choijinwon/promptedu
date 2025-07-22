import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: NextRequest) {
  try {
    const { id, pw } = await req.json();
    if (!id || !pw) {
      return NextResponse.json({ error: '아이디와 비밀번호를 입력해주세요.' }, { status: 400 });
    }
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase가 설정되지 않았습니다.' }, { status: 503 });
    }
    // admin_users 테이블에서 id 또는 email로 조회
    let { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !user) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }
    // 실제 서비스에서는 password_hash를 bcrypt 등으로 비교해야 함
    // 여기서는 예시로 평문 비교 (실제 운영에서는 반드시 해시 사용!)
    if (user.password !== pw) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }
    // 성공: 최소 정보 반환
    return NextResponse.json({ success: true, name: user.name, id: user.id });
  } catch (e) {
    // 에러 메시지와 스택을 함께 반환 (운영 환경에서는 노출 주의)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.', message: e instanceof Error ? e.message : String(e), stack: e instanceof Error ? e.stack : undefined }, { status: 500 });
  }
} 
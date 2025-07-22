import { NextRequest, NextResponse } from 'next/server';

// 임시 관리자 계정 (실제 서비스에서는 DB에서 조회)
const ADMIN_USERS = [
  { id: 'admin', pw: 'admin1234', name: '관리자' },
  { id: 'superuser', pw: 'superpw', name: '최고관리자' }
];

export async function POST(req: NextRequest) {
  try {
    const { id, pw } = await req.json();
    if (!id || !pw) {
      return NextResponse.json({ error: '아이디와 비밀번호를 입력해주세요.' }, { status: 400 });
    }
    const user = ADMIN_USERS.find(u => u.id === id && u.pw === pw);
    if (!user) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }
    // 성공: 최소 정보 반환
    return NextResponse.json({ success: true, name: user.name, id: user.id });
  } catch (e) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
} 
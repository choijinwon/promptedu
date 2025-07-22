import { NextRequest, NextResponse } from 'next/server';

interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  currentWork: string;
  goals: string;
  preferredTime: string;
  notes?: string;
}

// 임시 저장소 (실제로는 데이터베이스 사용)
let consultations: (ConsultationRequest & { id: string; status: string; createdAt: string })[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: ConsultationRequest = await request.json();
    
    // 필수 필드 검증
    const requiredFields = ['name', 'email', 'phone', 'company', 'position', 'currentWork', 'goals', 'preferredTime'];
    for (const field of requiredFields) {
      if (!body[field as keyof ConsultationRequest]) {
        return NextResponse.json(
          { error: `${field} 필드는 필수입니다.` },
          { status: 400 }
        );
      }
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 새 상담 신청 생성
    const newConsultation = {
      ...body,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    consultations.push(newConsultation);

    return NextResponse.json(
      { 
        message: '상담 신청이 성공적으로 접수되었습니다.',
        consultation: newConsultation
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('상담 신청 처리 중 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ consultations });
  } catch (error) {
    console.error('상담 신청 목록 조회 중 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '파일이 선택되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 파일 타입 검증
    if (!file.name.endsWith('.txt')) {
      return NextResponse.json(
        { error: '.txt 파일만 업로드 가능합니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 검증 (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '파일 크기는 5MB를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 파일 내용 읽기
    const content = await file.text();

    // 내용 길이 검증
    if (content.length > 10000) {
      return NextResponse.json(
        { error: '파일 내용이 너무 깁니다. (최대 10,000자)' },
        { status: 400 }
      );
    }

    console.log('✅ File uploaded successfully:', {
      fileName: file.name,
      fileSize: file.size,
      contentLength: content.length
    });

    return NextResponse.json({
      fileName: file.name,
      fileSize: file.size,
      content: content,
      message: '파일이 성공적으로 업로드되었습니다.'
    });

  } catch (error) {
    console.error('❌ Error in upload API:', error);
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

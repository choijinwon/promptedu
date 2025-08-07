import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '파일이 필요합니다.' },
        { status: 400 }
      );
    }

    // 파일 타입 검증
    const allowedTypes = ['text/plain', 'application/txt', '.txt'];
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    
    if (!allowedTypes.includes(fileType) && !fileName.endsWith('.txt')) {
      return NextResponse.json(
        { error: '텍스트 파일(.txt)만 업로드 가능합니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '파일 크기는 5MB 이하여야 합니다.' },
        { status: 400 }
      );
    }

    // 파일 내용 읽기
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const textContent = buffer.toString('utf-8');

    // 텍스트 내용 검증
    if (!textContent.trim()) {
      return NextResponse.json(
        { error: '파일이 비어있습니다.' },
        { status: 400 }
      );
    }

    // 텍스트 길이 제한 (100KB)
    if (textContent.length > 100000) {
      return NextResponse.json(
        { error: '파일 내용이 너무 깁니다. (최대 100KB)' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: '파일이 성공적으로 업로드되었습니다.',
      content: textContent,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: '파일 업로드에 실패했습니다.' },
      { status: 500 }
    );
  }
}

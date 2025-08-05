import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: {
            prompts: {
              where: {
                status: 'ACTIVE',
              }
            }
          }
        }
      }
    });

    const transformedCategories = categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      promptCount: category._count.prompts,
    }));

    return NextResponse.json({
      categories: transformedCategories,
    });

  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: '카테고리 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 
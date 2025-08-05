import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // 프롬프트 목록 가져오기
    const prompts = await prisma.prompt.findMany({
      where: {
        status: "ACTIVE",
      },
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // 카테고리 목록 가져오기
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    });

    const baseUrl = "https://prompt-hub.com";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 메인 페이지 -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- 공유 프롬프트 페이지 -->
  <url>
    <loc>${baseUrl}/shared-prompts</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 마켓플레이스 페이지 -->
  <url>
    <loc>${baseUrl}/marketplace</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 프롬프트 작성 페이지 -->
  <url>
    <loc>${baseUrl}/write</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 크리에이터 등록 페이지 -->
  <url>
    <loc>${baseUrl}/creator/apply</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- 로그인 페이지 -->
  <url>
    <loc>${baseUrl}/login</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- 회원가입 페이지 -->
  <url>
    <loc>${baseUrl}/register</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- 개별 프롬프트 페이지들 -->
  ${prompts
    .map(
      (prompt) => `
  <url>
    <loc>${baseUrl}/shared-prompts/${prompt.id}</loc>
    <lastmod>${prompt.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}

  <!-- 카테고리별 프롬프트 페이지들 -->
  ${categories
    .map(
      (category) => `
  <url>
    <loc>${baseUrl}/shared-prompts?category=${category.id}</loc>
    <lastmod>${category.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("사이트맵 생성 에러:", error);
    return NextResponse.json(
      { error: "사이트맵을 생성하는데 실패했습니다" },
      { status: 500 }
    );
  }
} 
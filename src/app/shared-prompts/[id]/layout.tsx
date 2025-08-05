import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        author: {
          select: { name: true, username: true },
        },
      },
    });

    if (!prompt) {
      return {
        title: "프롬프트를 찾을 수 없습니다 | Prompt Hub",
        description: "요청하신 프롬프트를 찾을 수 없습니다.",
      };
    }

    const title = `${prompt.title} | Prompt Hub`;
    const description = prompt.description || `${prompt.title} - 고품질 AI 프롬프트입니다.`;
    const authorName = prompt.author.name || prompt.author.username || "익명";

    return {
      title,
      description,
      keywords: [
        prompt.title,
        "AI 프롬프트",
        prompt.category.name,
        "ChatGPT 프롬프트",
        "Claude 프롬프트",
        "GPT-4 프롬프트",
        authorName,
      ],
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://prompt-hub.com/shared-prompts/${params.id}`,
        images: [
          {
            url: prompt.image || "/og-prompt.png",
            width: 1200,
            height: 630,
            alt: prompt.title,
          },
        ],
        authors: [authorName],
        publishedTime: prompt.createdAt.toISOString(),
        modifiedTime: prompt.updatedAt.toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [prompt.image || "/og-prompt.png"],
      },
      alternates: {
        canonical: `/shared-prompts/${params.id}`,
      },
      other: {
        "article:author": authorName,
        "article:section": prompt.category.name,
        "article:tag": prompt.tags ? JSON.parse(prompt.tags).join(", ") : "",
      },
    };
  } catch (error) {
    console.error("메타데이터 생성 에러:", error);
    return {
      title: "프롬프트 상세보기 | Prompt Hub",
      description: "AI 프롬프트 상세 정보를 확인하세요.",
    };
  }
}

export default function PromptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
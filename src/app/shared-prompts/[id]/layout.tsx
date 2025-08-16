import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    
    // 임시 메타데이터 (실제 프롬프트 테이블 연동 전까지)
    const title = `샘플 프롬프트 | Prompt Hub`;
    const description = "샘플 프롬프트 - 고품질 AI 프롬프트입니다.";
    const authorName = "샘플 작성자";

    return {
      title,
      description,
      keywords: [
        "샘플 프롬프트",
        "AI 프롬프트",
        "일반",
        "ChatGPT 프롬프트",
        "Claude 프롬프트",
        "GPT-4 프롬프트",
        authorName,
      ],
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://prompt-hub.com/shared-prompts/${id}`,
        images: [
          {
            url: "/og-prompt.png",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        authors: [authorName],
        publishedTime: new Date().toISOString(),
        modifiedTime: new Date().toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-prompt.png"],
      },
      alternates: {
        canonical: `/shared-prompts/${id}`,
      },
      other: {
        "article:author": authorName,
        "article:section": "일반",
        "article:tag": "샘플, 테스트",
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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공유 프롬프트 | Prompt Hub",
  description: "다양한 분야의 고품질 AI 프롬프트를 확인하고 다운로드하세요. ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 프롬프트를 무료로 공유합니다.",
  keywords: [
    "공유 프롬프트",
    "무료 프롬프트",
    "AI 프롬프트",
    "ChatGPT 프롬프트",
    "Claude 프롬프트",
    "GPT-4 프롬프트",
    "프롬프트 다운로드",
    "AI 챗봇",
    "프롬프트 엔지니어링",
    "AI 자동화"
  ],
  openGraph: {
    title: "공유 프롬프트 | Prompt Hub",
    description: "다양한 분야의 고품질 AI 프롬프트를 확인하고 다운로드하세요.",
    url: "https://prompt-hub.com/shared-prompts",
    siteName: "Prompt Hub",
    images: [
      {
        url: "/og-shared-prompts.png",
        width: 1200,
        height: 630,
        alt: "Prompt Hub 공유 프롬프트",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "공유 프롬프트 | Prompt Hub",
    description: "다양한 분야의 고품질 AI 프롬프트를 확인하고 다운로드하세요.",
    images: ["/og-shared-prompts.png"],
  },
  alternates: {
    canonical: "/shared-prompts",
  },
};

export default function SharedPromptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
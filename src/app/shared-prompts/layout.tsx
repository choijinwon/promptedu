import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 프롬프트 공유",
  description: "AI 프롬프트 제작자들이 무료로 공유하는 고품질 프롬프트를 확인하세요. ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 프롬프트를 무료로 다운로드할 수 있습니다.",
  keywords: [
    "무료 프롬프트",
    "AI 프롬프트 공유",
    "ChatGPT 무료 프롬프트",
    "Claude 무료 프롬프트",
    "GPT-4 무료 프롬프트",
    "프롬프트 템플릿",
    "AI 도구",
    "무료 AI 프롬프트"
  ],
  openGraph: {
    title: "무료 프롬프트 공유 | PromptEdu",
    description: "AI 프롬프트 제작자들이 무료로 공유하는 고품질 프롬프트를 확인하세요.",
    url: "https://promptedu.io/shared-prompts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "무료 프롬프트 공유 | PromptEdu",
    description: "AI 프롬프트 제작자들이 무료로 공유하는 고품질 프롬프트를 확인하세요.",
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
  return <>{children}</>;
} 
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI 프롬프트 - ChatGPT, Claude, GPT-4 프롬프트 모음 | PromptEdu',
  description: 'AI 프롬프트 전문 마켓플레이스에서 ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 만나보세요. 프롬프트 엔지니어링, AI 자동화, 챗봇 개발에 필요한 모든 프롬프트를 제공합니다.',
  keywords: [
    'AI 프롬프트',
    '인공지능 프롬프트',
    'ChatGPT 프롬프트',
    'Claude 프롬프트',
    'GPT-4 프롬프트',
    '프롬프트 엔지니어링',
    'AI 자동화',
    'AI 챗봇',
    '프롬프트 마켓플레이스'
  ],
  openGraph: {
    title: 'AI 프롬프트 - ChatGPT, Claude, GPT-4 프롬프트 모음',
    description: 'AI 프롬프트 전문 마켓플레이스에서 다양한 AI 모델용 고품질 프롬프트를 만나보세요.',
    url: 'https://promptedu.io/ai-prompt',
  },
};

export default function AIPromptPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI 프롬프트 전문 마켓플레이스
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-12 leading-relaxed">
          ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 고품질 프롬프트를 만나보세요.<br />
          프롬프트 엔지니어링, AI 자동화, 챗봇 개발에 필요한 모든 프롬프트를 제공합니다.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">ChatGPT 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              OpenAI의 ChatGPT를 위한 최적화된 프롬프트 모음
            </p>
            <Link 
              href="/marketplace?category=chatgpt"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ChatGPT 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Claude 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              Anthropic의 Claude를 위한 전문 프롬프트 모음
            </p>
            <Link 
              href="/marketplace?category=claude"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Claude 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-600">GPT-4 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              GPT-4의 고급 기능을 활용한 프리미엄 프롬프트
            </p>
            <Link 
              href="/marketplace?category=gpt4"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              GPT-4 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">프롬프트 엔지니어링</h2>
            <p className="text-gray-600 mb-4">
              효과적인 프롬프트 작성 기법과 템플릿
            </p>
            <Link 
              href="/marketplace?category=engineering"
              className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              엔지니어링 가이드 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-red-600">AI 자동화</h2>
            <p className="text-gray-600 mb-4">
              업무 자동화를 위한 AI 프롬프트 모음
            </p>
            <Link 
              href="/marketplace?category=automation"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              자동화 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">무료 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              무료로 공유되는 고품질 프롬프트 모음
            </p>
            <Link 
              href="/shared-prompts"
              className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              무료 프롬프트 보기
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/marketplace"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            전체 AI 프롬프트 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}

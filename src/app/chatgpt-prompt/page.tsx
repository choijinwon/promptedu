import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ChatGPT 프롬프트 - OpenAI ChatGPT 최적화 프롬프트 모음 | PromptEdu',
  description: 'OpenAI ChatGPT를 위한 최적화된 프롬프트 모음입니다. 대화형 AI, 텍스트 생성, 코딩, 번역, 창작 등 다양한 분야의 ChatGPT 프롬프트를 제공합니다.',
  keywords: [
    'ChatGPT 프롬프트',
    'OpenAI 프롬프트',
    'ChatGPT 사용법',
    'ChatGPT 팁',
    'AI 대화',
    '텍스트 생성',
    'AI 코딩',
    'AI 번역',
    'AI 창작',
    'ChatGPT 최적화'
  ],
  openGraph: {
    title: 'ChatGPT 프롬프트 - OpenAI ChatGPT 최적화 프롬프트 모음',
    description: 'OpenAI ChatGPT를 위한 최적화된 프롬프트 모음입니다.',
    url: 'https://promptedu.io/chatgpt-prompt',
  },
};

export default function ChatGPTPromptPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          ChatGPT 프롬프트 전문 모음
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-12 leading-relaxed">
          OpenAI ChatGPT를 위한 최적화된 프롬프트 모음입니다.<br />
          대화형 AI, 텍스트 생성, 코딩, 번역, 창작 등 다양한 분야의 프롬프트를 제공합니다.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">대화형 AI</h2>
            <p className="text-gray-600 mb-4">
              자연스러운 대화를 위한 ChatGPT 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 고객 서비스 대화</li>
              <li>• 교육용 대화</li>
              <li>• 상담 및 조언</li>
            </ul>
            <Link 
              href="/marketplace?category=chatgpt&type=conversation"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              대화형 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-600">텍스트 생성</h2>
            <p className="text-gray-600 mb-4">
              다양한 텍스트 생성용 ChatGPT 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 블로그 글 작성</li>
              <li>• 마케팅 카피</li>
              <li>• 이메일 작성</li>
            </ul>
            <Link 
              href="/marketplace?category=chatgpt&type=writing"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              텍스트 생성 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">AI 코딩</h2>
            <p className="text-gray-600 mb-4">
              프로그래밍 및 개발을 위한 ChatGPT 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 코드 작성 및 리뷰</li>
              <li>• 디버깅 도움</li>
              <li>• 알고리즘 설명</li>
            </ul>
            <Link 
              href="/marketplace?category=chatgpt&type=coding"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              코딩 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">AI 번역</h2>
            <p className="text-gray-600 mb-4">
              다국어 번역을 위한 ChatGPT 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 정확한 번역</li>
              <li>• 문화적 맥락 고려</li>
              <li>• 전문 용어 번역</li>
            </ul>
            <Link 
              href="/marketplace?category=chatgpt&type=translation"
              className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              번역 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-red-600">AI 창작</h2>
            <p className="text-gray-600 mb-4">
              창의적 콘텐츠 제작을 위한 ChatGPT 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 스토리텔링</li>
              <li>• 시나리오 작성</li>
              <li>• 창의적 아이디어</li>
            </ul>
            <Link 
              href="/marketplace?category=chatgpt&type=creative"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              창작 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">비즈니스 활용</h2>
            <p className="text-gray-600 mb-4">
              비즈니스 업무를 위한 ChatGPT 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 업무 자동화</li>
              <li>• 데이터 분석</li>
              <li>• 전략 수립</li>
            </ul>
            <Link 
              href="/marketplace?category=chatgpt&type=business"
              className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              비즈니스 프롬프트 보기
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-800">ChatGPT 프롬프트 사용 팁</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">효과적인 프롬프트 작성법</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 구체적이고 명확한 지시사항 제공</li>
                <li>• 원하는 출력 형식 명시</li>
                <li>• 컨텍스트와 배경 정보 포함</li>
                <li>• 단계별 지시사항 활용</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">ChatGPT 최적화 기법</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 적절한 온도 설정 활용</li>
                <li>• 시스템 메시지 활용</li>
                <li>• 대화 맥락 유지</li>
                <li>• 반복적인 개선 과정</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/marketplace?category=chatgpt"
            className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            전체 ChatGPT 프롬프트 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '한국어 프롬프트 - 한글 AI 프롬프트 | 국내 프롬프트 마켓 | PromptEdu',
  description: '한국어 프롬프트 전문 마켓플레이스입니다. 한글 AI 프롬프트, 국내 프롬프트 마켓에서 한국어에 최적화된 ChatGPT, Claude, GPT-4 프롬프트를 만나보세요. 한국어 자연어처리에 특화된 고품질 프롬프트를 제공합니다.',
  keywords: [
    '한국어 프롬프트',
    '한글 AI 프롬프트',
    '국내 프롬프트 마켓',
    '한국어 ChatGPT 프롬프트',
    '한글 Claude 프롬프트',
    '한국어 GPT-4 프롬프트',
    '한국어 자연어처리',
    '한글 프롬프트 엔지니어링',
    '국내 AI 프롬프트',
    '한국어 AI 활용'
  ],
  openGraph: {
    title: '한국어 프롬프트 - 한글 AI 프롬프트 | 국내 프롬프트 마켓',
    description: '한국어 프롬프트 전문 마켓플레이스입니다.',
    url: 'https://promptedu.io/korean-prompt',
  },
};

export default function KoreanPromptPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          한국어 프롬프트 전문 마켓플레이스
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-12 leading-relaxed">
          한글 AI 프롬프트, 국내 프롬프트 마켓에서 한국어에 최적화된 프롬프트를 만나보세요.<br />
          한국어 자연어처리에 특화된 고품질 프롬프트를 제공합니다.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">한국어 ChatGPT 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              한국어에 최적화된 ChatGPT 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 한국어 대화형 프롬프트</li>
              <li>• 한글 텍스트 생성</li>
              <li>• 한국어 번역 및 교정</li>
              <li>• 한국 문화 맞춤형</li>
            </ul>
            <Link 
              href="/marketplace?category=chatgpt&language=korean"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              한국어 ChatGPT 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">한글 Claude 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              한국어에 특화된 Claude 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 한국어 분석 및 요약</li>
              <li>• 한글 문서 작성</li>
              <li>• 한국어 학습 도구</li>
              <li>• 한국 문화 이해</li>
            </ul>
            <Link 
              href="/marketplace?category=claude&language=korean"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              한글 Claude 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-600">한국어 GPT-4 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              고급 한국어 GPT-4 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 복잡한 한국어 작업</li>
              <li>• 전문 분야 한국어</li>
              <li>• 창의적 한글 콘텐츠</li>
              <li>• 한국어 AI 개발</li>
            </ul>
            <Link 
              href="/marketplace?category=gpt4&language=korean"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              한국어 GPT-4 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">한국어 자연어처리</h2>
            <p className="text-gray-600 mb-4">
              한국어 NLP에 특화된 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 한국어 형태소 분석</li>
              <li>• 한글 감정 분석</li>
              <li>• 한국어 텍스트 분류</li>
              <li>• 한글 키워드 추출</li>
            </ul>
            <Link 
              href="/marketplace?category=nlp&language=korean"
              className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              한국어 NLP 프롬프트 보기
            </Link>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-red-800">한국어 프롬프트의 특징</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-red-700">언어적 특성</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 한국어 문법 구조 이해</li>
                <li>• 존댓말/반말 구분</li>
                <li>• 한국어 어미 변화</li>
                <li>• 한글 맞춤법 검토</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-700">문화적 특성</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 한국 문화 맥락 이해</li>
                <li>• 한국식 표현 방식</li>
                <li>• 한국 사회 관습 반영</li>
                <li>• 한국어 관용구 활용</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-800">국내 프롬프트 마켓의 장점</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">한국어 최적화</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 한국어 특성 반영</li>
                <li>• 한글 자연어처리</li>
                <li>• 한국 문화 이해</li>
                <li>• 현지화된 서비스</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">국내 전문가</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 한국어 전문가 제작</li>
                <li>• 국내 시장 이해</li>
                <li>• 한국 사용자 피드백</li>
                <li>• 지속적인 개선</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">편리한 서비스</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 한국어 고객 지원</li>
                <li>• 국내 결제 시스템</li>
                <li>• 한국 시간대 서비스</li>
                <li>• 현지 법규 준수</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/marketplace?language=korean"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            한국어 프롬프트 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '프롬프트 판매 - AI 프롬프트 판매 플랫폼 | 프롬프트 제작자 플랫폼 | PromptEdu',
  description: 'AI 프롬프트 판매 플랫폼에서 프롬프트를 판매하세요. 프롬프트 제작자 플랫폼으로 수익을 창출할 수 있습니다. ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 프롬프트를 판매하고 수익을 얻어보세요.',
  keywords: [
    '프롬프트 판매',
    'AI 프롬프트 판매',
    '프롬프트 제작자 플랫폼',
    '프롬프트 판매 사이트',
    'AI 프롬프트 수익',
    '프롬프트 크리에이터',
    '프롬프트 판매 방법',
    'AI 프롬프트 마켓',
    '프롬프트 판매 가이드',
    '프롬프트 수익 창출'
  ],
  openGraph: {
    title: '프롬프트 판매 - AI 프롬프트 판매 플랫폼 | 프롬프트 제작자 플랫폼',
    description: 'AI 프롬프트 판매 플랫폼에서 프롬프트를 판매하세요.',
    url: 'https://promptedu.io/prompt-sale',
  },
};

export default function PromptSalePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI 프롬프트 판매 플랫폼
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-12 leading-relaxed">
          프롬프트 제작자 플랫폼에서 AI 프롬프트를 판매하고 수익을 창출하세요.<br />
          ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 프롬프트를 판매할 수 있습니다.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">프롬프트 판매 시작</h2>
            <p className="text-gray-600 mb-4">
              AI 프롬프트 판매 방법과 수익 창출 가이드
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 간편한 프롬프트 등록</li>
              <li>• 자유로운 가격 설정</li>
              <li>• 실시간 판매 현황</li>
              <li>• 안전한 수익 정산</li>
            </ul>
            <Link 
              href="/write"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              프롬프트 판매 시작하기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-600">프롬프트 제작자</h2>
            <p className="text-gray-600 mb-4">
              프롬프트 크리에이터가 되는 방법
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 프롬프트 엔지니어링 기법</li>
              <li>• 고품질 프롬프트 제작</li>
              <li>• 시장 수요 분석</li>
              <li>• 브랜드 구축</li>
            </ul>
            <Link 
              href="/creator/apply"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              크리에이터 신청하기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">수익 창출</h2>
            <p className="text-gray-600 mb-4">
              AI 프롬프트로 수익을 창출하는 방법
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 다양한 수익 모델</li>
              <li>• 판매 전략 수립</li>
              <li>• 마케팅 방법</li>
              <li>• 고객 관리</li>
            </ul>
            <Link 
              href="/dashboard"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              수익 현황 확인하기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">판매 가이드</h2>
            <p className="text-gray-600 mb-4">
              성공적인 프롬프트 판매를 위한 가이드
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 프롬프트 품질 관리</li>
              <li>• 가격 전략</li>
              <li>• 고객 서비스</li>
              <li>• 지속적인 개선</li>
            </ul>
            <Link 
              href="/help"
              className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              판매 가이드 보기
            </Link>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-green-800">프롬프트 판매자 혜택</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-700">수익 창출</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 자유로운 가격 설정</li>
                <li>• 높은 수익률</li>
                <li>• 안전한 정산</li>
                <li>• 실시간 수익 확인</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-700">플랫폼 지원</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 마케팅 지원</li>
                <li>• 기술적 도움</li>
                <li>• 커뮤니티 활동</li>
                <li>• 전문가 멘토링</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-700">성장 기회</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 브랜드 구축</li>
                <li>• 네트워킹</li>
                <li>• 새로운 기회</li>
                <li>• 지속적 성장</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/write"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            지금 프롬프트 판매 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}

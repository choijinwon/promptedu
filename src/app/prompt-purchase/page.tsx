import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '프롬프트 구매 - AI 프롬프트 구매 사이트 | 고품질 프롬프트 마켓플레이스 | PromptEdu',
  description: 'AI 프롬프트 구매 사이트에서 고품질 프롬프트를 구매하세요. ChatGPT, Claude, GPT-4 등 다양한 AI 모델용 프롬프트를 안전하고 편리하게 구매할 수 있습니다. 프롬프트 엔지니어링 전문가들이 제작한 프리미엄 프롬프트를 만나보세요.',
  keywords: [
    '프롬프트 구매',
    'AI 프롬프트 구매 사이트',
    '고품질 프롬프트 마켓플레이스',
    '프롬프트 구매 플랫폼',
    'AI 프롬프트 판매',
    '프롬프트 마켓',
    '프롬프트 구매처',
    'AI 프롬프트 상점',
    '프롬프트 구매 방법',
    '프롬프트 구매 가이드'
  ],
  openGraph: {
    title: '프롬프트 구매 - AI 프롬프트 구매 사이트 | 고품질 프롬프트 마켓플레이스',
    description: 'AI 프롬프트 구매 사이트에서 고품질 프롬프트를 구매하세요.',
    url: 'https://promptedu.io/prompt-purchase',
  },
};

export default function PromptPurchasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI 프롬프트 구매 사이트
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-12 leading-relaxed">
          고품질 프롬프트 마켓플레이스에서 AI 프롬프트를 안전하고 편리하게 구매하세요.<br />
          프롬프트 엔지니어링 전문가들이 제작한 프리미엄 프롬프트를 만나보세요.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">프롬프트 구매 가이드</h2>
            <p className="text-gray-600 mb-4">
              AI 프롬프트 구매 방법과 주의사항
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 구매 전 프롬프트 미리보기</li>
              <li>• 안전한 결제 시스템</li>
              <li>• 구매 후 즉시 다운로드</li>
              <li>• 환불 정책 및 보장</li>
            </ul>
            <Link 
              href="/marketplace"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              프롬프트 구매하기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-600">고품질 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              엄선된 고품질 프롬프트 모음
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 전문가 검증 완료</li>
              <li>• 실제 사용 테스트</li>
              <li>• 지속적인 업데이트</li>
              <li>• 사용자 리뷰 기반</li>
            </ul>
            <Link 
              href="/marketplace?quality=premium"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              고품질 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">프롬프트 엔지니어링</h2>
            <p className="text-gray-600 mb-4">
              전문가가 제작한 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 프롬프트 엔지니어링 전문가</li>
              <li>• 최적화된 프롬프트 설계</li>
              <li>• 다양한 AI 모델 호환</li>
              <li>• 상세한 사용 가이드</li>
            </ul>
            <Link 
              href="/marketplace?category=engineering"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              엔지니어링 프롬프트 보기
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">무료 프롬프트</h2>
            <p className="text-gray-600 mb-4">
              무료로 다운로드 가능한 프롬프트
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• 무료 프롬프트 다운로드</li>
              <li>• 커뮤니티 공유 프롬프트</li>
              <li>• 품질 보장 무료 버전</li>
              <li>• 정기 업데이트</li>
            </ul>
            <Link 
              href="/shared-prompts"
              className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              무료 프롬프트 다운로드
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-800">프롬프트 구매 FAQ</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">구매 관련</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 구매 후 언제 다운로드 가능한가요?</li>
                <li>• 환불 정책은 어떻게 되나요?</li>
                <li>• 프롬프트 사용 권한은 어떻게 되나요?</li>
                <li>• 구매 내역은 어디서 확인하나요?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">품질 보장</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 프롬프트 품질은 어떻게 보장되나요?</li>
                <li>• 업데이트는 언제 제공되나요?</li>
                <li>• 문제가 있는 프롬프트는 어떻게 하나요?</li>
                <li>• 사용법 가이드는 제공되나요?</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/marketplace"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            지금 프롬프트 구매하기
          </Link>
        </div>
      </div>
    </div>
  );
}

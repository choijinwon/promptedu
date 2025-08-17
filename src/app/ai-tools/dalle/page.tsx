import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DALL-E - OpenAI의 이미지 생성 AI | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'DALL-E는 OpenAI가 개발한 텍스트 기반 이미지 생성 AI로, 상상력이 풍부하고 창의적인 이미지를 생성합니다. DALL-E의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'DALL-E',
    'OpenAI',
    '이미지 생성 AI',
    '텍스트 기반 이미지',
    'DALL-E 3',
    'DALL-E 2',
    'AI 아트',
    'DALL-E 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'DALL-E - OpenAI의 이미지 생성 AI | 특징과 사용법',
    description: 'DALL-E는 OpenAI가 개발한 텍스트 기반 이미지 생성 AI로, 상상력이 풍부하고 창의적인 이미지를 생성합니다.',
    url: 'https://promptedu.io/ai-tools/dalle',
  },
};

export default function DALLEPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* 뒤로 가기 버튼 */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/ai-tools"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">AI 툴 목록으로</span>
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
            <span className="text-3xl">🎭</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            DALL-E
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            OpenAI의 창의적 이미지 생성 AI
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              유료
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              텍스트 기반
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              창의적 이미지
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎨 창의적 상상력</h3>
              <p className="text-gray-600">
                상상력이 풍부하고 독창적인 이미지를 생성하며, 존재하지 않는 개념이나 아이디어도 시각화할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">📝 텍스트 이해</h3>
              <p className="text-gray-600">
                자연어를 깊이 이해하여 복잡한 설명과 세부사항을 정확하게 이미지로 변환합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎭 스타일 다양성</h3>
              <p className="text-gray-600">
                다양한 예술 스타일, 장르, 미디어를 지원하여 사용자의 요구에 맞는 다양한 이미지를 생성합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🔧 편집 기능</h3>
              <p className="text-gray-600">
                생성된 이미지를 편집하고 변형할 수 있는 기능을 제공하여 더욱 정교한 결과물을 만들 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">🎨 창작 활동</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 일러스트레이션 및 아트워크</li>
                <li>• 캐릭터 디자인 및 컨셉 아트</li>
                <li>• 책 표지 및 포스터 디자인</li>
                <li>• 게임 및 애니메이션 자산</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">📱 콘텐츠 제작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 소셜미디어 그래픽</li>
                <li>• 블로그 및 웹사이트 이미지</li>
                <li>• 마케팅 자료 및 광고</li>
                <li>• 프레젠테이션 시각자료</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">💡 아이디어 시각화</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 제품 컨셉 시각화</li>
                <li>• 건축 및 인테리어 디자인</li>
                <li>• 패션 및 의류 디자인</li>
                <li>• 브랜드 아이덴티티 개발</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 버전 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 버전 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">DALL-E 2</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 기본적인 이미지 생성</li>
                <li>• 텍스트 프롬프트 이해</li>
                <li>• 다양한 스타일 지원</li>
                <li>• 기본 편집 기능</li>
                <li>• 1024x1024 해상도</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-600">DALL-E 3</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 향상된 이미지 품질</li>
                <li>• 더 정확한 프롬프트 이해</li>
                <li>• 개선된 텍스트 렌더링</li>
                <li>• 고급 편집 기능</li>
                <li>• 더 나은 조명 및 색상</li>
                <li>• ChatGPT 통합</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 이미지 크기 옵션 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📐 이미지 크기 옵션</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🟦 정사각형</h3>
              <p className="text-gray-600 mb-3">1024x1024</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 프로필 이미지</li>
                <li>• 썸네일</li>
                <li>• 아이콘</li>
                <li>• 로고</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🟩 가로형</h3>
              <p className="text-gray-600 mb-3">1792x1024</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 배너 이미지</li>
                <li>• 헤더 그래픽</li>
                <li>• 포스터</li>
                <li>• 랜딩 페이지</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🟪 세로형</h3>
              <p className="text-gray-600 mb-3">1024x1792</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 모바일 배경</li>
                <li>• 스토리 이미지</li>
                <li>• 카드 디자인</li>
                <li>• 인포그래픽</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 프롬프트 팁 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 효과적인 프롬프트 작성 팁</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">1. 구체적인 설명</h3>
                <p className="text-gray-600">
                  &ldquo;강아지&rdquo;보다는 &ldquo;골든 리트리버 강아지가 공원에서 공을 가지고 놀고 있는 모습, 햇살이 비치는 따뜻한 오후&rdquo;와 같이 구체적으로 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">2. 스타일 및 미디어 지정</h3>
                <p className="text-gray-600">
                  &ldquo;oil painting&rdquo;, &ldquo;digital art&rdquo;, &ldquo;watercolor&rdquo;, &ldquo;photograph&rdquo;와 같이 원하는 스타일을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 조명 및 분위기</h3>
                <p className="text-gray-600">
                  &ldquo;dramatic lighting&rdquo;, &ldquo;soft natural light&rdquo;, &ldquo;sunset glow&rdquo;, &ldquo;moody atmosphere&rdquo;와 같이 조명과 분위기를 추가하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">4. 구도 및 각도</h3>
                <p className="text-gray-600">
                  &ldquo;close-up shot&rdquo;, &ldquo;wide angle view&rdquo;, &ldquo;bird&apos;s eye view&rdquo;, &ldquo;portrait orientation&rdquo;와 같이 구도를 지정하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            DALL-E 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            DALL-E를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=dalle"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              DALL-E 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
            >
              다른 AI 툴 보기
            </Link>
          </div>
        </section>

        {/* 관련 링크 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔗 관련 링크</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/ai-tools/midjourney"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-purple-600 mb-2">Midjourney</h3>
              <p className="text-gray-600 text-sm">예술적 이미지 생성에 특화된 AI</p>
            </Link>
            <Link
              href="/ai-tools/stable-diffusion"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">Stable Diffusion</h3>
              <p className="text-gray-600 text-sm">무료 오픈소스 이미지 생성 AI</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

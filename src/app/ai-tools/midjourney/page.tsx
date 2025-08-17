import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Midjourney - 예술적 이미지 생성 AI | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'Midjourney는 예술적이고 독창적인 이미지 생성에 특화된 AI로, 고품질의 아름다운 이미지를 생성합니다. Midjourney의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Midjourney',
    '이미지 생성 AI',
    'AI 아트',
    '예술적 이미지',
    '디지털 아트',
    'Midjourney V6',
    'Midjourney 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Midjourney - 예술적 이미지 생성 AI | 특징과 사용법',
    description: 'Midjourney는 예술적이고 독창적인 이미지 생성에 특화된 AI로, 고품질의 아름다운 이미지를 생성합니다.',
    url: 'https://promptedu.io/ai-tools/midjourney',
  },
};

export default function MidjourneyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <span className="text-3xl">🎨</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Midjourney
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            예술적 이미지 생성의 혁신
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              유료
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              이미지 생성
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              예술적 품질
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎨 예술적 품질</h3>
              <p className="text-gray-600">
                고품질의 예술적 이미지를 생성하며, 미술사와 다양한 예술 스타일을 깊이 이해하여 아름다운 작품을 만들어냅니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🎭 스타일 다양성</h3>
              <p className="text-gray-600">
                고전 미술부터 현대 아트, 판타지, 사이버펑크 등 다양한 예술 스타일과 장르를 지원합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🔧 세밀한 제어</h3>
              <p className="text-gray-600">
                --ar, --v, --q, --s 등 다양한 파라미터를 통해 이미지의 비율, 버전, 품질, 스타일을 세밀하게 제어할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🖼️ 고해상도</h3>
              <p className="text-gray-600">
                최대 4K 해상도까지 지원하여 인쇄나 상업적 용도로도 사용할 수 있는 고품질 이미지를 생성합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🎨 예술 창작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 디지털 아트 및 일러스트레이션</li>
                <li>• 개념 아트 및 캐릭터 디자인</li>
                <li>• 판타지 및 SF 아트</li>
                <li>• 추상적 예술 작품</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">📱 콘텐츠 제작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 소셜미디어 이미지</li>
                <li>• 블로그 및 웹사이트 그래픽</li>
                <li>• 마케팅 자료 및 광고</li>
                <li>• 프레젠테이션 이미지</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">💼 상업적 활용</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 제품 시각화</li>
                <li>• 브랜드 아이덴티티</li>
                <li>• 패키지 디자인</li>
                <li>• 인테리어 시뮬레이션</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 버전 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 버전 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">Midjourney V5</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 안정적인 이미지 생성</li>
                <li>• 다양한 스타일 지원</li>
                <li>• 기본적인 파라미터 제어</li>
                <li>• 고품질 결과물</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Midjourney V6</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 향상된 이미지 품질</li>
                <li>• 더 정확한 프롬프트 이해</li>
                <li>• 개선된 텍스트 렌더링</li>
                <li>• 새로운 스타일 옵션</li>
                <li>• 더 나은 조명 및 색상</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 주요 파라미터 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ 주요 파라미터</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📐 --ar (Aspect Ratio)</h3>
              <p className="text-gray-600 mb-3">이미지 비율 설정</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• --ar 1:1 (정사각형)</li>
                <li>• --ar 16:9 (가로형)</li>
                <li>• --ar 9:16 (세로형)</li>
                <li>• --ar 3:2 (포토그래피)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">⭐ --q (Quality)</h3>
              <p className="text-gray-600 mb-3">이미지 품질 설정</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• --q 0.25 (빠름, 낮은 품질)</li>
                <li>• --q 0.5 (기본)</li>
                <li>• --q 1 (높은 품질)</li>
                <li>• --q 2 (최고 품질)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎭 --s (Stylize)</h3>
              <p className="text-gray-600 mb-3">예술적 스타일 강도</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• --s 0 (사실적)</li>
                <li>• --s 50 (기본)</li>
                <li>• --s 100 (예술적)</li>
                <li>• --s 1000 (매우 예술적)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔄 --v (Version)</h3>
              <p className="text-gray-600 mb-3">Midjourney 버전 선택</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• --v 5 (V5 사용)</li>
                <li>• --v 6 (V6 사용)</li>
                <li>• --v 5.2 (V5.2 사용)</li>
                <li>• --v 6 (기본값)</li>
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
                <h3 className="text-lg font-semibold mb-2 text-purple-600">1. 구체적인 설명</h3>
                <p className="text-gray-600">
                  &ldquo;아름다운 풍경&rdquo;보다는 &ldquo;황금빛 일몰이 비치는 산맥, 화려한 구름, 고요한 호수&rdquo;와 같이 구체적으로 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-pink-600">2. 스타일 지정</h3>
                <p className="text-gray-600">
                  &ldquo;oil painting&rdquo;, &ldquo;digital art&rdquo;, &ldquo;photorealistic&rdquo;와 같이 원하는 스타일을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">3. 조명 및 분위기</h3>
                <p className="text-gray-600">
                  &ldquo;dramatic lighting&rdquo;, &ldquo;soft glow&rdquo;, &ldquo;mysterious atmosphere&rdquo;와 같이 조명과 분위기를 추가하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">4. 아티스트 참조</h3>
                <p className="text-gray-600">
                  &ldquo;in the style of Van Gogh&rdquo;, &ldquo;inspired by Studio Ghibli&rdquo;와 같이 특정 아티스트나 스튜디오를 참조하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Midjourney 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Midjourney를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=midjourney"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Midjourney 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-200 font-semibold text-lg"
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
              href="/ai-tools/dalle"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">DALL-E</h3>
              <p className="text-gray-600 text-sm">OpenAI의 텍스트 기반 이미지 생성 AI</p>
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

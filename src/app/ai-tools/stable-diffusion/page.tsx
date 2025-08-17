import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stable Diffusion - 무료 오픈소스 이미지 생성 AI | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'Stable Diffusion은 무료 오픈소스 이미지 생성 AI로, 로컬에서 실행 가능하고 커스터마이징이 자유로운 이미지를 생성합니다. Stable Diffusion의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Stable Diffusion',
    '오픈소스 AI',
    '무료 이미지 생성',
    '로컬 AI',
    '커스터마이징',
    'Stable Diffusion XL',
    'Stable Diffusion 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Stable Diffusion - 무료 오픈소스 이미지 생성 AI | 특징과 사용법',
    description: 'Stable Diffusion은 무료 오픈소스 이미지 생성 AI로, 로컬에서 실행 가능하고 커스터마이징이 자유로운 이미지를 생성합니다.',
    url: 'https://promptedu.io/ai-tools/stable-diffusion',
  },
};

export default function StableDiffusionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
            <span className="text-3xl">🔓</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Stable Diffusion
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            무료 오픈소스 이미지 생성 AI
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              오픈소스
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              로컬 실행
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔓 완전 무료</h3>
              <p className="text-gray-600">
                오픈소스로 공개되어 있어 완전히 무료로 사용할 수 있으며, 상업적 용도로도 제한 없이 활용 가능합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">💻 로컬 실행</h3>
              <p className="text-gray-600">
                인터넷 연결 없이 로컬 컴퓨터에서 실행할 수 있어 개인정보 보호와 빠른 처리 속도를 보장합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">⚙️ 완전 커스터마이징</h3>
              <p className="text-gray-600">
                모델, 파라미터, 스타일을 자유롭게 수정하고 커스터마이징할 수 있어 무한한 가능성을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🔧 다양한 인터페이스</h3>
              <p className="text-gray-600">
                Automatic1111, ComfyUI, InvokeAI 등 다양한 웹 인터페이스를 통해 사용자 친화적으로 활용할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">🎨 개인 창작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 개인 아트워크 및 일러스트레이션</li>
                <li>• 게임 및 애니메이션 자산</li>
                <li>• 소셜미디어 콘텐츠</li>
                <li>• 개인 프로젝트 시각자료</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">💼 상업적 활용</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 마케팅 자료 및 광고</li>
                <li>• 제품 시각화</li>
                <li>• 웹사이트 및 앱 그래픽</li>
                <li>• 브랜드 아이덴티티</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🔬 연구 및 개발</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• AI 모델 연구</li>
                <li>• 커스텀 모델 개발</li>
                <li>• 새로운 기술 실험</li>
                <li>• 학술 연구 지원</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 버전 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 버전 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">Stable Diffusion 1.5</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 안정적인 기본 모델</li>
                <li>• 빠른 생성 속도</li>
                <li>• 다양한 스타일 지원</li>
                <li>• 낮은 하드웨어 요구사항</li>
                <li>• 풍부한 커뮤니티 모델</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Stable Diffusion XL</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 향상된 이미지 품질</li>
                <li>• 더 정확한 프롬프트 이해</li>
                <li>• 개선된 텍스트 렌더링</li>
                <li>• 더 나은 조명 및 색상</li>
                <li>• 고해상도 지원</li>
                <li>• 높은 하드웨어 요구사항</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 주요 인터페이스 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🖥️ 주요 웹 인터페이스</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔧 Automatic1111</h3>
              <p className="text-gray-600 mb-3">가장 인기 있는 웹 UI</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 풍부한 기능</li>
                <li>• 다양한 확장</li>
                <li>• 안정적인 성능</li>
                <li>• 활발한 커뮤니티</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎨 ComfyUI</h3>
              <p className="text-gray-600 mb-3">노드 기반 시각적 인터페이스</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 시각적 워크플로우</li>
                <li>• 고급 커스터마이징</li>
                <li>• 복잡한 파이프라인</li>
                <li>• 실험적 기능</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🚀 InvokeAI</h3>
              <p className="text-gray-600 mb-3">사용자 친화적 인터페이스</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 직관적인 UI</li>
                <li>• 쉬운 설치</li>
                <li>• 안정적인 성능</li>
                <li>• 초보자 친화적</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 주요 파라미터 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ 주요 파라미터</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎲 CFG Scale</h3>
              <p className="text-gray-600 mb-3">프롬프트 준수 강도 (1-20)</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 1-3: 자유로운 생성</li>
                <li>• 7-9: 균형잡힌 결과</li>
                <li>• 10-15: 프롬프트 중시</li>
                <li>• 16-20: 매우 엄격</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🔄 Steps</h3>
              <p className="text-gray-600 mb-3">생성 단계 수 (10-150)</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 10-20: 빠른 생성</li>
                <li>• 30-50: 기본 품질</li>
                <li>• 50-100: 고품질</li>
                <li>• 100+: 최고 품질</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎭 Sampler</h3>
              <p className="text-gray-600 mb-3">샘플링 방법</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Euler: 빠르고 안정적</li>
                <li>• DPM++: 고품질</li>
                <li>• DDIM: 빠른 생성</li>
                <li>• UniPC: 최신 방법</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">📐 Size</h3>
              <p className="text-gray-600 mb-3">이미지 크기</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 512x512: 기본 크기</li>
                <li>• 768x768: 고해상도</li>
                <li>• 1024x1024: 최고 품질</li>
                <li>• 커스텀 비율 가능</li>
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
                <h3 className="text-lg font-semibold mb-2 text-green-600">1. 가중치 활용</h3>
                <p className="text-gray-600">
                  &ldquo;beautiful landscape (1.2)&rdquo;, &ldquo;detailed face (0.8)&rdquo;와 같이 괄호를 사용해 가중치를 조절하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">2. 네거티브 프롬프트</h3>
                <p className="text-gray-600">
                  &ldquo;blurry, low quality, distorted&rdquo;와 같이 원하지 않는 요소를 명시하여 품질을 향상시키세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 스타일 키워드</h3>
                <p className="text-gray-600">
                  &ldquo;masterpiece, best quality, highly detailed&rdquo;와 같은 품질 향상 키워드를 활용하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">4. 아티스트 참조</h3>
                <p className="text-gray-600">
                  &ldquo;by Greg Rutkowski&rdquo;, &ldquo;in the style of Van Gogh&rdquo;와 같이 특정 아티스트를 참조하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Stable Diffusion 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stable Diffusion을 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=stable-diffusion"
              className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Stable Diffusion 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-green-600 transition-all duration-200 font-semibold text-lg"
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
              href="/ai-tools/dalle"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">DALL-E</h3>
              <p className="text-gray-600 text-sm">OpenAI의 텍스트 기반 이미지 생성 AI</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

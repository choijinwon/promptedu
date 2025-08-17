import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Runway - AI 영상 생성 및 편집 플랫폼 | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'Runway는 AI 기반 영상 생성 및 편집 플랫폼으로, 텍스트/이미지 입력을 기반으로 고품질 영상을 생성하고 다양한 특수 효과를 지원합니다. Runway의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Runway',
    'AI 영상 생성',
    '비디오 AI',
    '영상 편집',
    '특수 효과',
    'Runway Gen-3',
    'Runway 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Runway - AI 영상 생성 및 편집 플랫폼 | 특징과 사용법',
    description: 'Runway는 AI 기반 영상 생성 및 편집 플랫폼으로, 텍스트/이미지 입력을 기반으로 고품질 영상을 생성하고 다양한 특수 효과를 지원합니다.',
    url: 'https://promptedu.io/ai-tools/runway',
  },
};

export default function RunwayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
            <span className="text-3xl">🎬</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Runway
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 기반 영상 생성 및 편집 플랫폼
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              유료
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              영상 생성
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              편집 도구
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎬 고품질 영상 생성</h3>
              <p className="text-gray-600">
                텍스트나 이미지 입력을 기반으로 고품질의 영상을 생성하며, 다양한 스타일과 장르를 지원합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">✂️ 강력한 편집 도구</h3>
              <p className="text-gray-600">
                AI 기반 편집 기능으로 배경 제거, 객체 추적, 자동 자막 생성 등 고급 편집 기능을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎭 특수 효과</h3>
              <p className="text-gray-600">
                다양한 AI 특수 효과와 필터를 제공하여 전문적인 영상 제작이 가능합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🌐 웹 기반 플랫폼</h3>
              <p className="text-gray-600">
                브라우저에서 바로 사용할 수 있는 웹 기반 플랫폼으로, 별도 설치 없이 접근 가능합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🎬 콘텐츠 제작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 소셜미디어 영상 콘텐츠</li>
                <li>• 마케팅 및 광고 영상</li>
                <li>• 교육 및 튜토리얼 영상</li>
                <li>• 프레젠테이션 영상</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">🎭 영상 편집</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 배경 제거 및 교체</li>
                <li>• 객체 추적 및 모션 그래픽</li>
                <li>• 자동 자막 생성</li>
                <li>• 색상 보정 및 필터</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">🎨 창작 활동</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 아트 영상 제작</li>
                <li>• 애니메이션 및 모션 그래픽</li>
                <li>• 실험적 영상 아트</li>
                <li>• 스토리보드 시각화</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 버전 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 버전 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">Runway Gen-2</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 기본적인 영상 생성</li>
                <li>• 텍스트 기반 프롬프트</li>
                <li>• 기본 편집 기능</li>
                <li>• 웹 기반 인터페이스</li>
                <li>• 다양한 스타일 지원</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Runway Gen-3</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 향상된 영상 품질</li>
                <li>• 더 정확한 프롬프트 이해</li>
                <li>• 고급 편집 도구</li>
                <li>• 개선된 특수 효과</li>
                <li>• 더 나은 모션 제어</li>
                <li>• 확장된 해상도 지원</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 주요 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🛠️ 주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎬 영상 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 텍스트 기반 영상 생성</li>
                <li>• 이미지 기반 영상 생성</li>
                <li>• 다양한 스타일 지원</li>
                <li>• 해상도 옵션</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">✂️ 편집 도구</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 배경 제거</li>
                <li>• 객체 추적</li>
                <li>• 자동 자막</li>
                <li>• 색상 보정</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎭 특수 효과</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• AI 필터</li>
                <li>• 모션 그래픽</li>
                <li>• 전환 효과</li>
                <li>• 시각적 효과</li>
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
                <h3 className="text-lg font-semibold mb-2 text-purple-600">1. 구체적인 장면 설명</h3>
                <p className="text-gray-600">
                  &ldquo;아름다운 풍경&rdquo;보다는 &ldquo;황금빛 일몰이 비치는 산맥, 카메라가 천천히 이동하며 화려한 구름과 고요한 호수를 보여주는 영상&rdquo;와 같이 구체적으로 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">2. 카메라 움직임 지정</h3>
                <p className="text-gray-600">
                  &ldquo;slow pan&rdquo;, &ldquo;zoom in&rdquo;, &ldquo;dolly shot&rdquo;, &ldquo;tracking shot&rdquo;와 같이 카메라 움직임을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">3. 스타일 및 분위기</h3>
                <p className="text-gray-600">
                  &ldquo;cinematic&rdquo;, &ldquo;documentary style&rdquo;, &ldquo;vintage&rdquo;, &ldquo;modern&rdquo;와 같이 원하는 스타일을 지정하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">4. 조명 및 색상</h3>
                <p className="text-gray-600">
                  &ldquo;dramatic lighting&rdquo;, &ldquo;warm tones&rdquo;, &ldquo;high contrast&rdquo;, &ldquo;soft lighting&rdquo;와 같이 조명과 색상을 추가하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Runway 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Runway를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=runway"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Runway 프롬프트 보기
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
              href="/ai-tools/suno"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">Suno</h3>
              <p className="text-gray-600 text-sm">AI 음악 생성 플랫폼</p>
            </Link>
            <Link
              href="/ai-tools/elevenlabs"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">ElevenLabs</h3>
              <p className="text-gray-600 text-sm">고품질 음성 합성 AI</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

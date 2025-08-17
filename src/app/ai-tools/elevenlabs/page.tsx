import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ElevenLabs - 고품질 AI 음성 합성 | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'ElevenLabs는 고품질 AI 음성 합성 플랫폼으로, 자연스럽고 감정이 풍부한 음성을 생성합니다. ElevenLabs의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'ElevenLabs',
    'AI 음성 합성',
    '음성 AI',
    'TTS',
    '음성 생성',
    'ElevenLabs AI',
    'ElevenLabs 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'ElevenLabs - 고품질 AI 음성 합성 | 특징과 사용법',
    description: 'ElevenLabs는 고품질 AI 음성 합성 플랫폼으로, 자연스럽고 감정이 풍부한 음성을 생성합니다.',
    url: 'https://promptedu.io/ai-tools/elevenlabs',
  },
};

export default function ElevenLabsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <span className="text-3xl">🎤</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ElevenLabs
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            고품질 AI 음성 합성 플랫폼
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              유료
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              음성 합성
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              TTS
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎤 자연스러운 음성</h3>
              <p className="text-gray-600">
                인간과 구분하기 어려운 자연스러운 음성을 생성하며, 감정과 톤을 정확하게 표현합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🌍 다국어 지원</h3>
              <p className="text-gray-600">
                다양한 언어와 방언을 지원하여 전 세계 사용자들이 자국어로 음성을 생성할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎭 감정 표현</h3>
              <p className="text-gray-600">
                기쁨, 슬픔, 분노, 차분함 등 다양한 감정을 음성에 자연스럽게 표현할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🔧 음성 클로닝</h3>
              <p className="text-gray-600">
                짧은 음성 샘플을 통해 특정인의 목소리를 복제하여 개인화된 음성을 생성할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">📱 콘텐츠 제작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 유튜브 영상 내레이션</li>
                <li>• 팟캐스트 및 오디오북</li>
                <li>• 교육 콘텐츠</li>
                <li>• 마케팅 영상</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🎮 게임 및 엔터테인먼트</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 게임 캐릭터 음성</li>
                <li>• 애니메이션 더빙</li>
                <li>• 가상 인플루언서</li>
                <li>• 인터랙티브 스토리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">💼 비즈니스 활용</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 고객 서비스 음성</li>
                <li>• 프레젠테이션 음성</li>
                <li>• 전화 자동 응답</li>
                <li>• 브랜드 음성</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 음성 모델 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎤 음성 모델</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">👨‍💼 남성 음성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 깊고 안정적인 톤</li>
                <li>• 전문적이고 신뢰감</li>
                <li>• 다양한 연령대</li>
                <li>• 다국어 지원</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">👩‍💼 여성 음성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 따뜻하고 친근한 톤</li>
                <li>• 명확하고 이해하기 쉬움</li>
                <li>• 다양한 스타일</li>
                <li>• 감정 표현 우수</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">👶 어린이 음성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 밝고 활기찬 톤</li>
                <li>• 교육 콘텐츠에 적합</li>
                <li>• 친근하고 재미있음</li>
                <li>• 애니메이션에 활용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 음성 설정 옵션 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ 음성 설정 옵션</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎚️ 안정성 (Stability)</h3>
              <p className="text-gray-600 mb-3">음성의 일관성과 안정성</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 0-1: 매우 안정적</li>
                <li>• 0.5: 균형잡힌</li>
                <li>• 0.8: 다양성 중시</li>
                <li>• 1: 최대 다양성</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎭 유사성 (Similarity)</h3>
              <p className="text-gray-600 mb-3">원본 음성과의 유사도</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 0-1: 매우 유사</li>
                <li>• 0.5: 중간 유사도</li>
                <li>• 0.8: 낮은 유사도</li>
                <li>• 1: 최소 유사도</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎵 스타일 (Style)</h3>
              <p className="text-gray-600 mb-3">음성의 스타일 강도</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 0: 자연스러운</li>
                <li>• 0.5: 중간 스타일</li>
                <li>• 0.8: 강한 스타일</li>
                <li>• 1: 극적인 스타일</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🎤 음성 클로닝</h3>
              <p className="text-gray-600 mb-3">개인 음성 복제</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 음성 샘플 업로드</li>
                <li>• 자동 음성 분석</li>
                <li>• 개인화된 모델</li>
                <li>• 고품질 복제</li>
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
                <h3 className="text-lg font-semibold mb-2 text-blue-600">1. 감정 및 톤 지정</h3>
                <p className="text-gray-600">
                  &ldquo;안녕하세요&rdquo;보다는 &ldquo;따뜻하고 친근한 톤으로 인사하는 느낌&rdquo;와 같이 감정과 톤을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">2. 연령 및 성별</h3>
                <p className="text-gray-600">
                  &ldquo;젊은 여성의 밝은 목소리&rdquo;, &ldquo;중년 남성의 신뢰감 있는 톤&rdquo;와 같이 구체적으로 지정하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">3. 상황 및 맥락</h3>
                <p className="text-gray-600">
                  &ldquo;강의하는 듯한 톤&rdquo;, &ldquo;친구와 대화하는 느낌&rdquo;, &ldquo;뉴스 앵커 스타일&rdquo;와 같이 상황을 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">4. 언어 및 방언</h3>
                <p className="text-gray-600">
                  &ldquo;미국 영어&rdquo;, &ldquo;영국 영어&rdquo;, &ldquo;호주 영어&rdquo;와 같이 구체적인 언어와 방언을 지정하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ElevenLabs 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            ElevenLabs를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=elevenlabs"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              ElevenLabs 프롬프트 보기
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
              href="/ai-tools/runway"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-purple-600 mb-2">Runway</h3>
              <p className="text-gray-600 text-sm">AI 영상 생성 및 편집 플랫폼</p>
            </Link>
            <Link
              href="/ai-tools/suno"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">Suno</h3>
              <p className="text-gray-600 text-sm">AI 음악 생성 플랫폼</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

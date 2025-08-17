import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Suno - AI 음악 생성 플랫폼 | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'Suno는 AI 기반 음악 생성 플랫폼으로, 텍스트 프롬프트를 통해 다양한 장르와 스타일의 음악을 생성합니다. Suno의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Suno',
    'AI 음악 생성',
    '음악 AI',
    'AI 작곡',
    '음악 제작',
    'Suno AI',
    'Suno 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Suno - AI 음악 생성 플랫폼 | 특징과 사용법',
    description: 'Suno는 AI 기반 음악 생성 플랫폼으로, 텍스트 프롬프트를 통해 다양한 장르와 스타일의 음악을 생성합니다.',
    url: 'https://promptedu.io/ai-tools/suno',
  },
};

export default function SunoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full mb-6">
            <span className="text-3xl">🎵</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
            Suno
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 기반 음악 생성 플랫폼
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료/유료
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              음악 생성
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              작곡 AI
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎵 고품질 음악 생성</h3>
              <p className="text-gray-600">
                텍스트 프롬프트를 통해 다양한 장르와 스타일의 고품질 음악을 생성하며, 전문적인 작곡 수준의 결과물을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-yellow-600">🎼 다양한 장르 지원</h3>
              <p className="text-gray-600">
                팝, 록, 재즈, 클래식, 일렉트로닉, 힙합 등 다양한 음악 장르를 지원하여 사용자의 요구에 맞는 음악을 생성합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎤 가사 및 멜로디</h3>
              <p className="text-gray-600">
                가사와 멜로디를 동시에 생성하여 완성도 높은 음악을 만들어내며, 다양한 언어의 가사도 지원합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🌐 웹 기반 플랫폼</h3>
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
              <h3 className="text-lg font-semibold mb-2 text-green-600">🎵 음악 창작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 개인 음악 작곡</li>
                <li>• 배경 음악 제작</li>
                <li>• 테마송 및 주제곡</li>
                <li>• 실험적 음악</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-yellow-600">📱 콘텐츠 제작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 유튜브 배경 음악</li>
                <li>• 팟캐스트 인트로</li>
                <li>• 소셜미디어 콘텐츠</li>
                <li>• 광고 및 마케팅</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🎮 게임 및 미디어</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 게임 배경 음악</li>
                <li>• 영상 및 애니메이션</li>
                <li>• 프레젠테이션 음악</li>
                <li>• 교육 콘텐츠</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 장르별 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎼 장르별 특징</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎸 팝/록</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 캐치한 멜로디</li>
                <li>• 강한 비트</li>
                <li>• 감정적 가사</li>
                <li>• 대중적 어필</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎹 재즈/클래식</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 복잡한 화성</li>
                <li>• 세련된 멜로디</li>
                <li>• 정교한 편곡</li>
                <li>• 예술적 표현</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎧 일렉트로닉</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 전자 사운드</li>
                <li>• 리듬 중심</li>
                <li>• 미래적 분위기</li>
                <li>• 댄스 가능</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 음악 생성 옵션 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎵 음악 생성 옵션</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">⏱️ 길이 설정</h3>
              <p className="text-gray-600 mb-3">음악 길이 설정</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 30초 (빠른 생성)</li>
                <li>• 1분 (기본)</li>
                <li>• 2분 (고품질)</li>
                <li>• 3분 (최고 품질)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-yellow-600">🎤 가사 옵션</h3>
              <p className="text-gray-600 mb-3">가사 생성 설정</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 가사 포함</li>
                <li>• 가사 없음 (기악)</li>
                <li>• 언어 선택</li>
                <li>• 주제 지정</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎼 스타일 지정</h3>
              <p className="text-gray-600 mb-3">음악 스타일 설정</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 장르 선택</li>
                <li>• 분위기 지정</li>
                <li>• 템포 설정</li>
                <li>• 악기 구성</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎧 출력 형식</h3>
              <p className="text-gray-600 mb-3">음악 파일 형식</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• MP3 (압축)</li>
                <li>• WAV (무손실)</li>
                <li>• 고품질 스트리밍</li>
                <li>• 다운로드 가능</li>
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
                <h3 className="text-lg font-semibold mb-2 text-green-600">1. 장르 및 스타일 명시</h3>
                <p className="text-gray-600">
                  &ldquo;행복한 노래&rdquo;보다는 &ldquo;upbeat pop song with catchy melody, positive lyrics about friendship&rdquo;와 같이 구체적으로 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-600">2. 분위기 및 감정</h3>
                <p className="text-gray-600">
                  &ldquo;energetic&rdquo;, &ldquo;melancholic&rdquo;, &ldquo;romantic&rdquo;, &ldquo;mysterious&rdquo;와 같이 원하는 분위기를 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 악기 및 사운드</h3>
                <p className="text-gray-600">
                  &ldquo;acoustic guitar&rdquo;, &ldquo;electronic beats&rdquo;, &ldquo;orchestral&rdquo;, &ldquo;jazz piano&rdquo;와 같이 원하는 악기를 지정하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">4. 가사 주제</h3>
                <p className="text-gray-600">
                  &ldquo;about love&rdquo;, &ldquo;motivational lyrics&rdquo;, &ldquo;story about adventure&rdquo;와 같이 가사 주제를 명시하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Suno 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Suno를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=suno"
              className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Suno 프롬프트 보기
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
              href="/ai-tools/runway"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-purple-600 mb-2">Runway</h3>
              <p className="text-gray-600 text-sm">AI 영상 생성 및 편집 플랫폼</p>
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

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'HeyGen - AI 가상인물 영상 제작 플랫폼 | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'HeyGen은 AI 기반 가상인물 영상 제작 플랫폼으로, 다국어 음성 변환과 리프싱 기술을 통해 다양한 언어의 영상을 생성합니다. HeyGen의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'HeyGen',
    'AI 가상인물',
    '영상 제작',
    '리프싱',
    '음성 변환',
    '다국어 영상',
    'HeyGen AI',
    'HeyGen 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'HeyGen - AI 가상인물 영상 제작 플랫폼 | 특징과 사용법',
    description: 'HeyGen은 AI 기반 가상인물 영상 제작 플랫폼으로, 다국어 음성 변환과 리프싱 기술을 통해 다양한 언어의 영상을 생성합니다.',
    url: 'https://promptedu.io/ai-tools/heygen',
  },
};

export default function HeyGenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6">
            <span className="text-3xl">🎭</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            HeyGen
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 가상인물 영상 제작 플랫폼
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              유료
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              가상인물
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              다국어
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🎭 가상인물 생성</h3>
              <p className="text-gray-600">
                다양한 외모와 성격을 가진 가상인물을 생성하여 브랜드에 맞는 맞춤형 아바타를 만들 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🌍 다국어 음성 변환</h3>
              <p className="text-gray-600">
                하나의 영상을 다양한 언어로 변환하여 글로벌 마케팅과 교육 콘텐츠 제작에 활용할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎬 리프싱 기술</h3>
              <p className="text-gray-600">
                기존 영상의 입 모양을 새로운 음성에 맞춰 자연스럽게 동기화하는 고급 리프싱 기술을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">⚡ 빠른 제작</h3>
              <p className="text-gray-600">
                텍스트 입력만으로 몇 분 내에 완성도 높은 영상을 생성할 수 있어 제작 시간을 크게 단축합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">📱 마케팅 및 광고</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 제품 소개 영상</li>
                <li>• 브랜드 메시지 전달</li>
                <li>• 글로벌 마케팅 캠페인</li>
                <li>• 소셜미디어 콘텐츠</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🎓 교육 및 훈련</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 온라인 교육 콘텐츠</li>
                <li>• 기업 내부 훈련 영상</li>
                <li>• 다국어 교육 자료</li>
                <li>• 튜토리얼 영상</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">💼 비즈니스 활용</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 고객 서비스 영상</li>
                <li>• 회사 소개 영상</li>
                <li>• 프레젠테이션</li>
                <li>• 뉴스 및 업데이트</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 가상인물 타입 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎭 가상인물 타입</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">👨‍💼 비즈니스</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 전문적이고 신뢰감</li>
                <li>• 비즈니스 정장</li>
                <li>• 다양한 연령대</li>
                <li>• 다국적 외모</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">👩‍🎓 교육</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 친근하고 접근하기 쉬움</li>
                <li>• 캐주얼한 스타일</li>
                <li>• 다양한 스타일</li>
                <li>• 교육자 이미지</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎨 크리에이티브</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 독특하고 창의적</li>
                <li>• 아티스트 스타일</li>
                <li>• 개성 있는 외모</li>
                <li>• 트렌디한 패션</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 언어 지원 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🌍 지원 언어</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🌏 아시아 언어</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 한국어 (Korean)</li>
                <li>• 중국어 (Mandarin, Cantonese)</li>
                <li>• 일본어 (Japanese)</li>
                <li>• 태국어 (Thai)</li>
                <li>• 베트남어 (Vietnamese)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🌍 유럽 언어</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 영어 (English)</li>
                <li>• 스페인어 (Spanish)</li>
                <li>• 프랑스어 (French)</li>
                <li>• 독일어 (German)</li>
                <li>• 이탈리아어 (Italian)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🌍 기타 언어</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 포르투갈어 (Portuguese)</li>
                <li>• 러시아어 (Russian)</li>
                <li>• 아랍어 (Arabic)</li>
                <li>• 힌디어 (Hindi)</li>
                <li>• 네덜란드어 (Dutch)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎤 음성 옵션</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 남성/여성 음성</li>
                <li>• 다양한 연령대</li>
                <li>• 지역별 억양</li>
                <li>• 감정 표현</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 영상 제작 옵션 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎬 영상 제작 옵션</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">📐 해상도 및 비율</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 1080p (Full HD)</li>
                <li>• 16:9 (가로형)</li>
                <li>• 9:16 (세로형)</li>
                <li>• 1:1 (정사각형)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">⏱️ 길이 설정</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 최대 10분</li>
                <li>• 자동 길이 조절</li>
                <li>• 텍스트 기반 타이밍</li>
                <li>• 자연스러운 페이스</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎭 배경 및 스타일</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 다양한 배경</li>
                <li>• 비즈니스 환경</li>
                <li>• 캐주얼 스타일</li>
                <li>• 브랜드 맞춤</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎤 음성 설정</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 음성 속도 조절</li>
                <li>• 톤 및 피치</li>
                <li>• 감정 표현</li>
                <li>• 일시정지 및 강조</li>
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
                <h3 className="text-lg font-semibold mb-2 text-pink-600">1. 명확한 메시지</h3>
                <p className="text-gray-600">
                  &ldquo;제품 소개&rdquo;보다는 &ldquo;신제품의 주요 기능과 혜택을 강조하는 전문적인 톤으로 소개하는 영상&rdquo;와 같이 구체적으로 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">2. 타겟 오디언스</h3>
                <p className="text-gray-600">
                  &ldquo;젊은 전문가를 대상으로 한 친근하고 신뢰감 있는 톤&rdquo;, &ldquo;학생들을 위한 교육적이고 명확한 설명&rdquo;와 같이 대상자를 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">3. 감정 및 톤</h3>
                <p className="text-gray-600">
                  &ldquo;열정적이고 동기부여하는 톤&rdquo;, &ldquo;차분하고 전문적인 톤&rdquo;, &ldquo;친근하고 재미있는 톤&rdquo;와 같이 원하는 감정을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">4. 언어 및 문화</h3>
                <p className="text-gray-600">
                  &ldquo;한국 문화에 맞는 정중하고 예의 바른 톤&rdquo;, &ldquo;미국식 캐주얼하고 친근한 스타일&rdquo;와 같이 문화적 맥락을 고려하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            HeyGen 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            HeyGen을 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=heygen"
              className="px-8 py-4 bg-white text-pink-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              HeyGen 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-pink-600 transition-all duration-200 font-semibold text-lg"
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
              <p className="text-gray-600 text-sm">고품질 AI 음성 합성</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

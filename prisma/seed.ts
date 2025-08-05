import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = [
    {
      name: '콘텐츠',
      description: '블로그, 기사, 소셜미디어 콘텐츠 작성',
      icon: '📝',
      color: '#3B82F6',
    },
    {
      name: '마케팅',
      description: '이메일, 광고, 브랜딩 관련',
      icon: '📢',
      color: '#10B981',
    },
    {
      name: '개발',
      description: '코딩, 프로그래밍, 기술 관련',
      icon: '💻',
      color: '#8B5CF6',
    },
    {
      name: '프론트엔드',
      description: 'React, Vue, JavaScript, UI/UX 개발',
      icon: '🎨',
      color: '#06B6D4',
    },
    {
      name: '백엔드',
      description: 'API, 서버, 데이터베이스 개발',
      icon: '⚙️',
      color: '#84CC16',
    },
    {
      name: 'AI/ML',
      description: '인공지능, 머신러닝, 데이터 사이언스',
      icon: '🤖',
      color: '#F97316',
    },
    {
      name: 'DevOps',
      description: '배포, CI/CD, 인프라, 클라우드',
      icon: '🔧',
      color: '#64748B',
    },
    {
      name: '프롬프트 개발',
      description: '프롬프트 엔지니어링, AI 프롬프트 최적화',
      icon: '🧠',
      color: '#7C3AED',
    },
    {
      name: '생산성',
      description: '업무 효율, 시간 관리, 계획 수립',
      icon: '⚡',
      color: '#F59E0B',
    },
    {
      name: '비즈니스',
      description: '기업용, 고객 서비스, 경영 관련',
      icon: '💼',
      color: '#EF4444',
    },
    {
      name: '창작',
      description: '소설, 시나리오, 창작물 관련',
      icon: '✍️',
      color: '#EC4899',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Create sample users
  const users = [
    {
      email: 'admin@example.com',
      username: 'admin',
      password: 'password123',
      name: '관리자',
      role: 'ADMIN',
    },
    {
      email: 'creator1@example.com',
      username: 'ai_creator',
      password: 'password123',
      name: 'AI 크리에이터',
      role: 'CREATOR',
    },
    {
      email: 'creator2@example.com',
      username: 'marketing_pro',
      password: 'password123',
      name: '마케터킹',
      role: 'CREATOR',
    },
    {
      email: 'creator3@example.com',
      username: 'dev_master',
      password: 'password123',
      name: '개발자프로',
      role: 'CREATOR',
    },
    {
      email: 'user@example.com',
      username: 'testuser',
      password: 'password123',
      name: '테스트 사용자',
      role: 'USER',
    },
  ];

  for (const userData of users) {
    const hashedPassword = await hashPassword(userData.password);
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedPassword,
        isVerified: true,
        role: userData.role as any,
      },
    });
  }

  // Get created categories and users
  const createdCategories = await prisma.category.findMany();
  const createdUsers = await prisma.user.findMany();

  // Create sample prompts
  const prompts = [
    {
      title: '고품질 블로그 글 작성 프롬프트',
      description: 'SEO 최적화된 블로그 글을 작성하는 고품질 프롬프트입니다. 키워드 분석부터 구조화된 글쓰기까지 도와줍니다.',
      content: '당신은 SEO 전문가이자 블로그 작성 전문가입니다. 다음 주제에 대해 SEO 최적화된 블로그 글을 작성해주세요...',
      price: 15000,
      categoryName: '콘텐츠',
      authorEmail: 'creator1@example.com',
      tags: ['블로그', 'SEO', '글쓰기', '마케팅'],
      status: 'ACTIVE',
    },
    {
      title: '이메일 마케팅 자동화 프롬프트',
      description: '고객 세그먼트별 맞춤형 이메일을 자동으로 생성하는 프롬프트입니다.',
      content: '당신은 이메일 마케팅 전문가입니다. 다음 고객 세그먼트에 맞는 이메일을 작성해주세요...',
      price: 25000,
      categoryName: '마케팅',
      authorEmail: 'creator2@example.com',
      tags: ['이메일', '마케팅', '자동화', '고객관리'],
      status: 'ACTIVE',
    },
    {
      title: '코드 리뷰 및 최적화 프롬프트',
      description: 'JavaScript, Python, React 코드를 분석하고 개선사항을 제안하는 프롬프트입니다.',
      content: '당신은 시니어 개발자입니다. 다음 코드를 리뷰하고 개선사항을 제안해주세요...',
      price: 20000,
      categoryName: '개발',
      authorEmail: 'creator3@example.com',
      tags: ['코딩', '리뷰', '최적화', 'JavaScript'],
    },
    {
      title: '무료 - 일일 계획 수립 프롬프트',
      description: '생산성을 높이는 일일 계획을 수립하는 무료 프롬프트입니다.',
      content: '당신은 생산성 전문가입니다. 다음 정보를 바탕으로 효율적인 일일 계획을 수립해주세요...',
      price: 0,
      categoryName: '생산성',
      authorEmail: 'creator1@example.com',
      tags: ['계획', '생산성', '시간관리', '무료'],
    },
    {
      title: '기업용 고객 서비스 프롬프트',
      description: '기업의 고객 서비스 팀을 위한 전문적인 응답 생성 프롬프트입니다.',
      content: '당신은 고객 서비스 전문가입니다. 다음 고객 문의에 대해 전문적이고 친절한 응답을 작성해주세요...',
      price: 50000,
      categoryName: '비즈니스',
      authorEmail: 'creator2@example.com',
      tags: ['고객서비스', '기업용', '응답', '전문'],
    },
    {
      title: '창작 스토리텔링 프롬프트',
      description: '소설, 시나리오, 광고 카피 등 창작물을 위한 스토리텔링 프롬프트입니다.',
      content: '당신은 창작 전문가입니다. 다음 주제에 대해 매력적인 스토리를 작성해주세요...',
      price: 18000,
      categoryName: '창작',
      authorEmail: 'creator3@example.com',
      tags: ['스토리텔링', '창작', '소설', '시나리오'],
      status: 'ACTIVE',
    },
    // 승인 대기 중인 프롬프트들
    {
      title: '승인 대기 - AI 챗봇 응답 프롬프트',
      description: '고객 문의에 대한 AI 챗봇 응답을 생성하는 프롬프트입니다.',
      content: '당신은 친절하고 전문적인 AI 챗봇입니다. 다음 고객 문의에 대해 도움이 되는 응답을 제공해주세요...',
      price: 12000,
      categoryName: '비즈니스',
      authorEmail: 'creator1@example.com',
      tags: ['챗봇', '고객응답', 'AI', '서비스'],
      status: 'PENDING',
    },
    {
      title: '승인 대기 - 소셜미디어 콘텐츠 생성기',
      description: '인스타그램, 페이스북 등 소셜미디어용 콘텐츠를 생성하는 프롬프트입니다.',
      content: '당신은 소셜미디어 마케팅 전문가입니다. 다음 브랜드에 맞는 매력적인 소셜미디어 콘텐츠를 생성해주세요...',
      price: 8000,
      categoryName: '마케팅',
      authorEmail: 'creator2@example.com',
      tags: ['소셜미디어', '인스타그램', '페이스북', '콘텐츠'],
      status: 'PENDING',
    },
    {
      title: '승인 대기 - 무료 학습 계획 수립',
      description: '학습 목표에 맞는 개인화된 학습 계획을 수립하는 무료 프롬프트입니다.',
      content: '당신은 교육 전문가입니다. 다음 학습 목표에 맞는 체계적인 학습 계획을 수립해주세요...',
      price: 0,
      categoryName: '생산성',
      authorEmail: 'creator3@example.com',
      tags: ['학습', '계획', '교육', '무료'],
      status: 'PENDING',
    },
    // 프롬프트 개발 관련 프롬프트들
    {
      title: 'AI 프롬프트 최적화 가이드',
      description: 'AI 모델의 성능을 극대화하는 프롬프트 엔지니어링 기법을 제공합니다.',
      content: '당신은 프롬프트 엔지니어링 전문가입니다. 다음 작업을 위한 최적화된 프롬프트를 설계해주세요:\n\n1. 작업 목표: [사용자 입력]\n2. 대상 AI 모델: [모델명]\n3. 출력 형식: [원하는 형식]\n\n최적화 요소:\n- Chain of Thought 기법 적용\n- Few-shot 예시 포함\n- 명확한 역할 정의\n- 구체적인 지시사항\n- 출력 품질 제약조건\n\n설계된 프롬프트와 함께 성능 향상 예상 결과를 설명해주세요.',
      price: 35000,
      categoryName: '프롬프트 개발',
      authorEmail: 'creator1@example.com',
      tags: ['프롬프트엔지니어링', 'AI최적화', 'Chain-of-Thought', 'Few-shot'],
      status: 'ACTIVE',
    },
    {
      title: '대화형 AI 프롬프트 템플릿 생성기',
      description: '챗봇과 대화형 AI를 위한 체계적인 프롬프트 템플릿을 생성합니다.',
      content: '당신은 대화형 AI 시스템 설계 전문가입니다. 다음 요구사항에 맞는 대화형 프롬프트 템플릿을 생성해주세요:\n\n**입력 정보:**\n- 서비스 도메인: [도메인명]\n- 대상 사용자: [사용자 타입]\n- 대화 목적: [목적 설명]\n- 톤앤매너: [원하는 톤]\n\n**템플릿 구성요소:**\n1. 시스템 역할 정의\n2. 대화 규칙과 제약사항\n3. 응답 형식 가이드라인\n4. 예외 상황 처리 방법\n5. 샘플 대화 시나리오 (3-5개)\n\n**추가 최적화:**\n- 컨텍스트 유지 전략\n- 개인화 요소 반영\n- 안전성 가이드라인',
      price: 28000,
      categoryName: '프롬프트 개발',
      authorEmail: 'creator2@example.com',
      tags: ['대화형AI', '챗봇', '템플릿', '시스템설계'],
      status: 'ACTIVE',
    },
    {
      title: '무료 - 프롬프트 성능 평가 체크리스트',
      description: '작성한 프롬프트의 품질과 성능을 체계적으로 평가하는 무료 가이드입니다.',
      content: '당신은 프롬프트 품질 평가 전문가입니다. 다음 프롬프트를 아래 기준으로 평가하고 개선사항을 제안해주세요:\n\n**평가 대상 프롬프트:**\n[사용자가 입력한 프롬프트]\n\n**평가 기준 (1-10점):**\n1. 명확성: 지시사항이 명확하고 이해하기 쉬운가?\n2. 구체성: 구체적인 요구사항과 제약조건이 있는가?\n3. 완전성: 필요한 모든 정보가 포함되어 있는가?\n4. 일관성: 모순되는 지시사항이 없는가?\n5. 효율성: 불필요한 중복이나 장황함이 없는가?\n\n**개선 제안:**\n- 구체적인 수정사항\n- 추가할 요소\n- 제거할 부분\n- 최적화된 버전 제공',
      price: 0,
      categoryName: '프롬프트 개발',
      authorEmail: 'creator3@example.com',
      tags: ['평가', '품질관리', '개선', '무료'],
      status: 'ACTIVE',
    },
    {
      title: 'Few-Shot 학습 프롬프트 설계',
      description: 'Few-Shot Learning을 활용한 고성능 프롬프트 설계 방법론을 제공합니다.',
      content: '당신은 Few-Shot Learning 전문가입니다. 다음 작업을 위한 Few-Shot 프롬프트를 설계해주세요:\n\n**작업 정의:**\n- 학습 목표: [목표 설명]\n- 입력 데이터 타입: [데이터 형식]\n- 원하는 출력: [출력 형식]\n\n**Few-Shot 설계 단계:**\n1. 대표적인 예시 3-5개 선별\n2. 예시의 다양성 확보 (edge case 포함)\n3. 입력-출력 패턴 명확화\n4. 추론 과정 설명 추가\n\n**프롬프트 구조:**\n```\n작업 설명\n\n예시 1:\n입력: [예시 입력]\n출력: [예시 출력]\n설명: [추론 과정]\n\n예시 2-5: [동일 형식]\n\n실제 작업:\n입력: [실제 입력]\n출력:\n```\n\n성능 최적화 팁과 주의사항도 함께 제공해주세요.',
      price: 42000,
      categoryName: '프롬프트 개발',
      authorEmail: 'creator1@example.com',
      tags: ['Few-Shot', '머신러닝', '예시학습', '성능최적화'],
      status: 'ACTIVE',
    },
    {
      title: '승인 대기 - 멀티모달 프롬프트 개발',
      description: '텍스트, 이미지, 코드를 결합한 멀티모달 AI 프롬프트 개발 가이드입니다.',
      content: '당신은 멀티모달 AI 시스템 전문가입니다. 텍스트, 이미지, 코드를 효과적으로 결합하는 프롬프트를 설계해주세요...',
      price: 50000,
      categoryName: '프롬프트 개발',
      authorEmail: 'creator2@example.com',
      tags: ['멀티모달', '이미지처리', '코드분석', '통합AI'],
      status: 'PENDING',
    },
  ];

  for (const promptData of prompts) {
    const category = createdCategories.find((c: any) => c.name === promptData.categoryName);
    const author = createdUsers.find((u: any) => u.email === promptData.authorEmail);

    if (category && author) {
      try {
        await prisma.prompt.create({
          data: {
            title: promptData.title,
            description: promptData.description,
            content: promptData.content,
            price: promptData.price,
            categoryId: category.id,
            authorId: author.id,
            tags: JSON.stringify(promptData.tags),
            status: (promptData.status || 'ACTIVE') as any,
            downloads: promptData.status === 'ACTIVE' ? Math.floor(Math.random() * 1000) + 100 : 0,
            views: promptData.status === 'ACTIVE' ? Math.floor(Math.random() * 5000) + 500 : 0,
            rating: promptData.status === 'ACTIVE' ? 4.5 + Math.random() * 0.5 : 0,
            reviewCount: promptData.status === 'ACTIVE' ? Math.floor(Math.random() * 50) + 10 : 0,
          },
        });
      } catch (e) {
        // ignore duplicate
      }
    }
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
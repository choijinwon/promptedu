-- PromptEDU 데이터베이스 스키마

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'learner' CHECK (role IN ('educator', 'learner', 'admin')),
    name VARCHAR(255),
    bio TEXT,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 프롬프트 테이블
CREATE TABLE IF NOT EXISTS prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    category VARCHAR(100),
    tags TEXT[],
    is_public BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 학습 성과 테이블 (통계용)
CREATE TABLE IF NOT EXISTS learning_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
    performance_score DECIMAL(5,2),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_prompts_is_public ON prompts(is_public);
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON prompts(created_at);

-- 샘플 데이터 삽입 (테스트용)
INSERT INTO users (email, role, name) VALUES
    ('educator1@example.com', 'educator', '김교사'),
    ('educator2@example.com', 'educator', '이교사'),
    ('learner1@example.com', 'learner', '학생1'),
    ('learner2@example.com', 'learner', '학생2')
ON CONFLICT (email) DO NOTHING;

INSERT INTO prompts (user_id, title, content, description, category, is_public) VALUES
    ((SELECT id FROM users WHERE email = 'educator1@example.com'), 
     '수학 개념 설명 프롬프트', 
     '당신은 경험 많은 수학 교사입니다. 학생들이 쉽게 이해할 수 있도록 수학 개념을 설명해주세요.',
     '수학 학습을 위한 AI 프롬프트',
     '수학',
     true),
    ((SELECT id FROM users WHERE email = 'educator2@example.com'), 
     '과학 실험 가이드 프롬프트', 
     '당신은 과학 실험 전문가입니다. 안전하고 재미있는 과학 실험을 안내해주세요.',
     '과학 실험 학습을 위한 AI 프롬프트',
     '과학',
     true)
ON CONFLICT DO NOTHING; 
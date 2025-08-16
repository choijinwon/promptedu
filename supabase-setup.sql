-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'CREATOR')),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prompts table
CREATE TABLE IF NOT EXISTS prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    price INTEGER DEFAULT 0 CHECK (price >= 0),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tags TEXT[] DEFAULT '{}',
    type VARCHAR(20) DEFAULT 'MARKETPLACE' CHECK (type IN ('MARKETPLACE', 'SHARED')),
    is_public BOOLEAN DEFAULT true,
    is_approved BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'DRAFT')),
    views INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create verification_tokens table
CREATE TABLE IF NOT EXISTS verification_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for verification_tokens
ALTER TABLE verification_tokens DISABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_prompts_author_id ON prompts(author_id);
CREATE INDEX IF NOT EXISTS idx_prompts_category_id ON prompts(category_id);
CREATE INDEX IF NOT EXISTS idx_prompts_status ON prompts(status);
CREATE INDEX IF NOT EXISTS idx_prompts_type ON prompts(type);
CREATE INDEX IF NOT EXISTS idx_prompts_is_public ON prompts(is_public);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON prompts(created_at);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_user_id ON verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_expires_at ON verification_tokens(expires_at);

-- Insert sample categories
INSERT INTO categories (name, description, slug) VALUES
('프로덕티비티', '업무 효율성과 생산성을 높이는 프롬프트', 'productivity'),
('창작 도구', '글쓰기, 디자인, 콘텐츠 제작을 위한 프롬프트', 'creative'),
('학습 도구', '교육, 학습, 지식 습득을 위한 프롬프트', 'education'),
('비즈니스', '마케팅, 영업, 경영을 위한 프롬프트', 'business'),
('개발 도구', '프로그래밍, 코딩, 기술 관련 프롬프트', 'development'),
('일상 생활', '일상에서 유용한 프롬프트', 'lifestyle'),
('엔터테인먼트', '재미있고 창의적인 프롬프트', 'entertainment'),
('건강 관리', '건강, 운동, 웰빙 관련 프롬프트', 'health')
ON CONFLICT (name) DO NOTHING;

-- Insert sample users
INSERT INTO users (email, username, password, name, role, is_verified) VALUES
('admin@example.com', 'admin', '$2b$10$0NxLGi5s4GfWGED1BTmWDe70BzrijM53gEEmraDWXfno1FOQqh0.G', '관리자', 'ADMIN', true),
('creator@example.com', 'creator', '$2b$10$0NxLGi5s4GfWGED1BTmWDe70BzrijM53gEEmraDWXfno1FOQqh0.G', '크리에이터', 'CREATOR', true),
('a@test.com', 'testuser', '$2b$10$0NxLGi5s4GfWGED1BTmWDe70BzrijM53gEEmraDWXfno1FOQqh0.G', '테스트 사용자', 'USER', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample prompts
INSERT INTO prompts (title, description, content, price, category_id, author_id, tags, type, is_public, is_approved, status) 
SELECT 
    '효율적인 이메일 작성 프롬프트',
    '비즈니스 이메일을 빠르고 정확하게 작성할 수 있는 프롬프트입니다.',
    '다음 조건에 맞는 비즈니스 이메일을 작성해주세요:\n\n받는 사람: [받는 사람]\n목적: [목적]\n톤: [톤]\n길이: [길이]\n\n이메일을 작성해주세요.',
    5000,
    c.id,
    u.id,
    ARRAY['이메일', '비즈니스', '커뮤니케이션'],
    'MARKETPLACE',
    true,
    true,
    'APPROVED'
FROM categories c, users u 
WHERE c.slug = 'business' AND u.username = 'creator'
LIMIT 1;

INSERT INTO prompts (title, description, content, price, category_id, author_id, tags, type, is_public, is_approved, status) 
SELECT 
    '블로그 포스트 개요 작성기',
    '블로그 포스트의 구조와 개요를 체계적으로 작성해주는 프롬프트입니다.',
    '다음 주제에 대한 블로그 포스트 개요를 작성해주세요:\n\n주제: [주제]\n목표 독자: [독자]\n포스트 길이: [길이]\n\n개요를 작성해주세요.',
    0,
    c.id,
    u.id,
    ARRAY['블로그', '글쓰기', '콘텐츠'],
    'SHARED',
    true,
    true,
    'APPROVED'
FROM categories c, users u 
WHERE c.slug = 'creative' AND u.username = 'creator'
LIMIT 1;

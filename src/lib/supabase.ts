import { createClient } from '@supabase/supabase-js';

// 임시 설정 - 실제 Supabase 프로젝트 설정 후 교체 필요
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key';

// 환경 변수가 설정되지 않은 경우 경고 (서버/클라이언트 모두)
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다. 실제 Supabase 프로젝트를 설정해주세요.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// 사용자 타입 정의
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// 프로필 타입 정의
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

// 공유 프롬프트 타입 정의
export interface SharedPrompt {
  id: string;
  title: string;
  description: string;
  category: string;
  template: string;
  variables: string[];
  is_public: boolean;
  is_favorite: boolean;
  user_id: string;
  author_name: string;
  likes: number;
  views: number;
  created_at: string;
  updated_at: string;
}

// 공유 프롬프트 관련 함수들
export const sharedPromptsApi = {
  // 공개된 프롬프트 목록 가져오기
  async getPublicPrompts() {
    // 환경 변수가 설정되지 않은 경우 임시 데이터 반환
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다. 임시 데이터를 반환합니다.');
      return [
        {
          id: 'temp-1',
          title: '학습 효과 극대화 프롬프트',
          description: '학습 내용을 효과적으로 정리하고 복습할 수 있는 프롬프트입니다.',
          category: '학습',
          template: '다음 내용을 학습하고 있습니다: {주제}\n\n이 내용을 바탕으로 다음을 요청합니다:\n1. 핵심 개념 정리\n2. 실생활 적용 예시\n3. 추가 학습 방향',
          variables: ['주제'],
          is_public: true,
          is_favorite: false,
          user_id: 'user-1',
          author_name: '교육 전문가',
          likes: 15,
          views: 120,
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 'temp-2',
          title: '창의적 글쓰기 도우미',
          description: '창의적인 글쓰기를 위한 프롬프트입니다.',
          category: '창작',
          template: '주제: {주제}\n\n다음 요구사항에 맞춰 창의적인 글을 작성해주세요:\n- 글의 길이: {길이}\n- 톤앤매너: {톤앤매너}\n- 포함할 요소: {포함요소}',
          variables: ['주제', '길이', '톤앤매너', '포함요소'],
          is_public: true,
          is_favorite: false,
          user_id: 'user-2',
          author_name: '작가',
          likes: 8,
          views: 85,
          created_at: '2024-01-14T15:30:00Z',
          updated_at: '2024-01-14T15:30:00Z'
        },
        {
          id: 'temp-3',
          title: '비즈니스 분석 프롬프트',
          description: '비즈니스 데이터를 분석하고 인사이트를 도출하는 프롬프트입니다.',
          category: '분석',
          template: '다음 비즈니스 데이터를 분석해주세요:\n\n데이터: {데이터}\n목표: {목표}\n\n다음 관점에서 분석해주세요:\n1. 트렌드 분석\n2. 문제점 식별\n3. 개선 방안 제시',
          variables: ['데이터', '목표'],
          is_public: true,
          is_favorite: false,
          user_id: 'user-3',
          author_name: '비즈니스 분석가',
          likes: 12,
          views: 95,
          created_at: '2024-01-13T09:15:00Z',
          updated_at: '2024-01-13T09:15:00Z'
        }
      ];
    }

    const { data, error } = await supabase
      .from('shared_prompts')
      .select(`
        *,
        profiles:user_id(name, avatar_url)
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('공개 프롬프트 조회 오류:', error);
      return [];
    }

    return data || [];
  },

  // 사용자의 프롬프트 목록 가져오기
  async getUserPrompts(userId: string) {
    // 환경 변수가 설정되지 않은 경우 임시 데이터 반환
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다. 임시 사용자 데이터를 반환합니다.');
      return [
        {
          id: 'user-temp-1',
          title: '내가 만든 학습 프롬프트',
          description: '개인적으로 만든 학습용 프롬프트입니다.',
          category: '학습',
          template: '주제: {주제}\n\n이 주제에 대해 다음을 요청합니다:\n1. 핵심 개념 설명\n2. 예시와 함께 설명\n3. 실습 문제 제공',
          variables: ['주제'],
          is_public: true,
          is_favorite: true,
          user_id: userId,
          author_name: '나',
          likes: 5,
          views: 30,
          created_at: '2024-01-16T14:20:00Z',
          updated_at: '2024-01-16T14:20:00Z'
        }
      ];
    }

    const { data, error } = await supabase
      .from('shared_prompts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('사용자 프롬프트 조회 오류:', error);
      return [];
    }

    return data || [];
  },

  // 새 프롬프트 생성
  async createPrompt(prompt: Omit<SharedPrompt, 'id' | 'created_at' | 'updated_at'>) {
    // 환경 변수가 설정되지 않은 경우 임시 응답
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다. 임시로 프롬프트가 생성된 것으로 처리합니다.');
      return {
        id: `temp-${Date.now()}`,
        ...prompt,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    const { data, error } = await supabase
      .from('shared_prompts')
      .insert([prompt])
      .select()
      .single();

    if (error) {
      console.error('프롬프트 생성 오류:', error);
      throw error;
    }

    return data;
  },

  // 프롬프트 업데이트
  async updatePrompt(id: string, updates: Partial<SharedPrompt>) {
    const { data, error } = await supabase
      .from('shared_prompts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('프롬프트 업데이트 오류:', error);
      throw error;
    }

    return data;
  },

  // 프롬프트 삭제
  async deletePrompt(id: string) {
    const { error } = await supabase
      .from('shared_prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('프롬프트 삭제 오류:', error);
      throw error;
    }
  },

  // 좋아요 증가
  async incrementLikes(id: string) {
    // 환경 변수가 설정되지 않은 경우 임시 응답
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다. 임시로 좋아요가 증가된 것으로 처리합니다.');
      return { id, likes: 1 };
    }

    const { data, error } = await supabase
      .from('shared_prompts')
      .update({ likes: supabase.rpc('increment') })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('좋아요 증가 오류:', error);
      throw error;
    }

    return data;
  },

  // 조회수 증가
  async incrementViews(id: string) {
    // 환경 변수가 설정되지 않은 경우 임시 응답
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다. 임시로 조회수가 증가된 것으로 처리합니다.');
      return { id, views: 1 };
    }

    const { data, error } = await supabase
      .from('shared_prompts')
      .update({ views: supabase.rpc('increment') })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('조회수 증가 오류:', error);
      throw error;
    }

    return data;
  }
}; 
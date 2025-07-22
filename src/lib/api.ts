// API 클라이언트 함수들

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  template: string;
  variables: string[];
  is_public: boolean;
  user_id: string;
  author_name: string;
  likes: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio: string;
  avatar_url: string;
  website: string;
  location: string;
  created_at: string;
  updated_at: string;
}

// 프롬프트 관련 API
export const promptsApi = {
  // 프롬프트 목록 조회
  async getPrompts(params?: {
    category?: string;
    isPublic?: boolean;
    userId?: string;
    limit?: number;
    offset?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.isPublic !== undefined) searchParams.append('isPublic', params.isPublic.toString());
    if (params?.userId) searchParams.append('userId', params.userId);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());

    const response = await fetch(`/api/prompts?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error('프롬프트 조회에 실패했습니다.');
    }
    return response.json();
  },

  // 특정 프롬프트 조회
  async getPrompt(id: string) {
    const response = await fetch(`/api/prompts/${id}`);
    if (!response.ok) {
      throw new Error('프롬프트 조회에 실패했습니다.');
    }
    return response.json();
  },

  // 새 프롬프트 생성
  async createPrompt(data: {
    title: string;
    description?: string;
    category?: string;
    template: string;
    variables?: string[];
    isPublic?: boolean;
    userId: string;
    authorName?: string;
  }) {
    const response = await fetch('/api/prompts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `프롬프트 생성에 실패했습니다. (${response.status})`);
    }
    return response.json();
  },

  // 프롬프트 수정
  async updatePrompt(id: string, data: {
    title: string;
    description?: string;
    category?: string;
    template: string;
    variables?: string[];
    isPublic?: boolean;
  }) {
    const response = await fetch(`/api/prompts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('프롬프트 수정에 실패했습니다.');
    }
    return response.json();
  },

  // 프롬프트 삭제
  async deletePrompt(id: string) {
    const response = await fetch(`/api/prompts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('프롬프트 삭제에 실패했습니다.');
    }
    return response.json();
  },

  // 좋아요 토글
  async toggleLike(id: string, userId: string, action: 'like' | 'unlike') {
    const response = await fetch(`/api/prompts/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, action }),
    });
    if (!response.ok) {
      throw new Error('좋아요 업데이트에 실패했습니다.');
    }
    return response.json();
  },
};

// 프로필 관련 API
export const profileApi = {
  // 프로필 조회
  async getProfile(userId: string) {
    const response = await fetch(`/api/profile?userId=${userId}`);
    if (!response.ok) {
      throw new Error('프로필 조회에 실패했습니다.');
    }
    return response.json();
  },

  // 프로필 생성 또는 업데이트
  async updateProfile(data: {
    userId: string;
    name?: string;
    bio?: string;
    avatarUrl?: string;
    website?: string;
    location?: string;
  }) {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('프로필 업데이트에 실패했습니다.');
    }
    return response.json();
  },
}; 
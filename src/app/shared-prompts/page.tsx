'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { promptsApi } from '@/lib/api';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  CircularProgress,
  Avatar,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Public as PublicIcon,
  Search as SearchIcon,
  ContentCopy as CopyIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface SharedPrompt {
  id: string;
  title: string;
  description: string;
  category: string;
  template: string;
  variables: string[];
  isPublic: boolean;
  createdAt: Date;
  userId: string;
  authorName: string;
  likes: number;
  views: number;
  shareUrl?: string;
}

export default function SharedPrompts() {
  const { user } = useAuth();
  const router = useRouter();
  const [sharedPrompts, setSharedPrompts] = useState<SharedPrompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<SharedPrompt[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedPrompts, setExpandedPrompts] = useState<Set<string>>(new Set());

  // API에서 프롬프트 로드
  const loadPrompts = async () => {
    try {
      setLoading(true);
      
      // API에서 공개된 프롬프트 가져오기
      const response = await promptsApi.getPrompts({ isPublic: true });
      const dbPrompts = response.data || [];
      
      // API 프롬프트를 UI 형식으로 변환
      const convertedPrompts: SharedPrompt[] = dbPrompts.map((prompt: any) => ({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        category: prompt.category,
        template: prompt.template,
        variables: prompt.variables || [],
        isPublic: prompt.is_public,
        createdAt: new Date(prompt.created_at),
        userId: prompt.user_id,
        authorName: prompt.author_name || '익명 사용자',
        likes: prompt.likes || 0,
        views: prompt.views || 0,
      }));
      
      // localStorage에서 사용자가 작성한 공개 프롬프트 가져오기
      const savedPrompts = localStorage.getItem('prompts');
      let userPrompts: SharedPrompt[] = [];
      
      if (savedPrompts) {
        try {
          const parsedPrompts = JSON.parse(savedPrompts).map((prompt: any) => ({
            ...prompt,
            createdAt: new Date(prompt.createdAt),
            authorName: prompt.userId || '익명 사용자',
            likes: prompt.likes || 0,
            views: prompt.views || 0,
          }));
          
          // 공개된 프롬프트만 필터링
          userPrompts = parsedPrompts.filter((prompt: SharedPrompt) => prompt.isPublic);
        } catch (error) {
          console.error('localStorage 프롬프트 파싱 오류:', error);
        }
      }
      
      // 사용자 프롬프트를 먼저 표시하고, 그 다음에 API 프롬프트, 마지막에 샘플 데이터
      const allPrompts = [...userPrompts, ...convertedPrompts, ...samplePrompts];
      setSharedPrompts(allPrompts);
    } catch (error) {
      console.error('프롬프트 로드 중 오류:', error);
      // 오류 발생 시 샘플 데이터만 표시
      setSharedPrompts(samplePrompts);
    } finally {
      setLoading(false);
    }
  };

  // 샘플 공유 프롬프트 데이터
  const samplePrompts: SharedPrompt[] = [
    {
      id: '1',
      title: '학습 가이드 생성기',
      description: '어떤 주제든 체계적으로 학습할 수 있는 가이드를 생성합니다.',
      category: '학습',
      template: '{주제}에 대해 학습하고 싶습니다. 다음 순서로 학습 가이드를 만들어주세요:\n\n1. 기본 개념\n2. 핵심 포인트\n3. 실습 예제\n4. 심화 내용\n5. 연습 문제',
      variables: ['주제'],
      isPublic: true,
      createdAt: new Date('2024-01-15'),
      userId: 'user1',
      authorName: '김교육',
      likes: 45,
      views: 234,
    },
    {
      id: '2',
      title: '창작 도우미',
      description: '창작 활동을 도와주는 프롬프트입니다.',
      category: '창작',
      template: '{창작유형}을 위한 아이디어를 생성해주세요. 다음 요소들을 포함해주세요:\n\n- 주제 선정\n- 구성 요소\n- 창작 과정\n- 완성도 평가 기준',
      variables: ['창작유형'],
      isPublic: true,
      createdAt: new Date('2024-01-10'),
      userId: 'user2',
      authorName: '박창작',
      likes: 32,
      views: 189,
    },
    {
      id: '3',
      title: '분석 도구',
      description: '복잡한 데이터나 정보를 체계적으로 분석합니다.',
      category: '분석',
      template: '{분석대상}을 분석해주세요. 다음 관점에서 접근해주세요:\n\n1. 정량적 분석\n2. 정성적 분석\n3. 비교 분석\n4. 트렌드 분석\n5. 결론 및 제언',
      variables: ['분석대상'],
      isPublic: true,
      createdAt: new Date('2024-01-08'),
      userId: 'user3',
      authorName: '이분석',
      likes: 28,
      views: 156,
    },
    {
      id: '4',
      title: '업무 효율화',
      description: '업무 프로세스를 개선하고 효율성을 높이는 프롬프트입니다.',
      category: '작업',
      template: '{업무영역}의 효율성을 높이기 위한 방법을 제안해주세요:\n\n- 현재 문제점\n- 개선 방안\n- 실행 계획\n- 예상 효과\n- 모니터링 방법',
      variables: ['업무영역'],
      isPublic: true,
      createdAt: new Date('2024-01-05'),
      userId: 'user4',
      authorName: '최업무',
      likes: 67,
      views: 312,
    },
    {
      id: '5',
      title: '언어 학습 도우미',
      description: '외국어 학습을 체계적으로 도와주는 프롬프트입니다.',
      category: '학습',
      template: '{언어}를 학습하기 위한 커리큘럼을 만들어주세요:\n\n1. 기초 단계 (1-2개월)\n2. 중급 단계 (3-4개월)\n3. 고급 단계 (5-6개월)\n\n각 단계별 학습 목표와 방법을 포함해주세요.',
      variables: ['언어'],
      isPublic: true,
      createdAt: new Date('2024-01-03'),
      userId: 'user5',
      authorName: '한언어',
      likes: 89,
      views: 445,
    },
  ];

  // 초기 데이터 로드
  useEffect(() => {
    loadPrompts();
  }, []);

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      loadPrompts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 커스텀 이벤트 리스너 추가 (다른 탭에서의 변경 감지)
    window.addEventListener('promptsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('promptsUpdated', handleStorageChange);
    };
  }, []);

  // 데이터 새로고침 함수
  const refreshData = () => {
    loadPrompts();
  };

  // 필터링 및 정렬
  useEffect(() => {
    let filtered = sharedPrompts.filter(prompt => prompt.isPublic);

    // 카테고리 필터
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(prompt => prompt.category === selectedCategory);
    }

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(prompt => 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.authorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 정렬
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredPrompts(filtered);
  }, [sharedPrompts, selectedCategory, searchTerm, sortBy]);

  const handleCopyPrompt = (template: string) => {
    // 줄바꿈을 보존하여 복사
    const formattedTemplate = template.replace(/\n/g, '\n');
    navigator.clipboard.writeText(formattedTemplate);
    setSuccessMessage('클립보드에 복사되었습니다! (줄바꿈 포함)');
    setShowSuccess(true);
  };

  const handleLike = async (id: string) => {
    if (!user) {
      setSuccessMessage('로그인이 필요합니다.');
      setShowSuccess(true);
      return;
    }

    try {
      // API를 통해 좋아요 증가
      await promptsApi.toggleLike(id, user.id, 'like');
      
      // 로컬 상태 업데이트
      setSharedPrompts(prev => 
        prev.map(prompt => 
          prompt.id === id ? { ...prompt, likes: prompt.likes + 1 } : prompt
        )
      );
      setSuccessMessage('좋아요가 추가되었습니다!');
      setShowSuccess(true);
    } catch (error) {
      console.error('좋아요 처리 중 오류:', error);
      setSuccessMessage('좋아요 처리 중 오류가 발생했습니다.');
      setShowSuccess(true);
    }
  };

  // 접기/펼치기 토글 함수
  const toggleExpand = (id: string) => {
    setExpandedPrompts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCreatePrompt = () => {
    if (user) {
      router.push('/prompt-creator');
    } else {
      // 로그인 페이지로 이동하거나 로그인 모달 열기
      router.push('/');
    }
  };

  const categories = [
    '일반',
    '학습',
    '작업',
    '창작',
    '분석',
    '기타'
  ];

  const sortOptions = [
    { value: 'recent', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'views', label: '조회순' },
    { value: 'title', label: '제목순' },
  ];

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            공유 프롬프트를 불러오는 중...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            <PublicIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            공유 프롬프트
          </Typography>
          <Button
            variant="contained"
            startIcon={<PublicIcon />}
            onClick={handleCreatePrompt}
            sx={{ minWidth: 200 }}
          >
            {user ? '내 프롬프트 공유하기' : '로그인하여 프롬프트 만들기'}
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          다른 사용자들이 공유한 유용한 프롬프트들을 탐색해보세요.
        </Typography>
      </Box>

      {/* 필터 및 검색 */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              placeholder="프롬프트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth size="small">
              <InputLabel>카테고리</InputLabel>
              <Select
                value={selectedCategory}
                label="카테고리"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">전체</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth size="small">
              <InputLabel>정렬</InputLabel>
              <Select
                value={sortBy}
                label="정렬"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Chip 
              icon={<PublicIcon />} 
              label={`${filteredPrompts.length}개`}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>

      {/* 프롬프트 목록 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {filteredPrompts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              검색 결과가 없습니다.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              다른 검색어나 카테고리를 시도해보세요.
            </Typography>
          </Box>
        ) : (
          filteredPrompts.map((prompt) => (
            <Card key={prompt.id} variant="outlined" sx={{ position: 'relative' }}>
              {/* 실제 사용자 프롬프트 표시 */}
              {prompt.userId && prompt.userId !== 'user1' && prompt.userId !== 'user2' && 
               prompt.userId !== 'user3' && prompt.userId !== 'user4' && prompt.userId !== 'user5' && (
                <Box sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8, 
                  zIndex: 1 
                }}>
                  <Chip 
                    label="실제 사용자" 
                    size="small" 
                    color="success" 
                    variant="filled"
                    sx={{ fontSize: '0.7rem' }}
                  />
                </Box>
              )}
              <CardContent sx={{ p: 3 }}>
                {/* 헤더 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6" component="h3">
                        {prompt.title}
                      </Typography>
                      <Chip 
                        label={prompt.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </Box>
                    {prompt.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {prompt.description}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* 프롬프트 템플릿 */}
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    mb: 2,
                    backgroundColor: 'grey.50',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    position: 'relative'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      프롬프트 템플릿
                    </Typography>
                    <Tooltip title={expandedPrompts.has(prompt.id) ? "접기" : "펼치기"}>
                      <IconButton
                        size="small"
                        onClick={() => toggleExpand(prompt.id)}
                        sx={{ ml: 1 }}
                      >
                        {expandedPrompts.has(prompt.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  <Collapse in={expandedPrompts.has(prompt.id)}>
                    <Typography 
                      variant="body2"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: 1.6
                      }}
                    >
                      {prompt.template}
                    </Typography>
                  </Collapse>
                  
                  {!expandedPrompts.has(prompt.id) && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        {prompt.template.length > 100 
                          ? `${prompt.template.substring(0, 100)}...` 
                          : prompt.template}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => toggleExpand(prompt.id)}
                        sx={{ ml: 1, minWidth: 'auto' }}
                      >
                        펼치기
                      </Button>
                    </Box>
                  )}
                </Paper>

                {/* 작성자 정보 및 통계 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24 }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {prompt.authorName || `사용자 ${prompt.userId?.slice(-4) || 'Unknown'}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      • {prompt.createdAt.toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ThumbUpIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {prompt.likes || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TrendingUpIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {prompt.views || 0}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* 액션 버튼 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="복사">
                      <IconButton
                        size="small"
                        onClick={() => handleCopyPrompt(prompt.template)}
                      >
                        <CopyIcon />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="좋아요">
                      <IconButton
                        size="small"
                        onClick={() => handleLike(prompt.id)}
                        color="primary"
                      >
                        <ThumbUpIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  {!user && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => router.push('/')}
                    >
                      로그인하여 더 많은 기능 사용하기
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* 성공 메시지 */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
} 
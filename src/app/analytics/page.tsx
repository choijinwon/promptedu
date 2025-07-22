'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Create as CreateIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Settings as SettingsIcon,
  ContentCopy as CopyIcon,
  Star as StarIcon,
  Delete as DeleteIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

interface AnalyticsData {
  totalPrompts: number;
  activeUsers: number;
  promptUsage: number;
  successRate: number;
  popularCategories: Array<{ name: string; count: number; percentage: number }>;
  recentActivity: Array<{ action: string; timestamp: string; user: string }>;
  weeklyTrends: Array<{ date: string; prompts: number; users: number }>;
}

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  template: string;
  variables: string[];
  isFavorite: boolean;
  createdAt: Date;
  userId: string;
}

export default function Analytics() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [analyticsData] = useState<AnalyticsData>({
    totalPrompts: 1247,
    activeUsers: 89,
    promptUsage: 3421,
    successRate: 94.2,
    popularCategories: [
      { name: '학습', count: 456, percentage: 36.6 },
      { name: '창작', count: 234, percentage: 18.8 },
      { name: '분석', count: 198, percentage: 15.9 },
      { name: '작업', count: 156, percentage: 12.5 },
      { name: '일반', count: 123, percentage: 9.9 },
      { name: '기타', count: 80, percentage: 6.4 },
    ],
    recentActivity: [
      { action: '새 프롬프트 생성', timestamp: '2분 전', user: '김철수' },
      { action: '프롬프트 복사', timestamp: '5분 전', user: '이영희' },
      { action: '즐겨찾기 추가', timestamp: '12분 전', user: '박민수' },
      { action: '카테고리 변경', timestamp: '18분 전', user: '최지영' },
      { action: '프롬프트 공유', timestamp: '25분 전', user: '정현우' },
    ],
    weeklyTrends: [
      { date: '월', prompts: 45, users: 12 },
      { date: '화', prompts: 67, users: 18 },
      { date: '수', prompts: 89, users: 24 },
      { date: '목', prompts: 76, users: 21 },
      { date: '금', prompts: 94, users: 26 },
      { date: '토', prompts: 52, users: 15 },
      { date: '일', prompts: 38, users: 11 },
    ],
  });

  // 로그인 체크 및 관리자 권한 체크
  React.useEffect(() => {
    if (!user && !loading) {
      console.log('User not authenticated, redirecting to home');
      router.push('/');
    } else if (user && !loading) {
      // 관리자 권한 체크
      if (!isAdmin) {
        console.log('User is not admin, redirecting to home');
        router.push('/');
        return;
      }
      // 관리자인 경우 Supabase에서 프롬프트 로드
      loadPromptsFromSupabase();
    }
  }, [user, loading, isAdmin, router]);

  // 프롬프트 업데이트 이벤트 리스너
  React.useEffect(() => {
    const handlePromptsUpdated = () => {
      loadPromptsFromSupabase();
    };

    window.addEventListener('promptsUpdated', handlePromptsUpdated);
    return () => {
      window.removeEventListener('promptsUpdated', handlePromptsUpdated);
    };
  }, []);

  // Supabase에서 프롬프트 로드
  const loadPromptsFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('shared_prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase에서 프롬프트 로드 오류:', error);
        // Supabase 로드 실패 시 로컬 스토리지에서 로드
        loadPromptsFromStorage();
      } else {
        console.log('Supabase에서 로드된 프롬프트:', data);
        const promptsWithDates = data.map((prompt: any) => ({
          ...prompt,
          createdAt: new Date(prompt.created_at),
          id: prompt.id,
          title: prompt.title,
          description: prompt.description,
          category: prompt.category,
          template: prompt.template,
          variables: prompt.variables || [],
          isFavorite: prompt.is_favorite || false,
          userId: prompt.user_id,
        }));
        setPrompts(promptsWithDates);
      }
    } catch (error) {
      console.error('Supabase 연결 오류:', error);
      // Supabase 연결 실패 시 로컬 스토리지에서 로드
      loadPromptsFromStorage();
    }
  };

  // 로컬 스토리지에서 프롬프트 로드 (백업용)
  const loadPromptsFromStorage = () => {
    if (typeof window !== 'undefined') {
      // prompt-creator에서 저장한 프롬프트 로드
      const storedPrompts = localStorage.getItem('prompts');
      console.log('Loading prompts from storage:', storedPrompts);
      if (storedPrompts) {
        try {
          const parsedPrompts = JSON.parse(storedPrompts);
          const promptsWithDates = parsedPrompts.map((prompt: any) => ({
            ...prompt,
            createdAt: new Date(prompt.createdAt)
          }));
          console.log('Parsed prompts:', promptsWithDates);
          setPrompts(promptsWithDates);
        } catch (error) {
          console.error('Failed to parse stored prompts:', error);
          localStorage.removeItem('prompts');
        }
      } else {
        console.log('No prompts found in localStorage');
      }
    }
  };

  // 프롬프트를 로컬 스토리지에 저장
  const savePromptsToStorage = (promptsToSave: PromptTemplate[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('prompts', JSON.stringify(promptsToSave));
    }
  };

  const handleCreatePrompt = () => {
    router.push('/prompt-creator');
  };

  const handleLogout = async () => {
    try {
      // AuthContext의 signOut 함수 호출
      await signOut();
      
      // 로컬 스토리지 클리어
      if (typeof window !== 'undefined') {
        localStorage.removeItem('prompts');
        localStorage.removeItem('userPrompts');
      }
      
      // 성공 메시지 표시
      setSuccessMessage('로그아웃되었습니다.');
      setShowSuccess(true);
      
      // 잠시 후 홈페이지로 리다이렉트
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
      setSuccessMessage('로그아웃 중 오류가 발생했습니다.');
      setShowSuccess(true);
    }
  };

  const handleCopyPrompt = (template: string) => {
    navigator.clipboard.writeText(template);
    setSuccessMessage('클립보드에 복사되었습니다!');
    setShowSuccess(true);
  };

  const handleToggleFavorite = (id: string) => {
    const updatedPrompts = prompts.map(prompt => 
      prompt.id === id ? { ...prompt, isFavorite: !prompt.isFavorite } : prompt
    );
    setPrompts(updatedPrompts);
    savePromptsToStorage(updatedPrompts);
  };

  const handleDeletePrompt = (id: string) => {
    const updatedPrompts = prompts.filter(prompt => prompt.id !== id);
    setPrompts(updatedPrompts);
    savePromptsToStorage(updatedPrompts);
    setSuccessMessage('프롬프트가 삭제되었습니다!');
    setShowSuccess(true);
  };

  // 현재 사용자가 생성한 프롬프트만 필터링
  const currentUserId = user?.id || user?.email || 'temp-user';
  console.log('Current user ID:', currentUserId);
  console.log('All prompts:', prompts);
  
  const userPrompts = prompts.filter(prompt => {
    const matches = prompt.userId === currentUserId;
    console.log(`Prompt ${prompt.title}: userId=${prompt.userId}, matches=${matches}`);
    return matches;
  });
  
  console.log('Filtered user prompts:', userPrompts);
  
  const filteredPrompts = selectedCategory === 'all' 
    ? userPrompts 
    : userPrompts.filter(prompt => prompt.category === selectedCategory);

  const categories = [
    '일반',
    '학습',
    '작업',
    '창작',
    '분석',
    '기타'
  ];

  // 로딩 중일 때 로딩 화면 표시
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            인증 상태를 확인하는 중...
          </Typography>
        </Box>
      </Container>
    );
  }

  // 로그인하지 않은 경우 홈페이지로 리다이렉트
  if (!user) {
    console.log('No user found, showing loading...');
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            로그인이 필요합니다...
          </Typography>
        </Box>
      </Container>
    );
  }

  // 관리자가 아닌 경우 접근 차단
  if (!isAdmin) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column' }}>
          <Typography variant="h4" color="error" gutterBottom>
            접근 권한이 없습니다
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            이 페이지는 관리자만 접근할 수 있습니다.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/')}
            sx={{ mt: 2 }}
          >
            홈으로 돌아가기
          </Button>
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
            <AnalyticsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            분석 대시보드
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<CreateIcon />}
              onClick={handleCreatePrompt}
              sx={{ minWidth: 200 }}
            >
              프롬프트 생성하기
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ minWidth: 120 }}
            >
              로그아웃
            </Button>
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">
          프롬프트 사용 현황과 성과를 한눈에 확인하세요.
        </Typography>
      </Box>

      {/* 주요 지표 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">총 프롬프트</Typography>
            </Box>
            <Typography variant="h4" color="primary.main">
              {analyticsData.totalPrompts.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              지난 주 대비 +12%
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimelineIcon sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="h6">활성 사용자</Typography>
            </Box>
            <Typography variant="h4" color="success.main">
              {analyticsData.activeUsers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              이번 주 활성 사용자
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BarChartIcon sx={{ mr: 1, color: 'warning.main' }} />
              <Typography variant="h6">프롬프트 사용</Typography>
            </Box>
            <Typography variant="h4" color="warning.main">
              {analyticsData.promptUsage.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              이번 달 총 사용량
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon sx={{ mr: 1, color: 'info.main' }} />
              <Typography variant="h6">성공률</Typography>
            </Box>
            <Typography variant="h4" color="info.main">
              {analyticsData.successRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              사용자 만족도
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* 상세 분석 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 4 }}>
        {/* 인기 카테고리 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              인기 카테고리
            </Typography>
            <Box sx={{ mt: 3 }}>
              {analyticsData.popularCategories.map((category, index) => (
                <Box key={category.name} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2">{category.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.count}개 ({category.percentage}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={category.percentage}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* 최근 활동 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              최근 활동
            </Typography>
            <List sx={{ mt: 2 }}>
              {analyticsData.recentActivity.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <VisibilityIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.user} • ${activity.timestamp}`}
                    />
                  </ListItem>
                  {index < analyticsData.recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* 주간 트렌드 */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              주간 트렌드
            </Typography>
            <Box>
              <Tooltip title="다운로드">
                <IconButton size="small">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="공유">
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="설정">
                <IconButton size="small">
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(7, 1fr)' }, gap: 2 }}>
            {analyticsData.weeklyTrends.map((day) => (
              <Box key={day.date} sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {day.date}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h6" color="primary.main">
                    {day.prompts}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    프롬프트
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" color="success.main">
                    {day.users}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    사용자
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* 내가 만든 프롬프트 */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              내가 만든 프롬프트
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  displayEmpty
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
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredPrompts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  아직 만든 프롬프트가 없습니다.
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<CreateIcon />}
                  onClick={handleCreatePrompt}
                  sx={{ mt: 2 }}
                >
                  첫 프롬프트 만들기
                </Button>
              </Box>
            ) : (
              filteredPrompts.map((prompt) => (
                <Paper key={prompt.id} variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
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
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      backgroundColor: 'grey.50', 
                      p: 2, 
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      mb: 2
                    }}
                  >
                    {prompt.template}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      생성일: {prompt.createdAt.toLocaleDateString()}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<CopyIcon />}
                        onClick={() => handleCopyPrompt(prompt.template)}
                      >
                        복사
                      </Button>
                      <Button
                        size="small"
                        startIcon={<StarIcon />}
                        onClick={() => handleToggleFavorite(prompt.id)}
                        color={prompt.isFavorite ? 'warning' : 'inherit'}
                      >
                        {prompt.isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}
                      </Button>
                      <Button
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeletePrompt(prompt.id)}
                        color="error"
                      >
                        삭제
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              ))
            )}
          </Box>
        </CardContent>
      </Card>

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
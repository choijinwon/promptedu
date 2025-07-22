'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { sharedPromptsApi } from '@/lib/supabase';
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
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  CircularProgress,
} from '@mui/material';

import {
  History as HistoryIcon,
  Create as CreateIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  ContentCopy as CopyIcon,
  Star as StarIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Link as LinkIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  template: string;
  variables: string[];
  isFavorite: boolean;
  isPublic: boolean;
  createdAt: Date;
  userId: string;
  shareUrl?: string;
}

export default function MyPrompts() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null);
  const [shareUrl, setShareUrl] = useState('');
  const [expandedPrompts, setExpandedPrompts] = useState<Set<string>>(new Set());

  // 데이터베이스에서 사용자 프롬프트 로드
  const loadPromptsFromDatabase = async () => {
    if (!user) return;
    
    try {
      const dbPrompts = await sharedPromptsApi.getUserPrompts(user.id);
      
      // 데이터베이스 프롬프트를 UI 형식으로 변환
      const convertedPrompts: PromptTemplate[] = dbPrompts.map((prompt: any) => ({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        category: prompt.category,
        template: prompt.template,
        variables: prompt.variables || [],
        isFavorite: prompt.is_favorite || false,
        isPublic: prompt.is_public || false,
        createdAt: new Date(prompt.created_at),
        userId: prompt.user_id,
        shareUrl: prompt.share_url || ''
      }));
      
      setPrompts(convertedPrompts);
    } catch (error) {
      console.error('사용자 프롬프트 로드 중 오류:', error);
      setPrompts([]);
    }
  };

  // 프롬프트를 로컬 스토리지에 저장
  const savePromptsToStorage = (promptsToSave: PromptTemplate[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userPrompts', JSON.stringify(promptsToSave));
    }
  };

  const handleCreatePrompt = () => {
    router.push('/prompt-creator');
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

  const handleTogglePublic = async (id: string) => {
    try {
      const prompt = prompts.find(p => p.id === id);
      if (!prompt) return;
      
      // 데이터베이스에서 공개 설정 업데이트
      await sharedPromptsApi.updatePrompt(id, {
        is_public: !prompt.isPublic
      });
      
      // 로컬 상태 업데이트
      const updatedPrompts = prompts.map(p => 
        p.id === id ? { ...p, isPublic: !p.isPublic } : p
      );
      setPrompts(updatedPrompts);
      
      setSuccessMessage('공개 설정이 변경되었습니다!');
      setShowSuccess(true);
    } catch (error) {
      console.error('공개 설정 변경 중 오류:', error);
      setSuccessMessage('공개 설정 변경 중 오류가 발생했습니다.');
      setShowSuccess(true);
    }
  };

  const handleDeletePrompt = async (id: string) => {
    try {
      // 데이터베이스에서 프롬프트 삭제
      await sharedPromptsApi.deletePrompt(id);
      
      // 로컬 상태 업데이트
      const updatedPrompts = prompts.filter(prompt => prompt.id !== id);
      setPrompts(updatedPrompts);
      
      setSuccessMessage('프롬프트가 삭제되었습니다!');
      setShowSuccess(true);
    } catch (error) {
      console.error('프롬프트 삭제 중 오류:', error);
      setSuccessMessage('프롬프트 삭제 중 오류가 발생했습니다.');
      setShowSuccess(true);
    }
  };

  const handleSharePrompt = (prompt: PromptTemplate) => {
    setSelectedPrompt(prompt);
    setShareUrl(`${window.location.origin}/shared-prompt/${prompt.id}`);
    setShareDialogOpen(true);
  };

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setSuccessMessage('공유 링크가 클립보드에 복사되었습니다!');
    setShowSuccess(true);
  };

  const handleToggleExpand = (promptId: string) => {
    setExpandedPrompts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(promptId)) {
        newSet.delete(promptId);
      } else {
        newSet.add(promptId);
      }
      return newSet;
    });
  };

  // 로그인 체크 및 초기 데이터 로드
  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    } else if (user && !loading) {
      loadPromptsFromDatabase();
    }
  }, [user, loading, router]);

  // 현재 사용자가 생성한 프롬프트만 필터링
  const userPrompts = prompts.filter(prompt => prompt.userId === (user?.id || 'temp-user'));
  
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ mr: 2 }}
          >
            뒤로가기
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            내가 만든 프롬프트
          </Typography>
          <Button
            variant="contained"
            startIcon={<CreateIcon />}
            onClick={handleCreatePrompt}
            sx={{ minWidth: 200 }}
          >
            새 프롬프트 만들기
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          내가 만든 프롬프트를 관리하고 공유하세요.
        </Typography>
      </Box>

      {/* 필터 및 통계 */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
          <Box>
            <FormControl size="small" sx={{ minWidth: 200 }}>
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
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', ml: 'auto' }}>
            <Chip 
              icon={<PublicIcon />} 
              label={`공개 ${userPrompts.filter(p => p.isPublic).length}개`}
              color="success"
              variant="outlined"
            />
            <Chip 
              icon={<LockIcon />} 
              label={`비공개 ${userPrompts.filter(p => !p.isPublic).length}개`}
              color="default"
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
            <Card key={prompt.id} variant="outlined" sx={{ position: 'relative' }}>
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
                      <Chip 
                        icon={prompt.isPublic ? <PublicIcon /> : <LockIcon />}
                        label={prompt.isPublic ? '공개' : '비공개'} 
                        size="small" 
                        color={prompt.isPublic ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </Box>
                    {prompt.description && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 2,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          lineHeight: 1.4
                        }}
                      >
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
                    <IconButton
                      size="small"
                      onClick={() => handleToggleExpand(prompt.id)}
                      sx={{ ml: 1 }}
                    >
                      {expandedPrompts.has(prompt.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  
                  <Box
                    sx={{
                      maxHeight: expandedPrompts.has(prompt.id) ? 'none' : '120px',
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'max-height 0.3s ease-in-out'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: 1.5
                      }}
                    >
                      {prompt.template}
                    </Typography>
                    
                    {!expandedPrompts.has(prompt.id) && prompt.template.length > 200 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '40px',
                          background: 'linear-gradient(transparent, #f5f5f5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          더 보기
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Paper>

                {/* 액션 버튼 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    생성일: {prompt.createdAt.toLocaleDateString()}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="복사">
                      <IconButton
                        size="small"
                        onClick={() => handleCopyPrompt(prompt.template)}
                      >
                        <CopyIcon />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title={prompt.isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleFavorite(prompt.id)}
                        color={prompt.isFavorite ? 'warning' : 'default'}
                      >
                        <StarIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={prompt.isPublic ? '비공개로 변경' : '공개로 변경'}>
                      <IconButton
                        size="small"
                        onClick={() => handleTogglePublic(prompt.id)}
                        color={prompt.isPublic ? 'success' : 'default'}
                      >
                        {prompt.isPublic ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="공유">
                      <IconButton
                        size="small"
                        onClick={() => handleSharePrompt(prompt)}
                      >
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="삭제">
                      <IconButton
                        size="small"
                        onClick={() => handleDeletePrompt(prompt.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* 공유 다이얼로그 */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShareIcon />
            프롬프트 공유
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            아래 링크를 통해 다른 사람들과 프롬프트를 공유할 수 있습니다.
          </Typography>
          <TextField
            fullWidth
            value={shareUrl}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopyShareUrl}>
                  <CopyIcon />
                </IconButton>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={selectedPrompt?.isPublic || false}
                onChange={() => selectedPrompt && handleTogglePublic(selectedPrompt.id)}
              />
            }
            label="공개 설정"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>

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
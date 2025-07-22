'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Box, Container, Typography, Paper, Divider, List, ListItem, ListItemText, Chip, Card, CardContent, CardHeader, Avatar, Stack, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LinearProgress from '@mui/material/LinearProgress';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [lastLogout, setLastLogout] = useState<string | null>(null);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<any | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    preferred_time: '',
    current_work: '',
    goals: '',
    notes: ''
  });
  const [addLoading, setAddLoading] = useState(false);
  // Analytics 대시보드 모달 상태
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  // Analytics 대시보드 데이터 (고정값, 실제 구현은 analytics/page.tsx 참고)
  const analyticsData = {
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
  };

  // 인증 및 최근 접속/로그아웃 시간
  useEffect(() => {
    const isAuthed = typeof window !== 'undefined' && sessionStorage.getItem('admin-auth') === 'true';
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('admin-id') : null;
    if (!isAuthed) {
      router.replace('/admin/login');
    } else {
      setAuthChecked(true);
      setAdminName(sessionStorage.getItem('admin-name') || '');
      if (userId) {
        fetch(`/api/admin-log?user_id=${userId}`)
          .then(res => res.json())
          .then(data => {
            if (data.login_time) setLastLogin(data.login_time);
            if (data.logout_time) setLastLogout(data.logout_time);
          });
      }
    }
  }, [router]);

  // Supabase에서 상담 데이터 fetch
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setConsultations(data || []);
      setLoading(false);
    }
    if (authChecked) fetchData();
  }, [authChecked]);

  // 통계
  const total = consultations.length;
  const pending = consultations.filter(c => c.status === 'pending').length;
  const contacted = consultations.filter(c => c.status === 'contacted').length;
  const completed = consultations.filter(c => c.status === 'completed').length;

  // 상세 보기
  const handleViewDetails = (consultation: any) => {
    setSelectedConsultation(consultation);
    setOpenDialog(true);
  };

  // 상태 변경
  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('consultations')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) {
      setConsultations(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      setSnackbar({ open: true, message: '상태가 업데이트되었습니다.', severity: 'success' });
    } else {
      setSnackbar({ open: true, message: '상태 변경 실패', severity: 'error' });
    }
  };

  // 삭제
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('consultations')
      .delete()
      .eq('id', id);
    if (!error) {
      setConsultations(prev => prev.filter(item => item.id !== id));
      setSnackbar({ open: true, message: '상담 신청이 삭제되었습니다.', severity: 'success' });
    } else {
      setSnackbar({ open: true, message: '삭제 실패', severity: 'error' });
    }
  };

  // 상태 칩
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'contacted': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '대기중';
      case 'contacted': return '연락완료';
      case 'completed': return '상담완료';
      case 'cancelled': return '취소';
      default: return '알 수 없음';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <PendingIcon />;
      case 'contacted': return <CheckCircleIcon />;
      case 'completed': return <CheckCircleIcon />;
      case 'cancelled': return <CancelIcon />;
      default: return <PendingIcon />;
    }
  };

  // 필터
  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch =
      consultation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleLogout = () => {
    const userId = sessionStorage.getItem('admin-id');
    if (userId) {
      fetch('/api/admin-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, type: 'logout' })
      });
    }
    sessionStorage.removeItem('admin-auth');
    sessionStorage.removeItem('admin-name');
    sessionStorage.removeItem('admin-id');
    router.replace('/admin/login');
  };

  // 신규 등록 핸들러
  const handleAddChange = (field: string, value: string) => {
    setAddForm(prev => ({ ...prev, [field]: value }));
  };
  const handleAddSubmit = async () => {
    setAddLoading(true);
    const { name, email, phone, company, position, preferred_time, current_work, goals } = addForm;
    if (!name || !email || !phone || !company || !position) {
      setSnackbar({ open: true, message: '필수 항목을 모두 입력하세요.', severity: 'error' });
      setAddLoading(false);
      return;
    }
    const { data, error } = await supabase.from('consultations').insert([{ ...addForm, status: 'pending' }]).select();
    if (!error && data && data.length > 0) {
      setConsultations(prev => [data[0], ...prev]);
      setSnackbar({ open: true, message: '상담 신청이 등록되었습니다.', severity: 'success' });
      setOpenAddDialog(false);
      setAddForm({ name: '', email: '', phone: '', company: '', position: '', preferred_time: '', current_work: '', goals: '', notes: '' });
    } else {
      setSnackbar({ open: true, message: '등록 실패', severity: 'error' });
    }
    setAddLoading(false);
  };

  if (!authChecked) return null;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 4 }}>
      <Container maxWidth="xl">
        {/* 상단 바: 관리자 이름 & 로그아웃 */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2, gap: 2 }}>
          {adminName && (
            <Typography sx={{ color: 'white', fontWeight: 'bold', mr: 2 }}>
              {adminName} 님
            </Typography>
          )}
          {lastLogin && (
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', mr: 1 }}>
              최근 접속: {new Date(lastLogin).toLocaleString('ko-KR')}
            </Typography>
          )}
          {lastLogout && (
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', mr: 1 }}>
              최근 로그아웃: {new Date(lastLogout).toLocaleString('ko-KR')}
            </Typography>
          )}
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setAnalyticsOpen(true)}
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.08)' } }}
          >
            관리자 대시보드
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.08)' } }}
          >
            로그아웃
          </Button>
        </Box>

        {/* 헤더 */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            🎯 관리자 대시보드
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              mb: 4
            }}
          >
            상담 신청 관리
          </Typography>
        </Box>

        {/* 통계 카드 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card sx={{ 
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                총 신청 건수
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ 
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {pending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                대기중
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ 
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h4" color="info.main" fontWeight="bold">
                {contacted}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                연락완료
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ 
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                상담완료
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* 필터 및 검색 */}
        <Paper sx={{ 
          p: 3, 
          mb: 3, 
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, alignItems: 'center' }}>
            <Box sx={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="이름, 이메일, 회사로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
            <Box sx={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>상태 필터</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="상태 필터"
                >
                  <MenuItem value="all">전체</MenuItem>
                  <MenuItem value="pending">대기중</MenuItem>
                  <MenuItem value="contacted">연락완료</MenuItem>
                  <MenuItem value="completed">상담완료</MenuItem>
                  <MenuItem value="cancelled">취소</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ xs: 12, md: 3 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                fullWidth
              >
                필터 초기화
              </Button>
            </Box>
            <Box sx={{ xs: 12, md: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddDialog(true)}
                fullWidth
                sx={{
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)'
                  }
                }}
              >
                신규 등록
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* 상담 신청 리스트 */}
        <Paper sx={{ 
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>신청자</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>회사/직책</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>연락처</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>목표</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>상태</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>신청일</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography>로딩 중...</Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredConsultations.map((consultation) => (
                  <TableRow key={consultation.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {consultation.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {consultation.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {consultation.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {consultation.position}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {consultation.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200 }}>
                        {consultation.goals}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(consultation.status)}
                        label={getStatusText(consultation.status)}
                        color={getStatusColor(consultation.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {consultation.created_at ? new Date(consultation.created_at).toLocaleDateString() : ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(consultation)}
                          sx={{ color: 'primary.main' }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleStatusChange(consultation.id, 'contacted')}
                          sx={{ color: 'info.main' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(consultation.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* 상세 보기 다이얼로그 */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            상담 신청 상세 정보
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            {selectedConsultation && (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box sx={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>기본 정보</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">이름</Typography>
                    <Typography variant="body1">{selectedConsultation.name}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">이메일</Typography>
                    <Typography variant="body1">{selectedConsultation.email}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">전화번호</Typography>
                    <Typography variant="body1">{selectedConsultation.phone}</Typography>
                  </Box>
                </Box>
                <Box sx={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>회사 정보</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">회사명</Typography>
                    <Typography variant="body1">{selectedConsultation.company}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">직책</Typography>
                    <Typography variant="body1">{selectedConsultation.position}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">선호 시간</Typography>
                    <Typography variant="body1">{selectedConsultation.preferred_time}</Typography>
                  </Box>
                </Box>
                <Box sx={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>상담 목표</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">현재 업무</Typography>
                    <Typography variant="body1">{selectedConsultation.current_work}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">목표</Typography>
                    <Typography variant="body1">{selectedConsultation.goals}</Typography>
                  </Box>
                </Box>
                <Box sx={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>관리 정보</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">상태</Typography>
                    <Chip
                      icon={getStatusIcon(selectedConsultation.status)}
                      label={getStatusText(selectedConsultation.status)}
                      color={getStatusColor(selectedConsultation.status) as any}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">신청일</Typography>
                    <Typography variant="body1">
                      {selectedConsultation.created_at ? new Date(selectedConsultation.created_at).toLocaleString() : ''}
                    </Typography>
                  </Box>
                  {selectedConsultation.notes && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">메모</Typography>
                      <Typography variant="body1">{selectedConsultation.notes}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenDialog(false)}>닫기</Button>
            <Button 
              variant="contained"
              onClick={() => {
                if (selectedConsultation) {
                  handleStatusChange(selectedConsultation.id, 'contacted');
                  setOpenDialog(false);
                }
              }}
            >
              연락완료로 변경
            </Button>
          </DialogActions>
        </Dialog>

        {/* 신규 등록 다이얼로그 */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
            상담 신청 신규 등록
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#764ba2' }}>
                기본 정보 <span style={{ color: '#ff5252' }}>*</span>
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Box sx={{ xs: 12, sm: 6 }}>
                  <TextField label="이름 *" fullWidth value={addForm.name} onChange={e => handleAddChange('name', e.target.value)} />
                </Box>
                <Box sx={{ xs: 12, sm: 6 }}>
                  <TextField label="이메일 *" fullWidth value={addForm.email} onChange={e => handleAddChange('email', e.target.value)} />
                </Box>
                <Box sx={{ xs: 12, sm: 6 }}>
                  <TextField label="전화번호 *" fullWidth value={addForm.phone} onChange={e => handleAddChange('phone', e.target.value)} />
                </Box>
                <Box sx={{ xs: 12, sm: 6 }}>
                  <TextField label="회사명 *" fullWidth value={addForm.company} onChange={e => handleAddChange('company', e.target.value)} />
                </Box>
                <Box sx={{ xs: 12, sm: 6 }}>
                  <TextField label="직책 *" fullWidth value={addForm.position} onChange={e => handleAddChange('position', e.target.value)} />
                </Box>
                <Box sx={{ xs: 12, sm: 6 }}>
                  <TextField label="선호 시간" fullWidth value={addForm.preferred_time} onChange={e => handleAddChange('preferred_time', e.target.value)} />
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#764ba2' }}>
                상담 내용
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr' }, gap: 2 }}>
                <Box sx={{ xs: 12, sm: 12 }}>
                  <TextField label="현재 업무" fullWidth multiline rows={2} value={addForm.current_work} onChange={e => handleAddChange('current_work', e.target.value)} />
                </Box>
                <Box sx={{ xs: 12, sm: 12 }}>
                  <TextField label="상담 목표" fullWidth multiline rows={2} value={addForm.goals} onChange={e => handleAddChange('goals', e.target.value)} />
                </Box>
                <Box sx={{ xs: 12, sm: 12 }}>
                  <TextField label="메모" fullWidth multiline rows={2} value={addForm.notes} onChange={e => handleAddChange('notes', e.target.value)} />
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenAddDialog(false)} disabled={addLoading}>취소</Button>
            <Button onClick={handleAddSubmit} variant="contained" disabled={addLoading}>
              {addLoading ? '등록 중...' : '등록'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Analytics 대시보드 모달 */}
        <Dialog open={analyticsOpen} onClose={() => setAnalyticsOpen(false)} maxWidth="lg" fullWidth>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AnalyticsIcon color="primary" /> 분석 대시보드
          </DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAnalyticsOpen(false)} color="primary">닫기</Button>
          </DialogActions>
        </Dialog>

        {/* 스낵바 */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
} 
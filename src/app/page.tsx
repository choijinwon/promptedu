'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import {
  Box, Container, Typography, Paper, Divider, List, ListItem, ListItemText, Chip, Card, CardContent, CardHeader, Avatar, Stack, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AppBar, Toolbar, Menu
} from "@mui/material";
import {
  School as SchoolIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  AutoAwesome as AutoAwesomeIcon,
  Lightbulb as LightbulbIcon,
  Psychology as PsychologyIcon,
  Science as ScienceIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Create as CreateIcon,
  History as HistoryIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  ExpandMore as ExpandMoreIcon,
  Work as WorkIcon,
  BusinessCenter as BusinessCenterIcon,
  Diamond as DiamondIcon,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';

async function fetchConsultations() {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export default function LandingPage() {
  const { user, signIn, signUp, signOut, resetPassword, signInWithGoogle, signInWithGitHub, isAdmin } = useAuth();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [signupOpen, setSignupOpen] = React.useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({
    email: '',
    password: '',
  });
  const [signupForm, setSignupForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [resetPasswordForm, setResetPasswordForm] = React.useState({
    email: '',
  });
  const [resetPasswordLoading, setResetPasswordLoading] = React.useState(false);
  const [resetPasswordError, setResetPasswordError] = React.useState('');
  const [servicesMenuAnchor, setServicesMenuAnchor] = React.useState<null | HTMLElement>(null);


  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleSignupOpen = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);
  
  const handleServicesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setServicesMenuAnchor(event.currentTarget);
  };
  
  const handleServicesMenuClose = () => {
    setServicesMenuAnchor(null);
  };

  const [loginLoading, setLoginLoading] = React.useState(false);
  const [signupLoading, setSignupLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [signupError, setSignupError] = React.useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      
      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('supabaseUrl')) {
          setLoginError('Supabase가 설정되지 않았습니다. 관리자에게 문의하세요.');
        } else if (error.message.includes('Invalid login credentials')) {
          setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else if (error.message.includes('Email not confirmed')) {
          setLoginError('이메일 인증이 필요합니다. 이메일을 확인해주세요.');
        } else {
          setLoginError(error.message || '로그인 중 오류가 발생했습니다.');
        }
      } else {
        handleLoginClose();
        setLoginForm({ email: '', password: '' });
        // 로그인 성공 후 관리자인 경우 analytics 페이지로 이동, 아니면 홈페이지 유지
        if (isAdmin) {
          router.push('/analytics');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');

    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError('비밀번호가 일치하지 않습니다.');
      setSignupLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setSignupError('비밀번호는 최소 6자 이상이어야 합니다.');
      setSignupLoading(false);
      return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupForm.email)) {
      setSignupError('올바른 이메일 주소를 입력해주세요.');
      setSignupLoading(false);
      return;
    }

    try {
      const { error } = await signUp(signupForm.email, signupForm.password, signupForm.name);
      
      if (error) {
        console.error('Signup error:', error);
        if (error.message.includes('supabaseUrl')) {
          setSignupError('Supabase가 설정되지 않았습니다. 관리자에게 문의하세요.');
        } else if (error.message.includes('already registered')) {
          setSignupError('이미 등록된 이메일입니다.');
        } else if (error.message.includes('invalid email')) {
          setSignupError('올바른 이메일 주소를 입력해주세요.');
        } else {
          setSignupError(error.message || '회원가입 중 오류가 발생했습니다.');
        }
      } else {
        handleSignupClose();
        setSignupForm({ name: '', email: '', password: '', confirmPassword: '', role: 'student' });
        alert('회원가입이 완료되었습니다. 이메일을 확인해주세요.');
        // 회원가입 성공 후 관리자인 경우 analytics 페이지로 이동, 아니면 홈페이지 유지
        if (isAdmin) {
          router.push('/analytics');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setSignupLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetPasswordLoading(true);
    setResetPasswordError('');

    try {
      const { error } = await resetPassword(resetPasswordForm.email);
      
      if (error) {
        setResetPasswordError(error.message);
      } else {
        setResetPasswordOpen(false);
        setResetPasswordForm({ email: '' });
        alert('비밀번호 재설정 이메일이 발송되었습니다.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setResetPasswordError('비밀번호 재설정 중 오류가 발생했습니다.');
    } finally {
      setResetPasswordLoading(false);
    }
  };



  const services = [
    {
      title: '1:1 코칭',
      price: '시간당 15만원',
      description: '개인 맞춤형 AI 교육 코칭',
      icon: <WorkIcon />,
      color: '#1976d2',
    },
    {
      title: '기업 맞춤 교육',
      price: '1일 300만원',
      description: '기업 전용 AI 교육 프로그램',
      icon: <BusinessCenterIcon />,
      color: '#2e7d32',
    },
    {
      title: 'VIP 멤버십',
      price: '월 30만원',
      description: '프리미엄 AI 교육 서비스',
      icon: <DiamondIcon />,
      color: '#ed6c02',
    },
  ];

  const features = [
    {
      icon: <AutoAwesomeIcon />,
      title: 'AI 프롬프트 전문',
      description: '교육학적으로 검증된 프롬프트로 효과적인 학습 경험을 제공합니다.',
      color: '#1976d2',
    },
    {
      icon: <PsychologyIcon />,
      title: '개인화 학습',
      description: '학습자의 수준과 특성에 맞춘 맞춤형 교육 프롬프트를 생성합니다.',
      color: '#2e7d32',
    },
    {
      icon: <GroupIcon />,
      title: '교육자 커뮤니티',
      description: '전국의 교육자들이 공유하는 프롬프트와 교육 노하우를 확인하세요.',
      color: '#ed6c02',
    },
    {
      icon: <AssessmentIcon />,
      title: '학습 분석',
      description: '실시간 학습 성과 분석과 개선점을 제공합니다.',
      color: '#9c27b0',
    },
    {
      icon: <SecurityIcon />,
      title: '안전한 환경',
      description: '교육에 특화된 안전하고 신뢰할 수 있는 AI 환경을 제공합니다.',
      color: '#d32f2f',
    },
    {
      icon: <SpeedIcon />,
      title: '빠른 생성',
      description: '몇 초 만에 교육 목적에 맞는 프롬프트를 생성할 수 있습니다.',
      color: '#388e3c',
    },
  ];

  const testimonials = [
    {
      name: '김선생님',
      role: '초등학교 교사',
      content: 'PromptEDU로 수학 개념을 쉽게 설명하는 프롬프트를 만들 수 있어서 아이들이 더 잘 이해하네요.',
      rating: 5,
    },
    {
      name: '이교수님',
      role: '대학교 교수',
      content: '연구와 교육을 병행하는데 PromptEDU가 큰 도움이 됩니다. 시간을 절약할 수 있어요.',
      rating: 5,
    },
    {
      name: '박학부모님',
      role: '학부모',
      content: '아이의 학습을 도와주는 프롬프트를 만들어서 가정에서도 효과적으로 학습할 수 있어요.',
      rating: 4,
    },
  ];

  const [stats, setStats] = React.useState([
    { number: '1,234+', label: '등록된 교육자' },
    { number: '12,567+', label: '활성 학습자' },
    { number: '2,890+', label: '교육 프롬프트' },
    { number: '28%', label: '학습 성과 향상' },
  ]);

  // 통계 데이터 가져오기
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('통계 데이터 가져오기 실패:', error);
        // 오류 시 기본 데이터 유지
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <SchoolIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            PromptEDU
          </Typography>
          {user ? (
            <>
              {isAdmin && null}
              <Button color="inherit" onClick={() => router.push('/prompt-creator')} startIcon={<CreateIcon />}>
                프롬프트 만들기
              </Button>
              <Button color="inherit" onClick={() => router.push('/my-prompts')} startIcon={<HistoryIcon />}>
                내가 만든 프롬프트
              </Button>
              <Button color="inherit" onClick={() => router.push('/profile')}>
                프로필
              </Button>
              <Button color="inherit" onClick={signOut} sx={{ ml: 2 }}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => router.push('/shared-prompts')} startIcon={<PublicIcon />}>
                공유 프롬프트
              </Button>
              <Button
                color="inherit"
                onClick={handleServicesMenuOpen}
                endIcon={<ExpandMoreIcon />}
                sx={{ ml: 1 }}
              >
                서비스
              </Button>
              <Button color="inherit" onClick={handleLoginOpen} startIcon={<LoginIcon />}>
                로그인
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSignupOpen}
                startIcon={<PersonAddIcon />}
                sx={{ ml: 2 }}
              >
                회원가입
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Services Menu */}
      <Menu
        anchorEl={servicesMenuAnchor}
        open={Boolean(servicesMenuAnchor)}
        onClose={handleServicesMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 300,
            boxShadow: 3,
          }
        }}
      >
        <MenuItem
          onClick={() => {
            handleServicesMenuClose();
            router.push('/services/coaching');
          }}
          sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', '&:hover': { backgroundColor: 'action.hover' } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ color: services[0].color, mr: 2 }}>
              {services[0].icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {services[0].title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {services[0].description}
              </Typography>
              <Typography variant="body2" sx={{ color: services[0].color, fontWeight: 'bold', mt: 0.5 }}>
                {services[0].price}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        {services.slice(1).map((service, index) => (
          <MenuItem 
            key={index + 1}
            onClick={handleServicesMenuClose}
            sx={{ 
              p: 2,
              borderBottom: index < services.length - 2 ? '1px solid' : 'none',
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Box sx={{ color: service.color, mr: 2 }}>
                {service.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
                <Typography variant="body2" sx={{ color: service.color, fontWeight: 'bold', mt: 0.5 }}>
                  {service.price}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
        <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="caption" color="text.secondary">
            자세한 문의는 고객센터로 연락주세요
          </Typography>
        </Box>
      </Menu>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                AI 교육의 새로운 패러다임
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                교육자와 학습자를 위한 AI 프롬프트 전문 플랫폼으로 
                교육 혁신을 선도합니다.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={handleSignupOpen}
                  sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  무료로 시작하기
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => {
                    console.log('데모 보기 버튼 클릭됨');
                    router.push('/demo');
                  }}
                  sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'grey.300' } }}
                >
                  데모 보기
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 200, opacity: 0.1 }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>



      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            PromptEDU의 특별한 기능
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
            {features.map((feature, index) => (
              <Card key={index} elevation={2} sx={{ height: '100%', '&:hover': { elevation: 4 } }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ color: feature.color, mb: 2 }}>
                    {React.cloneElement(feature.icon, { sx: { fontSize: 48 } })}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            사용자들의 후기
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Card key={index} elevation={2}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }}>{testimonial.name[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" paragraph>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2" gutterBottom>
              지금 시작하세요
            </Typography>
            <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
              교육의 미래를 경험해보세요. PromptEDU와 함께 AI 교육의 새로운 시대를 열어가세요.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={handleSignupOpen}
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
            >
              무료 회원가입
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: 'grey.900', color: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                PromptEDU
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                AI 교육의 새로운 패러다임을 선도하는 플랫폼입니다.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                제품
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="프롬프트 생성기" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="학습 분석" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="교육자 커뮤니티" />
                </ListItem>
              </List>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                지원
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="고객 지원" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="문서" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="API" />
                </ListItem>
              </List>
            </Box>
          </Box>
          <Divider sx={{ my: 3, borderColor: 'grey.700' }} />
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © 2024 PromptEDU. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={handleLoginClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            로그인
            <IconButton onClick={handleLoginClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={handleLoginSubmit}>
          <DialogContent>
            {loginError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {loginError}
              </Typography>
            )}
            <TextField
              autoFocus
              margin="dense"
              label="이메일"
              type="email"
              fullWidth
              variant="outlined"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
              disabled={loginLoading}
            />
            <TextField
              margin="dense"
              label="비밀번호"
              type="password"
              fullWidth
              variant="outlined"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
              disabled={loginLoading}
            />
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Button
                size="small"
                onClick={() => {
                  handleLoginClose();
                  setResetPasswordOpen(true);
                }}
              >
                비밀번호를 잊으셨나요?
              </Button>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleLoginClose} disabled={loginLoading}>
              취소
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={loginLoading}
            >
              {loginLoading ? '로그인 중...' : '로그인'}
            </Button>
          </DialogActions>
        </form>
        
        <Divider sx={{ mx: 3, my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            또는
          </Typography>
        </Divider>
        
        <Box sx={{ p: 3, pt: 0 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={async () => {
              const { error } = await signInWithGoogle();
              if (error) {
                alert(error.message);
              } else {
                // Google 로그인 성공 후 관리자인 경우 analytics 페이지로 이동
                if (isAdmin) {
                  router.push('/analytics');
                }
              }
            }}
            sx={{ mb: 2 }}
          >
            Google로 로그인
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={async () => {
              const { error } = await signInWithGitHub();
              if (error) {
                alert(error.message);
              } else {
                // GitHub 로그인 성공 후 관리자인 경우 analytics 페이지로 이동
                if (isAdmin) {
                  router.push('/analytics');
                }
              }
            }}
          >
            GitHub로 로그인
          </Button>
        </Box>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={resetPasswordOpen} onClose={() => setResetPasswordOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            비밀번호 재설정
            <IconButton onClick={() => setResetPasswordOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={handleResetPassword}>
          <DialogContent>
            {resetPasswordError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {resetPasswordError}
              </Typography>
            )}
            <Typography variant="body2" sx={{ mb: 2 }}>
              가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="이메일"
              type="email"
              fullWidth
              variant="outlined"
              value={resetPasswordForm.email}
              onChange={(e) => setResetPasswordForm({ email: e.target.value })}
              required
              disabled={resetPasswordLoading}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setResetPasswordOpen(false)} disabled={resetPasswordLoading}>
              취소
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={resetPasswordLoading}
            >
              {resetPasswordLoading ? '전송 중...' : '재설정 링크 보내기'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onClose={handleSignupClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            회원가입
            <IconButton onClick={handleSignupClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSignupSubmit}>
          <DialogContent>
            {signupError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {signupError}
              </Typography>
            )}
            <TextField
              autoFocus
              margin="dense"
              label="이름"
              fullWidth
              variant="outlined"
              value={signupForm.name}
              onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
              required
              disabled={signupLoading}
            />
            <TextField
              margin="dense"
              label="이메일"
              type="email"
              fullWidth
              variant="outlined"
              value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              required
              disabled={signupLoading}
            />
            <TextField
              margin="dense"
              label="비밀번호"
              type="password"
              fullWidth
              variant="outlined"
              value={signupForm.password}
              onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
              required
              disabled={signupLoading}
            />
            <TextField
              margin="dense"
              label="비밀번호 확인"
              type="password"
              fullWidth
              variant="outlined"
              value={signupForm.confirmPassword}
              onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
              required
              disabled={signupLoading}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleSignupClose} disabled={signupLoading}>
              취소
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={signupLoading}
            >
              {signupLoading ? '회원가입 중...' : '회원가입'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
} 
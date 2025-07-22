"use client";

import { Box, Container, Typography, Paper, Divider, List, ListItem, ListItemText, Chip, Grid, Card, CardContent, CardHeader, Avatar, Stack, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Snackbar, Alert } from "@mui/material";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  Public as PublicIcon,
  Search as SearchIcon,
  ContentCopy,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Work as WorkIcon,
  BusinessCenter as BusinessCenterIcon,
  Diamond as DiamondIcon,
  EmojiEvents as EmojiEventsIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  RocketLaunch as RocketLaunchIcon,
  Bolt as BoltIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Timeline as TimelineIcon,
  MonetizationOn as MonetizationOnIcon,
  School as SchoolIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';

const sectionStyle = {
  mb: 6,
  borderRadius: 3,
  boxShadow: 2,
  p: { xs: 2, sm: 4 },
  background: 'white',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 4,
  },
};

const cardStyle = {
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: 6,
  },
};

const sectionHeader = (icon: ReactNode, label: string, color: string = 'primary') => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Avatar sx={{ bgcolor: `${color}.main`, mr: 2, transition: 'all 0.3s ease-in-out' }}>{icon}</Avatar>
    <Typography variant="h5" fontWeight="bold">{label}</Typography>
  </Box>
);

export default function CoachingPage() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [currentTab, setCurrentTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    currentWork: '',
    goals: '',
    preferredTime: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handlePackageClick = (packageName: string) => {
    setSelectedPackage(packageName);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPackage(null);
  };

  const getPackageDetails = (packageName: string) => {
    const packages = {
      '스타터': {
        title: '🥉 스타터 패키지',
        price: '60만원',
        description: 'AI 프롬프트 기초를 탄탄히 다지고 싶은 분들을 위한 패키지',
        features: [
          '1:1 코칭 4회 (4시간)',
          '사전 진단 세션 (30분)',
          '개인 맞춤 프롬프트 템플릿 20개',
          '2주간 이메일/메신저 지원',
          '1회 화상 피드백 세션 (30분)'
        ],
        color: '#bdbdbd'
      },
      '프로페셔널': {
        title: '🥈 프로페셔널 패키지',
        price: '150만원',
        description: '실무에서 즉시 활용할 수 있는 고급 프롬프트 스킬을 익히고 싶은 분들을 위한 패키지',
        features: [
          '1:1 코칭 10회 (10시간)',
          '사전 진단 + 중간 점검 세션',
          '개인 맞춤 프롬프트 템플릿 50개',
          '4주간 무제한 질문 지원',
          '주간 진도 체크 화상미팅 (30분 × 4회)',
          '개인 프롬프트 라이브러리 구축',
          '1개월 후 팔로업 세션 (1시간)'
        ],
        color: '#1976d2'
      },
      '이그제큐티브': {
        title: '🥇 이그제큐티브 패키지',
        price: '300만원',
        description: '조직의 AI 전략을 이끌고 혁신을 주도하고 싶은 리더들을 위한 프리미엄 패키지',
        features: [
          '1:1 코칭 20회 (20시간)',
          '종합 진단 + 월간 성과 리뷰',
          '무제한 개인 프롬프트 개발',
          '3개월간 24/7 전담 지원',
          '주 2회 정기 세션 (1시간 × 24회)',
          '팀/조직 프롬프트 표준화 지원',
          '6개월 후속 관리 서비스',
          'VIP 네트워킹 이벤트 초대'
        ],
        color: '#9c27b0'
      }
    };
    return packages[packageName as keyof typeof packages];
  };

  const getPackageInfo = (packageName: string) => {
    const packages = {
      basic: {
        title: '기본 패키지',
        price: '150,000원/시간',
        features: ['1:1 맞춤 코칭', '프롬프트 템플릿 제공', '실무 적용 가이드', '이메일 지원']
      },
      premium: {
        title: '프리미엄 패키지',
        price: '200,000원/시간',
        features: ['기본 패키지 포함', '그룹 세션 참여', '우선 예약권', '24시간 지원', '커스텀 템플릿 제작']
      },
      enterprise: {
        title: '기업 패키지',
        price: '협의',
        features: ['팀 맞춤 교육', '기업 전용 템플릿', '성과 측정 시스템', '전담 매니저', '무제한 지원']
      }
    };
    return packages[packageName as keyof typeof packages];
  };

  const profitabilityCards = [
    {
      title: '시간당 15만원 수익 구조 분석',
      content: (
        <>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: 'white', fontSize: '1.3rem' }}>
            🎯 가격 설정 근거
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: 'white', fontSize: '1.1rem' }}>
              1. 타겟 고객층의 시간 가치
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 경영진/임원: 시간당 수익 50만원 이상
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 전문 컨설턴트: 시간당 수익 30-100만원
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 고소득 전문직: 시간당 수익 20-50만원
            </Typography>
            <Box sx={{ mt: 1, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
              → 고객이 얻는 가치 대비 합리적인 투자
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: 'white', fontSize: '1.1rem' }}>
              2. 경쟁 서비스 대비 포지셔닝
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 일반 온라인 강의: 시간당 1-5만원 (그룹 교육)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 비즈니스 코칭: 시간당 10-30만원 (일반적 주제)
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • AI 프롬프트 전문 1:1 코칭: 15만원 (차별화된 전문성)
            </Typography>
          </Box>
        </>
      ),
      bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      icon: '💰'
    },
    {
      title: '월간/연간 수익 시나리오',
      content: (
        <>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: 'white', fontSize: '1.3rem' }}>
            📊 세 가지 시나리오
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              보수적 시나리오 (월 60시간)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 주당 15시간 × 4주 = 60시간/월
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 60시간 × 15만원 = 900만원/월
            </Typography>
            <Box sx={{ mt: 1, fontWeight: 'bold', color: '#ffd700' }}>
              연간 수익: 1억 800만원
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              적극적 시나리오 (월 80시간)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 주당 20시간 × 4주 = 80시간/월
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 80시간 × 15만원 = 1,200만원/월
            </Typography>
            <Box sx={{ mt: 1, fontWeight: 'bold', color: '#ffd700' }}>
              연간 수익: 1억 4,400만원
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              최적 시나리오 (월 100시간)
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 주당 25시간 × 4주 = 100시간/월
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 100시간 × 15만원 = 1,500만원/월
            </Typography>
            <Box sx={{ mt: 1, fontWeight: 'bold', color: '#ffd700' }}>
              연간 수익: 1억 8,000만원
            </Box>
          </Box>
        </>
      ),
      bgcolor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white',
      icon: '📊'
    },
    {
      title: '수익 최적화 전략',
      content: (
        <>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: 'white', fontSize: '1.3rem' }}>
            💡 단계별 확장 전략
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              1. 프리미엄 서비스 확장
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 6개월 후: 시간당 20만원 (전문성 입증 후)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 1년 후: 시간당 25만원 (고급 패키지)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 2년 후: 시간당 30만원 (업계 최고 전문가)
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              2. 부가 수익원 개발
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 그룹 코칭: 시간당 30만원 (6명 × 5만원)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 기업 교육: 1일 300만원 (더 높은 시간당 단가)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 디지털 콘텐츠: 한 번 제작으로 지속 수익
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              3. 고객 생애가치(LTV) 증대
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 평균 고객당 3-5회 재구매
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 추천 고객을 통한 자연스러운 확장
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 장기 멘토십 관계 구축
            </Typography>
          </Box>
        </>
      ),
      bgcolor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: 'white',
      icon: '📈'
    },
    {
      title: '실제 운영 시 고려사항',
      content: (
        <>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: 'white', fontSize: '1.3rem' }}>
            🔍 시간 활용 효율성
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              실제 1시간 코칭을 위한 시간 투입:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 사전 준비: 30분
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 코칭 세션: 60분
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 사후 정리: 30분
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 총 소요시간: 2시간
            </Typography>
            <Box sx={{ mt: 1, fontWeight: 'bold', color: '#ffd700' }}>
              → 실질 시간당 수익: 7.5만원
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              월간 운영 가능 시간:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 주 5일 × 1일 5시간 = 25시간/주
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 월 100시간 코칭 = 실제 200시간 투입
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 현실적 목표: 월 60-80시간 코칭
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              효율성 향상 방안:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 코칭 자료 템플릿화로 준비시간 단축
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 녹화/기록 시스템 자동화
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 자주 묻는 질문 데이터베이스 구축
            </Typography>
          </Box>
        </>
      ),
      bgcolor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: 'white',
      icon: '⚡'
    },
    {
      title: '빠른 실행을 위한 팁',
      content: (
        <>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: 'white', fontSize: '1.3rem' }}>
            🚀 단계별 목표 설정
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              첫 달 목표: 20시간 (300만원)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 무료 진단으로 10명 상담
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 그 중 5명 유료 전환 (평균 4시간)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 추천으로 추가 고객 확보
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              3개월 목표: 월 60시간 (900만원)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 입소문을 통한 자연 성장
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 성공 케이스 기반 마케팅
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 대기 고객 리스트 구축
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#ffd700', fontSize: '1.1rem' }}>
              6개월 목표: 월 80시간 (1,200만원)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 프리미엄 서비스 런칭
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 기업 고객 확보
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.8, fontSize: '1rem' }}>
              • 파트너십 마케팅 활성화
            </Typography>
          </Box>
        </>
      ),
      bgcolor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      color: 'white',
      icon: '🎯'
    }
  ];

  const handleNextTab = () => {
    setCurrentTab((prev) => (prev + 1) % profitabilityCards.length);
  };

  const handlePrevTab = () => {
    setCurrentTab((prev) => (prev - 1 + profitabilityCards.length) % profitabilityCards.length);
  };

  const handleBackClick = () => {
    router.back();
  };

  const validateForm = () => {
    const errors: any = {};
    if (!consultationForm.name) errors.name = '이름을 입력하세요.';
    if (!consultationForm.email) errors.email = '이메일을 입력하세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultationForm.email)) errors.email = '이메일 형식이 올바르지 않습니다.';
    if (!consultationForm.phone) errors.phone = '전화번호를 입력하세요.';
    else if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(consultationForm.phone)) errors.phone = '전화번호 형식: 010-1234-5678';
    if (!consultationForm.company) errors.company = '회사명을 입력하세요.';
    if (!consultationForm.position) errors.position = '직책을 입력하세요.';
    return errors;
  };

  const handleConsultationSubmit = async () => {
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setIsSubmitting(true);
    try {
      // DB 컬럼명에 맞게 key 변환
      const dbPayload = {
        ...consultationForm,
        preferred_time: consultationForm.preferredTime,
        current_work: consultationForm.currentWork,
        status: 'pending'
      };
      if ('preferredTime' in dbPayload) delete dbPayload.preferredTime;
      if ('currentWork' in dbPayload) delete dbPayload.currentWork;

      const { data, error } = await supabase
        .from('consultations')
        .insert([dbPayload]);
      if (!error) {
        setSnackbar({
          open: true,
          message: '상담 신청이 성공적으로 접수되었습니다. 24시간 내에 연락드리겠습니다.',
          severity: 'success'
        });
        setOpenDialog(false);
        setConsultationForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          currentWork: '',
          goals: '',
          preferredTime: '',
          notes: ''
        });
        setFormErrors({});
      } else {
        setSnackbar({
          open: true,
          message: error.message || '상담 신청 중 오류가 발생했습니다.',
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: '네트워크 오류가 발생했습니다.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setConsultationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 8,
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        {/* 뒤로가기 버튼 */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            뒤로가기
          </Button>
        </Box>

        {/* 헤더 섹션 */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          animation: 'fadeInUp 1s ease-out'
        }}>
          <Typography 
            variant="h2" 
            fontWeight="bold" 
            sx={{ 
              color: 'white',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            1:1 코칭 서비스
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              mb: 4,
              fontWeight: 300
            }}
          >
            AI 프롬프트 마스터가 되어 업무 효율성을 극대화하세요
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => setOpenDialog(true)}
            sx={{
              background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 8px 25px rgba(255,107,107,0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(255,107,107,0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            무료 상담 신청
          </Button>
        </Box>

        {/* 메인 콘텐츠 */}
        <Box sx={{ 
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 4,
          p: 4,
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* 코칭 세션 구조 */}
          <Box id="session-structure" sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                mb: 3,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              코칭 세션 구조
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
              코칭 세션 구조 <Chip label="60분" size="small" color="primary" sx={{ ml: 1, fontWeight: 'bold' }} />
            </Typography>
            <Grid container spacing={3} direction="column">
              {[
                { title: '웜업 (5분)', icon: '📝', color: '#667eea', bgcolor: '#f8f9ff' },
                { title: '핵심 학습 (40분)', icon: '🎯', color: '#28a745', bgcolor: '#f0fff4' },
                { title: '실습 & 피드백 (10분)', icon: '🔎', color: '#007bff', bgcolor: '#f0f8ff' },
                { title: '마무리 (5분)', icon: '✅', color: '#6f42c1', bgcolor: '#f8f4ff' }
              ].map((step, index) => (
                <Grid item xs={12} key={index}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 3,
                      background: step.bgcolor,
                      border: `2px solid ${step.color}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: '50%', 
                        background: step.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        fontSize: '1.5rem'
                      }}>
                        {step.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: step.color }}>
                        {step.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {index === 0 && "지난 세션 이후 적용 사례 공유, 어려웠던 점, 성공 사례 점검, 오늘 세션 목표 설정"}
                      {index === 1 && "실무 중심 프롬프트 개발, 고객의 실제 업무 사례 활용, 단계별 프롬프트 구조 분석, 실시간 개선 및 최적화, 다양한 변형 시나리오 연습"}
                      {index === 2 && "배운 내용 즉시 적용, 실시간 결과 확인 및 개선, 다음 주까지 과제 설정"}
                      {index === 3 && "핵심 포인트 요약, 개인 프롬프트 라이브러리 업데이트, 다음 세션 방향성 논의"}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.1)' }} />

          {/* 수익성 분석 */}
          <Box id="profitability" sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                mb: 3,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              수익성 분석
            </Typography>
            
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Paper 
                elevation={8} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3, 
                  background: profitabilityCards[currentTab].bgcolor,
                  minHeight: 250,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.1)',
                    zIndex: 1
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: 'white', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 12, fontSize: '2rem' }}>{profitabilityCards[currentTab].icon}</span>
                    {profitabilityCards[currentTab].title}
                  </Typography>
                  <Box sx={{ color: profitabilityCards[currentTab].color }}>
                    {profitabilityCards[currentTab].content}
                  </Box>
                </Box>
                
                {/* 좌우 화살표 버튼 */}
                <IconButton
                  onClick={handlePrevTab}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    zIndex: 3,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-50%) scale(1.1)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>◀</span>
                </IconButton>
                
                <IconButton
                  onClick={handleNextTab}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    zIndex: 3,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-50%) scale(1.1)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>▶</span>
                </IconButton>
              </Paper>
              
              {/* 탭 인디케이터 */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
                {profitabilityCards.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: index === currentTab ? 'primary.main' : 'grey.300',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: index === currentTab ? 'primary.dark' : 'grey.400',
                        transform: 'scale(1.2)'
                      }
                    }}
                    onClick={() => setCurrentTab(index)}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.1)' }} />

          {/* 패키지 옵션 */}
          <Box id="packages" sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                mb: 3,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              패키지 옵션
            </Typography>
            <Grid container spacing={3} alignItems="stretch">
              {['basic', 'premium', 'enterprise'].map((packageName, index) => {
                const packageInfo = getPackageInfo(packageName);
                return (
                  <Grid item xs={12} md={4} key={packageName}>
                    <Card 
                      elevation={6}
                      sx={{ 
                        height: '100%',
                        borderRadius: 3,
                        background: index === 1 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                        color: index === 1 ? 'white' : 'inherit',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      <CardHeader
                        title={packageInfo.title}
                        subheader={packageInfo.price}
                        sx={{
                          textAlign: 'center',
                          flex: '0 0 auto',
                          '& .MuiCardHeader-title': {
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                          },
                          '& .MuiCardHeader-subheader': {
                            fontSize: '1.2rem',
                            color: index === 1 ? 'rgba(255,255,255,0.8)' : 'primary.main'
                          }
                        }}
                      />
                      <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <List sx={{ flex: '1 1 auto' }}>
                          {packageInfo.features.map((feature, featureIndex) => (
                            <ListItem key={featureIndex} sx={{ py: 0.5 }}>
                              <ListItemText 
                                primary={feature}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    fontSize: '0.95rem',
                                    color: index === 1 ? 'rgba(255,255,255,0.9)' : 'text.primary'
                                  }
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.1)' }} />

          {/* FAQ 섹션 */}
          <Box id="faq" sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                mb: 3,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              자주 묻는 질문
            </Typography>
            <Grid container spacing={3} direction="column">
              {[
                {
                  question: '코칭은 어떻게 진행되나요?',
                  answer: '1:1 화상 미팅으로 진행되며, 실무 중심의 맞춤형 프롬프트 개발과 최적화를 도와드립니다.'
                },
                {
                  question: '어떤 수준의 프롬프트를 배울 수 있나요?',
                  answer: '초급부터 고급까지 단계별로 진행되며, 실제 업무에 바로 적용할 수 있는 실용적인 프롬프트를 개발합니다.'
                },
                {
                  question: '코칭 후 지원은 어떻게 되나요?',
                  answer: '코칭 완료 후에도 이메일을 통한 지속적인 지원과 프롬프트 개선 가이드를 제공합니다.'
                }
              ].map((faq, index) => (
                <Grid item xs={12} key={index}>
                  <Paper 
                    elevation={3}
                    sx={{ 
                      p: 3, 
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f4ff 100%)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#667eea' }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {faq.answer}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* 상담 신청 다이얼로그 */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
              color: '#222',
              overflow: 'hidden',
              maxHeight: '90vh',
              m: 2,
              boxShadow: '0 8px 32px rgba(76,81,255,0.15)'
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              fontWeight: 'bold',
              py: { xs: 2, md: 3 },
              borderBottom: '2px solid rgba(255,255,255,0.2)',
              letterSpacing: 1
            }}
          >
            <span style={{ verticalAlign: 'middle', marginRight: 8 }}>💬</span>무료 상담 신청
          </DialogTitle>
          <DialogContent sx={{ 
            p: { xs: 2, md: 4 },
            maxHeight: '70vh',
            overflowY: 'auto',
            background: 'rgba(255,255,255,0.95)'
          }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#764ba2', letterSpacing: 1 }}>
                기본 정보 <span style={{ color: '#ff5252' }}>*</span>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="이름 *" fullWidth value={consultationForm.name} onChange={e => handleFormChange('name', e.target.value)}
                    error={!!formErrors.name} helperText={formErrors.name} sx={{ background: 'white', borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="이메일 *" fullWidth value={consultationForm.email} onChange={e => handleFormChange('email', e.target.value)}
                    error={!!formErrors.email} helperText={formErrors.email} sx={{ background: 'white', borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="전화번호 *" fullWidth value={consultationForm.phone} onChange={e => handleFormChange('phone', e.target.value)}
                    error={!!formErrors.phone} helperText={formErrors.phone} sx={{ background: 'white', borderRadius: 2 }} placeholder="010-1234-5678" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="회사명 *" fullWidth value={consultationForm.company} onChange={e => handleFormChange('company', e.target.value)}
                    error={!!formErrors.company} helperText={formErrors.company} sx={{ background: 'white', borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="직책 *" fullWidth value={consultationForm.position} onChange={e => handleFormChange('position', e.target.value)}
                    error={!!formErrors.position} helperText={formErrors.position} sx={{ background: 'white', borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="선호 시간" fullWidth value={consultationForm.preferredTime} onChange={e => handleFormChange('preferredTime', e.target.value)}
                    sx={{ background: 'white', borderRadius: 2 }} />
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#764ba2', letterSpacing: 1 }}>
                상담 내용
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="현재 업무" fullWidth multiline rows={2} value={consultationForm.currentWork} onChange={e => handleFormChange('currentWork', e.target.value)}
                    sx={{ background: 'white', borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="상담 목표" fullWidth multiline rows={2} value={consultationForm.goals} onChange={e => handleFormChange('goals', e.target.value)}
                    sx={{ background: 'white', borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="메모" fullWidth multiline rows={2} value={consultationForm.notes} onChange={e => handleFormChange('notes', e.target.value)}
                    sx={{ background: 'white', borderRadius: 2 }} />
                </Grid>
              </Grid>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(76,81,255,0.8)',
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                textAlign: 'center',
                fontStyle: 'italic',
                mt: 2
              }}
            >
              * 표시된 항목은 필수 입력 사항입니다.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ 
            p: { xs: 2, md: 3 }, 
            justifyContent: 'center',
            gap: 2,
            background: 'rgba(245,245,255,0.7)',
            borderTop: '1px solid #e0e7ff'
          }}>
            <Button 
              onClick={() => setOpenDialog(false)}
              variant="outlined"
              size="large"
              sx={{
                color: '#764ba2',
                borderColor: '#b4b8f8',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: '#764ba2',
                  backgroundColor: 'rgba(118,75,162,0.08)'
                }
              }}
            >
              취소
            </Button>
            <Button 
              onClick={handleConsultationSubmit}
              variant="contained"
              disabled={isSubmitting}
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                color: 'white',
                fontWeight: 'bold',
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.5 },
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(76,81,255,0.08)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(76,81,255,0.15)'
                },
                '&:disabled': {
                  background: 'rgba(200,200,255,0.3)',
                  color: 'rgba(120,120,120,0.5)'
                }
              }}
            >
              {isSubmitting ? '제출 중...' : '상담 신청하기'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* 스낵바 */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { promptsApi } from '@/lib/api';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Collapse,
} from '@mui/material';
import { 
  Create as CreateIcon,
  Save as SaveIcon,
  Dashboard as DashboardIcon,
  ViewModule as TemplateIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Psychology as PsychologyIcon,
  Science as ScienceIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
  ContentCopy as CopyIcon,
  ContentPaste as PasteIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
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
  userId: string; // 사용자 ID 추가
}

export default function PromptCreator() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const [currentPrompt, setCurrentPrompt] = useState({
    title: '',
    description: '',
    category: '',
    template: '',
    variables: [] as string[],
    isPublic: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedTemplates, setExpandedTemplates] = useState<Set<string>>(new Set());

  // 복사 기능
  const copyToClipboard = async (text: string) => {
    try {
      // 줄바꿈을 보존하여 복사
      const formattedText = text.replace(/\n/g, '\n');
      await navigator.clipboard.writeText(formattedText);
      setSuccessMessage('클립보드에 복사되었습니다! (줄바꿈 포함)');
      setShowSuccess(true);
    } catch (err) {
      console.error('복사 실패:', err);
      setSuccessMessage('복사에 실패했습니다.');
      setShowSuccess(true);
    }
  };

  // 붙여넣기 기능
  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCurrentPrompt(prev => ({
        ...prev,
        template: text
      }));
      setSuccessMessage('클립보드에서 붙여넣기 되었습니다!');
      setShowSuccess(true);
    } catch (err) {
      console.error('붙여넣기 실패:', err);
      setSuccessMessage('붙여넣기에 실패했습니다.');
      setShowSuccess(true);
    }
  };

  // 변수를 실제 값으로 치환하는 함수
  const replaceVariables = (template: string, variables: Record<string, string>) => {
    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      result = result.replace(regex, value);
    });
    return result;
  };

  // 생성된 프롬프트 복사 기능
  const copyGeneratedPrompt = () => {
    // 간단한 예시 값으로 변수 치환 (실제로는 사용자가 입력할 수 있도록 개선 가능)
    const exampleValues: Record<string, string> = {};
    currentPrompt.variables.forEach(variable => {
      exampleValues[variable] = `[${variable} 입력값]`;
    });
    
    const generatedPrompt = replaceVariables(currentPrompt.template, exampleValues);
    // 줄바꿈을 보존하여 복사
    copyToClipboard(generatedPrompt);
  };

  // 템플릿에서 변수 자동 추출
  const extractVariables = (template: string) => {
    const variableRegex = /\{([^}]+)\}/g;
    const variables = new Set<string>();
    let match;
    
    while ((match = variableRegex.exec(template)) !== null) {
      variables.add(match[1]);
    }
    
    return Array.from(variables);
  };

  // 템플릿 변경 시 변수 자동 업데이트
  const handleTemplateChange = (newTemplate: string) => {
    const extractedVariables = extractVariables(newTemplate);
    setCurrentPrompt(prev => ({
      ...prev,
      template: newTemplate,
      variables: extractedVariables
    }));
  };



  // 로그인 체크
  React.useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const categories = [
    '일반',
    '학습',
    '작업',
    '창작',
    '분석',
    '기타'
  ];

  // 단계별 프롬프트 템플릿
  const stepTemplates = [
    {
      id: 'learning-steps',
      title: '단계별 학습 가이드',
      description: '복잡한 주제를 단계별로 학습할 수 있는 프롬프트',
      category: '학습',
      icon: <SchoolIcon />,
      template: `# 📚 **{주제}** 학습 가이드

## 🎯 학습 목표
**{주제}**에 대한 체계적이고 단계별 학습을 통해 완전한 이해를 도모합니다.

---

## 📖 **1단계: 기초 개념 이해**
### 🔍 핵심 용어 정의
- 주요 개념과 용어를 명확하게 정의
- 기본적인 이해를 위한 기초 지식 제공

### 💡 기본 원리 설명
- 핵심 원리와 작동 방식을 설명
- 왜 그렇게 되는지에 대한 근본적 이해

### 📝 간단한 예시 제공
- 일상생활에서 접할 수 있는 예시
- 복잡한 개념을 쉽게 이해할 수 있는 비유

---

## 🔬 **2단계: 심화 학습**
### 📚 세부 개념 설명
- 더 깊이 있는 이론적 배경
- 세부적인 구성 요소와 관계

### 🌟 실제 적용 사례
- 실제 상황에서의 활용 방법
- 구체적인 사례 연구

### ⚠️ 주의사항 및 팁
- 학습 시 주의해야 할 점들
- 효과적인 학습을 위한 팁

---

## 🛠️ **3단계: 실습 및 연습**
### 📋 단계별 연습 문제
- 기초부터 고급까지 단계적 문제
- 실력 향상을 위한 다양한 연습

### 📖 실습 가이드
- 실제로 해보는 방법 안내
- 단계별 실습 과정

### 📊 성과 측정 방법
- 학습 성과를 확인하는 방법
- 개선점을 파악하는 지표

---

## 🚀 **4단계: 응용 및 확장**
### 🎯 고급 활용법
- 고급 수준의 활용 방법
- 전문적인 응용 기법

### 🔗 관련 주제 연결
- 다른 분야와의 연관성
- 통합적 사고를 위한 연결점

### 📈 추가 학습 방향
- 더 깊이 있는 학습을 위한 제안
- 향후 발전 방향

---

## 📝 **학습 요구사항**
각 단계는 **{난이도}** 수준에 맞춰 상세하고 이해하기 쉽게 설명해주세요.
학습자의 수준에 맞는 적절한 예시와 설명을 포함해주세요.`,
      variables: ['주제', '난이도']
    },
    {
      id: 'problem-solving',
      title: '문제 해결 프레임워크',
      description: '체계적인 문제 해결을 위한 단계별 프롬프트',
      category: '분석',
      icon: <PsychologyIcon />,
      template: `# 🔍 **문제 해결 프레임워크**

## 🎯 문제 상황
**{문제}**

---

## 📋 **1단계: 문제 정의 및 분석**
### 🔍 문제의 핵심 파악
- 문제의 본질과 핵심 이슈 식별
- 문제가 발생한 배경과 맥락 분석

### 🔬 원인 분석
- 문제 발생의 근본 원인 탐색
- 직접적/간접적 원인 구분

### 📊 영향 범위 확인
- 문제가 미치는 영향의 범위
- 이해관계자와 영향받는 영역

---

## 💡 **2단계: 해결책 탐색**
### 🎯 가능한 해결책 나열
- 다양한 관점에서의 해결 방안
- 창의적이고 혁신적인 접근법

### ⚖️ 각 해결책의 장단점 분석
- 각 방안의 효과성과 실현 가능성
- 비용과 효과의 균형 분석

### 📈 우선순위 설정
- 긴급성과 중요성에 따른 우선순위
- 단기/장기 해결책 구분

---

## 🛠️ **3단계: 실행 계획 수립**
### 📝 구체적인 실행 단계
- 단계별 실행 계획과 일정
- 각 단계별 담당자와 역할

### 💰 필요한 자원 및 시간
- 인력, 예산, 기술적 자원
- 예상 소요 시간과 마일스톤

### ⚠️ 위험 요소 및 대응 방안
- 예상되는 위험과 장애물
- 위험 대응 전략과 백업 계획

---

## 📊 **4단계: 모니터링 및 평가**
### 🔄 진행 상황 추적 방법
- 정기적인 진행 상황 점검
- KPI와 성과 지표 설정

### 🎯 성공 지표 설정
- 명확한 성공 기준 정의
- 정량적/정성적 평가 방법

### 🔄 피드백 및 개선 방안
- 지속적인 피드백 수집
- 개선점 도출 및 적용

---

## 👨‍💼 **전문가 관점**
**{분야}** 전문가의 관점에서 체계적이고 실용적인 해결책을 제시해주세요.
이론적 배경과 실제 경험을 바탕으로 한 구체적인 조언을 포함해주세요.`,
      variables: ['문제', '분야']
    },
    {
      id: 'project-planning',
      title: '프로젝트 계획 수립',
      description: '프로젝트를 체계적으로 계획하고 실행하는 프롬프트',
      category: '작업',
      icon: <WorkIcon />,
      template: `# 🚀 **{프로젝트명}** 프로젝트 계획서

## 🎯 프로젝트 개요
**{프로젝트명}** 프로젝트의 체계적이고 효율적인 실행을 위한 종합 계획서입니다.

---

## 📋 **1단계: 프로젝트 정의**
### 🎯 목표 및 범위 설정
- 프로젝트의 명확한 목표 정의
- 프로젝트 범위와 경계 설정
- 주요 성과 지표(KPI) 설정

### 👥 주요 이해관계자 식별
- 프로젝트 스폰서와 의사결정자
- 팀 구성원과 외부 협력자
- 최종 사용자와 고객

### ✅ 성공 기준 정의
- 프로젝트 성공의 구체적 기준
- 품질, 일정, 예산 기준
- 고객 만족도 지표

---

## 📊 **2단계: 계획 수립**
### 🏗️ 작업 분해 구조(WBS)
- 프로젝트를 세부 작업으로 분해
- 작업 간의 의존성과 순서
- 각 작업의 소요 시간과 자원

### 📅 일정 및 마일스톤
- 전체 프로젝트 일정 계획
- 주요 마일스톤과 체크포인트
- 크리티컬 패스 분석

### 💰 자원 및 예산 계획
- 인력, 장비, 기술적 자원
- 상세한 예산 계획과 비용 관리
- 자원 할당 최적화

---

## ⚙️ **3단계: 실행 준비**
### 👥 팀 구성 및 역할 분담
- 프로젝트 팀 조직 구조
- 각 구성원의 역할과 책임
- 의사결정 권한과 보고 체계

### ⚠️ 리스크 관리 계획
- 예상 위험 요소 식별
- 위험 대응 전략 수립
- 비상 계획과 백업 방안

### 📢 의사소통 계획
- 정기 회의와 보고 체계
- 의사소통 채널과 도구
- 이해관계자별 커뮤니케이션 전략

---

## 🛠️ **4단계: 실행 및 모니터링**
### 📈 진행 상황 추적
- 정기적인 진행 상황 점검
- 계획 대비 실제 진행률 분석
- 지연 요소 조기 발견

### 🚨 이슈 관리 및 해결
- 이슈 등록과 우선순위 설정
- 이슈 해결 프로세스
- 에스컬레이션 절차

### ✅ 품질 관리
- 품질 기준과 검수 절차
- 품질 보증 활동
- 지속적 개선 방안

---

## 🎉 **5단계: 완료 및 평가**
### ✅ 결과물 검증
- 최종 결과물의 품질 검증
- 요구사항 충족도 확인
- 고객 승인 및 수락

### 📚 학습사항 정리
- 프로젝트 과정에서의 학습점
- 성공 요인과 개선점
- 조직 지식 축적

### 🔄 향후 개선 방안
- 유사 프로젝트에의 적용 방안
- 프로세스 개선 제안
- 조직 역량 강화 방안

---

## 📏 **프로젝트 규모별 특화**
**{규모}** 규모의 프로젝트에 맞춰 상세하고 실용적인 계획을 수립해주세요.
프로젝트의 복잡도와 규모에 적합한 관리 방법론과 도구를 제안해주세요.`,
      variables: ['프로젝트명', '규모']
    },
    {
      id: 'research-methodology',
      title: '연구 방법론',
      description: '체계적인 연구를 위한 단계별 프롬프트',
      category: '분석',
      icon: <ScienceIcon />,
      template: `연구 주제: {연구주제}

다음 단계별로 연구 방법론을 제시해주세요:

1단계: 연구 설계
- 연구 목적 및 가설 설정
- 연구 방법론 선택
- 표본 및 데이터 수집 계획

2단계: 문헌 조사
- 관련 연구 동향 파악
- 이론적 배경 정리
- 연구 간극 식별

3단계: 데이터 수집 및 분석
- 데이터 수집 방법
- 분석 도구 및 기법
- 통계적 검증 방법

4단계: 결과 해석 및 논의
- 주요 발견사항 정리
- 연구의 의의 및 한계
- 향후 연구 방향

5단계: 논문 작성
- 논문 구조 및 형식
- 각 섹션별 작성 가이드
- 인용 및 참고문헌

{분야} 분야의 {연구유형} 연구에 적합한 방법론을 제시해주세요.`,
      variables: ['연구주제', '분야', '연구유형']
    },
    {
      id: 'business-strategy',
      title: '비즈니스 전략 수립',
      description: '비즈니스 전략을 체계적으로 수립하는 프롬프트',
      category: '분석',
      icon: <BusinessIcon />,
      template: `비즈니스 영역: {비즈니스영역}

다음 단계별로 비즈니스 전략을 수립해주세요:

1단계: 환경 분석
- 시장 분석 및 트렌드
- 경쟁사 분석
- SWOT 분석

2단계: 전략 수립
- 비전 및 미션 정의
- 핵심 전략 방향
- 차별화 요소

3단계: 실행 계획
- 마케팅 전략
- 운영 전략
- 재무 계획

4단계: 조직 및 인력
- 조직 구조 설계
- 인력 계획
- 문화 및 가치

5단계: 성과 관리
- KPI 설정
- 모니터링 체계
- 지속적 개선 방안

{시장규모} 규모의 {산업분야}에서 경쟁력을 확보할 수 있는 전략을 제시해주세요.`,
      variables: ['비즈니스영역', '시장규모', '산업분야']
    },
    {
      id: 'language-learning',
      title: '언어 학습 커리큘럼',
      description: '체계적인 언어 학습을 위한 단계별 프롬프트',
      category: '학습',
      icon: <LanguageIcon />,
      template: `학습 언어: {언어}

다음 단계별로 언어 학습 커리큘럼을 만들어주세요:

1단계: 기초 단계 (1-3개월)
- 발음 및 기본 문법
- 일상 회화 표현
- 기본 어휘 습득

2단계: 초급 단계 (4-6개월)
- 문법 구조 이해
- 간단한 대화 연습
- 읽기 및 쓰기 기초

3단계: 중급 단계 (7-12개월)
- 복잡한 문법 구조
- 다양한 주제 대화
- 독해 및 작문 능력

4단계: 고급 단계 (1년 이상)
- 고급 표현 및 관용구
- 전문 분야 어휘
- 문화적 맥락 이해

5단계: 유지 및 발전
- 지속적 학습 방법
- 실제 활용 기회
- 고급 수준 도달

{학습목적}을 달성할 수 있는 {학습기간} 커리큘럼을 제시해주세요.`,
      variables: ['언어', '학습목적', '학습기간']
    }
  ];

  const handleSavePrompt = async () => {
    if (!currentPrompt.title || !currentPrompt.template) {
      setSuccessMessage('제목과 템플릿을 입력해주세요.');
      setShowSuccess(true);
      return;
    }

    try {
      // Supabase에 프롬프트 저장
      const { data, error } = await supabase
        .from('shared_prompts')
        .insert([{
          title: currentPrompt.title,
          description: currentPrompt.description,
          category: currentPrompt.category,
          template: currentPrompt.template,
          variables: currentPrompt.variables,
          is_public: currentPrompt.isPublic,
          user_id: user?.id || user?.email || 'temp-user',
          author_name: user?.email || '익명 사용자',
          likes: 0,
          views: 0,
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase 저장 오류:', error);
        
        // Supabase 저장이 실패하면 로컬 저장으로 대체
        const newPrompt = {
          id: Date.now().toString(),
          title: currentPrompt.title,
          description: currentPrompt.description,
          category: currentPrompt.category,
          template: currentPrompt.template,
          variables: currentPrompt.variables,
          isPublic: currentPrompt.isPublic,
          createdAt: new Date(),
          userId: user?.id || user?.email || 'temp-user',
          likes: 0,
          views: 0,
        };
        
        const existingPrompts = localStorage.getItem('prompts');
        let prompts = [];
        if (existingPrompts) {
          try {
            prompts = JSON.parse(existingPrompts);
          } catch (error) {
            console.error('기존 프롬프트 파싱 오류:', error);
          }
        }
        
        prompts.push(newPrompt);
        localStorage.setItem('prompts', JSON.stringify(prompts));
        
        // 다른 페이지에서 변경사항을 감지할 수 있도록 이벤트 발생
        window.dispatchEvent(new CustomEvent('promptsUpdated'));
        
        setSuccessMessage('프롬프트가 로컬에 저장되었습니다. (데이터베이스 연결 실패)');
      } else {
        setSuccessMessage('프롬프트가 데이터베이스에 저장되었습니다!');
        
        // 다른 페이지에서 변경사항을 감지할 수 있도록 이벤트 발생
        window.dispatchEvent(new CustomEvent('promptsUpdated'));
      }
      
      // 폼 초기화
      setCurrentPrompt({
        title: '',
        description: '',
        category: '',
        template: '',
        variables: [],
        isPublic: false,
      });
      
      setShowSuccess(true);
    } catch (error) {
      console.error('프롬프트 저장 중 오류:', error);
      setSuccessMessage('프롬프트 저장 중 오류가 발생했습니다.');
      setShowSuccess(true);
    }
  };

  const handleGoToDashboard = () => {
    router.push('/analytics');
  };

  // 템플릿 선택 함수
  const handleTemplateSelect = (template: any) => {
    setCurrentPrompt({
      ...currentPrompt,
      title: template.title,
      description: template.description,
      category: template.category,
      template: template.template,
      variables: template.variables,
    });
    
    // 템플릿 선택 성공 메시지
    setSuccessMessage(`"${template.title}" 템플릿이 선택되었습니다!`);
    setShowSuccess(true);
  };

  // 템플릿 접기/펼치기 토글 함수
  const toggleTemplateExpand = (templateId: string) => {
    setExpandedTemplates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  // 데모 사용자를 위한 임시 사용자 처리
  const demoUser = !user ? { id: 'demo-user', email: 'demo@example.com' } : user;
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography variant="h6">로딩 중...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            프롬프트 크리에이터
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isAdmin && (
              <Button
                variant="contained"
                startIcon={<DashboardIcon />}
                onClick={() => router.push('/analytics')}
                sx={{ minWidth: 150 }}
              >
                관리자 대시보드
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => router.push('/')}
              sx={{ minWidth: 120 }}
            >
              메인페이지
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={signOut}
              sx={{ minWidth: 100 }}
            >
              로그아웃
            </Button>
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">
          AI와 더 효과적으로 소통하기 위한 프롬프트를 만들어보세요.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* 템플릿 선택 섹션 */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            <TemplateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            단계별 프롬프트 템플릿
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            미리 정의된 단계별 프롬프트 템플릿을 선택하여 빠르게 시작하세요.
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {stepTemplates.map((template) => (
              <Card 
                key={template.id}
                variant="outlined" 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 2,
                    borderColor: 'primary.main'
                  }
                }}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent sx={{ pb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 1 }}>
                      {template.icon}
                    </Box>
                    <Typography variant="h6" component="h3">
                      {template.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {template.description}
                  </Typography>
                  
                  {/* 템플릿 미리보기 */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        템플릿 미리보기
                      </Typography>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTemplateExpand(template.id);
                        }}
                        sx={{ minWidth: 'auto', px: 1 }}
                      >
                        {expandedTemplates.has(template.id) ? '접기' : '펼치기'}
                        {expandedTemplates.has(template.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Button>
                    </Box>
                    
                    <Collapse in={expandedTemplates.has(template.id)}>
                      <Paper 
                        variant="outlined" 
                        sx={{ 
                          p: 2,
                          backgroundColor: 'grey.50',
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          maxHeight: '200px',
                          overflow: 'auto'
                        }}
                      >
                        <Typography 
                          variant="body2"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            lineHeight: 1.4
                          }}
                        >
                          {template.template}
                        </Typography>
                      </Paper>
                    </Collapse>
                    
                    {!expandedTemplates.has(template.id) && (
                      <Paper 
                        variant="outlined" 
                        sx={{ 
                          p: 1,
                          backgroundColor: 'grey.50',
                          fontFamily: 'monospace',
                          fontSize: '0.75rem'
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            lineHeight: 1.4
                          }}
                        >
                          {template.template.length > 150 
                            ? `${template.template.substring(0, 150)}...` 
                            : template.template}
                        </Typography>
                      </Paper>
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={template.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Chip 
                      label={`${template.variables.length}개 변수`} 
                      size="small" 
                      color="secondary" 
                      variant="outlined"
                    />
                    <Chip 
                      label={`${template.template.split('\n').length}줄`} 
                      size="small" 
                      color="info" 
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    변수: {template.variables.join(', ')}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0 }}>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template);
                    }}
                  >
                    템플릿 사용
                  </Button>
                  <Button 
                    size="small" 
                    color="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      // 템플릿 미리보기 모달 열기
                      setCurrentPrompt({
                        ...currentPrompt,
                        template: template.template,
                        title: template.title,
                        description: template.description,
                        category: template.category,
                        variables: template.variables,
                      });
                    }}
                  >
                    미리보기
                  </Button>
                  <Button 
                    size="small" 
                    color="info"
                    startIcon={<CopyIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(template.template);
                    }}
                  >
                    복사
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Paper>

        {/* 프롬프트 생성 섹션 */}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            <CreateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            새 프롬프트 만들기
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="제목"
              value={currentPrompt.title}
              onChange={(e) => setCurrentPrompt({...currentPrompt, title: e.target.value})}
              fullWidth
              required
            />
            
            <TextField
              label="설명"
              value={currentPrompt.description}
              onChange={(e) => setCurrentPrompt({...currentPrompt, description: e.target.value})}
              fullWidth
              multiline
              rows={2}
            />
            
            <FormControl fullWidth>
              <InputLabel>카테고리</InputLabel>
              <Select
                value={currentPrompt.category}
                label="카테고리"
                onChange={(e) => setCurrentPrompt({...currentPrompt, category: e.target.value})}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
                          <Box sx={{ position: 'relative' }}>
                            <TextField
                              label="프롬프트 템플릿"
                              value={currentPrompt.template}
                              onChange={(e) => handleTemplateChange(e.target.value)}
                              fullWidth
                              multiline
                              rows={12}
                              required
                              placeholder={`# 📚 **{주제}** 학습 가이드

## 🎯 학습 목표
**{주제}**에 대한 체계적이고 단계별 학습을 통해 완전한 이해를 도모합니다.

---

## 📖 **1단계: 기초 개념 이해**
### 🔍 핵심 용어 정의
- 주요 개념과 용어를 명확하게 정의
- 기본적인 이해를 위한 기초 지식 제공

### 💡 기본 원리 설명
- 핵심 원리와 작동 방식을 설명
- 왜 그렇게 되는지에 대한 근본적 이해

### 📝 간단한 예시 제공
- 일상생활에서 접할 수 있는 예시
- 복잡한 개념을 쉽게 이해할 수 있는 비유

---

## 📝 **학습 요구사항**
각 단계는 **{난이도}** 수준에 맞춰 상세하고 이해하기 쉽게 설명해주세요.`}
                              helperText="중괄호 {}를 사용하여 변수를 정의할 수 있습니다. 마크다운 스타일의 포맷팅을 사용하여 가독성을 높일 수 있습니다. Enter 키를 눌러 줄바꿈을 추가할 수 있습니다."
                              sx={{
                                '& .MuiInputBase-input': {
                                  whiteSpace: 'pre-wrap',
                                  wordBreak: 'break-word'
                                }
                              }}
                            />
                            <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<CopyIcon />}
                                onClick={() => copyToClipboard(currentPrompt.template)}
                                sx={{ minWidth: 'auto', px: 1 }}
                              >
                                복사
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<PasteIcon />}
                                onClick={pasteFromClipboard}
                                sx={{ minWidth: 'auto', px: 1 }}
                              >
                                붙여넣기
                              </Button>
                            </Box>
                          </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={currentPrompt.isPublic}
                    onChange={(e) => setCurrentPrompt({...currentPrompt, isPublic: e.target.checked})}
                  />
                }
                label="공개 설정 (다른 사용자와 공유)"
              />
          </Box>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSavePrompt}
              size="large"
              sx={{ flex: 1, minWidth: '200px' }}
            >
              저장하기
            </Button>
            <Button
              variant="outlined"
              startIcon={<CopyIcon />}
              onClick={copyGeneratedPrompt}
              size="large"
              disabled={!currentPrompt.template.trim()}
            >
              생성된 프롬프트 복사
            </Button>
            <Button
              variant="outlined"
              startIcon={<DashboardIcon />}
              onClick={handleGoToDashboard}
              size="large"
            >
              대시보드로 이동
            </Button>
          </Box>
        </Paper>
      </Box>

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
'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Grid,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import {
  School,
  AutoAwesome,
  Create,
  PersonAdd,
  ArrowBack,
  CheckCircle,
  PlayArrow,
  Lightbulb,
  Psychology,
  Group,
  Assessment,
  Security,
  Speed,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [demoPrompt, setDemoPrompt] = useState('');
  const [demoResult, setDemoResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDemoGenerate = async () => {
    if (!demoPrompt.trim()) return;
    
    setIsGenerating(true);
    setDemoResult('');
    
    // 데모용 프롬프트 생성 시뮬레이션
    setTimeout(() => {
      const demoResponses = [
        `다음은 "${demoPrompt}"에 대한 교육용 프롬프트입니다:\n\n당신은 경험 많은 교육자입니다. ${demoPrompt}에 대해 학생들이 쉽게 이해할 수 있도록 설명해주세요. 구체적인 예시와 함께 단계별로 설명해주시고, 학생들의 질문에 답변할 준비를 해주세요.`,
        `"${demoPrompt}" 주제에 대한 학습 프롬프트:\n\n당신은 ${demoPrompt} 전문가입니다. 이 주제를 처음 배우는 학생을 위해 기본 개념부터 시작해서 심화 내용까지 체계적으로 가르쳐주세요. 실생활 예시를 포함하여 설명해주세요.`,
        `교육용 프롬프트 - ${demoPrompt}:\n\n당신은 ${demoPrompt} 분야의 선생님입니다. 학생들의 수준에 맞춰 이 주제를 재미있고 이해하기 쉽게 가르쳐주세요. 질문을 통해 학생들의 이해도를 확인하고, 필요시 추가 설명을 제공해주세요.`
      ];
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      setDemoResult(randomResponse);
      setIsGenerating(false);
    }, 2000);
  };

  const steps = [
    {
      label: '1단계: 주제 입력',
      description: '교육하고 싶은 주제나 개념을 입력하세요.',
      content: (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" paragraph>
            PromptEDU는 AI를 활용하여 교육 목적에 맞는 프롬프트를 생성합니다.
            먼저 교육하고 싶은 주제를 입력해보세요.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="교육하고 싶은 주제나 개념을 입력하세요"
            placeholder="예: 수학의 분수 개념, 영어 문법, 과학의 광합성 등"
            value={demoPrompt}
            onChange={(e) => setDemoPrompt(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            💡 팁: 구체적인 주제를 입력할수록 더 정확한 프롬프트가 생성됩니다
          </Typography>
        </Box>
      ),
    },
    {
      label: '2단계: AI 프롬프트 생성',
      description: 'AI가 교육 목적에 맞는 프롬프트를 생성합니다.',
      content: (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" paragraph>
            입력한 주제를 바탕으로 AI가 교육 목적에 맞는 프롬프트를 생성합니다.
            실제 서비스에서는 더 정교한 AI 모델을 사용합니다.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleDemoGenerate}
            disabled={!demoPrompt.trim() || isGenerating}
            startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesome />}
            sx={{ mb: 2 }}
          >
            {isGenerating ? '프롬프트 생성 중...' : 'AI 프롬프트 생성'}
          </Button>
          <Alert severity="info" sx={{ mb: 2 }}>
            이는 데모 버전입니다. 실제 서비스에서는 더 정교한 AI 모델을 사용합니다.
          </Alert>
        </Box>
      ),
    },
    {
      label: '3단계: 생성된 프롬프트 확인',
      description: '생성된 프롬프트를 확인하고 사용할 수 있습니다.',
      content: (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" paragraph>
            AI가 생성한 프롬프트를 확인하고, 필요시 수정하여 사용할 수 있습니다.
            실제 서비스에서는 저장, 공유, 수정 등의 기능을 제공합니다.
          </Typography>
          {demoResult ? (
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 3, 
                bgcolor: 'grey.50',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                lineHeight: 1.6,
                maxHeight: 400,
                overflow: 'auto'
              }}
            >
              {demoResult}
            </Paper>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: 200,
              color: 'text.secondary',
              border: '2px dashed',
              borderColor: 'grey.300',
              borderRadius: 1
            }}>
              <AutoAwesome sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography variant="body1" align="center">
                위에서 "AI 프롬프트 생성" 버튼을 클릭하면<br />
                여기에 생성된 프롬프트가 표시됩니다
              </Typography>
            </Box>
          )}
        </Box>
      ),
    },
  ];

  const features = [
    {
      icon: <AutoAwesome />,
      title: 'AI 프롬프트 전문',
      description: '교육학적으로 검증된 프롬프트로 효과적인 학습 경험을 제공합니다.',
      color: '#1976d2',
    },
    {
      icon: <Psychology />,
      title: '개인화 학습',
      description: '학습자의 수준과 특성에 맞춘 맞춤형 교육 프롬프트를 생성합니다.',
      color: '#2e7d32',
    },
    {
      icon: <Group />,
      title: '교육자 커뮤니티',
      description: '전국의 교육자들이 공유하는 프롬프트와 교육 노하우를 확인하세요.',
      color: '#ed6c02',
    },
    {
      icon: <Assessment />,
      title: '학습 분석',
      description: '실시간 학습 성과 분석과 개선점을 제공합니다.',
      color: '#9c27b0',
    },
    {
      icon: <Security />,
      title: '안전한 환경',
      description: '교육에 특화된 안전하고 신뢰할 수 있는 AI 환경을 제공합니다.',
      color: '#d32f2f',
    },
    {
      icon: <Speed />,
      title: '빠른 생성',
      description: '몇 초 만에 교육 목적에 맞는 프롬프트를 생성할 수 있습니다.',
      color: '#388e3c',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* App Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="back"
            onClick={() => router.push('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <School />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            PromptEDU 데모
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            🎯 PromptEDU 서비스 데모
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            AI 교육 프롬프트 생성 서비스가 어떻게 작동하는지 단계별로 체험해보세요
          </Typography>
          <Chip 
            icon={<Lightbulb />} 
            label="데모 버전" 
            color="warning" 
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Stepper */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">마지막 단계</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>
                    {step.content}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          disabled={index === 1 && !demoResult}
                        >
                          {index === steps.length - 1 ? '완료' : '다음'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          이전
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        {/* Features */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
            PromptEDU의 특별한 기능
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {features.map((feature, index) => (
              <Card key={index} elevation={2} sx={{ height: '100%', '&:hover': { elevation: 4 } }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
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
        </Box>

        {/* Call to Action */}
        <Card elevation={3} sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              🚀 실제 서비스를 체험해보세요
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              데모를 통해 PromptEDU의 기본 기능을 확인하셨나요? 
              이제 실제 서비스에서 더 많은 기능을 체험해보세요.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/prompt-creator')}
                startIcon={<Create />}
                sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
              >
                전체 기능 체험하기
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<PersonAdd />}
                sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'grey.300' } }}
              >
                무료 회원가입
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 
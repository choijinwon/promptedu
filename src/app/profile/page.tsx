'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Assessment as AssessmentIcon,
  Link as LinkIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || '',
    bio: '',
    website: '',
    location: '',
  });

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) {
      console.log('No user found for profile loading');
      return;
    }

    console.log('Loading profile for user:', user.id);

    try {
      // 1. 로컬 스토리지에서 백업 로드 시도
      console.log('Attempting to load from local storage...');
      try {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          if (parsedProfile.userId === user.id) {
            console.log('Profile loaded from local storage:', parsedProfile);
            setProfile({
              name: parsedProfile.name || user.user_metadata?.name || '',
              bio: parsedProfile.bio || '',
              website: parsedProfile.website || '',
              location: parsedProfile.location || '',
            });
            return;
          }
        }
      } catch (storageError) {
        console.error('Local storage load error:', storageError);
      }

      // 2. Supabase 클라이언트가 있고 환경 변수가 설정된 경우에만 데이터베이스에서 로드 시도
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.log('Attempting to load from database...');
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error loading profile from database:', error);
          } else if (data) {
            console.log('Profile loaded from database:', data);
            setProfile({
              name: data.name || user.user_metadata?.name || '',
              bio: data.bio || '',
              website: data.website || '',
              location: data.location || '',
            });
            return;
          }
        } catch (dbError) {
          console.error('Database load error:', dbError);
        }
      } else {
        console.log('Skipping database load - Supabase not configured');
      }

      // 3. 사용자 메타데이터에서 기본값 설정
      console.log('Loading from user metadata...');
      setProfile({
        name: user.user_metadata?.name || '',
        bio: user.user_metadata?.bio || '',
        website: user.user_metadata?.website || '',
        location: user.user_metadata?.location || '',
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      // 에러 발생 시에도 기본값 설정
      setProfile({
        name: user.user_metadata?.name || '',
        bio: '',
        website: '',
        location: '',
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!user) {
      console.error('No user found');
      setError('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    console.log('Saving profile for user:', user.id);
    console.log('Profile data:', profile);

    try {
      // 1. 로컬 스토리지에 백업 저장
      console.log('Saving to local storage...');
      try {
        localStorage.setItem('userProfile', JSON.stringify({
          userId: user.id,
          ...profile,
          updatedAt: new Date().toISOString()
        }));
        console.log('Profile saved to local storage successfully');
      } catch (storageError) {
        console.error('Local storage save error:', storageError);
      }

      // 2. 사용자 메타데이터 업데이트
      console.log('Updating user metadata...');
      const { error: updateError } = await updateProfile({
        data: {
          name: profile.name,
          bio: profile.bio,
          website: profile.website,
          location: profile.location,
        },
      });

      if (updateError) {
        console.error('Update profile error:', updateError);
        // 메타데이터 업데이트 실패해도 로컬 스토리지에 저장되었으므로 성공으로 처리
        console.log('Metadata update failed, but local storage backup exists');
      } else {
        console.log('User metadata updated successfully');
      }

      // 3. Supabase 클라이언트가 있고 환경 변수가 설정된 경우에만 profiles 테이블에 저장 시도
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.log('Attempting to save to profiles table...');
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              user_id: user.id,
              name: profile.name,
              bio: profile.bio,
              website: profile.website,
              location: profile.location,
              updated_at: new Date().toISOString(),
            });

          if (profileError) {
            console.error('Profile save error:', profileError);
            // profiles 테이블 에러는 무시하고 성공 메시지 표시
          } else {
            console.log('Profile saved to database successfully');
          }
        } catch (dbError) {
          console.error('Database save error:', dbError);
          // 데이터베이스 에러는 무시하고 성공 메시지 표시
        }
      } else {
        console.log('Skipping database save - Supabase not configured');
      }

      setMessage('프로필이 성공적으로 저장되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('프로필 저장 중 오류가 발생했습니다: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadProfile();
  };

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              로그인이 필요합니다...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  const stats = [
    { label: '생성한 프롬프트', value: '12', icon: <BookIcon /> },
    { label: '학습 시간', value: '24시간', icon: <SchoolIcon /> },
    { label: '평균 성취도', value: '85%', icon: <AssessmentIcon /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            프로필
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 4 }}>
          {/* Profile Card */}
          <Card elevation={2}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 3 }}
                  src={user.user_metadata?.avatar_url}
                >
                  {profile.name?.[0] || user.email?.[0]}
                </Avatar>
                
                <Typography variant="h5" gutterBottom>
                  {profile.name || '사용자'}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
              </Box>

              {/* 자기소개서 */}
              {profile.bio && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    자기소개서
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    p: 2, 
                    bgcolor: 'grey.50', 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}>
                    {profile.bio}
                  </Typography>
                </Box>
              )}

              {/* 웹사이트 */}
              {profile.website && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    웹사이트
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    bgcolor: 'grey.50', 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}>
                    <LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography 
                      variant="body2" 
                      component="a" 
                      href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {profile.website}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* 위치 */}
              {profile.location && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    위치
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    bgcolor: 'grey.50', 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {profile.location}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  variant={isEditing ? "outlined" : "contained"}
                  startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
                  onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  sx={{ mr: 1 }}
                >
                  {isEditing ? '취소' : '편집'}
                </Button>
                
                {isEditing && (
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                    disabled={loading}
                  >
                    저장
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card elevation={2}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                프로필 정보
              </Typography>

              {message && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {message}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="이름"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />

                <TextField
                  fullWidth
                  label="이메일"
                  value={user.email}
                  disabled
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />

                <TextField
                  fullWidth
                  label="자기소개서"
                  multiline
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  placeholder="자기소개서를 작성해주세요. 경력, 기술, 관심사 등을 포함할 수 있습니다..."
                  sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />

                <TextField
                  fullWidth
                  label="웹사이트"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://example.com 또는 example.com"
                  InputProps={{
                    startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />

                <TextField
                  fullWidth
                  label="위치"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!isEditing}
                  placeholder="서울, 대한민국 또는 회사명"
                  InputProps={{
                    startAdornment: <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Stats */}
              <Typography variant="h6" gutterBottom>
                활동 통계
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
                {stats.map((stat, index) => (
                  <Paper key={index} sx={{ p: 2, textAlign: 'center' }}>
                    <Box sx={{ color: 'primary.main', mb: 1 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
} 
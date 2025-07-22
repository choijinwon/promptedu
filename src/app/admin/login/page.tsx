'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';

const ADMIN_ID = 'admin';
const ADMIN_PW = 'admin1234';

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pw })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('admin-auth', 'true');
        sessionStorage.setItem('admin-name', data.name);
        sessionStorage.setItem('admin-id', data.id);
        // 로그인 기록 남기기
        fetch('/api/admin-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: data.id, type: 'login' })
        });
        router.push('/admin');
      } else {
        setError(data.error || '로그인에 실패했습니다.');
        setSnackbar(true);
      }
    } catch (e) {
      setError('서버 오류가 발생했습니다.');
      setSnackbar(true);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, background: 'rgba(255,255,255,0.97)' }}>
          <Typography variant="h4" fontWeight="bold" align="center" sx={{ mb: 3, color: '#764ba2' }}>
            관리자 로그인
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="아이디"
              fullWidth
              margin="normal"
              value={id}
              onChange={e => setId(e.target.value)}
              autoComplete="username"
              autoFocus
            />
            <TextField
              label="비밀번호"
              type="password"
              fullWidth
              margin="normal"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3, fontWeight: 'bold', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </Paper>
        <Snackbar open={snackbar} autoHideDuration={4000} onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
} 
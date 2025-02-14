import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../components/constants/baseurl';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Button, Container, Stack, TextField } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const nav = useNavigate()
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            nav('/')
        }
    }, [token]);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            // console.log(data)
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('sellerId', jwtDecode(data.token).id); // تخزين sellerId
                if (data.role === 'admin') {
                    window.location.pathname = '/admin-dashboard'; // توجيه الأدمن
                } else if (data.role === 'sales') {
                    navigate('/'); // توجيه السيلز
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };
    if (!token) {
        return (
            <Container>
                <Stack spacing={2} component='form' onSubmit={handleLogin}>
                    <h2>تسجيل الدخول</h2>
                    <TextField
                        label="Email"
                        value={email}
                        required
                        type="email"
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginRight: '10px' }}
                    />
                    <TextField
                        label="password"
                        value={password}
                        required
                        type='password'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginRight: '10px' }}
                    />

                    <Button type="submit">تسجيل الدخول</Button>
                </Stack>
            </Container>
        );
    }
};

export default LoginPage;
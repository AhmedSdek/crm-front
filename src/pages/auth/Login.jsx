// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../../components/constants/baseurl';
// import { useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { Button, Container, Stack, TextField, Typography } from '@mui/material';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const nav = useNavigate()
//     const token = localStorage.getItem('token');
//     useEffect(() => {
//         if (token) {
//             nav('/')
//         }
//     }, [token]);
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`${BASE_URL}/api/auth/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();
//             // console.log(data)
//             if (response.ok) {
//                 localStorage.setItem('token', data.token);
//                 localStorage.setItem('sellerId', jwtDecode(data.token).id); // تخزين sellerId
//                 if (data.role === 'admin') {
//                     window.location.pathname = '/admin-dashboard'; // توجيه الأدمن
//                 } else if (data.role === 'sales') {
//                     navigate('/allleads'); // توجيه السيلز
//                 }
//             } else {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error('Error logging in:', error.message);
//         }
//     };
//     if (!token) {
//         return (
//             <Container>
//                 <Stack spacing={2} component='form' onSubmit={handleLogin}>
//                     <Typography>
//                         Login
//                     </Typography>
//                     <TextField
//                         label="Email"
//                         value={email}
//                         required
//                         type="email"
//                         name='email'
//                         onChange={(e) => setEmail(e.target.value)}
//                         style={{ marginRight: '10px' }}
//                     />
//                     <TextField
//                         label="password"
//                         value={password}
//                         required
//                         type='password'
//                         name='password'
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{ marginRight: '10px' }}
//                     />

//                     <Button variant='contained' type="submit">Login</Button>
//                 </Stack>
//             </Container>
//         );
//     }
// };

// export default LoginPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../components/constants/baseurl';
import { jwtDecode } from 'jwt-decode';
import { Button, Container, Stack, TextField, Typography, Alert } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isBlocked, setIsBlocked] = useState(false); // حالة الحظر
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            // console.log(data.)

            if (response.ok) {
                // ✅ نجاح تسجيل الدخول - تخزين البيانات وإعادة التوجيه
                localStorage.setItem('token', data.token);
                localStorage.setItem('sellerId', jwtDecode(data.token).id);
                navigate(data.role === 'admin' ? '/admin-dashboard' : '/sales');
            } else {
                // ❌ فشل تسجيل الدخول
                setError(data.error || 'Invalid email or password.');

                // إذا كان الخطأ بسبب تجاوز المحاولات المسموح بها
                if (data.error.includes('Too many login attempts')) {
                    setIsBlocked(true);
                }
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <Container>
            <Stack spacing={2} component='form' onSubmit={handleLogin}>
                <Typography variant="h4">Login</Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    label="Email"
                    value={email}
                    required
                    type="email"
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginRight: '10px' }}
                    disabled={isBlocked} // تعطيل الإدخال عند الحظر
                />
                <TextField
                    label="Password"
                    value={password}
                    required
                    type='password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginRight: '10px' }}
                    disabled={isBlocked} // تعطيل الإدخال عند الحظر
                />

                <Button variant='contained' type="submit" disabled={isBlocked}>
                    {isBlocked ? 'Blocked' : 'Login'}
                </Button>
            </Stack>
        </Container>
    );
};

export default LoginPage;

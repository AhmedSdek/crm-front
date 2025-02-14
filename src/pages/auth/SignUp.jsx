import React, { useState } from 'react';
import { BASE_URL } from '../../components/constants/baseurl';
import { Button, Container, Stack, TextField } from '@mui/material';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'admin', // Default role is 'sales'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                // Redirect to login page
                window.location.href = '/login';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <Container>
            <Stack spacing={2} component='form' onSubmit={handleSubmit}>
                <h2>تسجيل مستخدم جديد</h2>
                <TextField
                    label="Name"
                    value={formData.name}
                    required
                    name='name'
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="email"
                    value={formData.email}
                    required
                    type='email'
                    name='email'
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="password"
                    value={formData.password}
                    required
                    type='password'
                    name='password'
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <Button type="submit">تسجيل</Button>
            </Stack>
        </Container>
    );
};

export default SignUpPage;
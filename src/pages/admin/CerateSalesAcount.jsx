import React, { useState } from 'react';
import { BASE_URL } from '../../components/constants/baseurl';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';


const CreateSalesUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const handleCreateSales = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/sales/create-sales`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('تم إنشاء حساب السيلز وإرسال الإيميل بنجاح.');
            } else {
                setMessage(`خطأ: ${data.message}`);
            }
        } catch (error) {
            setMessage('حدث خطأ أثناء إنشاء الحساب.');
            console.error('Error creating sales user:', error.message);
        }
    };

    return (
        <Container>
            <Header title="Create Sales Account" subtitle="Add New Sales" />
            <Stack spacing={2} component='form' onSubmit={handleCreateSales}>
                <TextField
                    label="name"
                    value={name}
                    required
                    type='text'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="email"
                    value={email}
                    required
                    type='email'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Phone"
                    value={phone}
                    required
                    type='text'
                    name='Phone'
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <Button variant='contained' type="submit">Create Sales</Button>
            </Stack>
            {message && <p>{message}</p>}
        </Container>
    );
};

export default CreateSalesUser;
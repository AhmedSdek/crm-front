import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../components/constants/baseurl';
import { Button, Card, Container, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import AuthModel from './AuthModel';
import { Close } from '@mui/icons-material';


function Setting() {
    const id = localStorage.getItem("sellerId");
    const token = localStorage.getItem("token");
    const [message, setMessage] = useState(null); // تخزين بيانات العميل

    const [data, setData] = useState(null); // تخزين بيانات العميل
    const [editedData, setEditedData] = useState({}); // تخزين البيانات المعدلة
    const [hiden, setHiden] = useState('hiden');
    const [pass, setPass] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/users/${id}`); // جلب بيانات العميل
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData); // تخزين البيانات الأصلية
                setEditedData(jsonData); // نسخ البيانات إلى الحقول المعدلة
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value }); // تحديث البيانات المعدلة عند تغيير الحقول
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token"); // اجلب التوكن من localStorage
            const response = await fetch(`${BASE_URL}/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editedData),
            });
            if (response.ok) {
                const updatedClient = await response.json();
                setData(updatedClient); // تحديث البيانات المعروضة بعد التعديل
                alert('Client updated successfully');
            } else {
                alert('Failed to update client');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    if (!data) {
        return (
            <div>
                <Container>
                    <Typography>Loading...</Typography>
                </Container>
            </div>
        );
    }

    return (
        <div>
            <AuthModel hiden={hiden}>
                <Card>
                    <Stack component='form' onSubmit={async (e) => {
                        e.preventDefault()
                        const response = await fetch(`${BASE_URL}/api/users/${id}`, {
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ password: pass }),
                        });
                        const data = await response.json();
                        if (response.ok) {
                            setHiden('hiden')
                        }
                        setMessage(data.message);
                    }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '30px 10px' }}>
                        <IconButton sx={{ position: 'absolute', top: '2px', right: '2px' }} onClick={() => {
                            setHiden('hiden')
                        }}>
                            <Close />
                        </IconButton>
                        <TextField
                            sx={{ margin: '10px', padding: '5px', width: { xs: '100%', md: '50%' } }}
                            onChange={(e) => {
                                setPass(e.target.value);
                            }}
                            id="u" label="Password" variant="outlined" type="password" />
                        <Button type="submit" style={{ width: '50%' }} className="btn">
                            Change Password
                        </Button>
                        {message &&
                            <p style={{ color: 'black', margin: '10px' }}>{message}</p>
                        }
                    </Stack>
                </Card>

            </AuthModel>
            <Container>
                <Stack sx={{ padding: '10px 0' }}>
                    <Stack spacing={2}>
                        <Typography variant="h5">
                            {`${data.name}`}
                        </Typography>
                    </Stack>
                    <Divider sx={{ margin: '20px 0' }} />
                    <Stack spacing={2}>
                        <TextField
                            label=" Name"
                            name="name"
                            value={editedData.name || ''}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                        <Button onClick={() => {
                            setHiden('show')
                        }} style={{ margin: '10px', color: 'red', cursor: 'pointer' }}>
                            Change Password
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}

export default Setting
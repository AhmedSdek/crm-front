import { Button, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../components/constants/baseurl';
import { LocalPhone, WhatsApp } from '@mui/icons-material';

function ClientDetails() {
    const { clientId } = useParams();
    const [data, setData] = useState(null); // تخزين بيانات العميل
    // console.log(data)
    const [editedData, setEditedData] = useState({}); // تخزين البيانات المعدلة

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/clients/one/${clientId}`); // جلب بيانات العميل
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
    }, [clientId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value }); // تحديث البيانات المعدلة عند تغيير الحقول
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token"); // اجلب التوكن من localStorage
            const response = await fetch(`${BASE_URL}/api/clients/${clientId}`, {
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
            <Container>
                <Stack sx={{ padding: '10px 0' }}>
                    <Stack spacing={2}>
                        <Typography variant="h5">
                            {`${data.firstName} ${data.lastName}`}
                        </Typography>
                        <Typography>
                            {`Phone: ${data.phone}`}
                        </Typography>
                        <a style={{ width: 'fit-content', borderRadius: '50%' }} href={`tel:${data.phone}`}>
                            <IconButton >
                                <LocalPhone />
                            </IconButton>
                        </a>
                        <a style={{ width: 'fit-content', borderRadius: '50%' }} href={`https://wa.me/${data.whatsapp}`}>
                            <IconButton>
                                <WhatsApp />
                            </IconButton>
                        </a>

                    </Stack>
                    <Divider sx={{ margin: '20px 0' }} />
                    <Stack spacing={2}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={editedData.firstName || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={editedData.lastName || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={editedData.email || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={editedData.phone || ''}
                            onChange={handleInputChange}
                        />
                        <FormControl style={{ marginRight: '10px' }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={editedData.status || ''}
                                onChange={handleInputChange}
                            >
                                <MenuItem value='New Lead'>New Lead</MenuItem>
                                <MenuItem value='Interested'>Interested</MenuItem>
                                <MenuItem value='No Answer'>No Answer</MenuItem>
                                <MenuItem value='Follow Up'>Follow Up</MenuItem>
                                <MenuItem value='Reservation'>Reservation</MenuItem>
                                <MenuItem value='Contracted'>Contracted</MenuItem>
                                <MenuItem value='Attend Visit'>Attend Visit</MenuItem>
                                <MenuItem value='Archive'>Archive</MenuItem>
                            </Select>
                        </FormControl>
                        {/* إظهار حقل "Call Back Date" فقط إذا كان status = Follow Up */}
                        {editedData.status === "Follow Up" && (
                            <TextField
                                label="Call Back Date & Time"
                                type="datetime-local"  // ✅ تغيير النوع ليشمل الوقت مع التاريخ
                                name="callBackDate"
                                value={editedData.callBackDate || ''}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }} // ✅ يضمن بقاء الـ label في الأعلى
                            />
                        )}
                        <TextField
                            label="WhatsApp"
                            name="whatsapp"
                            value={editedData.whatsapp || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Developer"
                            name="developer"
                            value={editedData.developer || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Project"
                            name="project"
                            value={editedData.project || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Notes"
                            name="notes"
                            value={editedData.notes || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Lead Source"
                            name="leadSource"
                            value={editedData.leadSource || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={editedData.description || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="datetime-local"
                            name="meetingDate"
                            value={editedData.meetingDate || ''}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdate}
                        >
                            Update Client
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}

export default ClientDetails;
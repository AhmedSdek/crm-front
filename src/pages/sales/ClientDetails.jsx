import { Button, CircularProgress, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LocalPhone, WhatsApp } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useGetAllClientsQuery, useGetClientByIdQuery, useUpdateClientMutation } from '../../redux/apiSlice';
import moment from 'moment';

function ClientDetails() {
    const { clientId } = useParams();
    const id = clientId
    const [editedData, setEditedData] = useState({}); // تخزين البيانات المعدلة
    const { data: client, isFetching } = useGetClientByIdQuery(clientId); // جلب بيانات العميل
    const [updateClient] = useUpdateClientMutation(); // تعديل العميل
    const [originalData, setOriginalData] = useState({});
    useEffect(() => {
        if (client) {
            setEditedData(client || {});
            setOriginalData(client || {}); // حفظ البيانات الأصلية عند تحميل العميل
        }
    }, [client, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleUpdate = async () => {
        try {
            const changes = {};
            // إضافة جميع الحقول المعدلة إلى changes
            for (let key in editedData) {
                if (editedData[key] !== originalData[key]) {
                    changes[key] = editedData[key];
                }
            }
            if (Object.keys(changes).length > 0) {
                await updateClient({ id, updates: changes }).unwrap();
                // ✅ تحديث originalData بعد التحديث الناجح
                setOriginalData(editedData);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Client updated successfully",
                    showConfirmButton: false,
                    timer: 900
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No changes",
                    text: "No changes were made to the client data.",
                });
            }
        } catch (error) {
            console.error('Failed to update client:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update client",
            });
        }
    };

    if (isFetching || !editedData) {
        return (
            <Container>
                <Stack sx={{ height: '100vh', justifyContent: "center", alignItems: 'center' }}>
                    <CircularProgress size={100} color="inherit" />
                    <Typography>Loading...</Typography>
                </Stack>
            </Container>
        );
    }

    return (
        <Container>
            <Stack sx={{ padding: '10px 0' }}>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        {`${editedData.firstName || ''} ${editedData.lastName || ''}`}
                    </Typography>

                    <Typography>{`Phone: ${editedData.phone || ''}`}</Typography>
                    <Stack sx={{ flexDirection: 'row', gap: 2 }}>
                        <a style={{ width: 'fit-content', borderRadius: '50%' }} href={`tel:${editedData.phone}`}>
                            <IconButton>
                                <LocalPhone />
                            </IconButton>
                        </a>
                        <a style={{ width: 'fit-content', borderRadius: '50%' }} href={`https://wa.me/${editedData.whatsapp}`}>
                            <IconButton>
                                <WhatsApp />
                            </IconButton>
                        </a>
                    </Stack>
                </Stack>
                <Divider sx={{ margin: '20px 0' }} />
                <Stack component='form' onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdate()
                }}
                    spacing={2}>
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
                            <MenuItem value="New Lead">New Lead</MenuItem>
                            <MenuItem value="Interested">Interested</MenuItem>
                            <MenuItem value="No Answer">No Answer</MenuItem>
                            <MenuItem value="Follow Up">Follow Up</MenuItem>
                            <MenuItem value="Reservation">Reservation</MenuItem>
                            <MenuItem value="Contracted">Contracted</MenuItem>
                            <MenuItem value="Attend Visit">Attend Visit</MenuItem>
                            <MenuItem value="Archive">Archive</MenuItem>
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
                    {editedData.status === "Attend Visit" && (
                        <TextField
                            label="Attend Visit Date & Time"
                            type="datetime-local"  // ✅ تغيير النوع ليشمل الوقت مع التاريخ
                            name="attendDate"
                            value={editedData.attendDate || ''}
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
                        label="meeting Date & Time"
                        type="datetime-local"  // ✅ تغيير النوع ليشمل الوقت مع التاريخ
                        // label="meeting Date"
                        name="meetingDate"
                        value={editedData.meetingDate || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }} // ✅ يضمن بقاء الـ label في الأعلى
                    />
                    <TextField
                        label="Modified Time"
                        name="Modified Time"
                        value={moment(editedData.modifiedTime).fromNow()}
                        disabled
                    />
                    <Button type='submit' variant="contained" color="primary">
                        Update Lead
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}

export default ClientDetails;
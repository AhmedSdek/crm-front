import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { LocalPhone, WhatsApp } from '@mui/icons-material';
import { useGetAllUsersQuery, useGetAllClientsQuery, useUpdateClientMutation, useGetClientByIdQuery } from '../../redux/apiSlice';
import Swal from 'sweetalert2';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';

function AdminClientDetails() {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const currentuser = jwtDecode(token);
    const { data: client, isFetching } = useGetClientByIdQuery(id); // جلب بيانات العميل
    const { data: users } = useGetAllUsersQuery(); // جلب بيانات المستخدمين
    // console.log(users)
    const [updateClient] = useUpdateClientMutation(); // تعديل العميل
    const [editedData, setEditedData] = useState({});
    const [originalData, setOriginalData] = useState({});
    // console.log(editedData)
    const currentUserId = localStorage.getItem('sellerId');
    useEffect(() => {
        if (client) {
            setEditedData(client || {});
            setOriginalData(client || {}); // حفظ البيانات الأصلية عند تحميل العميل
        }
    }, [client, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => {
            if (name === 'assignedTo') {
                return { ...prev, assignedTo: { _id: value } };
            }
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
                }} spacing={2}>
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
                    {/* {editedData.status === "Follow Up" && (
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
                    )} */}
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
                        disabled={currentuser && currentuser.role === 'admin'}
                        value={editedData.meetingDate || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }} // ✅ يضمن بقاء الـ label في الأعلى
                    />
                    <FormControl style={{ marginRight: '10px' }}>
                        <InputLabel>Assign To</InputLabel>
                        <Select
                            name="assignedTo"
                            value={editedData.assignedTo?._id || ''}
                            onChange={handleInputChange}
                        >
                            {users && users
                                .filter((seller) => seller._id !== currentUserId)
                                .map((seller) => (
                                    <MenuItem key={seller._id} value={seller._id}>
                                        {seller.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Created At"
                        name="Created At"
                        value={moment(editedData.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                        disabled
                    />
                    <TextField
                        label="Modified Time"
                        name="Modified Time"
                        value={moment(editedData.modifiedTime).format("YYYY-MM-DD HH:mm:ss")}
                        disabled
                    />
                    <Button variant="contained" color="primary" type='submit'>
                        Update Lead
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}

export default AdminClientDetails;

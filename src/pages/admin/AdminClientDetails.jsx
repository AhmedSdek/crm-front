import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { LocalPhone, WhatsApp } from '@mui/icons-material';
import { useGetAllUsersQuery, useGetAllClientsQuery, useUpdateClientMutation } from '../../redux/apiSlice';
import Swal from 'sweetalert2';
import moment from 'moment';

function AdminClientDetails() {
    const { id } = useParams();
    const { data: client, isFetching } = useGetAllClientsQuery(); // جلب بيانات العميل
    const { data: users } = useGetAllUsersQuery(); // جلب بيانات المستخدمين
    const [updateClient] = useUpdateClientMutation(); // تعديل العميل
    const [editedData, setEditedData] = useState({});
    // console.log(editedData)

    useEffect(() => {
        if (client) {
            const currentClient = client.find((c) => c._id === id); // العثور على العميل الحالي
            setEditedData(currentClient || {});
        }
    }, [client, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'assignedTo') {
            setEditedData({ ...editedData, assignedTo: { _id: value } });
        } else {
            setEditedData({ ...editedData, [name]: value });
        }
    };

    const handleUpdate = async () => {
        try {
            await updateClient({ id, updates: editedData }).unwrap(); // تحديث العميل
            // alert('Client updated successfully');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Client updated successfully",
                showConfirmButton: false,
                timer: 900
            });
        } catch (error) {
            console.error('Failed to update client:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: " Failed to update client",
            });
        }
    };

    if (isFetching || !editedData) {
        return (
            <Container>
                <Typography>Loading...</Typography>
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
                        type="date"
                        name="meetingDate"
                        value={editedData.meetingDate || ''}
                        onChange={handleInputChange}
                    />
                    <FormControl style={{ marginRight: '10px' }}>
                        <InputLabel>Assign To</InputLabel>
                        <Select
                            name="assignedTo"
                            value={editedData.assignedTo?._id || ''}
                            onChange={handleInputChange}
                        >
                            {users?.map((user) => (
                                <MenuItem key={user._id} value={user._id}>
                                    {user.name}
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
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update Client
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}

export default AdminClientDetails;

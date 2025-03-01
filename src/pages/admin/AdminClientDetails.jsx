// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { BASE_URL } from '../../components/constants/baseurl';
// import { Button, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
// import { LocalPhone, WhatsApp } from '@mui/icons-material';
// import { io } from 'socket.io-client';

// function AdminClientDetails() {
//     const { id } = useParams()
//     const [data, setData] = useState(null); // تخزين بيانات العميل
//     const [user, setUsers] = useState([]);


//     const [editedData, setEditedData] = useState({}); // تخزين البيانات المعدلة

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${BASE_URL}/api/clients/one/${id}`); // جلب بيانات العميل
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const jsonData = await response.json();
//                 setData(jsonData); // تخزين البيانات الأصلية
//                 setEditedData(jsonData); // نسخ البيانات إلى الحقول المعدلة
//             } catch (err) {
//                 console.log(err.message);
//             }
//         };
//         fetchData();
//         fetchUsers()
//     }, [id]);
//     const fetchUsers = async () => {
//         try {
//             const response = await fetch(`${BASE_URL}/api/users`);
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error('Error fetching users:', error.message);
//         }
//     };
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         // إذا كان الحقل هو assignedTo، قم بتحديثه ككائن يحتوي على _id
//         if (name === 'assignedTo') {
//             setEditedData({ ...editedData, assignedTo: { _id: value } });
//         } else {
//             setEditedData({ ...editedData, [name]: value }); // تحديث الحقول الأخرى
//         }
//         // setEditedData({ ...editedData, [name]: value }); // تحديث البيانات المعدلة عند تغيير الحقول
//     };

//     const handleUpdate = async () => {
//         try {
//             const response = await fetch(`${BASE_URL}/api/clients/${id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(editedData),
//             });
//             if (response.ok) {
//                 const updatedClient = await response.json();
//                 setData(updatedClient); // تحديث البيانات المعروضة بعد التعديل
//                 // alert('Client updated successfully');
//             } else {
//                 alert('Failed to update client');
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     if (!data) {
//         return (
//             <div>
//                 <Container>
//                     <Typography>Loading...</Typography>
//                 </Container>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <Container>
//                 <Stack sx={{ padding: '10px 0' }}>
//                     <Stack spacing={2}>
//                         <Typography variant="h5">
//                             {`${data.firstName} ${data.lastName}`}
//                         </Typography>
//                         <Typography>
//                             {`Phone: ${data.phone}`}
//                         </Typography>
//                         <a style={{ width: 'fit-content', borderRadius: '50%' }} href={`tel:${data.phone}`}>
//                             <IconButton >
//                                 <LocalPhone />
//                             </IconButton>
//                         </a>
//                         <a style={{ width: 'fit-content', borderRadius: '50%' }} href={`https://wa.me/${data.whatsapp}`}>
//                             <IconButton>
//                                 <WhatsApp />
//                             </IconButton>
//                         </a>

//                     </Stack>
//                     <Divider sx={{ margin: '20px 0' }} />
//                     <Stack spacing={2}>
//                         <TextField
//                             label="First Name"
//                             name="firstName"
//                             value={editedData.firstName || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             label="Last Name"
//                             name="lastName"
//                             value={editedData.lastName || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             label="Email"
//                             name="email"
//                             value={editedData.email || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             label="Phone"
//                             name="phone"
//                             value={editedData.phone || ''}
//                             onChange={handleInputChange}
//                         />
//                         <FormControl style={{ marginRight: '10px' }}>
//                             <InputLabel>Status</InputLabel>
//                             <Select
//                                 name="status"
//                                 value={editedData.status || ''}
//                                 onChange={handleInputChange}
//                             >
//                                 <MenuItem value='New Lead'>New Lead</MenuItem>
//                                 <MenuItem value='Interested'>Interested</MenuItem>
//                                 <MenuItem value='No Answer'>No Answer</MenuItem>
//                                 <MenuItem value='Follow Up'>Follow Up</MenuItem>
//                                 <MenuItem value='Reservation'>Reservation</MenuItem>
//                                 <MenuItem value='Contracted'>Contracted</MenuItem>
//                                 <MenuItem value='Attend Visit'>Attend Visit</MenuItem>
//                                 <MenuItem value='Archive'>Archive</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <TextField
//                             label="WhatsApp"
//                             name="whatsapp"
//                             value={editedData.whatsapp || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             label="Developer"
//                             name="developer"
//                             value={editedData.developer || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             label="Project"
//                             name="project"
//                             value={editedData.project || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             label="Notes"
//                             name="notes"
//                             value={editedData.notes || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             label="Lead Source"
//                             name="leadSource"
//                             value={editedData.leadSource || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             label="Description"
//                             name="description"
//                             value={editedData.description || ''}
//                             onChange={handleInputChange}
//                         />
//                         <TextField
//                             type="date"
//                             name="meetingDate"
//                             value={editedData.meetingDate || ''}
//                             onChange={handleInputChange}
//                         />
//                         <FormControl style={{ marginRight: '10px' }}>
//                             <InputLabel>Assign To</InputLabel>
//                             <Select
//                                 name="assignedTo" // أضف name لتحديد الحقل
//                                 value={editedData.assignedTo?._id || ''} // استخدام القيمة الحالية أو قيمة افتراضية
//                                 onChange={handleInputChange} // تحديث البيانات عند التغيير
//                             >
//                                 {user.filter(seller => seller._id !== localStorage.getItem("sellerId")).map((seller) => (
//                                     // console.log(seller)
//                                     <MenuItem key={seller._id} value={seller._id}>{seller.name}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={handleUpdate}
//                         >
//                             Update Client
//                         </Button>
//                     </Stack>
//                 </Stack>
//             </Container>
//         </div>
//     );
// }

// export default AdminClientDetails


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

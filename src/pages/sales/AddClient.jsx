
//     const handleCreateClient = () => {
//         const clientWithSeller = { ...newClient, assignedTo: localStorage.getItem("sellerId") }; // تعيين الـ sellerId هنا
//         dispatch(createClient(clientWithSeller));
//         setNewClient({
//             firstName: '',
//             lastName: '',
//             email: '',
//             phone: '',
//             status: '',
//             developer: '',
//             project: '',
//             notes: '',
//             leadSource: '',
//             description: '',
//             meetingDate: '',
//             whatsapp: '',
//             isBuyer: true,
//             assignedTo: '', // إعادة تعيين الـ assignedTo
//         });
//     };
//     // const handleDeleteClient = (id) => {
//     //     dispatch(deleteClient(id));
//     // };
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useCreateClientMutation } from '../../redux/apiSlice';

const AddClient = () => {
    const [createClient] = useCreateClientMutation(); // استخدام الـ mutation من RTK Query
    const [newClient, setNewClient] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: '',
        developer: '',
        project: '',
        notes: '',
        leadSource: '',
        description: '',
        whatsapp: '',
        meetingDate: '',
        isBuyer: '', // True = شاري, False = بايع
        assignedTo: '', // سيتم تعيين هذه القيمة بناءً على اختيار البائع
    });

    const handleCreateClient = async () => {
        const clientWithSeller = { ...newClient, assignedTo: localStorage.getItem("sellerId") }; // إضافة sellerId
        try {
            await createClient(clientWithSeller).unwrap(); // استدعاء الـ mutation وإلغاء التغليف للـ response
            setNewClient({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                status: '',
                developer: '',
                project: '',
                notes: '',
                leadSource: '',
                description: '',
                whatsapp: '',
                meetingDate: '',
                isBuyer: '',
                assignedTo: '', // إعادة تعيين assignedTo
            });
            alert('Client added successfully!');
        } catch (error) {
            console.error('Failed to add client:', error);
            alert('Failed to add client. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Clients Management</h2>
            <Stack style={{ gap: 10 }}>
                <TextField
                    label="First Name"
                    value={newClient.firstName}
                    onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Last Name"
                    value={newClient.lastName}
                    onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="whatsapp"
                    value={newClient.whatsapp}
                    onChange={(e) => setNewClient({ ...newClient, whatsapp: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Developer"
                    value={newClient.developer}
                    onChange={(e) => setNewClient({ ...newClient, developer: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Project"
                    value={newClient.project}
                    onChange={(e) => setNewClient({ ...newClient, project: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <FormControl style={{ marginRight: '10px' }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={newClient.status}
                        name="status"
                        onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
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
                <TextField
                    label="Notes"
                    value={newClient.notes}
                    onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Lead Source"
                    value={newClient.leadSource}
                    onChange={(e) => setNewClient({ ...newClient, leadSource: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Description"
                    value={newClient.description}
                    onChange={(e) => setNewClient({ ...newClient, description: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    type="date"
                    value={newClient.meetingDate}
                    onChange={(e) => setNewClient({ ...newClient, meetingDate: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <FormControl style={{ marginRight: '10px' }}>
                    <InputLabel>Buyer or Seller</InputLabel>
                    <Select
                        value={newClient.isBuyer}
                        onChange={(e) => setNewClient({ ...newClient, isBuyer: e.target.value })}
                    >
                        <MenuItem value='Buyer'>Buyer</MenuItem>
                        <MenuItem value='Seller'>Seller</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleCreateClient} style={{ marginLeft: '10px' }}>
                    Add Client
                </Button>
            </Stack>
        </div>
    );
};

export default AddClient;

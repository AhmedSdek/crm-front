import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Header from '../components/Header';
import { useGetAllClientsQuery } from '../redux/apiSlice';
import { BASE_URL } from '../components/constants/baseurl';
import Swal from 'sweetalert2';

const Clients = () => {
    const { data: clients = [], isLoading: loadingClients, error: errorClients } = useGetAllClientsQuery();
    const [users, setUsers] = useState([]);
    const currentUserId = localStorage.getItem('sellerId');
    const [loading, setLoading] = useState(null);

    const [selectedSeller, setSelectedSeller] = useState('');
    const [newClient, setNewClient] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        developer: '',
        project: '',
        notes: '',
        leadSource: '',
        description: '',
        whatsapp: '',
        meetingDate: '',
        isBuyer: true, // True = شاري, False = بايع
        assignedTo: '', // سيتم تعيين هذه القيمة بناءً على اختيار البائع
    });
    const handleCreateClient = () => {
        if (!selectedSeller) {
            Swal.fire({
                icon: "warning",
                title: "Missing Seller",
                text: "Please select a seller!",
            });
            return;
        }
        if (!newClient.phone || newClient.phone.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "Invalid Phone",
                text: "Please enter a valid phone number!",
            });
            return;
        }
        if (!newClient.email || newClient.email.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "Invalid Email",
                text: "Please enter a valid email!",
            });
            return;
        }

        setLoading(true);

        const clientWithSeller = { ...newClient, assignedTo: selectedSeller };

        fetch(`${BASE_URL}/api/clients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientWithSeller),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || "Failed to create lead");
                    });
                }
                return response.json();
            })
            .then(() => {
                setNewClient({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    developer: '',
                    project: '',
                    notes: '',
                    leadSource: '',
                    description: '',
                    meetingDate: '',
                    whatsapp: '',
                    isBuyer: true,
                    assignedTo: '',
                });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Lead Created Successfully",
                showConfirmButton: false,
                timer: 900
            });

            setLoading(false);
        })
            .catch((err) => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.message || "Something went wrong!",
                });
                console.error("Error:", err);
            });
    };

    // const handleCreateClient = () => {
    //     if (!selectedSeller) {
    //         alert('Please select a seller!');
    //         return;
    //     }
    //     if (!newClient.phone || newClient.phone.trim() === '') {
    //         alert('Please enter a valid phone number!');
    //         return;
    //     }
    //     if (!newClient.email || newClient.email.trim() === '') {
    //         alert('Please enter a valid email!');
    //         return;
    //     }
    //     setLoading(true)
    //     const clientWithSeller = { ...newClient, assignedTo: selectedSeller };
    //     // تنفيذ استدعاء POST باستخدام API Slice
    //     fetch(`${BASE_URL}/api/clients`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(clientWithSeller),
    //     })
    //         .then((response) => {
    //             response.json();
    //             console.log(response.json())
    //         })
    //         .then(() => {
    //             setNewClient({
    //                 firstName: '',
    //                 lastName: '',
    //                 email: '',
    //                 phone: '',
    //                 developer: '',
    //                 project: '',
    //                 notes: '',
    //                 leadSource: '',
    //                 description: '',
    //                 meetingDate: '',
    //                 whatsapp: '',
    //                 isBuyer: true,
    //                 assignedTo: '',
    //             });

    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title: "Lead Created Success",
    //                 showConfirmButton: false,
    //                 timer: 900
    //             });
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             setLoading(false);
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: err,
    //             });
    //             console.error(err);
    //         });
    // };
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const handleDeleteClient = (id) => {
        // تنفيذ استدعاء DELETE باستخدام API Slice
        fetch(`${BASE_URL}/api/clients/${id}`, { method: 'DELETE' })
            .then(() => console.log(`Client with ID ${id} deleted`))
            .catch((err) => console.error(err));
    };

    return (
        <div style={{ padding: '20px' }}>
            <Header title="Clients Management" subtitle="Add New Client" />
            <Stack style={{ marginBottom: '20px', gap: 10 }}>
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
                    label="Whatsapp"
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
                        <MenuItem value={true}>Buyer</MenuItem>
                        <MenuItem value={false}>Seller</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ marginRight: '10px' }}>
                    <InputLabel>Assign To</InputLabel>
                    <Select
                        value={selectedSeller}
                        onChange={(e) => setSelectedSeller(e.target.value)}
                    >
                        {users
                            .filter((seller) => seller._id !== currentUserId)
                            .map((seller) => (
                                <MenuItem key={seller._id} value={seller._id}>
                                    {seller.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" disabled={loading} onClick={handleCreateClient} style={{ marginLeft: '10px' }}>
                    Add Client
                </Button>
            </Stack>

            <List>
                {clients.map((client) => (
                    <ListItem key={client._id} style={{ borderBottom: '1px solid #ccc' }}>
                        <ListItemText primary={`${client.firstName} ${client.lastName}`} secondary={client.email} />
                        <IconButton onClick={() => handleDeleteClient(client._id)} edge="end">
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Clients;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchClients, createClient, deleteClient } from '../redux/clientSlice';
// import { Button, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material';
// import { Delete } from '@mui/icons-material';
// import { BASE_URL } from '../components/constants/baseurl';
// import Header from '../components/Header';

// const Clients = () => {
//     const dispatch = useDispatch();
//     const { clients, loading, error } = useSelector((state) => state.clients);
//     // console.log(clients)
//     const [users, setUsers] = useState([]);
//     const [selectedSeller, setSelectedSeller] = useState('');
//     const [newClient, setNewClient] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         developer: '',
//         project: '',
//         notes: '',
//         leadSource: '',
//         description: '',
//         whatsapp: '',
//         meetingDate: '',
//         isBuyer: true, // True = شاري, False = بايع
//         assignedTo: '', // سيتم تعيين هذه القيمة بناءً على اختيار البائع
//     });
//     // useEffect(() => {
//     //     const currentUserId = localStorage.getItem("sellerId"); // اجلب ID المستخدم الحالي من Redux أو Auth
//     //     // تسجيل الموظف في الغرفة الخاصة به
//     //     socket.emit('joinRoom', currentUserId);
//     // }, []);
//     useEffect(() => {
//         dispatch(fetchClients());
//         fetchUsers();
//     }, [dispatch]);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch(`${BASE_URL}/api/users`);
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error('Error fetching users:', error.message);
//         }
//     };

//     const handleCreateClient = () => {
//         if (!selectedSeller) {
//             alert('Please select a seller!');
//             return;
//         }
//         // التحقق من وجود رقم الهاتف
//         if (!newClient.phone || newClient.phone.trim() === '') {
//             alert('Please enter a valid phone number!');
//             return;
//         }
//         if (!newClient.email || newClient.email.trim() === '') {
//             alert('Please enter a valid email!');
//             return;
//         }
//         const clientWithSeller = { ...newClient, assignedTo: selectedSeller }; // تعيين الـ sellerId هنا
//         dispatch(createClient(clientWithSeller));
//         setNewClient({
//             firstName: '',
//             lastName: '',
//             email: '',
//             phone: '',
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

//     const handleDeleteClient = (id) => {
//         dispatch(deleteClient(id));
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div style={{ padding: '20px' }}>
//             <Header title="Clients Management" subtitle="Add New Client" />
//             <Stack style={{ marginBottom: '20px', gap: 10 }}>
//                 <TextField
//                     label="First Name"
//                     value={newClient.firstName}
//                     onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Last Name"
//                     value={newClient.lastName}
//                     onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Email"
//                     value={newClient.email}
//                     onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Phone"
//                     value={newClient.phone}
//                     onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="whatsapp"
//                     value={newClient.whatsapp}
//                     onChange={(e) => setNewClient({ ...newClient, whatsapp: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Developer"
//                     value={newClient.developer}
//                     onChange={(e) => setNewClient({ ...newClient, developer: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Project"
//                     value={newClient.project}
//                     onChange={(e) => setNewClient({ ...newClient, project: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Notes"
//                     value={newClient.notes}
//                     onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Lead Source"
//                     value={newClient.leadSource}
//                     onChange={(e) => setNewClient({ ...newClient, leadSource: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Description"
//                     value={newClient.description}
//                     onChange={(e) => setNewClient({ ...newClient, description: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     // label="Meeting Date"
//                     type="date"
//                     value={newClient.meetingDate}
//                     onChange={(e) => setNewClient({ ...newClient, meetingDate: e.target.value })}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <FormControl style={{ marginRight: '10px' }}>
//                     <InputLabel>Buyer or Seller</InputLabel>
//                     <Select
//                         value={newClient.isBuyer}
//                         onChange={(e) => setNewClient({ ...newClient, isBuyer: e.target.value })}
//                     >
//                         <MenuItem value={true}>Buyer</MenuItem>
//                         <MenuItem value={false}>Seller</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <FormControl style={{ marginRight: '10px' }}>
//                     <InputLabel>Assign To</InputLabel>
//                     <Select
//                         value={selectedSeller}
//                         onChange={(e) => setSelectedSeller(e.target.value)}
//                     >
//                         {users.filter(seller => seller._id !== localStorage.getItem("sellerId")).map((seller) => (
//                             <MenuItem key={seller._id} value={seller._id}>{seller.name}</MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <Button variant="contained" color="primary" onClick={handleCreateClient} style={{ marginLeft: '10px' }}>
//                     Add Client
//                 </Button>
//             </Stack>

//             <List>
//                 {clients.map((client) => (
//                     <ListItem key={client._id} style={{ borderBottom: '1px solid #ccc' }}>
//                         <ListItemText primary={`${client.firstName} ${client.lastName}`} secondary={client.email} />
//                         <IconButton onClick={() => handleDeleteClient(client._id)} edge="end">
//                             <Delete />
//                         </IconButton>
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
// };

// export default Clients;
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

const Clients = () => {
    const { data: clients = [], isLoading: loadingClients, error: errorClients } = useGetAllClientsQuery();
    const [users, setUsers] = useState([]);
    const currentUserId = localStorage.getItem('sellerId');

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
            alert('Please select a seller!');
            return;
        }
        if (!newClient.phone || newClient.phone.trim() === '') {
            alert('Please enter a valid phone number!');
            return;
        }
        if (!newClient.email || newClient.email.trim() === '') {
            alert('Please enter a valid email!');
            return;
        }

        const clientWithSeller = { ...newClient, assignedTo: selectedSeller };

        // تنفيذ استدعاء POST باستخدام API Slice
        fetch(`${BASE_URL}/api/clients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientWithSeller),
        })
            .then((response) => response.json())
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
            })
            .catch((err) => console.error(err));
    };
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
                <Button variant="contained" color="primary" onClick={handleCreateClient} style={{ marginLeft: '10px' }}>
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

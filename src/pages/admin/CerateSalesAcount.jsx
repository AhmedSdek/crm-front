// import React, { useState } from 'react';
// import { BASE_URL } from '../../components/constants/baseurl';
// import { Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
// import Header from '../../components/Header';


// const CreateSalesUser = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(null);

//     const handleCreateSales = async (e) => {
//         e.preventDefault();
//         setLoading(true)
//         try {
//             const response = await fetch(`${BASE_URL}/api/sales/create-sales`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, email, phone }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setMessage('تم إنشاء حساب السيلز وإرسال الإيميل بنجاح.');
//                 setLoading(false)
//             } else {
//                 setMessage(`خطأ: ${data.message}`);
//                 setLoading(false)
//             }
//         } catch (error) {
//             setMessage('حدث خطأ أثناء إنشاء الحساب.');
//             setLoading(false)
//             console.error('Error creating sales user:', error.message);
//         }
//     };

//     return (
//         <Container>
//             <Header title="Create Sales Account" subtitle="Add New Sales" />
//             <Stack spacing={2} component='form' onSubmit={handleCreateSales}>
//                 <TextField
//                     label="name"
//                     value={name}
//                     required
//                     type='text'
//                     name='name'
//                     onChange={(e) => setName(e.target.value)}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="email"
//                     value={email}
//                     required
//                     type='email'
//                     name='email'
//                     onChange={(e) => setEmail(e.target.value)}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <TextField
//                     label="Phone"
//                     value={phone}
//                     required
//                     type='text'
//                     name='Phone'
//                     onChange={(e) => setPhone(e.target.value)}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <FormControl style={{ marginRight: '10px' }}>
//                     <InputLabel>Select role</InputLabel>
//                     <Select
//                     // value={newClient.isBuyer}
//                     // onChange={(e) => setNewClient({ ...newClient, isBuyer: e.target.value })}
//                     >
//                         <MenuItem value='admin'>admin</MenuItem>
//                         <MenuItem value="sales">sales</MenuItem>
//                         <MenuItem value="hr">hr</MenuItem>
//                     </Select>
//                 </FormControl>
//                 {/* <Button variant='contained' type="submit">Create Sales</Button> */}
//                 <Button type='submit' variant="contained" color="primary" disabled={loading} style={{ marginLeft: '10px' }}>
//                     {
//                         loading ? <CircularProgress size={20} color="inherit" />
//                             :
//                             "Create Sales"
//                     }
//                 </Button>
//             </Stack>
//             {message && <p>{message}</p>}
//         </Container>
//     );
// };

// export default CreateSalesUser;


import React, { useState } from 'react';
import { BASE_URL } from '../../components/constants/baseurl';
import { Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';

const CreateSalesUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateSales = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/sales/create-sales`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, role }),
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Header title="Create User Account" subtitle="Add New User" />
            <Stack spacing={2} component='form' onSubmit={handleCreateSales}>
                <TextField
                    label="Name"
                    value={name}
                    required
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    value={email}
                    required
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Phone"
                    value={phone}
                    required
                    type='number'
                    onChange={(e) => setPhone(e.target.value)}
                />
                <FormControl required>
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={role}
                        required
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="hr">HR</MenuItem>
                    </Select>
                </FormControl>
                <Button type='submit' variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Create User"}
                </Button>
            </Stack>
            {message && <Typography color="error">{message}</Typography>}
        </Container>
    );
};

export default CreateSalesUser;

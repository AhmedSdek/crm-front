// import React, { useState } from 'react';
// import {
//     Button,
//     CircularProgress,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
//     Stack,
//     TextField,
// } from '@mui/material';
// import Header from '../components/Header';
// import { BASE_URL } from '../components/constants/baseurl';
// import Swal from 'sweetalert2';
// import { useGetAllUsersQuery } from '../redux/apiSlice';

// const Clients = () => {
//     // const [users, setUsers] = useState([]);
//     // const currentUserId = localStorage.getItem('sellerId');
//     const { data: users = [] } = useGetAllUsersQuery(); // جلب بيانات المستخدمين
//     const [loading, setLoading] = useState(null);
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
//     const handleCreateClient = async () => {
//         if (!selectedSeller) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Missing Seller",
//                 text: "Please select a seller!",
//             });
//             return;
//         }
//         if (!newClient.phone || newClient.phone.trim() === '') {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Invalid Phone",
//                 text: "Please enter a valid phone number!",
//             });
//             return;
//         }
//         if (!newClient.email || newClient.email.trim() === '') {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Invalid Email",
//                 text: "Please enter a valid email!",
//             });
//             return;
//         }

//         setLoading(true);

//         const clientWithSeller = { ...newClient, assignedTo: selectedSeller };

//         fetch(`${BASE_URL}/api/clients`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(clientWithSeller),
//         })
//             .then(async (response) => {
//                 if (!response.ok) {
//                     return response.json().then(err => {
//                         throw new Error(err.message || "Failed to create lead");
//                     });
//                 }
//                 return response.json();
//             })
//             .then(() => {
//                 setNewClient({
//                     firstName: '',
//                     lastName: '',
//                     email: '',
//                     phone: '',
//                     developer: '',
//                     project: '',
//                     notes: '',
//                     leadSource: '',
//                     description: '',
//                     meetingDate: '',
//                     whatsapp: '',
//                     isBuyer: true,
//                     assignedTo: '',
//                 });
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Lead Created Successfully",
//                 showConfirmButton: false,
//                 timer: 900
//             });
//             setLoading(false);
//         })
//             .catch((err) => {
//                 setLoading(false);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: err.message || "Something went wrong!",
//                 });
//                 console.error("Error:", err);
//             });
//     };

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
//                     label="Whatsapp"
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
//                     type="datetime-local"
//                     label="meeting Date & Time"
//                     InputLabelProps={{ shrink: true }} // ✅ يضمن بقاء الـ label في الأعلى
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
//                         {users
//                             .filter((seller) => seller.role === "sales")
//                             .map((seller) => (
//                                 <MenuItem key={seller._id} value={seller._id}>
//                                     {seller.name}
//                                 </MenuItem>
//                             ))}
//                     </Select>
//                 </FormControl>
//                 <Button variant="contained" color="primary" disabled={loading} onClick={handleCreateClient} style={{ marginLeft: '10px' }}>
//                     {
//                         loading ? <CircularProgress size={20} color="inherit" />
//                             :
//                             "Add Client"
//                     }
//                 </Button>
//             </Stack>
//         </div>
//     );
// };

// export default Clients;






import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import Header from '../components/Header';
import { BASE_URL } from '../components/constants/baseurl';
import Swal from 'sweetalert2';
import { useGetAllUsersQuery } from '../redux/apiSlice';

const Clients = () => {
    const { data: users = [] } = useGetAllUsersQuery(); // جلب بيانات المستخدمين
    const [loading, setLoading] = useState(null);
    const [selectedSeller, setSelectedSeller] = useState('');
    const [newClient, setNewClient] = useState({
        name: '',
        // lastName: '',
        email: '',
        phone: '',
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
    const [inputMethod, setInputMethod] = useState('manual'); // "manual" أو "excel"
    const [file, setFile] = useState(null);
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    };

    // const handleUploadExcel = () => {
    //     if (!file) {
    //         Swal.fire({ icon: "warning", title: "Missing File", text: "Please upload an Excel file!" });
    //         return;
    //     }
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //         const data = new Uint8Array(event.target.result);
    //         const workbook = XLSX.read(data, { type: "array" });
    //         const sheetName = workbook.SheetNames[0];
    //         const sheet = workbook.Sheets[sheetName];
    //         const parsedData = XLSX.utils.sheet_to_json(sheet);

    //         setLoading(true);
    //         fetch(`${BASE_URL}/api/clients/bulk`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ clients: parsedData })
    //         })
    //             .then(response => response.json())
    //             .then(() => {
    //                 Swal.fire({ icon: "success", title: "Clients Uploaded Successfully", timer: 900 });
    //                 setLoading(false);
    //             })
    //             .catch((err) => {
    //                 setLoading(false);
    //                 Swal.fire({ icon: "error", title: "Oops...", text: err.message || "Something went wrong!" });
    //             });
    //     };
    //     reader.readAsArrayBuffer(file);
    // };

    const handleUploadExcel = () => {
        if (!file) {
            Swal.fire({ icon: "warning", title: "Missing File", text: "Please upload an Excel file!" });
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            setLoading(true);
            fetch(`${BASE_URL}/api/clients/bulk`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clients: parsedData })
            })
                .then(async (response) => {
                    const result = await response.json(); // تحويل الاستجابة إلى JSON
                    console.log(result)
                    if (!response.ok) {
                        throw new Error(result.message || "Something went wrong!"); // عرض خطأ الباك-إند
                    }
                    return result;
                })
                .then(() => {
                    Swal.fire({ icon: "success", title: "Clients Uploaded Successfully", timer: 900 });
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    Swal.fire({ icon: "error", title: "Upload Failed", text: err.message || "Something went wrong!" });
                });
        };
        reader.readAsArrayBuffer(file);
    };


    const handleCreateClient = async () => {
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
            .then(async (response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || "Failed to create lead");
                    });
                }
                return response.json();
            })
            .then(() => {
                setNewClient({
                    name: '',
                    // lastName: '',
                    email: '',
                    phone: '',
                    developer: '',
                    project: '',
                    notes: '',
                    leadSource: '',
                    description: '',
                    meetingDate: '',
                    whatsapp: '',
                    isBuyer: '',
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

    return (
        <div style={{ padding: '20px' }}>
            <Header title="Clients Management" subtitle="Add New Client" />
            <FormControl style={{ marginBottom: '20px' }}>
                <InputLabel>Input Method</InputLabel>
                <Select value={inputMethod} onChange={(e) => setInputMethod(e.target.value)}>
                    <MenuItem value="manual">Manual Entry</MenuItem>
                    <MenuItem value="excel">Upload Excel</MenuItem>
                </Select>
            </FormControl>
            {inputMethod === "manual" ? (
                <Stack component='form' onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateClient()
                }} style={{ marginBottom: '20px', gap: 10 }}>
                    <TextField
                        label="Name"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        style={{ marginRight: '10px' }}
                    />
                    {/* <TextField
                        label="Last Name"
                        value={newClient.lastName}
                        onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                        style={{ marginRight: '10px' }}
                    /> */}
                    <TextField
                        label="Email"
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                        style={{ marginRight: '10px' }}
                    />
                    <TextField
                        label="Phone"
                        type='number'
                        value={newClient.phone}
                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                        style={{ marginRight: '10px' }}
                    />
                    <TextField
                        label="Whatsapp"
                        value={newClient.whatsapp}
                        onChange={(e) => setNewClient({ ...newClient, whatsapp: e.target.value })}
                        type='number'
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
                        type="datetime-local"
                        label="meeting Date & Time"
                        InputLabelProps={{ shrink: true }} // ✅ يضمن بقاء الـ label في الأعلى
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
                    <FormControl style={{ marginRight: '10px' }}>
                        <InputLabel>Assign To</InputLabel>
                        <Select
                            value={selectedSeller}
                            onChange={(e) => setSelectedSeller(e.target.value)}
                        >
                            {users
                                .filter((seller) => seller.role === "sales")
                                .map((seller) => (
                                    <MenuItem key={seller._id} value={seller._id}>
                                        {seller.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <Button type='submit' variant="contained" color="primary" disabled={loading} style={{ marginLeft: '10px' }}>
                        {
                            loading ? <CircularProgress size={20} color="inherit" />
                                :
                                "Add Client"
                        }
                    </Button>
                </Stack>
            ) : (
                <Stack spacing={2}>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    <Button variant="contained" color="primary" disabled={loading} onClick={handleUploadExcel}>
                        {loading ? <CircularProgress size={20} color="inherit" /> : "Upload Clients"}
                    </Button>
                </Stack>
            )}
        </div>
    );
};

export default Clients;
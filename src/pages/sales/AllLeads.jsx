import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsForSeller } from '../../redux/sellerClientSlice';
import { Alert, Box, Button, CircularProgress, Container, List, ListItem, ListItemText, Paper, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';

function AllLeads() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const nav = useNavigate();
    const colors = tokens(theme.palette.mode);
    const { clients, loading, error } = useSelector((state) => state.sellerClients);
    console.log(clients)
    const sellerId = localStorage.getItem('sellerId'); // تخزين sellerId
    useEffect(() => {
        if (sellerId) {
            dispatch(fetchClientsForSeller(sellerId));
        }
    }, [dispatch, sellerId]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    const columns = [
        { field: "firstName", headerName: "First Name", flex: 1, minWidth: 100 },
        { field: "lastName", headerName: "Last Name", flex: 0.7, minWidth: 100 },
        { field: "phone", headerName: "Phone Number", flex: 1, minWidth: 100 },
        { field: "whatsapp", headerName: "Whatsapp Number", flex: 1, minWidth: 100 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
        { field: "status", headerName: "Status", flex: 0.7, minWidth: 100 },
        { field: "developer", headerName: "developer", flex: 0.7, minWidth: 100 },
        { field: "project", headerName: "project", flex: 0.7, minWidth: 100 },
        // { field: "modifiedTime", headerName: "modifiedTime", flex: 0.7, minWidth: 100 },
        {
            field: "modifiedTime",
            headerName: "modifiedTime",
            flex: 1,
            minWidth: 200,
            renderCell: ({ row }) => (
                <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                    {moment(row.modifiedTime).fromNow()}
                </Box>
            ),
        },
        {
            headerName: "Action",
            flex: 1,
            minWidth: 100,
            renderCell: ({ row }) => (
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        onClick={() => nav(`/allleads/${row._id}`)}
                        sx={{
                            backgroundColor: colors.blueAccent[500],
                            color: colors.grey[100],
                            borderRadius: "5px",
                            padding: "5px 10px",
                            minWidth: "80px",
                        }}
                    >
                        Edit
                    </Button>
                </Box>
            ),
        },
    ];
    return (
        <Box m="20px">
            <Header title="Leads" subtitle="List of Leads" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    overflowX: "auto", // إضافة سكرول عند الحاجة
                    "& .MuiDataGrid-root": {
                        border: "none",
                        minWidth: "900px", // التأكد من عدم تصغير الجدول أكثر من اللازم
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    checkboxSelection
                    pageSizeOptions={[5, 10, 20, 50]} // تحديد الخيارات المتاحة لعدد الصفوف في كل صفحة
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } } // تحديد العدد الافتراضي للصفوف
                    }}
                    // localeText={{ noRowsLabel:  }} 
                    loading={loading} // لو البيانات لسه بتحمل، هيظهر "Loading..."
                    localeText={{
                        noRowsLabel: "No Data", // لو مفيش بيانات
                        loadingOverlayLabel: <CircularProgress size={20} color="inherit" />, // أثناء التحميل
                    }}
                    rows={clients || []}
                    getRowId={(row) => row._id} // ✅ تعيين معرف احتياطي عند الحاجة
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                />
            </Box>
        </Box>
        // <Container>
        //     <div>
        //         <h2>Your Leads</h2>
        //         {clients.length === 0 ? (
        //             <p>No clients assigned to you yet.</p>
        //         ) : (
        //             <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        //                 {clients.map((client) => (
        //                     <Link key={client._id} to={`/allleads/${client._id}`}>
        //                         <Paper>
        //                             <ListItem key={client._id} style={{ borderBottom: '1px solid #ccc' }}>
        //                                 {/* <ListItemText
        //                                     primary={`${client.firstName} ${client.lastName}`}
        //                                     secondary={`Email: ${client.email} | Phone: ${client.phone}`}
        //                                 /> */}
        //                                 <Typography>
        //                                     {`${client.firstName} ${client.lastName}`}
        //                                 </Typography>
        //                             </ListItem>
        //                         </Paper>
        //                     </Link>
        //                 ))}
        //             </List>
        //         )}
        //     </div>
        // </Container>
    );
}

export default AllLeads
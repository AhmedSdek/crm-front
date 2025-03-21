import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../components/constants/baseurl';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetUserByIdQuery } from '../../redux/apiSlice';
function SaleDetails() {
    const { id } = useParams();
    const [clients, setClients] = useState([]);
    const nav = useNavigate()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data: user = {}, error: usersError, isLoading: usersLoading } =
        useGetUserByIdQuery(id);
    useEffect(() => {
        if (user) {
            setClients(user.assignedClients)
        }
    }, [user]);
    // console.log(clients)
    const columns = [
        // { field: "id", headerName: "ID" },
        {
            field: "firstName",
            headerName: "first Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            field: "assignedTo",
            headerName: "assignedTo",
            flex: 1,
            renderCell: () => {
                return (
                    <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                        {user.name}
                    </Box>
                );
            },
        },
        {
            field: 'action',
            headerName: "Action",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ gap: 2 }} display="flex" justifyContent="space-around"
                        m="auto"
                        p="5px">
                        <Button
                            onClick={() =>
                                nav(`/admin-dashboard/all-clients/${row._id}`)
                                // console.log(row._id)
                            }
                            sx={{
                                backgroundColor: colors.blueAccent[500],
                                color: colors.grey[100],
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                cursor: "pointer",
                            }}
                        >
                            View
                        </Button>
                        {/* <Button
                  onClick={() => handleDelete(row._id)}
                  sx={{
                    backgroundColor: colors.redAccent[600],
                    color: colors.grey[100],
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </Button> */}
                    </Box >
                );
            },
        }
    ];
    return (
        <Box m="20px">
            <Typography sx={{ textAlign: 'center', padding: '10px' }}>
                {user && user.name}  Details
            </Typography>
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
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    rowCount={clients?.length || 0} // ✅ تحديد عدد الصفوف لتجنب الخطأ
                    components={{ Toolbar: GridToolbar }}
                    checkboxSelection rows={clients} getRowId={(row) => row._id} columns={columns} />
            </Box>
        </Box>
    )
}

export default SaleDetails
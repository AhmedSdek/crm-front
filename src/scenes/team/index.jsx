import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../redux/apiSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../components/constants/baseurl";

const Team = () => {
  // console.log(mockDataTeam)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loadingId, setLoadingId] = useState(null);
  const { data: users = [], error: usersError, isLoading: usersLoading, refetch } =
    useGetAllUsersQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });
  // console.log(users)
  const nav = useNavigate()
  const handleDelete = async (id) => {
    // console.log(id)
    setLoadingId(id); // تحديد العميل الجاري حذفه
    try {
      await fetch(`${BASE_URL}/api/users/${id}`, { method: "DELETE" });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Deleted Success",
        showConfirmButton: false,
        timer: 900
      });
      await refetch(); // تحديث البيانات بعد الحذف
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cant delete User",
      });
      console.error(err);
    } finally {
      setLoadingId(null); // إنهاء اللودينج بعد اكتمال العملية
    }
  };
  const columns = [
    // { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 100
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 150
    },
    {
      field: "email",
      headerName: "Login Email",
      flex: 1,
      minWidth: 200
    },
    {
      field: "realemail",
      headerName: "Email",
      flex: 1,
      minWidth: 200
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 100,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            m="auto 5px"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems='center'
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "sales" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "assignedClients",
      headerName: "Clients",
      minWidth: 100,
      flex: 0.5,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" width="100%">
            {row.assignedClients ? row.assignedClients.length : 0}
          </Box>
        );
      },
    },
    {
      field: 'action',
      headerName: "Action",
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ gap: 2 }} display="flex" justifyContent="space-around"
            m="auto"
            p="5px">
            <Button
              onClick={() =>
                nav(`/admin-dashboard/team/${row._id}`)
                // console.log(row._id)
              }
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                display: row.role === "admin" && "none"
              }}
            >
              View
            </Button>
            <Button
              onClick={() => handleDelete(row._id)}
              disabled={loadingId === row._id} // ⛔ تعطيل الزر أثناء التحميل
              sx={{
                backgroundColor: colors.redAccent[600],
                color: colors.grey[100],
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                display: row.role === "admin" && "none"
              }}
            >
              {loadingId === row._id ? <CircularProgress size={20} color="inherit" /> : "Delete"}
            </Button>
          </Box >
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
          loading={usersLoading} // لو البيانات لسه بتحمل، هيظهر "Loading..."
          localeText={{
            noRowsLabel: "No Data", // لو مفيش بيانات
            loadingOverlayLabel: <CircularProgress size={20} color="inherit" />, // أثناء التحميل
          }}
          rowCount={users?.length || 0} // ✅ تحديد عدد الصفوف لتجنب الخطأ
          components={{ Toolbar: GridToolbar }}
          checkboxSelection rows={users} getRowId={(row) => row._id} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;

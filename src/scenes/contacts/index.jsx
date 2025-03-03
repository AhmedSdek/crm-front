import { Box, Button, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useGetAllClientsQuery } from "../../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseurl";
import { useState } from "react";
import Swal from "sweetalert2";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const nav = useNavigate();

  // 🟢 حالة تتبع العميل الجاري حذفه
  const [loadingId, setLoadingId] = useState(null);

  const { data: clients, error: clientsError, isLoading: clientsLoading, refetch } =
    useGetAllClientsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });

  // 🟢 دالة حذف العميل مع اللودينج
  const handleDeleteClient = async (id) => {
    console.log(id)
    setLoadingId(id); // تحديد العميل الجاري حذفه
    try {
      await fetch(`${BASE_URL}/api/clients/${id}`, { method: "DELETE" });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Lead Deleted Success",
        showConfirmButton: false,
        timer: 900
      });
      await refetch(); // تحديث البيانات بعد الحذف
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cant delete Lead",
      });
      console.error(err);
    } finally {
      setLoadingId(null); // إنهاء اللودينج بعد اكتمال العملية
    }
  };

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 100 },
    { field: "lastName", headerName: "Last Name", flex: 0.7, minWidth: 100 },
    { field: "phone", headerName: "Phone Number", flex: 1, minWidth: 100 },
    { field: "whatsapp", headerName: "Whatsapp Number", flex: 1, minWidth: 100 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 0.7, minWidth: 100 },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          {row.assignedTo?.name}
        </Box>
      ),
    },
    {
      headerName: "Action",
      flex: 1,
      minWidth: 250,
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
            onClick={() => nav(`/admin-dashboard/all-clients/${row._id}`)}
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
          <Button
            onClick={() => handleDeleteClient(row._id)}
            disabled={loadingId === row._id} // ⛔ تعطيل الزر أثناء التحميل
            sx={{
              backgroundColor: colors.redAccent[600],
              color: colors.grey[100],
              borderRadius: "5px",
              padding: "5px 10px",
              minWidth: "80px",
            }}
          >
            {loadingId === row._id ? <CircularProgress size={20} color="inherit" /> : "Delete"}
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
          rows={clients || []}
          getRowId={(row) => row._id} // ✅ تعيين معرف احتياطي عند الحاجة
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;

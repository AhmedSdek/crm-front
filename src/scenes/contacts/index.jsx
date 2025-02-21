import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useGetAllClientsQuery } from "../../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseurl";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const nav = useNavigate()
  const handleDeleteClient = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/clients/${id}`, { method: "DELETE" });
      console.log(`Client with ID ${id} deleted`);
      // 🔄 تحديث البيانات بعد الحذف
      refetch();
    } catch (err) {
      console.error(err);
    }
  };
  const { data: clients, error: clientsError, isLoading: clientsLoading, refetch } =
    useGetAllClientsQuery(undefined, {
      refetchOnMountOrArgChange: true, // تحديث البيانات عند تحميل المكون
      refetchOnFocus: true,            // تحديث البيانات عند التركيز على الصفحة
    });
  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.7,
      cellClassName: "name-column--cell",
      minWidth: 200
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 200
    },
    {
      field: "whatsapp",
      headerName: "whatsapp Number",
      flex: 1,
      minWidth: 200
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      minWidth: 200
    },
    {
      field: "assignedTo",
      headerName: "assignedTo",
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" width="100%">
            {row.assignedTo && row.assignedTo.name}
          </Box>
        );
      },
    }, {
      headerName: "Action",
      flex: 1,
      minWidth: 200,  // 🔹 تحديد حد أدنى مناسب
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              gap: 1,
              display: "flex",
              maxWidth: "100%",  // 🔹 يمنع الخروج عن حدود الخلية
              justifyContent: "center",  // 🔹 يضمن أن الأزرار لا تخرج عن الحدود
              alignItems: "center",
              flexWrap: "wrap"  // 🔹 يجعل الأزرار تنزل تحت بعضها إذا لم تكفي المساحة
            }}
          >
            <Button
              onClick={() => nav(`/admin-dashboard/all-clients/${row._id}`)}
              sx={{
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                minWidth: "80px",  // 🔹 عرض الزر مناسب
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteClient(row._id)}
              sx={{
                backgroundColor: colors.redAccent[600],
                color: colors.grey[100],
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                minWidth: "80px",  // 🔹 عرض الزر مناسب
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="Leads"
        subtitle="List of Leads"
      />
      {/* <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          minWidth: "1000px",  // 🔹 تأكد من وجود مساحة كافية للجدول
          overflowX: "auto", // إضافة سكرول عند الحاجة
          "& .MuiDataGrid-root": {
            border: "none",
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
          sx={{ overflow: 'auto', maxWidth: '100%' }}
          rows={clients && clients}
          slots={{
            toolbar: GridToolbar,
          }}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box> */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        // sx={{
        //   "& .MuiDataGrid-root": {
        //     border: "none",
        //   },
        //   "& .MuiDataGrid-cell": {
        //     borderBottom: "none",
        //   },
        //   "& .name-column--cell": {
        //     color: colors.greenAccent[300],
        //   },
        //   "& .MuiDataGrid-columnHeaders": {
        //     backgroundColor: colors.blueAccent[700],
        //     borderBottom: "none",
        //   },
        //   "& .MuiDataGrid-virtualScroller": {
        //     backgroundColor: colors.primary[400],
        //   },
        //   "& .MuiDataGrid-footerContainer": {
        //     borderTop: "none",
        //     backgroundColor: colors.blueAccent[700],
        //   },
        //   "& .MuiCheckbox-root": {
        //     color: `${colors.greenAccent[200]} !important`,
        //   },
        //   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        //     color: `${colors.grey[100]} !important`,
        //   },
        // }}
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
          components={{ Toolbar: GridToolbar }}
          checkboxSelection rows={clients && clients} getRowId={(row) => row._id} columns={columns} />
      </Box>
    </Box>
  );
};

export default Contacts;

import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../components/constants/baseurl";
import { useNavigate } from "react-router-dom";

const Team = () => {
  // console.log(mockDataTeam)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sales, setSales] = useState([]);
  const nav = useNavigate()
  useEffect(() => {
    fetchUsers()
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`);
      const data = await response.json();
      // const salesUsers = data.filter(user => user.role === "sales");
      setSales(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };
  const columns = [
    // { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="auto"
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
      headerName: "Action",
      flex: 1,
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
              }}
            >
              Edit
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
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
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
          slots={{
            toolbar: GridToolbar,
          }}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection rows={sales} getRowId={(row) => row._id} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;

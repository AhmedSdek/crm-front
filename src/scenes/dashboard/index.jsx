import { Box, Button, Container, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Sidebar from "../global/Sidebar";
import { useEffect, useState } from "react";
import { useGetAllClientsQuery, useGetAllUsersQuery, useGetNewLeadsQuery } from "../../redux/apiSlice";
import { PeopleSharp } from "@mui/icons-material";
import PieChart from "../../components/PieChart";


const Dashboard = () => {
  // const [isSidebar, setIsSidebar] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [salse, setSalse] = useState([]);

  const { data: clients = [], error: clientsError, isLoading: clientsLoading } =
    useGetAllClientsQuery(undefined, {
      refetchOnMountOrArgChange: true, // تحديث البيانات عند تحميل المكون
      refetchOnFocus: true,            // تحديث البيانات عند التركيز على الصفحة
    });
  // console.log(clients)
  const { data: newLeadsData, error: newLeadsError, isLoading: newLeadsLoading } =
    useGetNewLeadsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });

  const { data: users = [], error: usersError, isLoading: usersLoading } =
    useGetAllUsersQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });
  // console.log(users)

  // حفظ العملاء الجدد في حالة (state)
  const [newLeads, setNewLeads] = useState([]);

  // تحديث الـ state عند الحصول على البيانات الخاصة بـ new leads
  useEffect(() => {
    if (newLeadsData) {
      setNewLeads(newLeadsData);
    }
    if (users) {
      const salesUsers = users.filter(user => user.role === "sales");
      setSalse(salesUsers);
    }
  }, [newLeadsData, users]);

  const contractedSales = salse
    .map(sale => ({
      ...sale,
      contractedCount: sale.assignedClients.filter(client => client.status === "Contracted").length
    }))
    .filter(sale => sale.contractedCount > 0) // فلترة السيلز اللي عندهم عقود فقط
    .sort((a, b) => b.contractedCount - a.contractedCount); // ترتيب تنازلي
  return (
    <Container>
      <Box >
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          {/* <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box> */}
        </Box>

        {/* GRID & CHARTS */}
        <Stack
          sx={{ gap: 2 }}
        >
          {/* ROW 1 */}
          <Stack sx={{
            flexDirection: { xs: 'column', lg: 'row' },
            width: '100%',
            gap: 3, // المسافة بين البوكسات
            justifyContent: 'space-between', // توزيع العناصر بالتساوي
            alignItems: 'center', // حواف داخلية للمكدس
          }}>
            <Box
              sx={{
                backgroundColor: colors.primary[400],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                width: '100%',
                minWidth: '250px', // الحد الأدنى لعرض البوكس
                height: '150px',
                borderRadius: '12px', // زوايا دائرية
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                p: 2,
              }}
            >
              <StatBox
                title={users ? users.length : 0}
                subtitle="Users"
                progress={`0.${users && users.length}`}
                // increase="+14%"
                icon={
                  <PeopleSharp
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              sx={{
                backgroundColor: colors.primary[400],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                width: '100%',
                minWidth: '250px', // الحد الأدنى لعرض البوكس
                height: '150px',
                borderRadius: '12px', // زوايا دائرية
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                p: 2,
              }}
            >
              <StatBox
                title={clients ? clients.length : 0}
                subtitle="Leads"
                progress={`0.${clients && clients.length}`}
                // increase="+14%"
                icon={
                  <PeopleSharp
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              sx={{
                backgroundColor: colors.primary[400],
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
                flex: 1,
                minWidth: '250px', // الحد الأدنى لعرض البوكس
                height: '150px',
                borderRadius: '12px', // زوايا دائرية
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                p: 2,
              }}
            >
              <StatBox
                title={salse ? salse.length : 0}
                subtitle="Sales"
                progress={`0.${salse && salse.length}`}
                // increase="+14%"
                icon={
                  <PeopleSharp
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            {/* <Box
              // gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="431,225"
                subtitle="Sales Obtained"
                progress="0.50"
                increase="+21%"
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box> */}
            <Box
              sx={{
                backgroundColor: colors.primary[400],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                flex: 1,
                minWidth: '250px', // الحد الأدنى لعرض البوكس
                height: '150px',
                borderRadius: '12px', // زوايا دائرية
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                p: 2,
              }}
            >
              <StatBox
                title={newLeads && newLeads.length}
                subtitle="New Leads"
                progress={`0.${newLeads && newLeads.length}`}
                // increase="0"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            {/* <Box
              // gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="1,325,134"
                subtitle="Traffic Received"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box> */}
          </Stack>

          {/* ROW 2 */}
          {/* <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  $59,342.32
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box> */}






          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Top Achievers
              </Typography>
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Contracted Leads
              </Typography>
            </Box>
            {!usersLoading ? salse.map((sale, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography color={colors.grey[100]}>
                    {sale.name}
                  </Typography>
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {sale.assignedClients.filter(client => client.status === 'Contracted').length}
                </Box>
              </Box>
            ))
              :
              <Typography>
                Loading
              </Typography>
            }
          </Box> */}
          {
            contractedSales.length > 0 &&
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Top Achievers
                </Typography>
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Contracted Leads
                </Typography>
              </Box>
              {/* {salse
              .map(sale => ({
                ...sale,
                contractedCount: sale.assignedClients.filter(client => client.status === "Contracted").length
              }))} */}
              {!usersLoading ? (
                salse
                  .map(sale => ({
                    ...sale,
                    contractedCount: sale.assignedClients.filter(client => client.status === "Contracted").length
                  }))
                  .filter(sale => sale.contractedCount > 0) // فلترة السيلز اللي عندهم عقود فقط
                  .sort((a, b) => b.contractedCount - a.contractedCount) // ترتيب تنازلي بناءً على العقود
                  .map((sale, i) => (
                    <Box
                      key={i}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`4px solid ${colors.primary[500]}`}
                      p="15px"
                    >
                      <Box>
                        <Typography color={colors.grey[100]}>
                          {sale.name}
                        </Typography>
                      </Box>
                      <Box
                        backgroundColor={colors.greenAccent[500]}
                        p="5px 10px"
                        borderRadius="4px"
                      >
                        {sale.contractedCount}
                      </Box>
                    </Box>
                  ))
              ) : (
                <Typography>Loading</Typography>
              )}
          </Box>
          }



          {/* ROW 3 */}
          <Stack>
            {/* <Box
              backgroundColor={colors.primary[400]}
              p="30px 0"
            >
              <Typography variant="h5" fontWeight="600" p="5px 30px">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>Includes extra misc expenditures and costs</Typography>
              </Box>
            </Box> */}

            <Box
              backgroundColor={colors.primary[400]}
              p="10px"
              // sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "5px 30px" }}
              >
                Sales
              </Typography>
              <BarChart isDashboard={true} />
            </Box>
          </Stack>
          <Stack>
            {clients && clients.length > 0 && 
            <Box
              height="400px"
              backgroundColor={colors.primary[400]}
              p="10px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "5px 30px" }}
              >
                All Leads
              </Typography>
              <PieChart />
            </Box>
            }
          </Stack>
          {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
            <Box height="400px">
              <GeographyChart />
          </Box>
          </Box> */}
        </Stack>
      </Box>
    </Container>
  );
};

export default Dashboard;

// import './App.css'
// import { Route, Router, Routes } from 'react-router-dom'
// import Clients from './pages/Clients.jsx'
// import Home from './pages/Home.jsx'
// import { io } from 'socket.io-client';
// import { useEffect, useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import SignUpPage from './pages/auth/SignUp.jsx'
// import LoginPage from './pages/auth/Login.jsx'
// import AdminDashboard from './pages/admin/AdminDashboard.jsx'
// import PrivateRoute from './components/PrivateRoute.jsx'
// import CreateSalesUser from './pages/admin/CerateSalesAcount.jsx'
// import NavBar from './components/nav/Nav.jsx'
// import AllLeads from './pages/sales/AllLeads.jsx'
// import ClientDetails from './pages/sales/ClientDetails.jsx'
// import AddClient from './pages/sales/AddClient.jsx'
// import AllClients from './pages/admin/AllClients.jsx'
// import AdminClientDetails from './pages/admin/AdminClientDetails.jsx'
// import AllSales from './pages/admin/AllSales.jsx'
// import SaleDetails from './pages/admin/SaleDetails.jsx'
// import Setting from './pages/sales/Setting.jsx'
// import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
// import { ColorModeContext, useMode } from "./theme";
// import Topbar from './scenes/global/Topbar.jsx';
// import Sidebar from './scenes/global/Sidebar.jsx';
// import Dashboard from "./scenes/dashboard";
// import Team from './scenes/team/index.jsx';
// import Contacts from './scenes/contacts/index.jsx';
// import Invoices from './scenes/invoices/index.jsx';
// import Form from './scenes/form/index.jsx';
// import Bar from './scenes/bar/index.jsx';
// import Pie from './scenes/pie/index.jsx';
// import Line from './scenes/line/index.jsx';
// import FAQ from './scenes/faq/index.jsx';
// import Calendar from './scenes/calendar/calendar.jsx';
// import { jwtDecode } from 'jwt-decode';

// const socket = io('http://localhost:5000'); // عنوان السيرفر
// function App() {
//   const [theme, colorMode] = useMode();
//   const [user, setUser] = useState(null);
//   console.log(user)

//   const token = localStorage.getItem('token');
//   useEffect(() => {
//     if (token) {
//       setUser(jwtDecode(token));
//     }
//   }, [token]);
//   useEffect(() => {
//     socket.on('taskAssigned', (notification) => {
//       toast.success(notification.message, { autoClose: 5000 }); // عرض إشعار أنيق
//     });
//     return () => {
//       socket.off('taskAssigned');
//     };
//   }, []);
//   return (
//     <>
//       <ColorModeContext.Provider value={colorMode}>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Stack sx={{ flexDirection: 'row', width: '100%' }} >
//             {
//               user &&
//               user.role === 'admin' &&
//               <Sidebar />
//             }
//             <Stack sx={{ flexGrow: 1 }}>
//               <Topbar />
//               {/* <NavBar /> */}
//               <ToastContainer />
//               <Routes>
//                 <Route path="/admin-dashboard" element={<PrivateRoute requiredRole="admin" />}>
//                   {/* <Route index element={<AdminDashboard />} /> الصفحة الرئيسية للداشبورد */}
//                   <Route path="clients" element={<Clients />} />
//                   <Route path="all-sales" element={<AllSales />} />
//                   <Route path="all-sales/:id" element={<SaleDetails />} />
//                   <Route path="create-sales" element={<CreateSalesUser />} />
//                   <Route path="all-clients" element={<AllClients />} />
//                   <Route path="all-clients/:id" element={<AdminClientDetails />} />
//                   <Route index element={<Dashboard />} />
//                   <Route path="team" element={<Team />} />
//                   <Route path="contacts" element={<Contacts />} />
//                   <Route path="invoices" element={<Invoices />} />
//                   <Route path="form" element={<Form />} />
//                   <Route path="bar" element={<Bar />} />
//                   <Route path="pie" element={<Pie />} />
//                   <Route path="line" element={<Line />} />
//                   <Route path="faq" element={<FAQ />} />
//                   <Route path="calendar" element={<Calendar />} />
//                   {/* <Route path="/geography" element={<Geography />} /> */}
//                 </Route>
//                 <Route path="/signup" element={<SignUpPage />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="*" element={'not found'} />
//                 <Route path="/" element={<PrivateRoute requiredRole="sales" />}>
//                   <Route index element={<Home />} />
//                   <Route path="/setting" element={<Setting />} />
//                   <Route path="/allleads" element={<AllLeads />} />
//                   <Route path="/allleads/:clientId" element={<ClientDetails />} />
//                   <Route path="/add-lead" element={<AddClient />} />
//                 </Route>
//               </Routes>
//             </Stack>
//           </Stack>
//         </ThemeProvider>
//       </ColorModeContext.Provider>
//     </>
//   )
// }

// export default App
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Clients from './pages/Clients.jsx'
import Home from './pages/Home.jsx'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from './pages/auth/SignUp.jsx'
import LoginPage from './pages/auth/Login.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import CreateSalesUser from './pages/admin/CerateSalesAcount.jsx'
import AllLeads from './pages/sales/AllLeads.jsx'
import ClientDetails from './pages/sales/ClientDetails.jsx'
import AddClient from './pages/sales/AddClient.jsx'
import AdminClientDetails from './pages/admin/AdminClientDetails.jsx'
import AllSales from './pages/admin/AllSales.jsx'
import SaleDetails from './pages/admin/SaleDetails.jsx'
import Setting from './pages/sales/Setting.jsx'
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from "./theme";
import Topbar from './scenes/global/Topbar.jsx';
import Sidebar from './scenes/global/Sidebar.jsx';
import Dashboard from "./scenes/dashboard";
import Team from './scenes/team/index.jsx';
import Contacts from './scenes/contacts/index.jsx';
import Invoices from './scenes/invoices/index.jsx';
import Form from './scenes/form/index.jsx';
import Bar from './scenes/bar/index.jsx';
import Pie from './scenes/pie/index.jsx';
import Line from './scenes/line/index.jsx';
import FAQ from './scenes/faq/index.jsx';
import Calendar from './scenes/calendar/calendar.jsx';
import { jwtDecode } from 'jwt-decode';
import socket from './components/constants/soket.jsx';

// const socket = io('https://crm-back-production-d0b7.up.railway.app'); // عنوان السيرفر
function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // إضافة حالة التحميل
  const nav = useNavigate()
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log(decodedUser)
        setUser(decodedUser);
        if (decodedUser.role === 'admin') {
          nav('/admin-dashboard'); // توجيه الأدمن
        } else if (decodedUser.role === 'sales') {
          nav('/'); // توجيه السيلز
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    }
    setLoading(false); // انتهى التحميل
  }, [token]);

  useEffect(() => {
    socket.on('taskAssigned', (notification) => {
      toast.success(notification.message, { autoClose: 5000 }); // عرض إشعار أنيق
    });
    return () => {
      socket.off('taskAssigned');
    };
  }, []);

  if (loading) {
    // يمكن وضع شاشة تحميل هنا
    return <div>Loading...</div>;
  }

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Stack sx={{ width: '100%', position: 'relative' }} >
            {user?.role === 'admin' && <Sidebar />} {/* التحقق من دور المستخدم */}
            <Stack sx={{ marginLeft: '80px' }}>
              <Topbar />
              <ToastContainer />
              <Routes>
                <Route path="/admin-dashboard" element={<PrivateRoute requiredRole="admin" />}>
                  <Route index element={<Dashboard />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="all-sales" element={<AllSales />} />
                  <Route path="team/:id" element={<SaleDetails />} />
                  <Route path="create-sales" element={<CreateSalesUser />} />
                  {/* <Route path="all-clients" element={<AllClients />} /> */}
                  <Route path="all-clients/:id" element={<AdminClientDetails />} />
                  <Route path="team" element={<Team />} />
                  <Route path="all-clients" element={<Contacts />} />
                  <Route path="invoices" element={<Invoices />} />
                  <Route path="form" element={<Form />} />
                  <Route path="bar" element={<Bar />} />
                  <Route path="pie" element={<Pie />} />
                  <Route path="line" element={<Line />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="calendar" element={<Calendar />} />
                </Route>
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={'not found'} />
                <Route path="/" element={<PrivateRoute requiredRole="sales" />}>
                  <Route index element={<Home />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/allleads" element={<AllLeads />} />
                  <Route path="/allleads/:clientId" element={<ClientDetails />} />
                  <Route path="/add-lead" element={<AddClient />} />
                </Route>
              </Routes>
            </Stack>
          </Stack>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App;

import { Badge, Box, Divider, Drawer, IconButton, List, ListItem, Menu, MenuItem, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import socket from '../../components/constants/soket'
import { Adb, MenuOutlined } from "@mui/icons-material";
import { BASE_URL } from "../../components/constants/baseurl";
import axios from "axios";
const Topbar = ({ isCollapsed, setIsCollapsed, left, setLeft }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [user, setUser] = useState('');
    const token = localStorage.getItem('token');
    const nav = useNavigate()
    const [open, setOpen] = useState(false);

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [notification, setNotification] = useState([]);
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    useEffect(() => {
        if (token) {
            setUser(jwtDecode(token));
            // localStorage.setItem('sellerId', jwtDecode(token).id); // تخزين sellerId
        }
        if (!token) {
            setUser('');
        }
    }, [token]);
    const markAsRead = async (notificationId) => {
        await axios.put(`${BASE_URL}/api/notifications/mark-as-read/${notificationId}`);
        setNotification(notification.map((n) => n._id === notificationId ? { ...n, isRead: true } : n));
    };
    useEffect(() => {
        if (token) {
            axios.get(`${BASE_URL}/api/notifications/${localStorage.getItem("sellerId")}`)
                .then((res) => {
                    // console.log(res.data)
                    setNotification(res.data);
                    // setLoading(false);
                })
                .catch((err) => console.error(err));
        }
    }, [token]);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    useEffect(() => {
        if (token) {
            // تسجيل الموظف في الغرفة الخاصة به
            socket.emit('joinRoom', localStorage.getItem("sellerId"));
            // استقبال الإشعارات عند تعيين عميل جديد
            socket.on('newClientNotification', (data) => {
                // console.log(data)
                const { clientId, message, userId, createdAt, _id } = data; // استخراج البيانات من الكائن
                setNotification((prev) => [
                    ...prev,
                    {
                        clientId,        // إضافة clientId بالكامل
                        message,         // إضافة الرسالة
                        userId,          // إضافة userId
                        createdAt: new Date(createdAt), // تأكيد أن createdAt هو كائن Date
                        isRead: false,
                        _id  // تحديد الحالة الأولى
                    },
                ]);
                // setNotification(prev => prev + 1);
                // setOpen(true);
            });
            socket.on('newActionNotification', (data) => {
                console.log(data)
                const { clientId, message, userId, createdAt, _id } = data; // استخراج البيانات من الكائن
                setNotification((prev) => [
                    ...prev,
                    {
                        clientId,        // إضافة clientId بالكامل
                        message,         // إضافة الرسالة
                        userId,          // إضافة userId
                        createdAt: new Date(createdAt), // تأكيد أن createdAt هو كائن Date
                        isRead: false,
                        _id  // تحديد الحالة الأولى
                    },
                ]);
            });
            return () => {
                socket.off('newClientNotification');
                socket.off('newActionNotification');
            };
        }
    }, [token]);
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <Typography sx={{ fontWeight: 'bold', padding: '10px' }}>
                    Notifications
                </Typography>
                {notification.length > 0 && notification.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((not, index) => {
                    // console.log(not)
                    return (
                        <ListItem key={index}>
                            <Paper onClick={async () => {
                                await markAsRead(not._id);
                                if (user.role === 'admin') {
                                    window.location.pathname = '/admin-dashboard/all-clients'
                                } else {
                                    window.location.pathname = '/allleads'
                                }
                            }} sx={{ width: '100%', padding: '10px', cursor: 'pointer', position: 'relative' }}>
                                <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                    <Stack>
                                        <Typography sx={{ fontWeight: 'bold' }}>
                                            {not.message}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                {
                                    !not.isRead
                                    &&
                                    <Typography variant='caption' sx={{ position: 'absolute', top: '0', right: '0', color: 'red' }}>
                                        New
                                    </Typography>
                                }
                            </Paper>
                        </ListItem>
                    )
                })}
            </List>
            <Divider />
        </Box>
    );
    return (
        <Box sx={{ justifyContent: 'end' }} display="flex" justifyContent="space-between" alignItems='center' p={2}>
            <IconButton sx={{ display: { sm: 'block', md: 'none' }, lineHeight: '0' }} onClick={() => {
                setIsCollapsed(!isCollapsed);
            }
            }>
                <MenuOutlined />
            </IconButton>
            {/* SEARCH BAR */}
            {/* <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box> */}
            <Adb sx={{ display: 'flex', mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href={user && user.role === 'admin' ? '/admin-dashboard' : '/allleads'}
                sx={{
                    mr: 2,
                    display: "flex",
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <Box sx={{ display: 'flex', flexGrow: 0, gap: 2 }}>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {user ?
                            (
                                user.role === 'admin' ?
                                    <>
                                        {/* <Link to='admin-dashboard' >
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                dash
                                            </MenuItem>
                                        </Link> */}
                                        {/* <Link to='admin-dashboard/clients' >
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                Add client
                                            </MenuItem>
                                        </Link> */}
                                        {/* <Link to='admin-dashboard/all-clients' >
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                All Clients
                                            </MenuItem>
                                        </Link> */}
                                        {/* <Link to='admin-dashboard/properties' >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            properties
                                        </MenuItem>
                                    </Link> */}
                                        {/* <Link to='admin-dashboard/create-sales' >
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                create-sales
                                            </MenuItem>
                                        </Link> */}
                                        {/* <Link to='admin-dashboard/all-sales' >
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                All Sales
                                            </MenuItem>
                                        </Link> */}
                                        <Divider />
                                        <MenuItem onClick={() => {
                                            handleCloseUserMenu();
                                            localStorage.clear()
                                            window.location.pathname = '/login'
                                        }}>
                                            log out
                                        </MenuItem>
                                    </>
                                    :
                                    user.role === 'sales' &&
                                    <>
                                        <Link to='/allleads'>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                All Leads
                                            </MenuItem>
                                        </Link>
                                        <Link to='/add-lead'>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                Add Lead
                                            </MenuItem>
                                        </Link>
                                        {/* <MenuItem onClick={() => {
                                            // handleCloseUserMenu();
                                            // localStorage.removeItem("token")
                                            // nav('/login')
                                        }}>
                                            New Leads
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            // handleCloseUserMenu();
                                            // localStorage.removeItem("token")
                                            // nav('/login')
                                        }}>
                                            Interseted Leads
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            // handleCloseUserMenu();
                                            // localStorage.removeItem("token")
                                            // nav('/login')
                                        }}>
                                            Follow Up Leads
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            // handleCloseUserMenu();
                                            // localStorage.removeItem("token")
                                            // nav('/login')
                                        }}>
                                            No Answer
                                        </MenuItem> */}
                                        <Divider />
                                        <MenuItem onClick={() => {
                                            handleCloseUserMenu();
                                            localStorage.clear()
                                            window.location.pathname = '/login'
                                        }}>
                                            log out
                                        </MenuItem>
                                    </>
                            )
                            :
                            (
                                <>
                                    <Divider />
                                    <MenuItem onClick={() => {
                                        handleCloseUserMenu();
                                        // localStorage.removeItem("token")
                                        nav('/login')
                                    }}>
                                        log in
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleCloseUserMenu();
                                        nav('/signup')
                                    }}>
                                        Sign up
                                    </MenuItem>
                                </>
                            )
                        }
                    </Menu>
                </Box>
                {
                    user &&
                    <Badge badgeContent={notification.filter((n) => !n.isRead).length} color="error">
                        <IconButton onClick={toggleDrawer(true)}>
                            <NotificationsOutlinedIcon />
                        </IconButton>
                    </Badge>
                }
                <IconButton onClick={handleOpenUserMenu}>
                    <SettingsOutlinedIcon />
                </IconButton>
                {
                    user.role === 'sales' &&
                    <IconButton onClick={() => nav('/setting')}>
                        <PersonOutlinedIcon />
                    </IconButton>
                }
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
};

export default Topbar;

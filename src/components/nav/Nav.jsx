import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useState } from 'react';
import { Badge, Divider, Drawer, List, ListItem, Paper, Stack } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { BASE_URL } from '../constants/baseurl';
import axios from 'axios';
import socket from '../constants/soket'
function NavBar() {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);

    const [notification, setNotification] = useState([]);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const nav = useNavigate()
    // console.log(jwtDecode(token))
    useEffect(() => {
        if (token) {
            setUser(jwtDecode(token));
            // localStorage.setItem('sellerId', jwtDecode(token).id); // تخزين sellerId
        }
        if (!token) {
            setUser('');
        }
    }, [token]);
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
    const markAsRead = async (notificationId) => {
        await axios.put(`${BASE_URL}/api/notifications/mark-as-read/${notificationId}`);
        setNotification(notification.map((n) => n._id === notificationId ? { ...n, isRead: true } : n));
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    useEffect(() => {
        if (token) {
            // تسجيل الموظف في الغرفة الخاصة به
            socket.emit('joinRoom', localStorage.getItem("sellerId"));
            // استقبال الإشعارات عند تعيين عميل جديد
            socket.on('newClientNotification', (data) => {
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

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
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
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href={user && user.role === 'admin' ? '/admin-dashboard' : '/'}
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
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
                        <Box sx={{ display: 'flex', flexGrow: 0, gap: 2 }}>
                            {
                                user &&
                                <Badge badgeContent={notification.filter((n) => !n.isRead).length} color="error">
                                    <IconButton onClick={toggleDrawer(true)}>
                                        <Notifications />
                                    </IconButton>
                                </Badge>
                            }
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={token && user.name} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
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
                                                <Link to='admin-dashboard' >
                                                    <MenuItem onClick={handleCloseUserMenu}>
                                                        dash
                                                    </MenuItem>
                                                </Link>
                                                <Link to='admin-dashboard/clients' >
                                                    <MenuItem onClick={handleCloseUserMenu}>
                                                        Add client
                                                    </MenuItem>
                                                </Link>
                                                <Link to='admin-dashboard/all-clients' >
                                                    <MenuItem onClick={handleCloseUserMenu}>
                                                        All Clients
                                                    </MenuItem>
                                                </Link>
                                                {/* <Link to='admin-dashboard/properties' >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            properties
                                        </MenuItem>
                                    </Link> */}
                                                <Link to='admin-dashboard/create-sales' >
                                                    <MenuItem onClick={handleCloseUserMenu}>
                                                        create-sales
                                                    </MenuItem>
                                                </Link>
                                                <Link to='admin-dashboard/all-sales' >
                                                    <MenuItem onClick={handleCloseUserMenu}>
                                                        All Sales
                                                    </MenuItem>
                                                </Link>
                                                <Divider />
                                                <MenuItem onClick={() => {
                                                    handleCloseUserMenu();
                                                    localStorage.clear()
                                                    nav('/login')
                                                }}>
                                                    log out
                                                </MenuItem>
                                            </>
                                            :
                                            user.role === 'sales' &&
                                            <>
                                                <Link to='/setting'>
                                                    <MenuItem onClick={handleCloseUserMenu}>
                                                        Setting
                                                    </MenuItem>
                                                </Link>
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
                                                <MenuItem onClick={() => {
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
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem onClick={() => {
                                                    handleCloseUserMenu();
                                                    localStorage.clear()
                                                    // localStorage.removeItem("sellerId")
                                                    nav('/login')
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
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}
export default NavBar;
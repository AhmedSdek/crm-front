import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../components/constants/baseurl';
import { Outlet } from 'react-router-dom';
import { Container, Divider, Typography } from '@mui/material';
import moment from 'moment';

const AdminDashboard = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // fetchPerformance();
        fetchClients();
        fetchUsers();
    }, []);

    const fetchPerformance = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/performance`);
            const data = await response.json();
            setPerformanceData(data);
        } catch (error) {
            console.error('Error fetching performance data:', error.message);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/clients`);
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error.message);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    return (
        <Container>
            <h1>لوحة تحكم الأدمن</h1>
            <section>
                <h2>إدارة العملاء</h2>
                {/* قائمة العملاء مع خيار تعيين العملاء لموظف */}
                {
                    clients.map((item, index) => {
                        return (
                            <div key={index}>
                                <Typography>
                                    {`${item.firstName} ${item.lastName}`}
                                </Typography>
                                <Typography>
                                    {`${item.phone}`}
                                </Typography>
                                <Typography>
                                    {`${item.email}`}
                                </Typography>
                                <Typography>
                                    {moment(item.createdAt).fromNow()}
                                </Typography>
                            </div>
                        )
                    })
                }
            </ section>
            <section>
                <h2>إدارة الفريق</h2>
                {/* قائمة الموظفين مع أزرار لإضافة أو تعديل */}
                {users.map((item, index) => {
                    return (
                        <div key={index}>
                            <Typography>
                                {`${item.name}`}
                            </Typography>
                            <Typography>
                                {`${item.email}`}
                            </Typography>
                            <Typography>
                                {`${item.role}`}
                            </Typography>
                            {item.assignedClients.map((client, index2) => {
                                return (
                                    <Typography key={index2}>

                                    </Typography>
                                )
                            })}
                            <Divider />
                        </div>
                    )
                })}
            </section>
            <Outlet />
        </Container >
    );
};

export default AdminDashboard;
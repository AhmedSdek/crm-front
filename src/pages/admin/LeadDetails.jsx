import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../components/constants/baseurl';
import { Container, Divider, Paper, Stack, Typography } from '@mui/material';

function LeadDetails() {
    const { status, id } = useParams();
    console.log(status)
    const [data, setData] = useState(null);
    const [filteredClients, setFilteredClients] = useState([]);
    console.log(filteredClients)
    // console.log(data)
    useEffect(() => {
        fetchUsers()
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/${id}`);
            const result = await response.json();
            setData(result);

            // التأكد من أن `assignedClients` موجودة قبل محاولة التصفية
            if (result.assignedClients && Array.isArray(result.assignedClients)) {
                const filtered = result.assignedClients.filter(client => client.status === status);
                setFilteredClients(filtered);
            }
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };
    return (
        <div>
            <Container>
                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {`${status} Leads Details`}
                </Typography>
                <Stack sx={{ height: '100%', margin: '20px 0' }}>
                    {
                        filteredClients.length > 0 ?
                            filteredClients.map((item, index) => {
                                return (
                                    <Link to={`/admin-dashboard/all-clients/${item._id}`} key={index}>
                                        <Paper sx={{ padding: '10px' }}>
                                            <Typography>
                                                {`Lead Name : ${item.firstName} ${item.lastName}`}
                                            </Typography>
                                            <Typography>
                                                {`Phone Number : ${item.phone}`}
                                            </Typography>
                                            <Typography>
                                                {`whatsapp Number : ${item.whatsapp}`}
                                            </Typography>
                                            <Typography>
                                                {`email : ${item.email}`}
                                            </Typography>
                                            <Typography>
                                                {`Status : ${item.status}`}
                                            </Typography>
                                            <Typography>
                                                {`Note : ${item.notes}`}
                                            </Typography>
                                            <Typography>
                                                {`lead Source : ${item.leadSource}`}
                                            </Typography>
                                            <Typography>
                                                {`developer : ${item.developer}`}
                                            </Typography>
                                            <Typography>
                                                {`created At : ${item.createdAt}`}
                                            </Typography>
                                        </Paper>
                                    </Link>
                                )
                            })
                            :
                            <Stack>
                                <Typography>
                                    No Lead
                                </Typography>
                            </Stack>
                    }
                </Stack>
            </Container>
        </div>
    )
}

export default LeadDetails
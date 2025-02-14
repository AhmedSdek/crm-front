import React, { useState } from 'react'
import { BASE_URL } from '../../components/constants/baseurl';
import { useEffect } from 'react';
import { Container, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function AllSales() {
    const [sales, setSales] = useState([]);
    // console.log(sales)
    useEffect(() => {
        fetchUsers()
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users`);
            const data = await response.json();
            const salesUsers = data.filter(user => user.role === "sales");
            setSales(salesUsers);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };
    return (
        <div>
            <Container>
                <Stack>
                    <Typography>
                        AllSales
                    </Typography>
                    <Stack sx={{ gap: 2 }}>
                        {sales.map((sale, index) => {
                            return (
                                <Link to={`/admin-dashboard/all-sales/${sale._id}`} key={index}>
                                    <Paper sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography>
                                            {sale.name}
                                        </Typography>
                                        <Typography>
                                            {sale.assignedClients.length}
                                        </Typography>
                                    </Paper>
                                </Link>
                            )
                        })}
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}

export default AllSales
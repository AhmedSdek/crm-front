import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../redux/clientSlice';
import { Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

function AllClients() {
    const { clients, loading, error } = useSelector((state) => state.clients);
    // console.log(clients)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);
    return (
        <div>
            <Container>
                <Stack>
                    <Header title="All Clients" subtitle="" />
                    <Stack sx={{ gap: 2 }}>
                        {clients.map((client, index) => {
                            return (
                                <Link key={index} to={`/admin-dashboard/all-clients/${client._id}`}>
                                    <Paper sx={{ padding: '10px' }} >
                                        <Typography>
                                            {`${client.firstName} ${client.lastName}`}
                                        </Typography>
                                        <Divider />
                                        <Typography>
                                            {`Sales Name : ${client.assignedTo.name}`}
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

export default AllClients
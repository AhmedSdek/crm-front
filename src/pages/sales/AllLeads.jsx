import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsForSeller } from '../../redux/sellerClientSlice';
import { Alert, CircularProgress, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function AllLeads() {
    const dispatch = useDispatch();
    const { clients, loading, error } = useSelector((state) => state.sellerClients);
    console.log(clients)
    const sellerId = localStorage.getItem('sellerId'); // تخزين sellerId
    useEffect(() => {
        if (sellerId) {
            dispatch(fetchClientsForSeller(sellerId));
        }
    }, [dispatch, sellerId]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container>
            <div>
                <h2>Your Leads</h2>
                {clients.length === 0 ? (
                    <p>No clients assigned to you yet.</p>
                ) : (
                    <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {clients.map((client) => (
                            <Link key={client._id} to={`/allleads/${client._id}`}>
                                <Paper>
                                    <ListItem key={client._id} style={{ borderBottom: '1px solid #ccc' }}>
                                        {/* <ListItemText
                                            primary={`${client.firstName} ${client.lastName}`}
                                            secondary={`Email: ${client.email} | Phone: ${client.phone}`}
                                        /> */}
                                        <Typography>
                                            {`${client.firstName} ${client.lastName}`}
                                        </Typography>
                                    </ListItem>
                                </Paper>
                            </Link>
                        ))}
                    </List>
                )}
            </div>
        </Container>
    );
}

export default AllLeads
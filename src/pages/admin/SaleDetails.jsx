import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../components/constants/baseurl';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import moment from 'moment';

function SaleDetails() {
    const { id } = useParams();
    const [sale, setSale] = useState();
    const [clients, setClients] = useState([]);
    const newLeadClients = clients.filter(client => client.status === "New Lead");
    const InterestedClients = clients.filter(client => client.status === "Interested");
    const NoAnswerClients = clients.filter(client => client.status === "No Answer");
    const FollowUpClients = clients.filter(client => client.status === "Follow Up");
    const ReservationClients = clients.filter(client => client.status === "Reservation");
    const ContractedClients = clients.filter(client => client.status === "Contracted");
    const AttendVisitClients = clients.filter(client => client.status === "Attend Visit");
    const ArchiveClients = clients.filter(client => client.status === "Archive");

    // console.log(newLeadClients)
    // console.log(sale)
    useEffect(() => {
        fetchUsers()
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/${id}`);
            const data = await response.json();
            // console.log(data)
            setSale(data);
            setClients(data.assignedClients)
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };
    return (
        <div>
            <Container>
                <Stack>
                    <Typography sx={{ textAlign: 'center', padding: '10px' }}>
                        {sale && sale.name}  Details
                    </Typography>
                    <Stack sx={{ gap: 2 }}>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography component="span">New Lead</Typography>
                                    <Typography>{newLeadClients.length}</Typography>
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails accordiondetails='true' >
                                {newLeadClients.length > 0 && newLeadClients.map((item, index) => {
                                    return (
                                        <Stack key={index}>
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
                                                {`Phone Number : ${item.status}`}
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
                                            <Divider sx={{ margin: '10px 0' }} />
                                        </Stack>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography component="span">Interested</Typography>
                                    <Typography>{InterestedClients.length}</Typography>
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails accordiondetails='true' >
                                {InterestedClients.length > 0 && InterestedClients.map((item, index) => {
                                    return (
                                        <Stack key={index}>
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
                                                {`Phone Number : ${item.status}`}
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
                                            <Divider sx={{ margin: '10px 0' }} />
                                        </Stack>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography component="span">No Answer</Typography>
                                    <Typography>{NoAnswerClients.length}</Typography>
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails accordiondetails='true' >
                                {NoAnswerClients.length > 0 && NoAnswerClients.map((item, index) => {
                                    return (
                                        <Stack key={index}>
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
                                                {`Phone Number : ${item.status}`}
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
                                            <Divider sx={{ margin: '10px 0' }} />
                                        </Stack>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography component="span">Follow Up</Typography>
                                    <Typography>{FollowUpClients.length}</Typography>
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails accordiondetails='true' >
                                {FollowUpClients.length > 0 && FollowUpClients.map((item, index) => {
                                    return (
                                        <Stack key={index}>
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
                                                {`Phone Number : ${item.status}`}
                                            </Typography>
                                            <Typography>
                                                {`Note : ${item.notes}`}
                                            </Typography>
                                            <Typography>
                                                {`call Back Date : ${moment(item.callBackDate).format("ddd, MMM DD, YYYY, hh:mm A ")}`}
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
                                            <Divider sx={{ margin: '10px 0' }} />
                                        </Stack>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography component="span">Reservation</Typography>
                                    <Typography>{ReservationClients.length}</Typography>
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails accordiondetails='true' >
                                {ReservationClients.length > 0 && ReservationClients.map((item, index) => {
                                    return (
                                        <Stack key={index}>
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
                                                {`Phone Number : ${item.status}`}
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
                                            <Divider sx={{ margin: '10px 0' }} />
                                        </Stack>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography component="span">Contracted</Typography>
                                    <Typography>{ContractedClients.length}</Typography>
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails accordiondetails='true' >
                                {ContractedClients.length > 0 && ContractedClients.map((item, index) => {
                                    return (
                                        <Stack key={index}>
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
                                                {`Phone Number : ${item.status}`}
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
                                            <Divider sx={{ margin: '10px 0' }} />
                                        </Stack>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography component="span">Attend Visit</Typography>
                                    <Typography>{AttendVisitClients.length}</Typography>
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails accordiondetails='true' >
                                {AttendVisitClients.length > 0 && AttendVisitClients.map((item, index) => {
                                    return (
                                        <Stack key={index}>
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
                                                {`Phone Number : ${item.status}`}
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
                                            <Divider sx={{ margin: '10px 0' }} />
                                        </Stack>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography component="span">Archive</Typography>
                                    <Typography>{ArchiveClients.length}</Typography>
                                </Box>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails accordiondetails='true' >
                                {ArchiveClients.length > 0 && ArchiveClients.map((item, index) => {
                                    return (
                                        <Stack key={index}>
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
                                                {`Phone Number : ${item.status}`}
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
                                            <Divider sx={{ margin: '10px 0' }} />
                                        </Stack>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </Stack>
            </Container >
        </div >
    )
}

export default SaleDetails
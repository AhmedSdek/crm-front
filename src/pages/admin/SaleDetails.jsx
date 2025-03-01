import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../../components/constants/baseurl';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
import { PeopleSharp } from '@mui/icons-material';
import { tokens } from '../../theme';
import StatBox from '../../components/StatBox';

function SaleDetails() {
    const { id } = useParams();
    const [sale, setSale] = useState();
    const [clients, setClients] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const newLeadClients = clients.filter(client => client.status === "New Lead");
    const InterestedClients = clients.filter(client => client.status === "Interested");
    const NoAnswerClients = clients.filter(client => client.status === "No Answer");
    const FollowUpClients = clients.filter(client => client.status === "Follow Up");
    const ReservationClients = clients.filter(client => client.status === "Reservation");
    const ContractedClients = clients.filter(client => client.status === "Contracted");
    const AttendVisitClients = clients.filter(client => client.status === "Attend Visit");
    const ArchiveClients = clients.filter(client => client.status === "Archive");
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
                    <Stack sx={{
                        flexDirection: { xs: 'column', md: 'row' },
                        width: '100%',
                        gap: 3, // المسافة بين البوكسات
                        justifyContent: 'space-between', // توزيع العناصر بالتساوي
                        alignItems: 'center', // حواف داخلية للمكدس
                        flexWrap: 'wrap',
                        padding: "10px 0"
                    }}>
                        <Link
                            to={`/admin-dashboard/team/${id}/New Lead`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                width: 'inherit',
                                minWidth: '250px', // الحد الأدنى لعرض البوكس
                                height: '150px',
                                borderRadius: '12px', // زوايا دائرية
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                p: 2
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flex: 1,
                                    width: '100%',
                                    // minWidth: '250px', // الحد الأدنى لعرض البوكس
                                    height: '100%',
                                    borderRadius: '12px', // زوايا دائرية
                                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                    p: 2
                                }}
                            >
                                <StatBox
                                    title={newLeadClients ? newLeadClients.length : 0}
                                    subtitle="New Lead"
                                    progress={`0.${newLeadClients.length}`}
                                    // increase="+14%"
                                    icon={
                                        <PeopleSharp
                                            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                        />
                                    }
                                />
                            </Box>
                        </Link>
                        <Link
                            to={`/admin-dashboard/team/${id}/Interested`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                width: 'inherit',
                                minWidth: '250px', // الحد الأدنى لعرض البوكس
                                height: '150px',
                                borderRadius: '12px', // زوايا دائرية
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                p: 2
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flex: 1,
                                    width: '100%',
                                    // minWidth: '250px', // الحد الأدنى لعرض البوكس
                                    height: '100%',
                                    borderRadius: '12px', // زوايا دائرية
                                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                    p: 2
                                }}
                            >
                                <StatBox
                                    title={InterestedClients ? InterestedClients.length : 0}
                                    subtitle="Interested"
                                    progress={`0.${InterestedClients.length}`}
                                    // increase="+14%"
                                    icon={
                                        <PeopleSharp
                                            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                        />
                                    }
                                />
                            </Box>
                        </Link>
                        <Link
                            to={`/admin-dashboard/team/${id}/No Answer`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                width: 'inherit',
                                minWidth: '250px', // الحد الأدنى لعرض البوكس
                                height: '150px',
                                borderRadius: '12px', // زوايا دائرية
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                p: 2
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flex: 1,
                                    width: '100%',
                                    // minWidth: '250px', // الحد الأدنى لعرض البوكس
                                    height: '100%',
                                    borderRadius: '12px', // زوايا دائرية
                                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                    p: 2
                                }}
                            >
                                <StatBox
                                    title={NoAnswerClients ? NoAnswerClients.length : 0}
                                    subtitle="No Answer"
                                    progress={`0.${NoAnswerClients.length}`}
                                    // increase="+14%"
                                    icon={
                                        <PeopleSharp
                                            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                        />
                                    }
                                />
                            </Box>

                        </Link>
                        <Link
                            to={`/admin-dashboard/team/${id}/Follow Up`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                width: 'inherit',
                                minWidth: '250px', // الحد الأدنى لعرض البوكس
                                height: '150px',
                                borderRadius: '12px', // زوايا دائرية
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                p: 2
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flex: 1,
                                    width: '100%',
                                    // minWidth: '250px', // الحد الأدنى لعرض البوكس
                                    height: '100%',
                                    borderRadius: '12px', // زوايا دائرية
                                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                    p: 2
                                }}
                            >
                                <StatBox
                                    title={FollowUpClients ? FollowUpClients.length : 0}
                                    subtitle="Follow Up"
                                    progress={`0.${FollowUpClients.length}`}
                                    // increase="+14%"
                                    icon={
                                        <PeopleSharp
                                            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                        />
                                    }
                                />
                            </Box>
                        </Link>
                        <Link
                            to={`/admin-dashboard/team/${id}/Reservation`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                width: 'inherit',
                                minWidth: '250px', // الحد الأدنى لعرض البوكس
                                height: '150px',
                                borderRadius: '12px', // زوايا دائرية
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                p: 2
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flex: 1,
                                    width: '100%',
                                    // minWidth: '250px', // الحد الأدنى لعرض البوكس
                                    height: '100%',
                                    borderRadius: '12px', // زوايا دائرية
                                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                    p: 2
                                }}
                            >
                                <StatBox
                                    title={ReservationClients ? ReservationClients.length : 0}
                                    subtitle="Reservation"
                                    progress={`0.${ReservationClients.length}`}
                                    // increase="+14%"
                                    icon={
                                        <PeopleSharp
                                            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                        />
                                    }
                                />
                            </Box>
                        </Link>
                        <Link
                            to={`/admin-dashboard/team/${id}/Contracted`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                width: 'inherit',
                                minWidth: '250px', // الحد الأدنى لعرض البوكس
                                height: '150px',
                                borderRadius: '12px', // زوايا دائرية
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                p: 2
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flex: 1,
                                    width: '100%',
                                    // minWidth: '250px', // الحد الأدنى لعرض البوكس
                                    height: '100%',
                                    borderRadius: '12px', // زوايا دائرية
                                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                    p: 2
                                }}
                            >
                                <StatBox
                                    title={ContractedClients ? ContractedClients.length : 0}
                                    subtitle="Contracted"
                                    progress={`0.${ContractedClients.length}`}
                                    // increase="+14%"
                                    icon={
                                        <PeopleSharp
                                            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                        />
                                    }
                                />
                            </Box>
                        </Link>
                        <Link
                            to={`/admin-dashboard/team/${id}/Attend Visit`} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                width: 'inherit',
                                minWidth: '250px', // الحد الأدنى لعرض البوكس
                                height: '150px',
                                borderRadius: '12px', // زوايا دائرية
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                p: 2
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flex: 1,
                                    width: '100%',
                                    // minWidth: '250px', // الحد الأدنى لعرض البوكس
                                    height: '100%',
                                    borderRadius: '12px', // زوايا دائرية
                                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                    p: 2
                                }}
                            >
                                <StatBox
                                    title={AttendVisitClients ? AttendVisitClients.length : 0}
                                    subtitle="Attend Visit"
                                    progress={`0.${AttendVisitClients.length}`}
                                    // increase="+14%"
                                    icon={
                                        <PeopleSharp
                                            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                        />
                                    }
                                />
                            </Box>
                        </Link>
                        <Link
                            to={`/admin-dashboard/team/${id}/Archive`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                width: 'inherit',
                                minWidth: '250px', // الحد الأدنى لعرض البوكس
                                height: '150px',
                                borderRadius: '12px', // زوايا دائرية
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                p: 2
                            }}>
                            <Box
                                sx={{
                                    backgroundColor: colors.primary[400],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flex: 1,
                                    width: '100%',
                                    // minWidth: '250px', // الحد الأدنى لعرض البوكس
                                    height: '100%',
                                    borderRadius: '12px', // زوايا دائرية
                                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // إضافة ظل
                                    p: 2
                                }}
                            >
                                <StatBox
                                    title={ArchiveClients ? ArchiveClients.length : 0}
                                    subtitle="Archive"
                                    progress={`0.${ArchiveClients.length}`}
                                    // increase="+14%"
                                    icon={
                                        <PeopleSharp
                                            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                        />
                                    }
                                />
                            </Box>
                        </Link>
                    </Stack>
                </Stack>
            </Container >
        </div >
    )
}

export default SaleDetails
{/* <Stack sx={{ gap: 2 }}>
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
                    </Stack> */}
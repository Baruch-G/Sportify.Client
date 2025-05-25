import React from 'react'
import { Event } from '../models/Event'
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CategoryIcon from '@mui/icons-material/Category'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { sportToIconMap } from '../data/sportsMap'

interface EventItemProps {
    event: Event
    onClick: () => void
}

const EventItem = (props: EventItemProps) => {
    const eventDate = new Date(props.event.date);
    const formattedDate = eventDate.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = eventDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
    const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

    return (
        <Card onClick={props.onClick} sx={{
            position: 'relative',
            m: 1.5,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            borderRadius: '12px',
            border: `1px solid #e0e0e0`,
            backgroundColor: '#fff',
            boxShadow: `0 4px 12px rgba(0,0,0,0.07)`,
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            overflow: 'hidden',
            '&:hover': {
                boxShadow: `0 8px 20px rgba(0,0,0,0.12)`,
                transform: 'translateY(-5px)',
                borderColor: 'primary.main',
            },
        }}>
            <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: '20px'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                }}>
                    <Box sx={{
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '2rem'
                    }}>
                        {sportToIconMap[props.event.category.name.replace(' ', '-').toLowerCase() as keyof typeof sportToIconMap] || <CategoryIcon sx={{fontSize: 'inherit'}} />}
                    </Box>
                    <Typography variant="h5" component="div" sx={{
                        fontWeight: '600',
                        color: 'text.primary',
                        lineHeight: 1.3,
                    }}>
                        {props.event.category.name}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon sx={{ color: 'grey.600', fontSize: '1.2rem' }} />
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {formattedDate}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: 'grey.600', fontSize: '1.2rem' }} />
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {props.event.address.addressLine1}
                            {props.event.address.addressLine2 && `, ${props.event.address.addressLine2}`}
                            {`, ${props.event.address.city}`}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ color: 'grey.600', fontSize: '1.2rem' }} />
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {formattedTime} | {props.event.duration}h
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    mt: 'auto',
                    pt: 2, 
                    borderTop: `1px solid #eeeeee`,
                }}>
                    <Avatar 
                        sx={{ width: 36, height: 36, bgcolor: 'secondary.main' }}
                        src={`${serverURL}${props.event.organizer?.image}` || undefined}
                        alt={props.event.organizer?.firstName || 'Organizer'}
                    >
                        {props.event.organizer?.firstName ? props.event.organizer.firstName.substring(0,1).toUpperCase() : 'O'}
                    </Avatar>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        {props.event.organizer?.firstName || 'Sportify Organizer'}
                        {props.event.organizer?.lastName && ` ${props.event.organizer.lastName}`}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default EventItem
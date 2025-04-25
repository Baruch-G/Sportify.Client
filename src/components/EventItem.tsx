import React from 'react'
import { Event } from '../models/Event'
import { Card, CardContent, Typography, Box } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CategoryIcon from '@mui/icons-material/Category'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

interface EventItemProps {
    event: Event
    onClick: () => void
}

const EventItem = (props: EventItemProps) => {
    return (
        <Card onClick={props.onClick} sx={{
            maxWidth: 345,
            m: 2,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease-in-out'
            }
        }}>
            <CardContent sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h5" component="div" noWrap>
                        {props.event.category.name}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ mr: 1, color: 'success.main', flexShrink: 0 }} />
                    <Typography variant="body1" noWrap>
                        {new Date(props.event.date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'error.main', flexShrink: 0 }} />
                    <Typography variant="body1" noWrap>
                        {props.event.address.addressLine1}
                        {props.event.address.addressLine2 && `, ${props.event.address.addressLine2}`}
                        {`, ${props.event.address.city}`}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 1, color: 'error.main', flexShrink: 0 }} />
                    <Typography variant="body1" noWrap>
                        {new Date(props.event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })} | {props.event.duration}h
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default EventItem
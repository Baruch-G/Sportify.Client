import React from 'react'
import { Event } from '../models/Event'
import { Card, CardContent, Typography, Box } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CategoryIcon from '@mui/icons-material/Category'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import SportsTennisIcon from '@mui/icons-material/SportsTennis'
import PoolIcon from '@mui/icons-material/Pool'
import KayakingIcon from '@mui/icons-material/Kayaking'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import DownhillSkiing from '@mui/icons-material/DownhillSkiing'
import { sportToIconMap } from '../data/sportsMap'
interface EventItemProps {
    event: Event
    onClick: () => void
}

const EventItem = (props: EventItemProps) => {
    return (
        <Card onClick={props.onClick} sx={{
            position: 'relative',
            maxWidth: 345,
            m: 2,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                boxShadow: '0 4px 8px rgba(227, 113, 39, 0.15)',
                transform: 'translateY(-4px)',
                borderColor: 'grey',
            },
            '&:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '6px',
                borderRadius: '4px 0 0 4px'
            }
        }}>
            <CardContent sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                p: 3
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    pb: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Box sx={{
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.5rem'
                    }}>
                        {sportToIconMap[props.event.category.name.replace(' ', '-').toLowerCase() as keyof typeof sportToIconMap]}
                    </Box>
                    <Typography variant="h5" component="div" noWrap sx={{
                        fontWeight: 600,
                        color: 'text.primary'
                    }}>
                        {props.event.category.name}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CalendarTodayIcon sx={{
                        color: 'success.main',
                        flexShrink: 0,
                        fontSize: '1.25rem'
                    }} />
                    <Typography variant="body1" noWrap sx={{ color: 'text.secondary' }}>
                        {new Date(props.event.date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocationOnIcon sx={{
                        color: 'error.main',
                        flexShrink: 0,
                        fontSize: '1.25rem'
                    }} />
                    <Typography variant="body1" noWrap sx={{ color: 'text.secondary' }}>
                        {props.event.address.addressLine1}
                        {props.event.address.addressLine2 && `, ${props.event.address.addressLine2}`}
                        {`, ${props.event.address.city}`}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AccessTimeIcon sx={{
                        color: 'error.main',
                        flexShrink: 0,
                        fontSize: '1.25rem'
                    }} />
                    <Typography variant="body1" noWrap sx={{ color: 'text.secondary' }}>
                        {new Date(props.event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })} | {props.event.duration}h
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default EventItem
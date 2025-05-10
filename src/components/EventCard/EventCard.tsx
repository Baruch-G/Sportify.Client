import React, { useEffect } from 'react';
import { Paper, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Event } from '../../models/Event';


interface EventCardProps {
    event: Event;
    selected?: boolean;
    onSelect?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, selected, onSelect }) => {
    const theme = useTheme();
    useEffect(() => {
        console.log("Selected Event ID:", selected);
    }, [selected]);

    const selectedStyle = selected ? {
        boxShadow: `0px 4px 8px ${theme.palette.primary.main}33`, // Using primary color with opacity
        transform: "scale(1.02)",
        borderLeft: `4px solid ${theme.palette.primary.main}`, // Using primary color
        transition: "all 0.3s ease-in-out", // Smooth hover effect
    } : {};

    return (
        <Paper
            style={{
            cursor: 'pointer',
            ...selectedStyle,
            borderLeft: `4px solid ${event.category.color}`, // Adding vertical line on the left
            }}
            onClick={() => onSelect?.(event)}
            elevation={2}
            sx={{ p: 2 }}
        >
            <Typography variant="h6" gutterBottom>
            {event.category.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            📅 Date: {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            ⏱️ Duration: {event.duration} hours
            </Typography>
            <Typography variant="body2" color="textSecondary">
            📍 Location: {`${event.address.addressLine1}, ${event.address.city}`}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
            Difficulty Level: {event.difficultyLevel}
            </Typography>
            <Link to={`/events/${event._id}`}>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ mt: 2 }}
            >
                Register
            </Button>
            </Link>
        </Paper>
    );
};

export default EventCard; 
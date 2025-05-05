import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ProfilePaper } from './styles';
import EventCard from '../EventCard/EventCard';
import { Event } from '../../models/Event';

interface UpcomingEventsProps {
    events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    if (!events || events.length === 0) return null;

    return (
        <ProfilePaper elevation={3}>
            <Typography variant="h5" gutterBottom>
                Upcoming Events
            </Typography>
            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event._id}>
                        <EventCard event={event} />
                    </Grid>
                ))}
            </Grid>
        </ProfilePaper>
    );
};

export default UpcomingEvents; 
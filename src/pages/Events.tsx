import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import EventCard, { Event } from '../components/EventCard';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverURL}/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json() as Event[];
        setEvents(data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="body1" style={{ marginTop: '16px' }}>Loading events...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="body1" color="error">Error: {error}</Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" style={{ padding: '20px' }}>
      {events.map((event, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
}

export default EventList;
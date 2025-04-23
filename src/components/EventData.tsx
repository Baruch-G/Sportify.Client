import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import { Event } from '../models/Event';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

async function fetchEventDetails(eventId: string) {
  try {
    const response = await fetch(`${serverURL}/events/${eventId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    return null;
  }
}

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = React.useState<Event | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    async function getEvent() {
      setLoading(true);
      setError(undefined);
      try {
        const eventData = await fetchEventDetails(eventId ?? "");
        if (eventData) {
          setEvent(eventData);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    }

    getEvent();
  }, [eventId]);

  if (loading) {
    return <Typography>Loading event details...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!event) {
    return <Typography>Event details not available.</Typography>;
  }

  return (
   <div style={{padding : "40px"}}>
     <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Event Details
        </Typography>
        <Divider style={{ marginBottom: 16 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" display="inline">Address: </Typography>
            <Typography display="inline">{event.address.addressLine1}{event.address.addressLine2 && `, ${event.address.addressLine2}`}, {event.address.city}, {event.address.country}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" display="inline">Duration: </Typography>
            <Typography display="inline">{event.duration} hours</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" display="inline">Difficulty Level: </Typography>
            <Typography display="inline">{event.difficultyLevel}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" display="inline">Category: </Typography>
            <Typography display="inline">{"Running"}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" display="inline">Organizer: </Typography>
            <Typography display="inline">{event.organizer}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
   </div>
  );
}

export default EventDetails;

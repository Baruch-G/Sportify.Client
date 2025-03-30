import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import { LocationOn, AccessTime, FitnessCenter, Person, Place } from '@mui/icons-material';
import { Event } from './EventCard';

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
            <Typography variant="subtitle1">
              <Place style={{ color: '#E5461D'}}/> Address:
            </Typography>
            <Typography>
              {event.address.addressLine1}
              {event.address.addressLine2 && `, ${event.address.addressLine2}`}
              {`, ${event.address.city}, ${event.address.country}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" >
              <AccessTime /> Duration:
            </Typography>
            <Typography>{event.duration} hours</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" >
              <FitnessCenter /> Difficulty Level:
            </Typography>
            <Typography>{event.difficultyLevel}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" >
              <Person /> Organizer:
            </Typography>
            <Typography>{event.organizer}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
   </div>
  );
}

export default EventDetails;

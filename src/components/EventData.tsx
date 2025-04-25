import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Divider, Box, Paper } from '@mui/material';
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
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <Paper elevation={3}>
        <Grid container spacing={3}>
          {/* Image Column */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: '100%',
                minHeight: '400px',
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              <img src={"/HomeCards/" + event.category.imageURL} alt={event.category.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Grid>

          {/* Details Column */}
          <Grid item xs={12} md={7}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Event Details
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {/* Location Section */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {event.address.addressLine1}
                      {event.address.addressLine2 && `, ${event.address.addressLine2}`}
                      <br />
                      {event.address.city}, {event.address.country}
                    </Typography>
                  </Box>
                </Grid>

                {/* Event Details Section */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                      Event Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Date</Typography>
                        <Typography variant="body1">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Time</Typography>
                        <Typography variant="body1">{new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Duration</Typography>
                        <Typography variant="body1">{event.duration} hours</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Difficulty</Typography>
                        <Typography variant="body1">{event.difficultyLevel}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Category</Typography>
                        <Typography variant="body1">Running</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                {/* Organizer Section */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                      Organizer
                    </Typography>
                    <Typography variant="body1">{event.organizer}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default EventDetails;

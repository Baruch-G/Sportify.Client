import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Divider, Box, Paper, Avatar, Chip, Stack, Rating } from '@mui/material';
import { Event } from '../models/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

interface User {
  _id: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  city: string;
  fitnessGoal: string;
  activityLevel: string;
  sportsInterests: string[];
}

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

async function fetchUserDetails(userId: string) {
  try {
    const response = await fetch(`${serverURL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = React.useState<Event | undefined>(undefined);
  const [organizer, setOrganizer] = React.useState<User | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    async function getEventAndOrganizer() {
      setLoading(true);
      setError(undefined);
      try {
        const eventData = await fetchEventDetails(eventId ?? "");
        if (eventData) {
          setEvent(eventData);
          const userData = await fetchUserDetails(eventData.organizer);
          if (userData) {
            setOrganizer(userData);
          }
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    }

    getEventAndOrganizer();
  }, [eventId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography variant="h6" color="text.secondary">Loading event details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography variant="h6" color="text.secondary">Event details not available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', margin: '0 auto' }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '500px',
        }}
      >
        {/* Left Image */}
        <Box
          sx={{
            flex: 1,
            height: { xs: '250px', md: 'auto' },
            backgroundImage: `url(/HomeCards/${event.category.imageURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Right Details */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {event.category.name} Event
          </Typography>

          {/* Location */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon color="primary" />
              <Typography variant="subtitle1" color="text.secondary">Location</Typography>
            </Stack>
            <Typography variant="body1" sx={{ mt: 1, pl: 4 }}>
              {event.address.addressLine1}
              {event.address.addressLine2 && `, ${event.address.addressLine2}`}
              <br />
              {event.address.city}, {event.address.country}
            </Typography>
          </Box>

          {/* Event Info */}
          <Divider />
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <CalendarTodayIcon color="primary" />
              <Typography variant="subtitle1" color="text.secondary">Event Information</Typography>
            </Stack>
            <Grid container spacing={2} sx={{ pl: 4 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Date</Typography>
                <Typography>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Time</Typography>
                <Typography>
                  {new Date(event.date).toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Duration</Typography>
                <Typography>{event.duration} hours</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Difficulty</Typography>
                <Typography>{event.difficultyLevel}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Organizer */}
          <Divider />
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <PersonIcon color="primary" />
              <Typography variant="subtitle1" color="text.secondary">Organizer</Typography>
            </Stack>
            {organizer ? (
              <Stack direction="row" spacing={4} sx={{ pl: 4, pt: 4 }} alignItems="flex-start" justifyContent="space-between">
                {/* Left Side: Avatar, Name, Rating */}
                <Stack direction="row" spacing={1} minWidth={150}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    {organizer.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Stack >
                    <Link to=''>
                      <Typography variant="h6">{organizer.username}</Typography>
                    </Link>
                    <Rating value={4} readOnly precision={0.5} />
                  </Stack>
                </Stack>

                {/* Right Side: Sports Interests */}
                <Box alignSelf="end" flex={1}>
                  <Stack direction="row" justifyContent="end" spacing={1} flexWrap="wrap">
                    {organizer.sportsInterests.map((sport, index) => (
                      <Chip
                        key={index}
                        label={sport}
                        size="small"
                        sx={{
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          mb: 1,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            ) : (
              <Typography variant="body1" sx={{ pl: 4 }}>
                Loading organizer info...
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );

}

export default EventDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Divider, Box, Paper, Avatar, Chip, Stack } from '@mui/material';
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
          borderRadius: 2,
          overflow: 'hidden',
          '&:hover': {
            boxShadow: 6
          }
        }}
      >
        <Grid container>
          {/* Image Column */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: { xs: '300px', md: '100%' },
                minHeight: '400px',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
                }
              }}
            >
              <img 
                src={"/HomeCards/" + event.category.imageURL} 
                alt={event.category.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }} 
              />
            </Box>
          </Grid>

          {/* Details Column */}
          <Grid item xs={12} md={7}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.main',
                  mb: 3
                }}
              >
                {event.category.name} Event
              </Typography>

              {/* Location Section */}
              <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Location
                  </Typography>
                </Stack>
                <Typography variant="body1" sx={{ pl: 4 }}>
                  {event.address.addressLine1}
                  {event.address.addressLine2 && `, ${event.address.addressLine2}`}
                  <br />
                  {event.address.city}, {event.address.country}
                </Typography>
              </Box>

              {/* Event Details Section */}
              <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <CalendarTodayIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Event Information
                  </Typography>
                </Stack>
                <Grid container spacing={3} sx={{ pl: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarTodayIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Date</Typography>
                        <Typography variant="body1">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Time</Typography>
                        <Typography variant="body1">
                          {new Date(event.date).toLocaleTimeString(undefined, { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            hour12: false 
                          })}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Duration</Typography>
                        <Typography variant="body1">{event.duration} hours</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <DirectionsRunIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Difficulty</Typography>
                        <Typography variant="body1">{event.difficultyLevel}</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>

              {/* Organizer Section */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <PersonIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Organizer
                  </Typography>
                </Stack>
                {organizer ? (
                  <Box sx={{ pl: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 56,
                          height: 56,
                          fontSize: '1.5rem'
                        }}
                      >
                        {organizer.username.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {organizer.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {organizer.age} years old • {organizer.gender}
                        </Typography>
                      </Box>
                    </Box>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Fitness Profile
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip 
                            label={organizer.fitnessGoal} 
                            color="primary" 
                            variant="outlined" 
                            size="small" 
                          />
                          <Chip 
                            label={`${organizer.activityLevel} activity`} 
                            color="secondary" 
                            variant="outlined" 
                            size="small" 
                          />
                        </Stack>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Sports Interests
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {organizer.sportsInterests.map((sport, index) => (
                            <Chip 
                              key={index}
                              label={sport} 
                              size="small"
                              sx={{ 
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider'
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ pl: 4 }}>Loading organizer information...</Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default EventDetails;

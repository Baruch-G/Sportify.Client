import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Divider, 
  Box, 
  Paper, 
  Avatar, 
  Chip, 
  Stack, 
  Rating,
  Button,
  Container,
  Skeleton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Event } from '../models/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

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

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = React.useState<Event | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    async function getEventAndOrganizer() {
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

    getEventAndOrganizer();
  }, [eventId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          <Skeleton variant="text" height={60} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'error.light',
            color: 'error.dark'
          }}
        >
          <Typography variant="h5" gutterBottom>
            {error}
          </Typography>
          <Button
            component={Link}
            to="/events"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Back to Events
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'grey.100'
          }}
        >
          <Typography variant="h5" gutterBottom>
            Event details not available.
          </Typography>
          <Button
            component={Link}
            to="/events"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Back to Events
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          }
        }}
      >
        <Grid container>
          {/* Left Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '400px', md: '100%' },
                minHeight: { md: '700' },
                backgroundImage: `url(/HomeCards/${event.category.imageURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
                }
              }}
            />
          </Grid>

          {/* Right Details */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 3
              }}
            >
              {/* Title & Category */}
              <Box>
                <Chip
                  icon={<FitnessCenterIcon />}
                  label={event.category.name}
                  color="primary"
                  sx={{ mb: 2 }}
                />
              </Box>

              {/* Location */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <LocationOnIcon color="error" />
                  <Typography variant="h6" color="text.primary">Location</Typography>
                </Stack>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {event.address.addressLine1}
                    {event.address.addressLine2 && <><br />{event.address.addressLine2}</>}
                    <br />
                    {event.address.city}, {event.address.country}
                  </Typography>
                </Paper>
              </Box>

              {/* Event Info */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <CalendarTodayIcon color="primary" />
                  <Typography variant="h6" color="text.primary">Event Details</Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        height: '100%'
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Date & Time
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        <br />
                        {new Date(event.date).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        height: '100%'
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Duration & Difficulty
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        {event.duration} hours
                        <br />
                        Level {event.difficultyLevel}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              {/* Organizer */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6" color="text.primary">Organizer</Typography>
                </Stack>
                {event.organizer ? (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'grey.50',
                      borderRadius: 2
                    }}
                  >
                    <Stack spacing={2}>
                      {/* Top: Avatar and Name */}
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            width: 64,
                            height: 64,
                            bgcolor: 'primary.main',
                            fontSize: '1.5rem'
                          }}
                        >
                          {event.organizer.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Link
                            to={`/coaches/${event.organizer._id}`}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit'
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                '&:hover': {
                                  color: 'primary.main'
                                }
                              }}
                            >
                              {event.organizer.username}
                            </Typography>
                          </Link>
                          <Rating value={4} readOnly precision={0.5} size="small" />
                        </Box>
                      </Stack>

                      {/* Bottom: Sports Interests */}
                      {/* <Box>
                        <Typography 
                          variant="subtitle2" 
                          color="text.secondary" 
                          sx={{ mb: 1 }}
                        >
                          Sports Interests
                        </Typography>
                        <Stack 
                          direction="row" 
                          spacing={1} 
                          flexWrap="wrap"
                          sx={{ 
                            gap: 1
                          }}
                        >
                          {organizer.sportsInterests.map((sport, index) => (
                            <Chip
                              key={index}
                              label={sport}
                              size="small"
                              variant="outlined"
                              sx={{
                                bgcolor: 'background.paper',
                                '&:hover': {
                                  bgcolor: 'primary.light',
                                  color: 'primary.contrastText'
                                }
                              }}
                            />
                          ))}
                        </Stack>
                      </Box> */}
                    </Stack>
                  </Paper>
                ) : (
                  <Skeleton variant="rectangular" height={100} />
                )}
              </Box>

              {/* Action Button */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 'auto',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Join Event
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default EventDetails;

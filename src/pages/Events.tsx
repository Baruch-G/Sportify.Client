import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Divider,
  SelectChangeEvent
} from '@mui/material';
import { Event } from '../models/Event';
import EventItem from '../components/EventItem';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [sortBy, setSortBy] = useState<string>('date');

  // Get unique categories from events
  const availableCategories = useMemo(() => {
    const categoryMap = new Map<string, string>();
    events.forEach(event => {
      if (!categoryMap.has(event.category._id)) {
        categoryMap.set(event.category._id, event.category.name);
      }
    });
    return Array.from(categoryMap.entries()).map(([id, name]) => ({ id, name }));
  }, [events]);

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      // Check if the category ID exists in our events
      const categoryExists = events.some(event => event.category._id === categoryFromUrl);
      if (categoryExists) {
        setCategoryFilter(categoryFromUrl);
      }
    }
  }, [searchParams, events]);

  // Fetch events
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

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const newCategory = event.target.value;
    setCategoryFilter(newCategory);

    // Update URL parameters
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficultyFilter(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const filterAndSortEvents = (events: Event[]) => {
    let filteredEvents = [...events];

    // Apply filters
    if (categoryFilter) {
      filteredEvents = filteredEvents.filter(event => event.category._id === categoryFilter);
    }
    if (difficultyFilter) {
      filteredEvents = filteredEvents.filter(event => event.difficultyLevel === parseInt(difficultyFilter));
    }
    if (dateRange[0] && dateRange[1]) {
      filteredEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= dateRange[0]! && eventDate <= dateRange[1]!;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'date':
        filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'difficulty':
        filteredEvents.sort((a, b) => a.difficultyLevel - b.difficultyLevel);
        break;
      case 'duration':
        filteredEvents.sort((a, b) => a.duration - b.duration);
        break;
    }

    return filteredEvents;
  };

  const getUpcomingEvents = (events: Event[]) => {
    const now = new Date();
    return events.filter(event => new Date(event.date) > now);
  };

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

  const filteredEvents = filterAndSortEvents(events);
  const upcomingEvents = getUpcomingEvents(filteredEvents);
  const pastEvents = filteredEvents.filter(event => new Date(event.date) <= new Date());

  return (
    <Box sx={{
      py: 5,
      px: { xs: 2, sm: 3, md: 4 },
      maxWidth: '1200px',
      mx: 'auto',
      backgroundColor: '#f4f6f8',
    }}>
      {/* Filters and Sort Section */}
      <Paper sx={{
        p: { xs: 2, sm: 3 },
        mb: 5,
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
        border: '1px solid #e0e0e0'
      }}>
        <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 600, color: 'text.primary' }}>
          Filter & Sort Events
        </Typography>
        <Grid container spacing={2.5} alignItems="center">
          <Grid item xs={12} sm={6} md={2.4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All</MenuItem>
                {availableCategories.map(category => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficultyFilter}
                label="Difficulty"
                onChange={handleDifficultyChange}
              >
                <MenuItem value="">All</MenuItem>
                {[1, 2, 3, 4, 5].map(level => (
                  <MenuItem key={level} value={level.toString()}>Level {level}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={dateRange[0]}
                onChange={(newValue: Date | null) => setDateRange([newValue, dateRange[1]])}
                slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={dateRange[1]}
                onChange={(newValue: Date | null) => setDateRange([dateRange[0], newValue])}
                slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={2.4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="difficulty">Difficulty</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
            Upcoming Events
          </Typography>
          <Grid container spacing={3}>
            {upcomingEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <EventItem onClick={() => navigate(`/events/${event._id}`)} event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <Box sx={{mb: 4}}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
            Past Events
          </Typography>
          <Grid container spacing={3}>
            {pastEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <EventItem onClick={() => navigate(`/events/${event._id}`)} event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* No Events Message */}
      {filteredEvents.length === 0 && (
        <Paper sx={{ textAlign: 'center', mt: 5, p:4, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            No events found matching your criteria.
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.hint', mt: 1 }}>
            Try adjusting your filters or check back later!
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default EventList;
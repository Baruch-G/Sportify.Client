import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { Address, Event, EventErrors, Location } from '../types/event';

declare global {
    interface Window {
        google: typeof google;
    }
}

const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

const AddEvent = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState<Location | null>(null);
    const [eventTitle, setEventTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState<number | ''>('');

    const [errors, setErrors] = useState<EventErrors>({});

    useEffect(() => {
        const loadAutocomplete = () => {
            if (!window.google || !inputRef.current) return;

            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['geocode'],
            });

            autocomplete.setFields(['address_components', 'geometry']);

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                const getComponent = (type: string) =>
                    place.address_components?.find((c: google.maps.GeocoderAddressComponent) => c.types.includes(type))?.long_name || '';

                const streetNumber = getComponent('street_number');
                const route = getComponent('route');
                const locality = getComponent('locality') || getComponent('sublocality') || getComponent('administrative_area_level_2');
                const countryVal = getComponent('country');

                setAddressLine1(`${streetNumber} ${route}`.trim());
                setCity(locality);
                setCountry(countryVal);
                setAddressLine2(''); // Optional, can extend later

                if (place.geometry) {
                    setLocation({
                        longitude: place.geometry.location?.lng() || 0,
                        latitude: place.geometry.location?.lat() || 0,
                    });
                }
            });
        };

        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&language=en&region=IL`;
            script.async = true;
            script.onload = loadAutocomplete;
            document.body.appendChild(script);
        } else {
            loadAutocomplete();
        }
    }, []);

    const validate = () => {
        const newErrors: EventErrors = {};

        if (!eventTitle) newErrors.eventTitle = 'Event title is required';
        if (!addressLine1) newErrors.addressLine1 = 'Address Line 1 is required';
        if (!city) newErrors.city = 'City is required';
        if (!country) newErrors.country = 'Country is required';
        if (!date) newErrors.date = 'Date is required';
        if (!startTime) newErrors.startTime = 'Start time is required';
        if (!endTime) newErrors.endTime = 'End time is required';
        if (!difficultyLevel) newErrors.difficultyLevel = 'Difficulty level is required';
        if (startTime && endTime && startTime >= endTime) newErrors.time = 'End time must be after start time';
        if (!location) newErrors.location = 'Valid location is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const start = dayjs(`${date}T${startTime}`);
        const end = dayjs(`${date}T${endTime}`);
        const duration = end.diff(start, 'hour');

        const eventBody = {
            address: {
                addressLine1,
                addressLine2,
                city,
                country,
            },
            location: {
                longitude: location!.longitude,
                latitude: location!.latitude,
            },
            date: start.toISOString(),
            duration,
            difficultyLevel,
            organizer: 'user-guid-1234', // Replace with actual organizer/user id
            title: eventTitle,
        };

        try {
            const res = await axios.post(`${serverURL}/events`, eventBody);
            console.log('Event created:', res.data);
        } catch (err) {
            console.error('Error creating event:', err);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" mb={2}>Add Event</Typography>

            <TextField
                fullWidth
                inputRef={inputRef}
                name="ignore-address-autofill"
                autoComplete="off"
                label="Search Address"
                inputProps={{
                    autoComplete: 'new-password',
                    form: { autoComplete: 'off' },
                }}
                error={!!errors.location}
                helperText={errors.location}
            />

            <Box mt={2}>
                <TextField
                    fullWidth
                    label="Address Line 1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    error={!!errors.addressLine1}
                    helperText={errors.addressLine1}
                />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    label="Address Line 2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    error={!!errors.country}
                    helperText={errors.country}
                />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    label="Event Title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    error={!!errors.eventTitle}
                    helperText={errors.eventTitle}
                />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    type="date"
                    label="Event Date"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    error={!!errors.date}
                    helperText={errors.date}
                />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    type="time"
                    label="Start Time"
                    InputLabelProps={{ shrink: true }}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    error={!!errors.startTime}
                    helperText={errors.startTime}
                />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    type="time"
                    label="End Time"
                    InputLabelProps={{ shrink: true }}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    error={!!errors.endTime || !!errors.time}
                    helperText={errors.endTime || errors.time}
                />
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    select
                    label="Difficulty Level"
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(Number(e.target.value))}
                    error={!!errors.difficultyLevel}
                    helperText={errors.difficultyLevel}
                >
                    {[1, 2, 3].map((level) => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box mt={3}>
                <Button variant="contained" onClick={handleSubmit}>Create Event</Button>
            </Box>
        </Box>
    );
};

export default AddEvent;

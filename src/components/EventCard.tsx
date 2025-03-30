import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Rating } from '@mui/material';
import { DateRange, LocationOn, Timelapse, Timer, AccessTime } from '@mui/icons-material';

interface Address {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    country: string;
}

interface Location {
    longitude: number;
    latitude: number;
}

export interface Event {
    _id: string;
    id: string;
    duration: number;
    difficultyLevel: number;
    organizer: string;
    address: Address;
    location: Location;
    date: string;
    __v: number;
}

export interface EventProps {
    event: Event;
    selected? : string;
}

const selectedStyle = {
    boxShadow: "0px 4px 8px rgba(229, 70, 29, 0.2)", // Softer shadow
    transform: "scale(1.02)",
    borderLeft: "4px solid #E5461D", // Sleek side border for emphasis
    transition: "all 0.3s ease-in-out", // Smooth hover effect
};

const EventCard = (props: EventProps) => {

    useEffect(() => {
        console.log("Selected Event ID:", props.selected);
    }, [props.selected]);

    // Compare against both id and _id to be safe
    const isSelected = props.selected === props.event.id || props.selected === props.event._id;

    return (
        <Card style={isSelected ? selectedStyle : {}} sx={{ display: 'flex', maxWidth: 500, margin: 'auto', boxShadow: 3 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {"Running"}
                </Typography>
                <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Grid item>
                        <DateRange />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{new Date(props.event.date).toDateString()}</Typography>
                    </Grid>
                    <Grid item>
                        <AccessTime />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{new Date(props.event.date).toLocaleTimeString()}</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Grid item>
                        <LocationOn />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{`${props.event.address.addressLine1}, ${props.event.address.addressLine2 ? props.event.address.addressLine2 + " ," : ""} ${props.event.address.city}.`}</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Grid item>
                        <Timer />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{`${props.event.duration}h`}</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={1} sx={{ mt: 2 }}>
                    <Grid item>
                        <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                    </Grid>
                    <Grid item>
                        <Rating name="read-only" value={1} readOnly />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EventCard;
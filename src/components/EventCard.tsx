import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Rating } from '@mui/material';
import { DateRange, LocationOn, Timer } from '@mui/icons-material';

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
    __v: number;
}

const EventCard = (props: Event) => {
    return (
        <Card sx={{ display: 'flex', maxWidth: 600, margin: 'auto', boxShadow: 3 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {"title"}
                </Typography>
                <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Grid item>
                        <DateRange />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{"date"}</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Grid item>
                        <LocationOn />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{props.address.addressLine1}</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Grid item>
                        <Timer />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{`${props.duration}h`}</Typography>
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
            <img
                src={"https://static01.nyt.com/images/2022/08/29/multimedia/WNT-GRAVEL-BIKING1/WNT-GRAVEL-BIKING1-mediumSquareAt3X.jpg"}
                alt="Running"
                style={{ width: 200, height: 'auto', objectFit: 'cover' }}
            />
        </Card>
    );
};

export default EventCard;
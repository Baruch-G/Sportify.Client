<<<<<<< Updated upstream
import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Rating } from '@mui/material';
import { DateRange, LocationOn, People } from '@mui/icons-material';
=======
import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Rating, CardActionArea } from '@mui/material';
import { DateRange, LocationOn, Timelapse, Timer, AccessTime } from '@mui/icons-material';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
                        <People />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">Group</Typography>
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
=======
export interface EventProps {
    event: Event;
    selected?: string;
    onSelect: () => void
}

const selectedStyle = {
    // boxShadow : "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(229, 70, 29, 0.2)",
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
        <Card style={isSelected ? selectedStyle : {}}
            sx={{
                display: 'flex', maxWidth: 500, margin: 'auto', boxShadow: 3, ':hover': {
                    cursor: "pointer"
                },
            }}>
            <CardActionArea onClick={props.onSelect}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {"Running"}
                    </Typography>
                    <Grid container spacing={2} columns={2}>
                        <Grid item xs={1.1}>
                            <Grid container alignItems="center" wrap="nowrap">
                                <DateRange />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ ml: 1, flexGrow: 1, minWidth: 0 }}
                                >
                                    {new Date(props.event.date).toDateString()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={0.9}>
                            <Grid container alignItems="center" wrap="nowrap">
                                <AccessTime />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ ml: 1, flexGrow: 1, minWidth: 0 }}
                                >
                                    {new Date(props.event.date).toLocaleTimeString()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={1.1}>
                            <Grid container alignItems="center" wrap="nowrap">
                                <LocationOn />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ ml: 1, flexGrow: 1, minWidth: 0 }}
                                >
                                    {props.event.address.city}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={0.9}>
                            <Grid container alignItems="center" wrap="nowrap">
                                <Timer />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ ml: 1, flexGrow: 1, minWidth: 0 }}
                                >
                                    {`${props.event.duration}h`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>


                    {/* <Grid container alignItems="center" spacing={1} sx={{ mt: 2 }}>
                        <Grid item>
                            <Avatar alt="User Avatar" src="/avatar.jfif" />
                        </Grid>
                        <Grid item>
                            <Rating name="read-only" value={1} readOnly />
                        </Grid>
                    </Grid> */}
                </CardContent>
            </CardActionArea>
>>>>>>> Stashed changes
        </Card>
    );
};

export default EventCard;
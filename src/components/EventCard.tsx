import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Rating, CardActionArea, Button } from '@mui/material';
import { DateRange, LocationOn, Timelapse, Timer, AccessTime } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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
    selected?: string;
    onSelect: () => void;
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
        <Card style={isSelected ? selectedStyle : {}}
            sx={{
                display: 'flex', maxWidth: 500, margin: 'auto', boxShadow: 3, ':hover': {
                    cursor: "pointer"
                },
            }}>          <CardActionArea onClick={props.onSelect}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" style={{ marginBottom: '10px' }}>
                        {"Running"}
                    </Typography>
                    <Grid container spacing={3} columns={2}>
                        <Grid item xs={1.1}>
                            <Grid container alignItems="center" wrap="nowrap">
                                <DateRange style={{ color: "#E5461D" }} />
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
                                <AccessTime style={{ color: "#E5461D" }} />
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
                                <LocationOn style={{ color: "#E5461D" }} />
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
                                <Timer style={{ color: "#E5461D" }} />
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
                    {isSelected && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            <Link to={`/events/${props.event.id}`} style={{ color: "#E5461D", fontWeight: "bold" }}>Register</Link>
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EventCard;
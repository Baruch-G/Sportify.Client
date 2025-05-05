import React from 'react';
import { Grid, Typography, Box, Chip } from '@mui/material';
import { Coach } from '../CoachCard';

interface DetailedInfoProps {
    userData: Coach;
}

const DetailedInfo: React.FC<DetailedInfoProps> = ({ userData }) => {
    return (
        <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
                Personal Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Age</Typography>
                    <Typography variant="body1">{userData.age} years</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Gender</Typography>
                    <Typography variant="body1">{userData.gender?.charAt(0).toUpperCase() + userData.gender?.slice(1)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Height</Typography>
                    <Typography variant="body1">{userData.height} cm</Typography>
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Fitness Profile
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">Fitness Goal</Typography>
                    <Typography variant="body1">{userData.fitnessGoal}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">Activity Level</Typography>
                    <Typography variant="body1">{userData.activityLevel}</Typography>
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Sports Interests
            </Typography>
            <Box sx={{ mb: 3 }}>
                {userData.sportsInterests?.map((sport, index) => (
                    <Chip
                        key={index}
                        label={sport.charAt(0).toUpperCase() + sport.slice(1)}
                        sx={{ mr: 1, mb: 1 }}
                        color="primary"
                        variant="outlined"
                    />
                ))}
            </Box>

            <Typography variant="h6" gutterBottom>
                Contact Information
            </Typography>
            <Typography variant="body1">
                📧 Email: {userData.email}
                <br />
                📍 Location: {userData.addresse && userData.city ? `${userData.addresse}, ${userData.city}` : 'Location not specified'}
            </Typography>
        </Grid>
    );
};

export default DetailedInfo; 
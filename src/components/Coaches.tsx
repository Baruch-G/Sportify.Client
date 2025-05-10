import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Skeleton } from '@mui/material';
import axios from 'axios';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import CoachCard from './CoachCard';
import { Coach } from '../models/User';

const Coaches: React.FC = () => {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                setLoading(true);
                const response = await api.get('/users?role=coach');
                setCoaches(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch coaches. Please try again later.');
                console.error('Error fetching coaches:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCoaches();
    }, []);

    if (loading) {
        return (
            <Box sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((skeleton) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={skeleton}>
                            <Card>
                                <CardContent>
                                    <Skeleton variant="circular" width={60} height={60} />
                                    <Skeleton variant="text" sx={{ mt: 2 }} />
                                    <Skeleton variant="text" width="60%" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 3 }}>
                <Typography color="error" variant="h6" align="center">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Our Coaches
            </Typography>
            <Grid container spacing={3}>
                {coaches.map((coach) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={coach._id}>
                        <CoachCard
                            coach={coach}
                            onClick={() => navigate(`/coaches/${coach._id}`)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Coaches;

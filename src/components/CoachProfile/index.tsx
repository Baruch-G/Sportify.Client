import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Coach } from '../CoachCard';
import { ProfilePaper } from './styles';
import BasicInfo from './BasicInfo';
import DetailedInfo from './DetailedInfo';
import UpcomingEvents from './UpcomingEvents';

const CoachProfile: React.FC = () => {
    const { coachId } = useParams<{ coachId: string }>();
    const [userData, setUserData] = useState<Coach | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!coachId) {
                setError('No coach ID provided');
                return;
            }

            try {
                setLoading(true);
                console.log('Fetching coach data for ID:', coachId);
                const response = await api.get<Coach>(`/users/${coachId}`);
                console.log('Coach data received:', response.data);
                setUserData(response.data);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching coach data:', err);
                setError(
                    err.response?.data?.message ||
                    'Failed to fetch coach data. Please try again later.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [coachId]);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!userData) {
        return (
            <Container sx={{ mt: 3 }}>
                <Alert severity="info">No coach data found.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <ProfilePaper elevation={3}>
                <Grid container spacing={4}>
                    <BasicInfo userData={userData} />
                    <DetailedInfo userData={userData} />
                </Grid>
            </ProfilePaper>
            {userData.events && <UpcomingEvents events={userData.events} />}
        </Container>
    );
};

export default CoachProfile; 
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { LargeAvatar } from './styles';
import { Coach } from '../CoachCard';

interface BasicInfoProps {
    userData: Coach;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ userData }) => {
    return (
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LargeAvatar 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`} 
                    alt={userData.username} 
                />
                <Typography variant="h4" gutterBottom>
                    {userData.username}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                    Book a Session
                </Button>
            </Box>
        </Grid>
    );
};

export default BasicInfo; 
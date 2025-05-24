import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Chip, Stack, Rating, Paper } from '@mui/material';
import { LargeAvatar } from './styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { Coach } from '../../models/User';
import ContactInformation from '../ContactInformation/ContactInformation';
import { se } from 'date-fns/locale';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { sportToIconMap } from '../../data/sportsMap';

interface BasicInfoProps {
    userData: Coach;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ userData }) => {
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

    console.log(serverURL + userData.image);
    const handleOpenContactDialog = () => {
        setIsContactDialogOpen(true);
    };

    const handleCloseContactDialog = () => {
        setIsContactDialogOpen(false);
    };

    return (
        <Grid item xs={12} md={4} sx={{ textAlign: 'center', height: '100%' }}>
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, borderRadius: 3 }}>
                <LargeAvatar 
                    src={`${serverURL}${userData.image}`} 
                    alt={userData.firstName + userData.lastName}
                    sx={{
                        border: '4px solid',
                        borderColor: 'primary.main',
                        mb: 2
                    }}
                />
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {userData.firstName + " " + userData.lastName}
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip 
                        icon={<StarIcon />} 
                        label="4.9/5" 
                        color="primary" 
                        variant="outlined"
                    />
                    <Chip 
                        icon={<AccessTimeIcon />} 
                        label={`${userData.coachProfile?.coachingStartDate ? new Date().getFullYear() - new Date(userData.coachProfile?.coachingStartDate).getFullYear()  : 0} years exp.`}
                        color="secondary" 
                        variant="outlined"
                    />
                </Stack>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Specializations
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {userData.coachProfile?.specializations?.map((sport, index) => (
                            <Chip
                                key={index}
                                icon={sportToIconMap[sport.name.toLowerCase() as keyof typeof sportToIconMap] || <FitnessCenterIcon />}
                                label={sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                                sx={{ mb: 1 }}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                </Box>

                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={handleOpenContactDialog}
                    sx={{ 
                        mb: 2,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                    }}
                >
                    Book a Session
                </Button>

                <ContactInformation
                    userData={userData}
                    open={isContactDialogOpen}
                    onClose={handleCloseContactDialog}
                />
            </Paper>
        </Grid>
    );
};

export default BasicInfo; 
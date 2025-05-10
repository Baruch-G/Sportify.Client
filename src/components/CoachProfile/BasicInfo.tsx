import React from 'react';
import { Grid, Box, Typography, Button, Chip, Stack, Rating } from '@mui/material';
import { LargeAvatar } from './styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { User } from '../CoachCard';

interface BasicInfoProps {
    userData: User;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ userData }) => {
    return (
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                p: 3,
                backgroundColor: 'background.paper',
                borderRadius: 3,
                boxShadow: 1,
            }}>
                <LargeAvatar 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`} 
                    alt={userData.username}
                    sx={{
                        border: '4px solid',
                        borderColor: 'primary.main',
                        mb: 2
                    }}
                />
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {userData.username}
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
                        label="5 years exp." 
                        color="secondary" 
                        variant="outlined"
                    />
                </Stack>

                <Box sx={{ mb: 3, textAlign: 'left', width: '100%' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Location
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon sx={{ color: 'primary.main', mr: 1 }} />
                        <Typography variant="body2">
                            {userData.addresse && userData.city ? `${userData.addresse}, ${userData.city}` : 'Location not specified'}
                        </Typography>
                    </Box>

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Specializations
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {userData.sportsInterests?.map((sport, index) => (
                            <Chip
                                key={index}
                                label={sport.charAt(0).toUpperCase() + sport.slice(1)}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Box>

                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Rating
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={4.9} precision={0.1} readOnly />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            (128 reviews)
                        </Typography>
                    </Box>
                </Box>

                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
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
                <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem'
                    }}
                >
                    View Schedule
                </Button>
            </Box>
        </Grid>
    );
};

export default BasicInfo; 
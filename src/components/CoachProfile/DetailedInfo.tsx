import React from 'react';
import { Grid, Typography, Box, Chip, Paper, Divider, Rating, Stack } from '@mui/material';
import { Coach, User } from '../../models/User';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';

interface DetailedInfoProps {
    userData: Coach;
}

const DetailedInfo: React.FC<DetailedInfoProps> = ({ userData }) => {
    return (
        <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    About Me
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="body1" paragraph>
                        {userData.coachProfile?.aboutMe}
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

         

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Experience & Qualifications
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Professional Experience
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {userData.coachProfile?.coachingStartDate ? new Date().getFullYear() - new Date(userData.coachProfile?.coachingStartDate).getFullYear() : 0} years of coaching experience
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Certifications
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {userData.coachProfile?.certifications?.map((certification, index) => (
                                    <div key={index}>
                                        {certification}
                                    </div>
                                ))}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Achievements
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {userData.coachProfile?.achievements?.map((achievement, index) => (
                                    <div key={index}>
                                        {achievement}
                                    </div>
                                ))}
                            </Typography>
                        </Box>
                        
                    </Stack>
                </Box>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Reviews & Ratings
                </Typography>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={4.9} precision={0.1} readOnly size="large" />
                        <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                            4.9
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            (128 reviews)
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        "Excellent coach! Very knowledgeable and patient. Helped me improve my technique significantly."
                        <br />
                        - John D.
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
};

export default DetailedInfo; 
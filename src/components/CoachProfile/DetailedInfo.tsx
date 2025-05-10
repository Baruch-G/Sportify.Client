import React from 'react';
import { Grid, Typography, Box, Chip, Paper, Divider, Rating, Stack } from '@mui/material';
import { User } from '../CoachCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';

interface DetailedInfoProps {
    userData: User;
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
                        Experienced sports coach with a passion for helping athletes achieve their full potential. 
                        Specializing in personalized training programs and technique improvement.
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Specializations
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {userData.sportsInterests?.map((sport, index) => (
                            <Chip
                                key={index}
                                icon={<FitnessCenterIcon />}
                                label={sport.charAt(0).toUpperCase() + sport.slice(1)}
                                sx={{ mb: 1 }}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Experience & Qualifications
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Professional Experience
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                5+ years of coaching experience in various sports disciplines
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                Certifications
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Advanced Sports Coaching Certification
                                <br />
                                • First Aid and CPR Certified
                                <br />
                                • Sports Nutrition Specialist
                            </Typography>
                        </Box>
                    </Stack>
                </Box> */}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Contact Information
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography variant="body1">
                                {userData.email}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography variant="body1">
                                {userData.addresse && userData.city ? `${userData.addresse}, ${userData.city}` : 'Location not specified'}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Divider sx={{ my: 3 }} />

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
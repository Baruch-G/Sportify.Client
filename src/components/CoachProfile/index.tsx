import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    CircularProgress,
    Alert,
    Box,
    Paper,
    Typography,
    Fade,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Coach } from '../../models/User';
import UpcomingEvents from './UpcomingEvents';
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ContactInformation from '../ContactInformation/ContactInformation';
import { sportToIconMap } from '../../data/sportsMap';

const CoachProfile: React.FC = () => {
    const { coachId } = useParams<{ coachId: string }>();
    const [userData, setUserData] = useState<Coach | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

    const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

    const handleOpenContactDialog = () => {
        setIsContactDialogOpen(true);
    };

    const handleCloseContactDialog = () => {
        setIsContactDialogOpen(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!coachId) {
                setError('No coach ID provided');
                return;
            }

            try {
                setLoading(true);
                const response = await api.get<Coach>(`/users/${coachId}`);
                setUserData(response.data);
                setError(null);
            } catch (err: any) {
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
            <Container 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '400px' 
                }}
            >
                <CircularProgress 
                    sx={{ 
                        color: 'primary.main',
                        '& .MuiCircularProgress-circle': {
                            strokeWidth: 3
                        }
                    }} 
                />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 3 }}>
                <Alert 
                    severity="error"
                    sx={{ 
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!userData) {
        return (
            <Container sx={{ mt: 3 }}>
                <Alert 
                    severity="info"
                    sx={{ 
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    No coach data found.
                </Alert>
            </Container>
        );
    }

    const coachProfileData = userData.coachProfile;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container 
                maxWidth="lg" 
                sx={{ 
                    py: 4,
                    px: { xs: 2, sm: 3, md: 4 }
                }}
            >
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: { xs: 2, md: 4 }, 
                        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        mb: 4
                    }}
                >
                    <Grid container spacing={4} alignItems="stretch">
                        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                            <Box sx={{ mt: 7, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                <Avatar
                                    src={userData.image ? `${serverURL}${userData.image}` : undefined}
                                    alt={`${userData.firstName} ${userData.lastName}`}
                                    sx={{
                                        width: { xs: 150, md: 180 },
                                        height: { xs: 150, md: 180 },
                                        mx: 'auto',
                                        mb: 2,
                                        border: '4px solid',
                                        borderColor: 'primary.main',
                                        boxShadow: '0 4px 12px rgba(227, 113, 39, 0.2)',
                                    }}
                                />
                                <Typography 
                                    variant="h4" 
                                    gutterBottom 
                                    sx={{ 
                                        fontWeight: 800,
                                        background: 'linear-gradient(45deg, #e37127 30%, #e37243 90%)',
                                        backgroundClip: 'text',
                                        textFillColor: 'transparent',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 0.5
                                    }}
                                >
                                    {userData.firstName} {userData.lastName}
                                </Typography>
                                <Chip
                                    label="Professional Coach"
                                    color="primary"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 8px rgba(227, 113, 39, 0.2)'
                                    }}
                                />
                                
                                <Stack direction="row" spacing={1} sx={{ mb: 2, justifyContent: 'center' }}>
                                    <Chip 
                                        icon={<StarIcon fontSize="small"/>} 
                                        label="4.9/5"
                                        color="primary" 
                                        variant="outlined"
                                        size="small"
                                    />
                                    {coachProfileData?.coachingStartDate && (
                                        <Chip 
                                            icon={<AccessTimeIcon fontSize="small" />} 
                                            label={`${new Date().getFullYear() - new Date(coachProfileData.coachingStartDate).getFullYear()} years exp.`}
                                            color="secondary" 
                                            variant="outlined"
                                            size="small"
                                        />
                                    )}
                                </Stack>

                                {coachProfileData?.specializations && coachProfileData.specializations.length > 0 && (
                                    <Box sx={{ mb: 3, width: '100%'}}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5, fontSize: '1.1rem' }}>
                                            Specializations
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center">
                                            {coachProfileData.specializations.map((sport, index) => (
                                                <Chip
                                                    key={sport.name || index}
                                                    icon={sportToIconMap[sport.name.toLowerCase() as keyof typeof sportToIconMap] || <FitnessCenterIcon fontSize="small"/>}
                                                    label={sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                                                    sx={{ mb: 1 }}
                                                    color="primary"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            ))}
                                        </Stack>
                                    </Box>
                                )}
                                
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handleOpenContactDialog}
                                    sx={{ 
                                        py: 1.5,
                                        px: 7,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 'bold'
                                    }}
                                    >
                                    Book a Session
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Typography 
                                variant="h5" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 800,
                                    mb: 4,
                                    color: 'text.primary',
                                    position: 'relative',
                                    '&:after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -8,
                                        left: 0,
                                        width: 60,
                                        height: 4,
                                        backgroundColor: 'primary.main',
                                        borderRadius: 2
                                    }
                                }}
                            >
                                Coach Information
                            </Typography>

                            {coachProfileData?.aboutMe && (
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 3 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                                        About Me
                                    </Typography>
                                    <Typography variant="body1" paragraph sx={{whiteSpace: 'pre-line'}}>
                                        {coachProfileData.aboutMe}
                                    </Typography>
                                </Paper>
                            )}
                            
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 3 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                                    Contact Information
                                </Typography>
                                <Stack spacing={2}>
                                    {userData.email && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, borderRadius: 1.5, bgcolor: 'background.default'}}>
                                            <EmailIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                                            <Typography variant="body1">{userData.email}</Typography>
                                        </Box>
                                    )}
                                    {userData.address && (
                                         <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, borderRadius: 1.5, bgcolor: 'background.default'}}>
                                            <LocationOnIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                                            <Typography variant="body1">{`${userData.address.addressLine1}, ${userData.address.city}`}</Typography>
                                        </Box>
                                    )}
                                    {userData.phoneNumber && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, borderRadius: 1.5, bgcolor: 'background.default'}}>
                                            <PhoneIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                                            <Typography variant="body1">{userData.phoneNumber}</Typography>
                                        </Box>
                                    )}
                                </Stack>
                            </Paper>

                            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 3 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                                    Experience & Qualifications
                                </Typography>
                                <Stack spacing={3}>
                                    {coachProfileData?.coachingStyle && (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Coaching Style</Typography>
                                            <Typography variant="body2" color="text.secondary">{coachProfileData.coachingStyle}</Typography>
                                        </Box>
                                    )}
                                    {coachProfileData?.hourlyRate && (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Hourly Rate</Typography>
                                            <Typography variant="body2" color="text.secondary">€{coachProfileData.hourlyRate.toFixed(2)}</Typography>
                                        </Box>
                                    )}
                                     {coachProfileData?.languages && coachProfileData.languages.length > 0 && (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Languages Spoken</Typography>
                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{mt: 0.5}}>
                                                {coachProfileData.languages.map((lang, index) => (
                                                    <Chip key={index} label={lang} size="small" variant="outlined"/>
                                                ))}
                                            </Stack>
                                        </Box>
                                    )}
                                    {coachProfileData?.coachingStartDate && (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Professional Experience</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {`${new Date().getFullYear() - new Date(coachProfileData.coachingStartDate).getFullYear()} years of coaching experience`}
                                            </Typography>
                                        </Box>
                                    )}
                                    {coachProfileData?.certifications && coachProfileData.certifications.length > 0 && coachProfileData.certifications[0].trim() !== '' && (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Certifications</Typography>
                                            <Stack spacing={0.5} sx={{mt: 0.5}}>
                                            {coachProfileData.certifications.map((cert, index) => (
                                                <Typography key={index} variant="body2" color="text.secondary">- {cert}</Typography>
                                            ))}
                                            </Stack>
                                        </Box>
                                    )}
                                    {coachProfileData?.achievements && coachProfileData.achievements.length > 0 && coachProfileData.achievements[0].trim() !== '' &&(
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Achievements</Typography>
                                            <Stack spacing={0.5} sx={{mt: 0.5}}>
                                            {coachProfileData.achievements.map((ach, index) => (
                                                <Typography key={index} variant="body2" color="text.secondary">- {ach}</Typography>
                                            ))}
                                            </Stack>
                                        </Box>
                                    )}
                                </Stack>
                            </Paper>

                            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 3 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                                    Reviews & Ratings
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Rating value={4.9} precision={0.1} readOnly />
                                    <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>4.9</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>(128 reviews)</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                    "Excellent coach! Very knowledgeable and patient. Helped me improve my technique significantly." - John D.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>

                {userData.events && userData.events.length > 0 && (
                    <Fade in timeout={800}>
                        <Box>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontWeight: 800,
                                    mb: 3,
                                    color: 'text.primary',
                                    position: 'relative',
                                    '&:after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -8,
                                        left: 0,
                                        width: 60,
                                        height: 4,
                                        backgroundColor: 'primary.main',
                                        borderRadius: 2
                                    }
                                }}
                            >
                                Upcoming Events
                            </Typography>
                            <UpcomingEvents events={userData.events} />
                        </Box>
                    </Fade>
                )}

                {userData && (
                    <ContactInformation
                        userData={userData} 
                        open={isContactDialogOpen}
                        onClose={handleCloseContactDialog}
                    />
                )}
            </Container>
        </motion.div>
    );
};

export default CoachProfile; 
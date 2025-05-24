import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Button,
    Avatar,
    Stack,
    Chip,
    Divider,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User } from '../models/User';
import { Category } from '../models/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EditIcon from '@mui/icons-material/Edit';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

const languages = [
    'English',
    'French',
    'German',
    'Spanish',
    'Italian',
    'Arabic',
    'Chinese',
    'Russian'
];

const Profile: React.FC = () => {
    const { user, accessToken } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [becomeCoachDialogOpen, setBecomeCoachDialogOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [coachFormData, setCoachFormData] = useState({
        aboutMe: '',
        coachingStyle: '',
        hourlyRate: '',
        languages: [] as string[],
        specializations: [] as Category[],
        certifications: [''],
        achievements: [''],
        previousExperienceStartDate: null as Date | null,
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }

            try {
                const [userResponse, categoriesResponse] = await Promise.all([
                    api.get<User>(`/users/${user.id}`),
                    api.get<Category[]>('/categories')
                ]);
                setUserData(userResponse.data);
                setCategories(categoriesResponse.data);
                setError(null);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.id]);

    const handleEditProfile = () => {
        navigate('/profile/edit');
    };

    const handleBecomeCoach = () => {
        setBecomeCoachDialogOpen(true);
    };

    const validateCoachForm = () => {
        const errors: { [key: string]: string } = {};
        if (!coachFormData.aboutMe.trim()) {
            errors.aboutMe = 'About Me is required';
        }
        if (!coachFormData.coachingStyle) {
            errors.coachingStyle = 'Coaching style is required';
        }
        if (!coachFormData.hourlyRate) {
            errors.hourlyRate = 'Hourly rate is required';
        } else if (isNaN(Number(coachFormData.hourlyRate)) || Number(coachFormData.hourlyRate) <= 0) {
            errors.hourlyRate = 'Please enter a valid hourly rate';
        }
        if (coachFormData.specializations.length === 0) {
            errors.specializations = 'At least one specialization is required';
        }
        if (coachFormData.languages.length === 0) {
            errors.languages = 'At least one language is required';
        }
        if (coachFormData.certifications[0] === '') {
            errors.certifications = 'At least one certification is required';
        }
        if (coachFormData.previousExperienceStartDate && coachFormData.previousExperienceStartDate > new Date()) {
            errors.previousExperienceStartDate = 'Start date cannot be in the future';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCoachFormChange = (field: string, value: any) => {
        setCoachFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when field is modified
        if (formErrors[field]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleAddCertification = () => {
        setCoachFormData(prev => ({
            ...prev,
            certifications: [...prev.certifications, '']
        }));
    };

    const handleRemoveCertification = (index: number) => {
        setCoachFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    const handleCertificationChange = (index: number, value: string) => {
        setCoachFormData(prev => ({
            ...prev,
            certifications: prev.certifications.map((cert, i) => i === index ? value : cert)
        }));
    };

    const handleAddAchievement = () => {
        setCoachFormData(prev => ({
            ...prev,
            achievements: [...prev.achievements, '']
        }));
    };

    const handleRemoveAchievement = (index: number) => {
        setCoachFormData(prev => ({
            ...prev,
            achievements: prev.achievements.filter((_, i) => i !== index)
        }));
    };

    const handleAchievementChange = (index: number, value: string) => {
        setCoachFormData(prev => ({
            ...prev,
            achievements: prev.achievements.map((ach, i) => i === index ? value : ach)
        }));
    };

    const handleBecomeCoachConfirm = async () => {
        if (!validateCoachForm()) return;

        try {
            const coachData = {
                ...coachFormData,
                hourlyRate: parseFloat(coachFormData.hourlyRate),
                coachingStartDate: new Date(),
                previousExperienceStartDate: coachFormData.previousExperienceStartDate,
                certifications: coachFormData.certifications.filter(cert => cert.trim() !== ''),
                achievements: coachFormData.achievements.filter(ach => ach.trim() !== '')
            };

            await api.post('/users/become-coach', coachData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            // Refresh user data
            const response = await api.get<User>(`/users/${user?.id}`);
            setUserData(response.data);
            setBecomeCoachDialogOpen(false);
            setCoachFormData({
                aboutMe: '',
                coachingStyle: '',
                hourlyRate: '',
                languages: [],
                specializations: [],
                certifications: [''],
                achievements: [''],
                previousExperienceStartDate: null,
            });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to become a coach');
        }
    };

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
                <Alert severity="info">No user data found.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: { xs: 2, md: 4 }, 
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
            >
                <Grid container spacing={4}>
                    {/* Profile Header */}
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar
                                src={userData.image ? `${serverURL}${userData.image}` : undefined}
                                alt={`${userData.firstName} ${userData.lastName}`}
                                sx={{
                                    width: { xs: 150, md: 200 },
                                    height: { xs: 150, md: 200 },
                                    mx: 'auto',
                                    mb: 2,
                                    border: '4px solid',
                                    borderColor: 'primary.main',
                                    boxShadow: '0 4px 12px rgba(227, 113, 39, 0.2)',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            />
                            {userData.roles.includes('coach') && (
                                <Chip
                                    label="Professional Coach"
                                    color="primary"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 16,
                                        right: -8,
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 8px rgba(227, 113, 39, 0.2)'
                                    }}
                                />
                            )}
                        </Box>
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
                                mb: 1
                            }}
                        >
                            {userData.firstName} {userData.lastName}
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{ mb: 3 }}
                        >
                            {userData.roles.includes('coach') ? 'Professional Coach' : 'Sports Enthusiast'}
                        </Typography>
                        
                        <Stack 
                            direction={{ xs: 'column', sm: 'row' }} 
                            spacing={2} 
                            sx={{ 
                                justifyContent: 'center',
                                '& .MuiButton-root': {
                                    minWidth: { xs: '100%', sm: 'auto' },
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease-in-out'
                                }
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                onClick={handleEditProfile}
                            >
                                Edit Profile
                            </Button>
                            {userData.roles.includes('user') && (
                                <Button
                                    variant="outlined"
                                    startIcon={<SportsHandballIcon />}
                                    onClick={handleBecomeCoach}
                                    sx={{
                                        borderWidth: 2,
                                        '&:hover': {
                                            borderWidth: 2
                                        }
                                    }}
                                >
                                    Become a Coach
                                </Button>
                            )}
                        </Stack>
                    </Grid>

                    {/* Profile Details */}
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
                            Profile Information
                        </Typography>

                        <Grid container spacing={4}>
                            {/* Personal Information */}
                            <Grid item xs={12}>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: 3, 
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom 
                                        sx={{ 
                                            fontWeight: 700,
                                            color: 'primary.main',
                                            mb: 2
                                        }}
                                    >
                                        Personal Information
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ 
                                                p: 2, 
                                                borderRadius: 2,
                                                bgcolor: 'background.default',
                                                height: '100%'
                                            }}>
                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                    Age
                                                </Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {userData.birthDay ? new Date().getFullYear() - new Date(userData.birthDay).getFullYear() : 0} years
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ 
                                                p: 2, 
                                                borderRadius: 2,
                                                bgcolor: 'background.default',
                                                height: '100%'
                                            }}>
                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                    Gender
                                                </Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {userData.gender?.charAt(0).toUpperCase() + userData.gender?.slice(1)}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ 
                                                p: 2, 
                                                borderRadius: 2,
                                                bgcolor: 'background.default',
                                                height: '100%'
                                            }}>
                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                    Weight
                                                </Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {userData.wheight} kg
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        {userData.height && (
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ 
                                                    p: 2, 
                                                    borderRadius: 2,
                                                    bgcolor: 'background.default',
                                                    height: '100%'
                                                }}>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        Height
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {userData.height} cm
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Contact Information */}
                            <Grid item xs={12}>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: 3, 
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom 
                                        sx={{ 
                                            fontWeight: 700,
                                            color: 'primary.main',
                                            mb: 2
                                        }}
                                    >
                                        Contact Information
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: 'background.default',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                bgcolor: 'action.hover'
                                            }
                                        }}>
                                            <EmailIcon sx={{ color: 'primary.main', mr: 2 }} />
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {userData.email}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: 'background.default',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                bgcolor: 'action.hover'
                                            }
                                        }}>
                                            <LocationOnIcon sx={{ color: 'primary.main', mr: 2 }} />
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {userData.address.addressLine1}, {userData.address.city}
                                            </Typography>
                                        </Box>
                                        {userData.phoneNumber && (
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                p: 2,
                                                borderRadius: 2,
                                                bgcolor: 'background.default',
                                                transition: 'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    bgcolor: 'action.hover'
                                                }
                                            }}>
                                                <PhoneIcon sx={{ color: 'primary.main', mr: 2 }} />
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {userData.phoneNumber}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </Paper>
                            </Grid>

                            {/* Fitness Information */}
                            <Grid item xs={12}>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: 3, 
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom 
                                        sx={{ 
                                            fontWeight: 700,
                                            color: 'primary.main',
                                            mb: 2
                                        }}
                                    >
                                        Fitness Information
                                    </Typography>
                                    <Grid container spacing={3}>
                                        {userData.fitnessGoal && (
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ 
                                                    p: 2, 
                                                    borderRadius: 2,
                                                    bgcolor: 'background.default',
                                                    height: '100%'
                                                }}>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        Fitness Goal
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {userData.fitnessGoal}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        )}
                                        {userData.activityLevel && (
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ 
                                                    p: 2, 
                                                    borderRadius: 2,
                                                    bgcolor: 'background.default',
                                                    height: '100%'
                                                }}>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        Activity Level
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {userData.activityLevel.charAt(0).toUpperCase() + userData.activityLevel.slice(1)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        )}
                                        {userData.sportsInterests && userData.sportsInterests.length > 0 && (
                                            <Grid item xs={12}>
                                                <Box sx={{ 
                                                    p: 2, 
                                                    borderRadius: 2,
                                                    bgcolor: 'background.default'
                                                }}>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                        Sports Interests
                                                    </Typography>
                                                    <Stack 
                                                        direction="row" 
                                                        spacing={1} 
                                                        flexWrap="wrap" 
                                                        useFlexGap
                                                        sx={{ mt: 1 }}
                                                    >
                                                        {userData.sportsInterests.map((sport, index) => (
                                                            <Chip
                                                                key={index}
                                                                icon={<FitnessCenterIcon />}
                                                                label={sport.name}
                                                                sx={{ 
                                                                    mb: 1,
                                                                    fontWeight: 500,
                                                                    '& .MuiChip-icon': {
                                                                        color: 'primary.main'
                                                                    }
                                                                }}
                                                            />
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {/* Become Coach Dialog */}
            <Dialog 
                open={becomeCoachDialogOpen} 
                onClose={() => setBecomeCoachDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Become a Coach</DialogTitle>
                <DialogContent>
                    <Typography paragraph>
                        Please provide the following information to set up your coach profile:
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="About Me"
                                multiline
                                rows={4}
                                value={coachFormData.aboutMe}
                                onChange={(e) => handleCoachFormChange('aboutMe', e.target.value)}
                                error={!!formErrors.aboutMe}
                                helperText={formErrors.aboutMe}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Coaching Style"
                                value={coachFormData.coachingStyle}
                                onChange={(e) => handleCoachFormChange('coachingStyle', e.target.value)}
                                error={!!formErrors.coachingStyle}
                                helperText={formErrors.coachingStyle || "Describe your coaching style (e.g., 'Motivational and structured approach focusing on technique')"}
                                required
                                multiline
                                rows={2}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hourly Rate (€)"
                                type="number"
                                value={coachFormData.hourlyRate}
                                onChange={(e) => handleCoachFormChange('hourlyRate', e.target.value)}
                                error={!!formErrors.hourlyRate}
                                helperText={formErrors.hourlyRate}
                                required
                                inputProps={{ min: 0, step: 0.01 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Previous Experience Start Date"
                                type="date"
                                value={coachFormData.previousExperienceStartDate ? coachFormData.previousExperienceStartDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => handleCoachFormChange('previousExperienceStartDate', e.target.value ? new Date(e.target.value) : null)}
                                error={!!formErrors.previousExperienceStartDate}
                                helperText={formErrors.previousExperienceStartDate || 'When did you start coaching? (Optional)'}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={categories}
                                getOptionLabel={(option) => option.name}
                                value={coachFormData.specializations}
                                onChange={(_, newValue) => handleCoachFormChange('specializations', newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Specializations"
                                        error={!!formErrors.specializations}
                                        helperText={formErrors.specializations}
                                        required
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={languages}
                                value={coachFormData.languages}
                                onChange={(_, newValue) => handleCoachFormChange('languages', newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Languages"
                                        error={!!formErrors.languages}
                                        helperText={formErrors.languages}
                                        required
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Certifications
                            </Typography>
                            {coachFormData.certifications.map((cert, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        label={`Certification ${index + 1}`}
                                        value={cert}
                                        onChange={(e) => handleCertificationChange(index, e.target.value)}
                                        error={!!formErrors.certifications && index === 0}
                                        helperText={formErrors.certifications && index === 0 ? formErrors.certifications : ''}
                                        required={index === 0}
                                    />
                                    {index > 0 && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveCertification(index)}
                                            sx={{ minWidth: '40px' }}
                                        >
                                            ×
                                        </Button>
                                    )}
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                onClick={handleAddCertification}
                                sx={{ mt: 1 }}
                            >
                                Add Certification
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Achievements
                            </Typography>
                            {coachFormData.achievements.map((ach, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        label={`Achievement ${index + 1}`}
                                        value={ach}
                                        onChange={(e) => handleAchievementChange(index, e.target.value)}
                                    />
                                    {index > 0 && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveAchievement(index)}
                                            sx={{ minWidth: '40px' }}
                                        >
                                            ×
                                        </Button>
                                    )}
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                onClick={handleAddAchievement}
                                sx={{ mt: 1 }}
                            >
                                Add Achievement
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBecomeCoachDialogOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={handleBecomeCoachConfirm} 
                        variant="contained" 
                        color="primary"
                    >
                        Become a Coach
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile; 
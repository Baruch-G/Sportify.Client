import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    MenuItem,
    CircularProgress,
    Alert,
    Stack,
    Chip,
    Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User } from '../models/User';
import ProfileImageUpload from '../components/ProfileImageUpload';
import { Category } from '../models/Category';

const activityLevels = ['low', 'moderate', 'high'];
const genders = ['male', 'female'];

const ProfileEdit: React.FC = () => {
    const { user, accessToken } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDay: new Date(),
        gender: '',
        wheight: '',
        height: '',
        address: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            country: ''
        },
        phone: '',
        fitnessGoal: '',
        activityLevel: '',
        sportsInterests: [] as Category[],
    });

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
                
                // Initialize form data
                setFormData({
                    firstName: userResponse.data.firstName,
                    lastName: userResponse.data.lastName,   
                    email: userResponse.data.email,
                    gender: userResponse.data.gender,
                    birthDay: userResponse.data.birthDay,
                    wheight: userResponse.data.wheight.toString(),
                    height: userResponse.data.height?.toString() || '', 
                    address: {
                        addressLine1: userResponse.data.address.addressLine1,
                        addressLine2: userResponse.data.address.addressLine2 || '',
                        city: userResponse.data.address.city,
                        country: userResponse.data.address.country
                    },
                    phone: userResponse.data.phone || '',
                    fitnessGoal: userResponse.data.fitnessGoal || '',
                    activityLevel: userResponse.data.activityLevel || '',
                    sportsInterests: userResponse.data.sportsInterests || [],
                });
                
                setError(null);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        setSaving(true);
        try {
            const updatedData = {
                ...formData,
                birthDay: new Date(formData.birthDay),
                wheight: parseFloat(formData.wheight),
                height: formData.height ? parseFloat(formData.height) : undefined,
            };

            await api.put(`/users/${user.id}`, updatedData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            navigate('/profile');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
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

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                    Edit Profile
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Profile Image Upload */}
                        <Grid item xs={12}>
                            <ProfileImageUpload
                                token={accessToken || ''}
                                onSubmit={() => {}}
                            />
                        </Grid>

                        {/* Personal Information */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Personal Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Age"
                                name="age"
                                type="number"
                                value={formData.birthDay ? new Date().getFullYear() - new Date(formData.birthDay).getFullYear() : 0}
                                onChange={handleInputChange}
                                required
                                inputProps={{ min: 1, max: 120 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                {genders.map((gender) => (
                                    <MenuItem key={gender} value={gender}>
                                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Weight (kg)"
                                name="wheight"
                                type="number"
                                value={formData.wheight}
                                onChange={handleInputChange}
                                required
                                inputProps={{ min: 1, max: 500, step: 0.1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Height (cm)"
                                name="height"
                                type="number"
                                value={formData.height}
                                onChange={handleInputChange}
                                inputProps={{ min: 1, max: 300, step: 0.1 }}
                            />
                        </Grid>

                        {/* Contact Information */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                                Contact Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={formData.address.addressLine1}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formData.address.city}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        {/* Fitness Information */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                                Fitness Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Fitness Goal"
                                name="fitnessGoal"
                                value={formData.fitnessGoal}
                                onChange={handleInputChange}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Activity Level"
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleInputChange}
                            >
                                {activityLevels.map((level) => (
                                    <MenuItem key={level} value={level}>
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={categories}
                                getOptionLabel={(option) => option.name}
                                value={formData.sportsInterests}
                                onChange={(_, newValue) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        sportsInterests: newValue
                                    }));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Sports Interests"
                                        placeholder="Select sports"
                                    />
                                )}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            label={option.name}
                                            {...getTagProps({ index })}
                                            key={option._id}
                                        />
                                    ))
                                }
                            />
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/profile')}
                                    disabled={saving}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={saving}
                                    startIcon={saving ? <CircularProgress size={20} /> : null}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default ProfileEdit; 
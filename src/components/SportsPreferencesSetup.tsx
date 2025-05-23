import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    Typography,
    Checkbox,
    FormControlLabel,
    Box,
    Paper,
    useMediaQuery,
    useTheme,
    CircularProgress
} from '@mui/material';
import { Category } from '../models/Category';
import { sportToIconMap } from '../data/sportsMap';

interface SportsPreferencesSetupProps {
    onSubmit: () => void;
    email: string;
}

interface FormData {
    favoriteCategoryIds: string[];
    email: string;
}

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

async function updateFavorites(form: FormData) {
    try {
        const response = await fetch(`${serverURL}/users/updateFavoritesSports`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function SportsPreferencesSetup(props: SportsPreferencesSetupProps) {
    const [form, setForm] = useState<FormData>({
        favoriteCategoryIds: [],
        email: props.email,
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${serverURL}/categories`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load categories. Please try again.');
                setLoading(false);
                console.error('Error loading categories:', err);
            }
        };

        fetchCategories();
    }, []);

    function handleCheckboxChange(categoryId: string) {
        setForm((prev) => {
            const alreadySelected = prev.favoriteCategoryIds.includes(categoryId);
            return {
                ...prev,
                favoriteCategoryIds: alreadySelected
                    ? prev.favoriteCategoryIds.filter((id) => id !== categoryId)
                    : [...prev.favoriteCategoryIds, categoryId],
            };
        });
    }

    const handleSubmit = async () => {
        try {
            await updateFavorites(form);
            props.onSubmit();
        } catch (error) {
            console.error('Error updating favorites:', error);
            // You might want to show an error message to the user here
        }
    };

    const getSportIcon = (categoryName: string) => {
        const normalizedName = categoryName.replace(' ', '-').toLowerCase();
        return sportToIconMap[normalizedName as keyof typeof sportToIconMap] || null;
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            maxWidth: 600,
            mx: 'auto'
        }}>
            <Typography 
                variant="h4" 
                align="center" 
                sx={{ 
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 1
                }}
            >
                Which sports do you like?
            </Typography>

            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category._id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        '&.Mui-checked': { 
                                            color: 'primary.main'
                                        },
                                        '&:hover': { 
                                            bgcolor: 'action.hover'
                                        },
                                        borderRadius: 1
                                    }}
                                    checked={form.favoriteCategoryIds.includes(category._id)}
                                    onChange={() => handleCheckboxChange(category._id)}
                                />
                            }
                            label={
                                <Box display="flex" alignItems="center">
                                    <Box 
                                        mr={1} 
                                        sx={{ 
                                            width: 24, 
                                            height: 24, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            color: 'primary.main'
                                        }}
                                    >
                                        {getSportIcon(category.name)}
                                    </Box>
                                    <Typography variant="body1" fontWeight={500}>
                                        {category.name}
                                    </Typography>
                                </Box>
                            }
                            sx={{ 
                                width: "100%",
                                m: 0,
                                p: 1,
                                borderRadius: 2,
                                border: 1,
                                borderColor: 'divider',
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                }
                            }}
                        />
                    </Grid>
                ))}
            </Grid>

            <Button
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: 2,
                    '&:hover': {
                        boxShadow: 4,
                    },
                }}
            >
                Done
            </Button>
        </Box>
    );
}

export default SportsPreferencesSetup;
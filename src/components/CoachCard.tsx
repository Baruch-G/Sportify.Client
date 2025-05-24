import React from 'react';
import { Card, CardContent, Avatar, Box, Typography, Rating, Chip, Stack, IconButton } from '@mui/material';
import { Event } from '../models/Event';
import { User, Coach } from '../models/User';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

interface CoachCardProps {
    coach: Coach;
    onClick: () => void;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach, onClick }) => {
    const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Card
                onClick={onClick}
                sx={{
                    height: '100%',
                    display: 'flex',
                    cursor: 'pointer',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(227, 113, 39, 0.15)',
                        borderColor: 'primary.main',
                        '& .coach-avatar': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 12px rgba(227, 113, 39, 0.2)'
                        }
                    }
                }}
            >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                            className="coach-avatar"
                            src={coach.image ? `${serverURL}${coach.image}` : `${serverURL}/uploads/profile-images/default-avatar.jpg`}
                            alt={coach.firstName + coach.lastName}
                            sx={{ 
                                width: 72, 
                                height: 72, 
                                mr: 2,
                                border: '3px solid',
                                borderColor: 'primary.main',
                                transition: 'all 0.3s ease-in-out',
                                boxShadow: '0 2px 8px rgba(227, 113, 39, 0.1)'
                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography 
                                variant="h6" 
                                component="div" 
                                sx={{ 
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #e37127 30%, #e37243 90%)',
                                    backgroundClip: 'text',
                                    textFillColor: 'transparent',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 0.5
                                }}
                            >
                                {`${coach.firstName} ${coach.lastName}`}
                            </Typography>
                            <Stack 
                                direction="row" 
                                spacing={1} 
                                sx={{ 
                                    mt: 0.5,
                                    '& .MuiChip-root': {
                                        height: 24,
                                        '& .MuiChip-icon': {
                                            fontSize: 16,
                                            ml: 0.5
                                        }
                                    }
                                }}
                            >
                                <Chip
                                    icon={<AccessTimeIcon />}
                                    label={`${coach.coachProfile?.coachingStartDate ? new Date().getFullYear() - new Date(coach.coachProfile?.coachingStartDate).getFullYear() : 0} years`}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ 
                                        fontWeight: 500,
                                        borderWidth: 1.5,
                                        '&:hover': {
                                            borderWidth: 1.5
                                        }
                                    }}
                                />
                                {coach.coachProfile?.hourlyRate && (
                                    <Chip
                                        label={`€${coach.coachProfile.hourlyRate}/hr`}
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                        sx={{ 
                                            fontWeight: 500,
                                            borderWidth: 1.5,
                                            '&:hover': {
                                                borderWidth: 1.5
                                            }
                                        }}
                                    />
                                )}
                            </Stack>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography 
                            variant="subtitle2" 
                            color="text.secondary" 
                            sx={{ 
                                mb: 1.5,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                '&:before': {
                                    content: '""',
                                    display: 'inline-block',
                                    width: 4,
                                    height: 16,
                                    bgcolor: 'primary.main',
                                    borderRadius: 1,
                                    mr: 1
                                }
                            }}
                        >
                            Specializations
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 1,
                            '& .MuiChip-root': {
                                fontWeight: 500,
                                borderWidth: 1.5,
                                '&:hover': {
                                    borderWidth: 1.5,
                                    bgcolor: 'primary.light',
                                    color: 'primary.contrastText'
                                }
                            }
                        }}>
                            {coach.coachProfile.specializations?.slice(0, 3).map((sport, index) => (
                                <Chip
                                    key={index}
                                    label={sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                            {coach.sportsInterests && coach.sportsInterests.length > 3 && (
                                <Chip
                                    label={`+${coach.sportsInterests.length - 3}`}
                                    size="small"
                                    color="default"
                                    variant="outlined"
                                />
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'background.default'
                    }}>
                        <LocationOnIcon sx={{ color: 'primary.main', fontSize: 20, mr: 1 }} />
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                        >
                            {coach.address.city || 'Location not specified'}
                        </Typography>
                    </Box>

                    <Box sx={{ 
                        mt: 'auto',
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Typography 
                            variant="subtitle1" 
                            color="primary" 
                            sx={{ 
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                            }}
                        >
                            Book Now
                            <Box 
                                component="span" 
                                sx={{ 
                                    width: 8, 
                                    height: 8, 
                                    borderRadius: '50%', 
                                    bgcolor: 'primary.main',
                                    animation: 'pulse 2s infinite',
                                    '@keyframes pulse': {
                                        '0%': {
                                            transform: 'scale(0.95)',
                                            boxShadow: '0 0 0 0 rgba(227, 113, 39, 0.7)'
                                        },
                                        '70%': {
                                            transform: 'scale(1)',
                                            boxShadow: '0 0 0 6px rgba(227, 113, 39, 0)'
                                        },
                                        '100%': {
                                            transform: 'scale(0.95)',
                                            boxShadow: '0 0 0 0 rgba(227, 113, 39, 0)'
                                        }
                                    }
                                }} 
                            />
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Rating 
                                value={4.9} 
                                precision={0.1} 
                                readOnly 
                                size="small"
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: 'primary.main'
                                    }
                                }}
                            />
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ fontWeight: 600 }}
                            >
                                4.9
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default CoachCard; 
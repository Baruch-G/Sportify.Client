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
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
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
                    '&:hover': {
                        boxShadow: 6,
                    }
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${coach.username}`}
                            alt={coach.username}
                            sx={{ 
                                width: 64, 
                                height: 64, 
                                mr: 2,
                                border: '2px solid',
                                borderColor: 'primary.main'
                            }}
                        />
                        <Box>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                {coach.username}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                                <Chip
                                    icon={<StarIcon sx={{ fontSize: 16 }} />}
                                    label="4.9"
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />
                                <Chip
                                    icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                                    label="5 years"
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                />
                            </Stack>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Specializations
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {coach.sportsInterests?.slice(0, 3).map((sport, index) => (
                                <Chip
                                    key={index}
                                    label={sport.charAt(0).toUpperCase() + sport.slice(1)}
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

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                            {coach.city || 'Location not specified'}
                        </Typography>
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold' }}>
                            Book Now
                        </Typography>
                        <Rating value={4.9} precision={0.1} readOnly size="small" />
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default CoachCard; 
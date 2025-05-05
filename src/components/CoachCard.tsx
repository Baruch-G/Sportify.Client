import React from 'react';
import { Card, CardContent, Avatar, Box, Typography, Rating } from '@mui/material';
import { Event } from '../models/Event';
export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt: Date;
    age: number;
    wheight: number;
    gender: "male" | "female";
    addresse: string;
    city: string;
    height?: number;
    fitnessGoal?: string;
    activityLevel?: "low" | "moderate" | "high";
    sportsInterests?: string[]; // list of category ids
    events?: Event[]; // Virtual field for populated events
}

export interface Coach extends User { }

interface CoachCardProps {
    coach: Coach;
    onClick: () => void;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach, onClick }) => {
    return (
        <Box>
            <Card
                onClick={onClick}
                sx={{
                    height: '100%',
                    display: 'flex',
                    cursor: 'pointer',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.02)',
                    }
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${coach.username}`} // TODO: change to coach.imageUrl
                            alt={coach.username}
                            sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box>
                            <Typography variant="h6" component="div">
                                {coach.username}
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                {coach.category.name}
                            </Typography> */}
                            {/* {coach.specialization && (
                                <Typography variant="body2" color="text.secondary">
                                    {coach.specialization}
                                </Typography>
                            )} */}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {/* <Rating value={coach.rating} readOnly precision={0.5} size="small" /> */}
                        <Rating value={4} readOnly precision={0.5} size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            {/* 5 {coach.experience} years experience */}
                            5 years experience
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Football
                    </Typography>
                    {/* {coach.certifications.length > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Certified in: {coach.certifications.join(', ')}
                    </Typography>
                )} */}
                </CardContent>
            </Card>

        </Box>
    );
};

export default CoachCard; 
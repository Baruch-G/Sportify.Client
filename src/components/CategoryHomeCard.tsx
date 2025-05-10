import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { sportToIconMap } from '../data/sportsMap';

export interface SportKind {
    name: string;
    _id: string;
    imageURL: string;
    description: string;
}

interface CategoryHomeCardProps {
    sportKind: SportKind;
}

const CategoryHomeCard = (props: CategoryHomeCardProps) => {
    return (
        <Card
            elevation={0}
            className="category-card"
            sx={{
                // maxWidth: 345,
                border: 'none',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    '& .sport-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        filter: 'brightness(1.2)'
                    }
                }
            }}
        >
            <CardActionArea>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'orange',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        padding: 1,
                        zIndex: 1,
                        transition: 'all 0.3s ease'
                    }}
                    className="sport-icon"
                >
                    {sportToIconMap[props.sportKind.name.replace(' ', '-').toLowerCase() as keyof typeof sportToIconMap]}
                </Box>

                <CardMedia
                    component="img"
                    height="200"
                    image={"/HomeCards/" + props.sportKind.imageURL}
                    // image="/HomeCards//Football.webp"
                    alt={props.sportKind.name}
                    sx={{ 
                        borderRadius: '12px', 
                        filter: 'brightness(60%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            filter: 'brightness(70%)'
                        }
                    }}
                >
                </CardMedia>
                <CardContent>
                    <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div"
                        sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: 'primary.main'
                            }
                        }}
                    >
                        {props.sportKind.name}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            height: 100, 
                            color: 'text.secondary',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {props.sportKind.description}
                    </Typography>

                    {/* <Button color="primary">Explore</Button> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CategoryHomeCard;

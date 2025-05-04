import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import React from 'react';
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
            sx={{
                // maxWidth: 345,
                border: 'none',
                boxShadow: 'none',
                backgroundColor: 'transparent'
            }}
        >
            <CardActionArea>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '50%',
                        padding: 1,
                        zIndex: 1,
                    }}
                >
                    {sportToIconMap[props.sportKind.name.replace(' ', '-').toLowerCase() as keyof typeof sportToIconMap]}
                </Box>

                <CardMedia
                    component="img"
                    height="200"
                    image={"/HomeCards/" + props.sportKind.imageURL}
                    // image="/HomeCards//Football.webp"
                    alt={props.sportKind.name}
                    sx={{ borderRadius: '12px', filter: 'brightness(60%)' }} // <- Rounded corners just for image
                >
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.sportKind.name}
                    </Typography>
                    <Typography variant="body2" sx={{ height: 100, color: 'text.secondary' }}>
                        {props.sportKind.description}
                    </Typography>

                    {/* <Button color="primary">Explore</Button> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CategoryHomeCard;

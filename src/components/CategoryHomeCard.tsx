import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';
import React from 'react';

export interface SportKind {
    name: string;
    id: string;
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
                <CardMedia
                    component="img"
                    height="250"
                    image={"/HomeCards/" + props.sportKind.imageURL}
                    // image="/HomeCards//Football.webp"
                    alt={props.sportKind.name}
                    sx={{ borderRadius: '12px' }} // <- Rounded corners just for image
                />
                <CardContent sx={{ padding: 0, paddingTop: "16px" }}>
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

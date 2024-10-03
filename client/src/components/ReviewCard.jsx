import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ReviewCard = ({ image, reviewText, name, location, rating }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '20px' }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt="Customer review image"
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {reviewText}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {name} - {location}
                </Typography>
                <Typography variant="body2">
                    {'⭐'.repeat(rating)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;




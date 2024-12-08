// src/components/ReviewCard.jsx
import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Rating,
} from "@mui/material";

const ReviewCard = ({ review }) => {
    return (
        <Card sx={{ maxWidth: 345, m: 1 }}>
            <CardMedia
                component="img"
                height="140"
                image={review.image}
                alt={review.name}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {review.name}
                </Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                    {review.review}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;

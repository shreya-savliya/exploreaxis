import React from "react";
import {
  Box,
  Container,
} from "@mui/material";
import ReviewCard from "../components/ReviewCard"; // Import the ReviewCard component

const Home = () => {
  // Sample data for three reviews
  const reviews = [
    {
      image: '/img-1.jpg', // Path to image 1
      reviewText: '“A real sense of community, nurtured”',
      name: 'Olga',
      location: 'Weave Studios – Kai Tak',
      rating: 5,
    },
    {
      image: '/img-2.2.jpeg', // Path to image 2
      reviewText: '“A great experience overall!”',
      name: 'John',
      location: 'City Hall, Sydney',
      rating: 4,
    },
    {
      image: '/img-2.3.webp', // Path to image 3
      reviewText: '“Unforgettable moments and perfect service.”',
      name: 'Maria',
      location: 'Central Park, New York',
      rating: 5,
    },
  ];

  return (
    <Box>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          {/* Map through the reviews and render a ReviewCard for each */}
          {reviews.map((review, index) => (
            <ReviewCard
              key={index} // Use index as key; in a real application, use a unique id
              image={review.image}
              reviewText={review.reviewText}
              name={review.name}
              location={review.location}
              rating={review.rating}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;


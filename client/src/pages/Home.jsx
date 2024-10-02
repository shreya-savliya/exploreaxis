import React from "react";
import homeimg from "../assets/images/HomeImg.png";
import flightImg from "../assets/images/flight-home.png";
import hotelImg from "../assets/images/hotel-home.png";
import { Box, Container } from "@mui/material";
import FlightSearch from "../components/FlightSearch";

const Home = () => {
  return (
    <Box>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Box
          component="img"
          src={homeimg}
          alt="Home Page image which describe the website overview"
          sx={{
            width: "100%",
            height: { xs: "400px", sm: "100%" },
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "350px", sm: "70%" },
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "80%", md: "70%" },
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            zIndex: 9999,
          }}
        >
          <FlightSearch />
        </Box>
      </Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            height: { xs: "100%", sm: "559px", gap: "20px" },
          }}
        >
          <Box
            component="img"
            src={flightImg}
            alt="Home Page image which describe the website overview"
            sx={{
              width: "100%",
              height: { xs: "400px", sm: "100%" },
              objectFit: "cover",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          />{" "}
          <Box
            component="img"
            src={hotelImg}
            alt="Home Page image which describe the website overview"
            sx={{
              width: "100%",
              height: { xs: "400px", sm: "100%" },
              objectFit: "cover",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

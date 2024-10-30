import React from "react";
import homeimg from "../assets/images/HomeImg.png";
import flightImg from "../assets/images/flight-home.png";
import hotelImg from "../assets/images/hotel-home.png";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import FlightSearch from "../components/FlightSearch";
import SendIcon from "@mui/icons-material/Send";
import { colors } from "../styles/colors";
import { useNavigate } from "react-router-dom";
import { FlightDatas } from "../utils/FlightData";
import ReviewCard from "../components/ReviewCard";
import { reviews } from "../utils/ReviewData";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Box
          component="img"
          src={homeimg}
          alt="Home Page image which describe the website overview"
          sx={{
            width: "100%",
            height: { xs: "600px", md: "100%" },
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
        <Box sx={{ m: "50px 0 80px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "24px", md: "32px" },
                  fontWeight: 600,
                  mb: "14px",
                }}
              >
                Plan Your Trip
              </Typography>
              <Typography sx={{ fontSize: { xs: "12px", md: "16px" } }}>
                Search Flights & Places Hire to our most popular destinations
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "transparent", fontSize: "14px" }}
                onClick={() => {
                  navigate("/flights");
                }}
              >
                See More Flights
              </Button>
            </Box>
          </Box>
          <Box mt={3}>
            <Grid container spacing={2}>
              {FlightDatas.map((data) => (
                <Grid item xs={12} sm={6} md={3} key={data.id}>
                  <Card sx={{ maxWidth: 245, p: 1 }}>
                    <CardActionArea sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "6px",
                        }}
                        image={hotelImg}
                        alt="hotel image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="span" component="div">
                          {data.destination}
                        </Typography>
                        <Typography variant="span" sx={{ color: "text.secondary" }}>
                          {data.route}. ${data.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: { xs: "100%", sm: "559px" },
            gap: "20px",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={flightImg}
              alt="Flight image"
              sx={{
                width: "100%",
                height: { xs: "400px", sm: "100%" },
                objectFit: "cover",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: { xs: "350px", sm: "70%" },
                left: "50%",
                transform: "translate(-50%, -20%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "28px", md: "40px" },
                    fontWeight: "bold",
                    color: colors.basics.white,
                    textAlign: "center",
                  }}
                >
                  Show Flights
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    color: colors.basics.white,
                    textAlign: "center",
                    my: "16px",
                  }}
                >
                  Search Flights & Places Hire to our most popular destinations
                </Typography>
              </Box>
              <Button
                startIcon={<SendIcon />}
                variant="contained"
                sx={{ borderColor: colors.basics.primary }}
              >
                Show Flights
              </Button>
            </Box>
          </Box>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={hotelImg}
              alt="Hotel image"
              sx={{
                width: "100%",
                height: { xs: "400px", sm: "100%" },
                objectFit: "cover",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: { xs: "350px", sm: "70%" },
                left: "50%",
                transform: "translate(-50%, -20%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "28px", md: "40px" },
                    fontWeight: "bold",
                    color: colors.basics.white,
                    textAlign: "center",
                  }}
                >
                  Show Hotels
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    color: colors.basics.white,
                    textAlign: "center",
                    my: "16px",
                  }}
                >
                  Discover amazing hotels at popular destinations
                </Typography>
              </Box>
              <Button
                startIcon={<SendIcon />}
                variant="contained"
                sx={{ borderColor: colors.basics.primary }}
              >
                Show Hotels
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Customer Reviews Section */}
        <Box sx={{ mt: "50px", mb: "80px" }}>
          <Typography
            sx={{
              fontSize: { xs: "24px", md: "32px" },
              fontWeight: 600,
              mb: 2,
              textAlign: "center",
            }}
          >
            Customer Reviews
          </Typography>
          <Grid container spacing={2}>
            {reviews.map((review) => (
              <Grid item xs={12} sm={6} md={4} key={review.id}>
                <ReviewCard review={review} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

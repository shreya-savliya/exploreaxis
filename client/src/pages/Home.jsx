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
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import FlightSearch from "../components/FlightSearch";
import SendIcon from "@mui/icons-material/Send";
import { colors } from "../styles/colors";
import { useNavigate } from "react-router-dom";
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => {
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="span"
                            component="div"
                          >
                            Istanbul, Turkey
                          </Typography>
                          <Typography
                            variant="span"
                            sx={{ color: "text.secondary" }}
                          >
                            YYZ-ISN . $450
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}{" "}
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: { xs: "100%", sm: "559px", gap: "20px" },
          }}
        >
          <Box sx={{ position: "relative" }}>
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
              alt="Home Page image which describe the website overview"
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
                    fontSize: {
                      xs: "14px",
                      md: "16px",
                    },
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
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

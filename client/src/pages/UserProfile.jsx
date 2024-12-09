import React, { useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Tabs,
  Tab,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import ProfileCover from "../assets/images/Profile cover.png";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import { colors } from "../styles/colors";

const UserProfile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [travelTabIndex, setTravelTabIndex] = useState(0);
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  const handleFlightTabChange = (event, newIndex) => {
    setTravelTabIndex(newIndex);
  };

  return (
    <Container sx={{ mt: "80px" }}>
      <Box sx={{ width: "100%", bgcolor: "#fff" }}>
        {/* Cover Section */}
        <Box
          sx={{
            position: "relative",
            height: "200px",
            borderRadius: "5px",
            overflow: "hidden", // Ensures image fits within the box
          }}
        >
          {/* Background Image */}
          <img
            src={ProfileCover}
            alt="Profile Cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image covers the entire box
              zIndex: -1, // Keeps it in the background
            }}
          />

          {/* Upload Button */}
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              zIndex: 1,
              border: 0,
              borderColor: colors.basics.primary,
              padding: "8px 16px",
              color: "#112211",
              fontSize: "14px",
            }}
          >
            Upload New Cover
          </Button>
        </Box>

        {/* Profile Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mt: -8,
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100, border: "3px solid white" }}
            src="https://via.placeholder.com/100"
          />
          <Typography variant="h6" mt={1}>
            John Doe
          </Typography>
          <Typography variant="body2" color="text.secondary">
            john.doe@gmail.com
          </Typography>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ mt: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{
              background: colors.basics.primary,
              boxShadow: "0px 4px 16px 0px #1122110D",
            }}
          >
            <Tab label="Account" />
            <Tab label="Tickets/Bookings" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {tabIndex === 0 && (
          <Box p={3}>
            <Typography variant="h6">Account</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary="John Doe" />
                <Button variant="outlined">Change</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Email" secondary="john.doe@gmail.com" />
                <Button variant="outlined">Change</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Phone Number"
                  secondary="+1 000-000-0000"
                />
                <Button variant="outlined">Change</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary="32 Main Downtown, Los Angeles, California, USA"
                />
                <Button variant="outlined">Change</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Date of Birth" secondary="01-01-1992" />
                <Button variant="outlined">Change</Button>
              </ListItem>
            </List>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box p={3}>
            {/* Tabs Section */}
            <Tabs
              value={travelTabIndex}
              onChange={handleFlightTabChange}
              variant="fullWidth"
              sx={{
                background: "white",
                boxShadow: "0px 4px 16px 0px rgba(17, 34, 17, 0.05)",
                borderRadius: "12px",
                minHeight: "auto",
              }}
              TabIndicatorProps={{
                sx: {
                  backgroundColor: "#00A676",
                  height: "2px",
                  borderRadius: "4px",
                },
              }}
            >
              <Tab
                icon={<FlightIcon />}
                iconPosition="start"
                label="Flights"
                sx={{
                  minHeight: "auto",
                  padding: "8px 16px",
                  fontSize: "14px",
                  color: "#333333",
                  textTransform: "none",
                  fontWeight: travelTabIndex === 0 ? "bold" : "normal",
                }}
              />
              <Tab
                icon={<HotelIcon />}
                iconPosition="start"
                label="Stays"
                sx={{
                  minHeight: "auto",
                  padding: "8px 16px",
                  fontSize: "14px",
                  color: "#333333",
                  textTransform: "none",
                  fontWeight: travelTabIndex === 1 ? "bold" : "normal",
                }}
              />
            </Tabs>

            {/* Tab Content */}
            <Box>
              {travelTabIndex === 0 && (
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Newark (EWR) → Newark (EWR)"
                      secondary="12:00 pm - 6:00 pm"
                    />
                    <Button
                      variant="contained"
                      sx={{
                        borderColor: colors.basics.primary,
                        padding: "8px 16px",
                        color: "#112211",
                        fontSize: "14px",
                      }}
                    >
                      Download Ticket
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Newark (EWR) → Newark (EWR)"
                      secondary="12:00 pm - 6:00 pm"
                    />
                    <Button
                      variant="contained"
                      sx={{
                        borderColor: colors.basics.primary,
                        padding: "8px 16px",
                        color: "#112211",
                        fontSize: "14px",
                      }}
                    >
                      Download Ticket
                    </Button>
                  </ListItem>
                </List>
              )}
              {travelTabIndex === 1 && (
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Hotel Stay Details"
                      secondary="Check-in: 12:00 pm - Check-out: 10:00 am"
                    />
                    <Button
                      variant="contained"
                      sx={{
                        borderColor: colors.basics.primary,
                        padding: "8px 16px",
                        color: "#112211",
                        fontSize: "14px",
                      }}
                    >
                      Download Ticket
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Hotel Stay Details"
                      secondary="Check-in: 12:00 pm - Check-out: 10:00 am"
                    />
                    <Button
                      variant="contained"
                      sx={{
                        borderColor: colors.basics.primary,
                        padding: "8px 16px",
                        color: "#112211",
                        fontSize: "14px",
                      }}
                    >
                      Download Ticket
                    </Button>
                  </ListItem>
                </List>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;

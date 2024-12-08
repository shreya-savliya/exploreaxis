import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { colors } from "../styles/colors";
import logo from "../assets/images/logo-transparent.png";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: "12px 8px",
      }}
    >
      <Box
        sx={{
          backgroundColor: colors.basics.primary,
          borderRadius: "4px",
          padding: "24px 48px 8px 24px",
        }}
      >
        <Box
          component={"footer"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
            maxWidth: { xs: "100%", sm: "80%" },
            margin: "auto",
            width: "100%",
          }}
        >
          <Box>
            <Box
              component="img"
              src={logo}
              alt="Explore Axis Logo"
              sx={{ height: 50, cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </Box>

          <Box>
            <Box>
              <Typography
                component={"span"}
                sx={{
                  fontSize: "16px",
                  color: colors.basics.secondary,
                  fontWeight: "bold",
                }}
              >
                Our Destination
              </Typography>
            </Box>
            <List>
              {["Canada", "Dubai", "France"].map((item) => {
                return (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={item}
                      sx={{ color: colors.basics.secondary }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Box>
              <Typography
                component={"span"}
                sx={{
                  fontSize: "16px",
                  color: colors.basics.secondary,
                  fontWeight: "bold",
                }}
              >
                Help
              </Typography>
            </Box>
            <List>
              {["Terms Of Use", "Policy"].map((item) => {
                return (
                  <ListItem disablePadding>
                    <ListItemText
                      primary={item}
                      sx={{ color: colors.basics.secondary }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Box>
              <Typography
                component={"span"}
                sx={{
                  fontSize: "16px",
                  color: colors.basics.secondary,
                  fontWeight: "bold",
                }}
              >
                Contact Us
              </Typography>
            </Box>
            <List>
              <ListItem disablePadding>
                <ListItemIcon
                  sx={{
                    minWidth: "0px !important",
                    color: colors.basics.secondary,
                    pr: "5px",
                  }}
                >
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary="299 Doon Valley Dr, Kitchener, ON N2G 4M4"
                  sx={{ color: colors.basics.secondary }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon
                  sx={{
                    minWidth: "0px !important",
                    color: colors.basics.secondary,
                    pr: "5px",
                  }}
                >
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="support@exploreaxis.com"
                  sx={{ color: colors.basics.secondary }}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  ListItemIcon,
} from "@mui/material";
import logo from "../assets/images/logo-transparent.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { colors } from "../styles/colors";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";

const drawerWidth = 240;
const navItems = [
  {
    text: "Find Flight",
    icon: <FlightTakeoffIcon />,
    route: "/flights",
  },
  {
    text: "Find Stays",
    icon: <LocalHotelIcon />,
    route: "/",
  },
];

const Navbar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: "20px" }}>
      <Box
        sx={{ display: { xs: "flex" }, flexDirection: "column", gap: "10px" }}
      >
        <Button variant="text">Login</Button>
        <Button variant="contained">Signup</Button>
      </Box>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item?.route)}>
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText primary={item?.text} />{" "}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          p: "15px 30px",
          boxShadow: "none",
        }}
      >
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Box sx={{ display: "flex" }}>
            {navItems.map((item, index) => (
              <Button
                variant="text"
                startIcon={item?.icon}
                onClick={() => navigate(item.route)}
                sx={{ p: "10px", fontWeight: "600", fontSize: "14px" }}
              >
                {item?.text}
              </Button>
            ))}
          </Box>
        </Box>
        <Box
          component="img"
          src={logo}
          alt="Explore axis Logo"
          sx={{
            height: 50,
            cursor: "pointer",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
        <Box sx={{ display: { sm: "flex", xs: "none" }, gap: "20px" }}>
          <Button variant="text">Login</Button>
          <Button variant="contained">Signup</Button>
        </Box>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;

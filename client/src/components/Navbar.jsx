import React, { useEffect, useState } from "react";
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
  useScrollTrigger,
  Slide,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import logo from "../assets/images/logo-transparent.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import LoginRegisterDialog from "./LoginRegisterDialog";

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
    route: "/hotels",
  },
];

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

const Navbar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // Anchor for user menu
  const navigate = useNavigate();

  // Fetch user session data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/session`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };
    fetchUser();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: "20px" }}>
      <Box
        sx={{ display: { xs: "flex" }, flexDirection: "column", gap: "10px" }}
      >
        {!user ? (
          <>
            <Button variant="text" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="contained" onClick={() => navigate("/sign-up")}>
              Signup
            </Button>
          </>
        ) : (
          <Box>
            <Avatar src={user.image} alt={user.name} />
            <Typography>{user.name}</Typography>
          </Box>
        )}
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
      <HideOnScroll>
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
                  key={index}
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
            alt="Explore Axis Logo"
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
            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Button
                  variant="contained"
                  sx={{ borderColor: "#007BFF" }}
                  onClick={() => navigate("/sign-up")}
                >
                  Signup
                </Button>
              </>
            ) : (
              <Box>
                <Avatar
                  src={user.image}
                  alt={user.name}
                  sx={{ cursor: "pointer" }}
                  onClick={handleMenuOpen}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem>{user.name}</MenuItem>
                  <MenuItem>{user.email}</MenuItem>
                  <a href={`${process.env.REACT_APP_API_URL}/auth/signout`}>Logout</a>
                </Menu>
              </Box>
            )}
          </Box>
        </AppBar>
      </HideOnScroll>
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

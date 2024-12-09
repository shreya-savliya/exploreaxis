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
  Paper,
  Divider,
} from "@mui/material";
import logo from "../assets/images/logo-transparent.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import LoginRegisterDialog from "./LoginRegisterDialog";
import ContentCut from "@mui/icons-material/ContentCut";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { setLoggedinUser } from "../services/UserSlice";

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
  const dispatch = useDispatch();

  // Fetch user session data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/session`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          dispatch(setLoggedinUser(data.user)); // Dispatch user data to Redux
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserAuthenticated = (userData) => {
    setUser(userData);
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
            <Avatar>{user.name?.charAt(0).toUpperCase()}</Avatar>
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
                <LoginRegisterDialog
                  onUserAuthenticated={handleUserAuthenticated}
                />
              </>
            ) : (
              <Box>
                <Avatar sx={{ cursor: "pointer" }} onClick={handleMenuOpen}>
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/account");
                    }}
                  >
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>{" "}
                  <Divider />
                  <MenuItem
                    component="a"
                    href={`${process.env.REACT_APP_API_URL}/auth/signout`}
                    sx={{ p: 0 }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
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

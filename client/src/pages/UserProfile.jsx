import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import { colors } from "../styles/colors";
import { useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const [tabIndex, setTabIndex] = useState(0);
  const [travelTabIndex, setTravelTabIndex] = useState(0);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(
    user?.user?.image || "https://via.placeholder.com/100"
  );
  const [editableFields, setEditableFields] = useState({});
  const [fieldValues, setFieldValues] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phone: "",
    address: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState({ hotels: [], flights: [] });

  const handleTabChange = (event, newIndex) => setTabIndex(newIndex);
  const handleFlightTabChange = (event, newIndex) =>
    setTravelTabIndex(newIndex);

  useEffect(() => {
    // Fetch user data on initial load
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user-profile`,
          {
            email: user?.user?.email,
          }
        );
        if (response.data.user) {
          const { name, email, phone, address, dob, profileImage, coverImage } =
            response.data.user;
          setFieldValues({ name, email, phone, address, dob });
          setProfileImage(profileImage);
          setCoverImage(coverImage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user?.user?.email]);

  useEffect(() => {
    // Fetch orders data from API
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/orders`,
          { email: user?.user?.email }
        );
        console.log(response.data, "response data");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // const handleCoverUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setCoverImage(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleProfileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setProfileImage(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleCoverUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageBase64 = reader.result; // Get the Base64 image string
        setCoverImage(imageBase64); // Update the state for immediate UI change

        // Call the API to update the cover image
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/user-profile`,
            {
              email: user?.user?.email, // Pass the email to identify the user
              coverImage: imageBase64, // Pass the new cover image
            }
          );

          if (response.data.success) {
            console.log("Cover image updated successfully.");
          } else {
            console.error("Failed to update cover image.");
          }
        } catch (error) {
          console.error("Error updating cover image:", error);
        }
      };
      reader.readAsDataURL(file); // Read the file as a Base64 string
    }
  };

  const handleProfileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageBase64 = reader.result; // Get the Base64 image string
        setProfileImage(imageBase64); // Update the state for immediate UI change

        // Call the API to update the profile image
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/user-profile`,
            {
              email: user?.user?.email, // Pass the email to identify the user
              profileImage: imageBase64, // Pass the new profile image
            }
          );

          if (response.data.success) {
            console.log("Profile image updated successfully.");
          } else {
            console.error("Failed to update profile image.");
          }
        } catch (error) {
          console.error("Error updating profile image:", error);
        }
      };
      reader.readAsDataURL(file); // Read the file as a Base64 string
    }
  };

  const toggleEditableField = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateField = (field, value) => {
    let error = "";
    if (field === "name" && value.trim() === "") {
      error = "Name is required.";
    } else if (field === "phone" && !/^\d{10}$/.test(value)) {
      error = "Phone number must be 10 digits.";
    } else if (field === "dob" && new Date(value) > new Date()) {
      error = "Date of birth cannot be in the future.";
    }
    return error;
  };

  const handleFieldChange = (field, value) => {
    const error = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    setFieldValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSaveChanges = async (field) => {
    // Validate the field before saving
    const error = validateField(field, fieldValues[field]);
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
      return; // Prevent save if validation fails
    }

    try {
      const updatedData = {
        ...fieldValues,
        profileImage,
        coverImage,
      };

      // Make API call to save updated data
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user-profile`,
        {
          email: user?.user?.email, // Include email as a key
          ...updatedData,
        }
      );

      if (response.data.success) {
        console.log("User data updated:", response.data.user);
        // Clear any previous errors for this field
        setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
      }
      toggleEditableField(field); // Exit editing mode
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Failed to save changes. Please try again.",
      }));
    }
  };

  return (
    <Container sx={{ mt: "80px" }}>
      <Box sx={{ width: "100%", bgcolor: "#fff" }}>
        <Box
          sx={{
            position: "relative",
            height: "200px",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <img
            src={coverImage || "https://via.placeholder.com/1200x200"}
            alt="Profile Cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ position: "absolute", bottom: 10, right: 10, zIndex: 1 }}
          >
            Upload New Cover
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleCoverUpload}
            />
          </Button>
        </Box>

        {/* Profile Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mt: -8,
            position: "relative",
          }}
        >
          {/* Profile Image */}
          <Avatar
            sx={{ width: 100, height: 100, border: "3px solid white" }}
            src={profileImage}
          />

          {/* Edit Icon */}
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              top: 60,
              left: "52%",
              transform: "translateX(-50%)",
              bgcolor: "white",
              border: "1px solid #ccc",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <EditIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfileUpload}
            />
          </IconButton>

          <Typography variant="h6" mt={1}>
            {fieldValues.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fieldValues.email}
          </Typography>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ mt: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Account" />
            <Tab label="Tickets/Bookings" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {tabIndex === 0 && (
          <Box p={3}>
            <Typography variant="h6">Account</Typography>
            <List>
              {Object.keys(fieldValues).map((field) => (
                <React.Fragment key={field}>
                  <ListItem>
                    <ListItemText
                      primary={field[0].toUpperCase() + field.slice(1)}
                      secondary={
                        editableFields[field] && field !== "email" ? (
                          <TextField
                            type={field === "dob" ? "date" : "text"} // Set input type for dob
                            value={
                              field === "dob"
                                ? dayjs(fieldValues.dob).format("YYYY-MM-DD")
                                : fieldValues[field]
                            }
                            onChange={(e) =>
                              handleFieldChange(field, e.target.value)
                            }
                            size="small"
                            error={!!errors[field]} // Show error if validation fails
                            helperText={errors[field] || ""} // Display validation error message
                          />
                        ) : (
                          fieldValues[field]
                        )
                      }
                    />
                    {editableFields[field] && field !== "email" ? (
                      <IconButton onClick={() => handleSaveChanges(field)}>
                        <SaveIcon />
                      </IconButton>
                    ) : field !== "email" ? (
                      <IconButton
                        onClick={() => toggleEditableField(field)}
                        sx={{ border: `1px solid ${colors.basics.primary}` }}
                      >
                        <EditIcon sx={{ color: colors.basics.primary }} />
                      </IconButton>
                    ) : null}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
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
                  {orders.flights.length > 0 ? (
                    orders.flights.map((flight, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText
                            primary={`${flight.departureAirportCode} → ${flight.destinationAirportCode}`}
                            secondary={`${flight.departureTime} - ${flight.arrivalTime}`}
                          />
                          <Button
                            variant="contained"
                            sx={{
                              borderColor: "#00A676",
                              padding: "8px 16px",
                              color: "#112211",
                              fontSize: "14px",
                            }}
                          >
                            Download Ticket
                          </Button>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography
                      sx={{
                        textAlign: "center",
                        m: "25px 0 0",
                        fontWeight: 500,
                      }}
                    >
                      No booking found
                    </Typography>
                  )}
                </List>
              )}
              {travelTabIndex === 1 && (
                <List>
                  {orders.hotels.length > 0 ? (
                    orders.hotels.map((hotel, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText
                            primary={hotel.hotelName}
                            secondary={hotel.hotelLocated}
                          />
                          <Button
                            variant="contained"
                            sx={{
                              borderColor: "#00A676",
                              padding: "8px 16px",
                              color: "#112211",
                              fontSize: "14px",
                            }}
                          >
                            Download Ticket
                          </Button>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography
                      sx={{
                        textAlign: "center",
                        m: "25px 0 0",
                        fontWeight: 500,
                      }}
                    >
                      No booking found
                    </Typography>
                  )}
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

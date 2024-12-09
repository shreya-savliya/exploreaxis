import { Container, Tab, Tabs } from "@mui/material";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import HistoryBooking from "../components/HistoryBooking";

const Account = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Tabs value={value} onChange={handleChange} aria-label="account tabs">
        <Tab label="User Profile" component={Link} to="/account/profile" />
        <Tab
          label="History of Booking"
          component={Link}
          to="/account/history"
        />
      </Tabs>
      <Routes>
        <Route path="profile" element={<UserProfile />} />
        <Route path="history" element={<HistoryBooking />} />
      </Routes>
    </Container>
  );
};

export default Account;

import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

const FlightSortTabs = ({ onSortChange }) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Call the parent callback with the selected sort option
    if (newValue === 0) onSortChange("Cheapest");
    if (newValue === 1) onSortChange("Best");
    if (newValue === 2) onSortChange("Quickest");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ flexGrow: 1 }}
      >
        <Tab
          label={
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Cheapest
              </Typography>
              <Typography variant="body2" color="textSecondary">
                $99 · 2h 18m
              </Typography>
            </Box>
          }
          value={0}
        />
        <Tab
          label={
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Best
              </Typography>
              <Typography variant="body2" color="textSecondary">
                $99 · 2h 18m
              </Typography>
            </Box>
          }
          value={1}
        />
        <Tab
          label={
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Quickest
              </Typography>
              <Typography variant="body2" color="textSecondary">
                $99 · 2h 18m
              </Typography>
            </Box>
          }
          value={2}
        />
      </Tabs>
    </Box>
  );
};

export default FlightSortTabs;

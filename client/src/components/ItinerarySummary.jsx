import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

const ItinerarySummary = () => {
  const selectedFarePrice = useSelector(
    (state) => state.fare.selectedFarePrice
  );
  const numberOfAdults = useSelector((state) => state.fare.numberOfAdults);
  const selectedFarePriceInt = parseInt(selectedFarePrice, 10);
  const convenienceFee = 56;
  const gstPercentage = 13;
  const gstAmount =
    (selectedFarePriceInt * numberOfAdults * gstPercentage) / 100;
  const taxAmount = gstAmount + convenienceFee;
  const totalAmount = selectedFarePriceInt * numberOfAdults + taxAmount;
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff", // Set background color to white
        padding: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Itinerary Summary
      </Typography>

      {/* Base Fare Accordion */}
      <Accordion
        defaultExpanded
        disableGutters // Remove extra spacing on the sides
        elevation={0} // Remove box shadow
        sx={{ border: "none" }} // Remove border from Accordion
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="base-fare-content"
          id="base-fare-header"
          sx={{ padding: 0 }}
        >
          <Typography fontWeight="bold">Base Fare</Typography>
          <Box sx={{ ml: "auto" }}>
            <Typography>$ {selectedFarePriceInt * numberOfAdults}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "8px 0" }}>
          <Typography variant="body2" color="textSecondary">
            Adult(s) ({numberOfAdults} X $ {selectedFarePrice})
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Taxes and Surcharges Accordion */}
      <Accordion
        defaultExpanded
        disableGutters // Remove extra spacing on the sides
        elevation={0} // Remove box shadow
        sx={{ border: "none" }} // Remove border from Accordion
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="taxes-surcharges-content"
          id="taxes-surcharges-header"
          sx={{ padding: 0 }}
        >
          <Typography fontWeight="bold">Taxes </Typography>
          <Box sx={{ ml: "auto" }}>
            <Typography>$ {taxAmount?.toFixed(2)}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "8px 0" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              GST ({gstPercentage}%)
            </Typography>
            <Typography variant="body2" color="textSecondary">
              $ {gstAmount?.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              Convenience fee
            </Typography>
            <Typography variant="body2" color="textSecondary">
              $ {convenienceFee}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ mb: 2 }} />

      {/* Total Amount */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          $ {totalAmount?.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ItinerarySummary;

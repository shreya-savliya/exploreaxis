import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { colors } from "../styles/colors";
import { useDispatch } from "react-redux";
import { setSelectedFarePrice } from "../services/FarePrice";

const FareUpgradeSelection = ({ flightData }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (flightData?.travel_classes?.length > 0) {
      const initialValue = flightData.travel_classes[0].price.toString();
      setSelectedValue(initialValue);
      dispatch(setSelectedFarePrice(initialValue)); 
    }
  }, [flightData, dispatch]);
  // Handler for radio button change
  const handleSelectionChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    dispatch(setSelectedFarePrice(newValue));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Get more benefits by upgrading your fare
      </Typography>
      <RadioGroup value={selectedValue} onChange={handleSelectionChange}>
        {/* Grid for Cards */}
        <Grid container spacing={2}>
          {flightData?.travel_classes?.map((travelClass) => (
            <Grid item xs={12} sm={6} md={4} key={travelClass._id}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderColor:
                    selectedValue === travelClass.price.toString()
                      ? "primary.main"
                      : "grey.300",
                }}
              >
                <CardContent>
                  <FormControlLabel
                    value={travelClass.price.toString()}
                    control={<Radio color="primary" />}
                    label={
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {travelClass.class} $ {travelClass.price}
                      </Typography>
                    }
                  />
                  <Box marginLeft={4}>
                    {/* Refundable */}
                    <Box display="flex" alignItems="center" gap={1}>
                      {travelClass.refundable ? (
                        <CheckCircleIcon
                          sx={{ color: colors?.basics?.primary }}
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                      <Typography
                        variant="body2"
                        color={
                          travelClass.refundable
                            ? "textPrimary"
                            : "textSecondary"
                        }
                      >
                        {travelClass.refundable
                          ? "Refundable"
                          : "Non-refundable"}
                      </Typography>
                    </Box>

                    {/* Cancellation Fee */}
                    {travelClass.refundable && (
                      <Box display="flex" alignItems="center" gap={1}>
                        {travelClass.cancellation_fee > 0 ? (
                          <DoNotDisturbOnIcon
                            color="warning"
                            fontSize="small"
                          />
                        ) : (
                          <CheckCircleIcon
                            sx={{ color: colors?.basics?.primary }}
                            fontSize="small"
                          />
                        )}
                        <Typography
                          variant="body2"
                          color={
                            travelClass.cancellation_fee > 0
                              ? "textSecondary"
                              : "textPrimary"
                          }
                        >
                          {travelClass.cancellation_fee > 0
                            ? `Cancellation fee starts at $ ${travelClass.cancellation_fee}`
                            : "Free cancellation"}
                        </Typography>
                      </Box>
                    )}

                    {/* Date Change Fee */}
                    <Box display="flex" alignItems="center" gap={1}>
                      {travelClass.change_fee > 0 ? (
                        <DoNotDisturbOnIcon color="warning" fontSize="small" />
                      ) : (
                        <CheckCircleIcon
                          sx={{ color: colors?.basics?.primary }}
                          fontSize="small"
                        />
                      )}
                      <Typography
                        variant="body2"
                        color={
                          travelClass.change_fee > 0
                            ? "textSecondary"
                            : "textPrimary"
                        }
                      >
                        {travelClass.change_fee > 0
                          ? `Date change fee starts at $ ${travelClass.change_fee}`
                          : "Free date change"}
                      </Typography>
                    </Box>

                    {/* Checked Bags */}
                    <Box display="flex" alignItems="center" gap={1}>
                      {travelClass.checked_bags > 0 ? (
                        <CheckCircleIcon
                          sx={{ color: colors?.basics?.primary }}
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                      <Typography
                        variant="body2"
                        color={
                          travelClass.checked_bags > 0
                            ? "textPrimary"
                            : "textSecondary"
                        }
                      >
                        {travelClass.checked_bags > 0
                          ? `${travelClass.checked_bags} piece${
                              travelClass.checked_bags > 1 ? "s" : ""
                            } checked-in baggage`
                          : "No checked-in baggage"}
                      </Typography>
                    </Box>

                    {/* Carry-on Baggage */}
                    <Box display="flex" alignItems="center" gap={1}>
                      {travelClass.carry_on_includes ? (
                        <CheckCircleIcon
                          sx={{ color: colors?.basics?.primary }}
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                      <Typography
                        variant="body2"
                        color={
                          travelClass.carry_on_includes
                            ? "textPrimary"
                            : "textSecondary"
                        }
                      >
                        {travelClass.carry_on_includes
                          ? "7kg carry-on baggage"
                          : "No carry-on baggage"}
                      </Typography>
                    </Box>

                    {/* Seat Choice */}
                    <Box display="flex" alignItems="center" gap={1}>
                      {travelClass.seat_choice ? (
                        <CheckCircleIcon
                          sx={{ color: colors?.basics?.primary }}
                          fontSize="small"
                        />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                      <Typography
                        variant="body2"
                        color={
                          travelClass.seat_choice
                            ? "textPrimary"
                            : "textSecondary"
                        }
                      >
                        {travelClass.seat_choice
                          ? "Seat choice available"
                          : "No seat choice"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Box>
  );
};

export default FareUpgradeSelection;

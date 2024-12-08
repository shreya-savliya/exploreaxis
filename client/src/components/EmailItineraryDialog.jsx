import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import { colors } from "../styles/colors";
import axios from "axios";
const EmailItinerarySuccessfully = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { backgroundColor: "white" }, 
      }}
    >
      <DialogContent sx={{ textAlign: "center", padding: "2em" }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: colors.basics.primary }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Email sent successfully
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

const EmailItineraryDialog = ({ open, handleClose }) => {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const sendItineraryEmail = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/send-itinerary`,
        {
          email: email,
          itinerary: "hello here is my first itinerary from Exploreaxis",
        }
      );
      setSuccessDialogOpen(true); // Open success dialog
      handleClose();
    } catch (error) {
      console.error("Error sending itinerary email:", error);
      alert("Failed to send itinerary");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            sendItineraryEmail(email);
          },
          style: { backgroundColor: "white" },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To email your itinerary, please enter your email address here. We
            will send your itineray.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ borderColor: colors.basics.primary }}
          >
            Cancel
          </Button>
          <Button type="submit" sx={{ borderColor: colors.basics.primary }}>
            Email Itinerary
          </Button>
        </DialogActions>
      </Dialog>
      <EmailItinerarySuccessfully
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      />
    </>
  );
};

export default EmailItineraryDialog;

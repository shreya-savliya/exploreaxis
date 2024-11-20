import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Tab,
  Tabs,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function LoginRegisterDialog() {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      {/* Button to Open Dialog */}
      <Button variant="contained" onClick={handleClickOpen}>
        Login / Register
      </Button>

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
          <DialogTitle>Sign up to get</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabs to Switch Between Personal and MyBiz Accounts */}
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="PERSONAL ACCOUNT" />
          <Tab label="MYBIZ ACCOUNT" />
        </Tabs>

        {/* Dialog Content */}
        <DialogContent>
          <TextField
            label="Enter Mobile Number"
            type="tel"
            fullWidth
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            InputProps={{
              startAdornment: <span style={{ marginRight: 8 }}>🇨🇦 +1</span>,
            }}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            disabled={!mobileNumber}
          >
            Continue
          </Button>

          {/* Alternative Login Methods */}
          <Box textAlign="center" mt={2}>
            <div>Or Login/Signup With</div>
            <Box mt={1}>
              <Button
                variant="outlined"
                startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" style={{ height: 20 }} />}
                sx={{ marginRight: 1 }}
              >
                Google
              </Button>
              <Button variant="outlined" startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mailbox_icon.svg/640px-Mailbox_icon.svg.png" alt="Mail" style={{ height: 20 }} />}>
                Email
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LoginRegisterDialog;

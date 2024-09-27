import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { lightTheme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box>Hello</Box>
    </ThemeProvider>
  )
}

export default App;

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RequestPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TransactionApp
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Select an Option
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
          {/* Card Details Button */}
          <Grid item>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#50e3c2',
                '&:hover': { backgroundColor: '#3cb591' },
              }}
              onClick={() => navigate('/card-details')}
            >
              Card Details
            </Button>
          </Grid>

          {/* Banking Details Button */}
          <Grid item>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#50e3c2',
                '&:hover': { backgroundColor: '#3cb591' },
              }}
              onClick={() => navigate('/bank-details')}
            >
              Banking Details
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RequestPage;

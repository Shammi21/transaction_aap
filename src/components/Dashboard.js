import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication status from localStorage
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleRequest = () => {
    navigate('/request');
  };

  const handleFileUpload = () => {
    navigate('/upload-receipts');
  };

  const handleTransactions = () => {
    navigate('/transactions');
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TransactionApp
          </Typography>
          <Button color="inherit" onClick={handleTransactions}>
            Transactions
          </Button>
          <Button color="inherit" onClick={handleRequest}>
            New Request
          </Button>
          <Button color="inherit" onClick={handleFileUpload}>
            Upload Receipt
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to your Dashboard!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Click on "Transactions" to view your transaction history, "New Request" to make a request, or "Upload Receipt" to upload a transaction receipt.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;

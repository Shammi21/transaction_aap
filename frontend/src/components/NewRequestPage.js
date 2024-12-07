import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RequestPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic
    console.log('Amount:', amount);
    console.log('Transaction Type:', transactionType);
    alert(`Request submitted! Amount: $${amount}, Type: ${transactionType}`);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nova Transfer
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Submit a Request
        </Typography>

        {/* Form */}
        <Box
          component="form"
          sx={{ mt: 4 }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Grid container spacing={3}>
            {/* Amount Input */}
            <Grid item xs={12}>
              <TextField
                label="Amount in USD"
                variant="outlined"
                fullWidth
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Grid>

            {/* Transaction Type Dropdown */}
            <Grid item xs={12}>
              <TextField
                select
                label="Transaction Type"
                variant="outlined"
                fullWidth
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                required
              >
                <MenuItem value="Deposit">Deposit</MenuItem>
                <MenuItem value="Withdrawal">Withdrawal</MenuItem>
              </TextField>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: '#50e3c2',
                  '&:hover': { backgroundColor: '#3cb591' },
                }}
              >
                Submit Request
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default RequestPage;

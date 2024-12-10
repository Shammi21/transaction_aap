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
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequestPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('Card');
  const [requestHistory, setRequestHistory] = useState([]);
  const [token, setToken] = useState("");

  const fetchToken = async () => {
    const loginUrl = "https://nova.terrapayz.com/api/auth/login";

    try {
      console.log("Attempting to fetch token...");

      const response = await axios.post(loginUrl, {
        username: "admin",
        password: "admin",
      });

      console.log("Token response:", response.data);

      if (response.data && response.data.access_token) {
        const fetchedToken = response.data.access_token;
        setToken(fetchedToken);

        // Optionally, store the token in localStorage
        localStorage.setItem("authToken", fetchedToken);

        return fetchedToken;
      } else {
        console.error("Access token not found in response:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching token:", error.response?.data || error.message);
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      // Ensure token is fetched
      let currentToken = token || (await fetchToken());
  
      // Validate required fields
      if (!amount || !transactionType) {
        alert("Please fill out all fields.");
        return;
      }
  
      // Prepare the new request
      const newRequest = {
        id: requestHistory.length + 1,
        amount: `$${amount}`,
        transactionType,
        date: new Date().toLocaleString(),
      };
  
      // Optimistically update UI
      setRequestHistory((prev) => [newRequest, ...prev]);
  
      // Log request details
      console.log("Request Details:", amount, transactionType);
  
      // Make API request
      const response = await axios.post(
        "https://nova.terrapayz.com/api/transactions/create_new_request",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
          data: {
            amount,
            transaction_type: transactionType,
          },
        }
      );
  
      // Handle API response
      if (response?.data) {
        console.log("API Response:", response.data);
        // Clear fields only after a successful response
        setAmount("");
        setTransactionType("Card");
        // Optionally handle snackbar or success messages
        // setSnakBar({ text: "Transaction created successfully", status: "success" });
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error(
        "Transaction creation failed:",
        error.response?.data || error.message
      );
      // Optionally handle error messages
      // setSnakBar({ text: "Transaction creation failed", status: "error" });
    }
  };
  

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#eef2f7' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Nova Bank
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Submit a Request
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(to bottom right, #ffffff, #f7f9fc)',
          }}
        >
          {/* Form */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Grid container spacing={4}>
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fdfdfd',
                      borderRadius: 2,
                    },
                  }}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fdfdfd',
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem value="Card">Card Details</MenuItem>
                  <MenuItem value="Bank">Bank Details</MenuItem>
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
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    '&:hover': { backgroundColor: '#3cb591' },
                  }}
                  onClick={handleSubmit}
                >
                  Submit Request
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Request History */}
        {requestHistory.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Request History
            </Typography>
            <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
              {requestHistory.map((request) => (
                <Card
                  key={request.id}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent>
                    <ListItem>
                      <ListItemText
                        primary={`Request ID: ${request.id}`}
                        secondary={`Date: ${request.date}`}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary={`Amount: ${request.amount}`}
                        secondary={`Transaction Type: ${request.transactionType}`}
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RequestPage;

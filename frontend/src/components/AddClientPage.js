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

const AdminClientPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    transactionFee: "",
    walletAddress: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nova Transfer
          </Typography>
          <Button color="inherit" onClick={() => navigate('/admin-dashboard')}>
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
        {/* Username Input */}
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Password Input */}
        <Grid item xs={12}>
          <TextField
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Name Input */}
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Transaction Fee Input */}
        <Grid item xs={12}>
          <TextField
            label="Transaction Fee"
            name="transactionFee"
            variant="outlined"
            fullWidth
            type="number"
            value={formData.transactionFee}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Wallet Address Input */}
        <Grid item xs={12}>
          <TextField
            label="Wallet Address"
            name="walletAddress"
            variant="outlined"
            fullWidth
            value={formData.walletAddress}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Type Dropdown */}
        <Grid item xs={12}>
          <TextField
            select
            label="Type"
            name="type"
            variant="outlined"
            fullWidth
            value={formData.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Client">Client</MenuItem>
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
              backgroundColor: "#50e3c2",
              "&:hover": { backgroundColor: "#3cb591" },
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

export default AdminClientPage;

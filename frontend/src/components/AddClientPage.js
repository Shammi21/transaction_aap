import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminClientPage = ({open, onClose}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    fee_percentage: "",
    wallet_address: "",
    type: "",
  });

  const handleClose = () => {
    onClose()
  }

  const [token, setToken] = useState("");

  // Function to fetch token dynamically (mock implementation)
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



  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const apiUrl = "https://nova.terrapayz.com/api/admin/users/";

    // Ensure token is available before making the API call
    let currentToken = token || (await fetchToken());

    if (!currentToken) {
      console.error("Token not available. Cannot proceed.");
      return;
    }

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      });

      console.log("Client created successfully:", response.data);

      // Navigate to a success or admin dashboard page if needed
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error creating client:", error.response?.data || error.message);
    }
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add client</DialogTitle>
    <Box sx={{ flexGrow: 1, minHeight: "100vh", backgroundColor: "#f7f9fc" }}>

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

            {/* Email Input */}
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                value={formData.email}
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

            {/* Fee Percentage Input */}
            <Grid item xs={12}>
              <TextField
                label="Fee Percentage"
                name="fee_percentage"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.fee_percentage}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Wallet Address Input */}
            <Grid item xs={12}>
              <TextField
                label="Wallet Address"
                name="wallet_address"
                variant="outlined"
                fullWidth
                value={formData.wallet_address}
                onChange={handleChange}
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
    </Dialog>
  );
};

export default AdminClientPage;

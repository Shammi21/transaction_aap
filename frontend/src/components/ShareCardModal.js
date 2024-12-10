import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: 24,
  width: '400px',
};

const ShareCardModal = ({ open, onClose, user }) => {
  // State to store all form details in a single object
  const [formData, setFormData] = useState({
    accountNumber: '',
    bankName: '',
    routingNumber: '',
    accountOwner: ''
  });

  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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


  // Handle form submission and API call
  const handleSubmit = async () => {
    let currentToken = token || (await fetchToken());

    if (!currentToken) {
        console.error("Token not available. Cannot proceed.");
        return;
      }

    try {
      // Make API request (replace the URL with your actual API endpoint)
      const response = await axios.post('https://your-api-endpoint.com/share-card', formData, {
        headers: {
          'Content-Type': 'application/json', // Adjust headers as needed
          Authorization: `Bearer ${currentToken}`,
        },
      });

      onClose();
    } catch (error) {
      console.error('Error submitting data:', error.response?.data || error.message);
      // Handle error if needed
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Share Card Details
          </Typography>
          <TextField
            fullWidth
            label="Account Number"
            variant="outlined"
            margin="normal"
            name="accountNumber"  // Match the name with the state property
            value={formData.accountNumber}  // Bind state to the input value
            onChange={handleChange}  // Handle input change
          />
          <TextField
            fullWidth
            label="Bank Name"
            variant="outlined"
            margin="normal"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Routing Number"
            variant="outlined"
            margin="normal"
            name="routingNumber"
            value={formData.routingNumber}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Account Owner Name"
            variant="outlined"
            margin="normal"
            name="accountOwner"
            value={formData.accountOwner}
            onChange={handleChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Share
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ShareCardModal;

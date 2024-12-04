import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Typography, Card, CardContent, Button, Container } from '@mui/material';

const CardDetailsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/request'); // Redirect to the Request Page
  };

  const cardDetails = {
    cardHolder: 'John Doe',
    cardNumber: '1234 5678 9012 3456',
    expiryDate: '12/28',
    cvv: '123',
    cardType: 'Visa',
  };

  return (
    <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
         Card Details
      </Typography>

      <Card
        sx={{
          background: 'linear-gradient(45deg, #4a90e2, #50e3c2)',
          color: 'white',
          width: 400,
          borderRadius: 2,
          boxShadow: 3,
          mb: 4,
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {cardDetails.cardType}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {cardDetails.cardNumber}
          </Typography>
          <Typography variant="body1">Card Holder: {cardDetails.cardHolder}</Typography>
          <Typography variant="body1">Expiry: {cardDetails.expiryDate}</Typography>
          <Typography variant="body1">CVV: {cardDetails.cvv}</Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="error"
        onClick={handleBack}
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
        }}
      >
        Back
      </Button>
    </Container>
  );
};

export default CardDetailsPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, Button, Container, Grid } from '@mui/material';

const BankDetailsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/request'); // Redirect to the Request Page
  };

  const bankDetails = {
    bankName: 'National Bank of Example',
    accountHolder: 'John Doe',
    accountNumber: '9876543210',
    ifscCode: 'NBEX0001234',
    branch: 'Downtown Branch',
  };

  return (
    <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Generic Bank Details
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
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Bank Name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{bankDetails.bankName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Account Holder:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{bankDetails.accountHolder}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Account Number:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{bankDetails.accountNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Routing Number:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{bankDetails.ifscCode}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Branch:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{bankDetails.branch}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="error"
        onClick={handleBack}
        sx={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Back
      </Button>
    </Container>
  );
};

export default BankDetailsPage;

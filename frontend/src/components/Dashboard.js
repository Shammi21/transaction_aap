import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Paper, Container, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const sampleData = [
    { name: 'Jan', transactions: 10 },
    { name: 'Feb', transactions: 20 },
    { name: 'Mar', transactions: 15 },
    { name: 'Apr', transactions: 25 },
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nova Transfer
          </Typography>
          <Button color="inherit" onClick={() => navigate('/transactions')}>
            Transactions
          </Button>
          <Button color="inherit" onClick={() => navigate('/request')}>
            New Request
          </Button>
          <Button color="inherit" onClick={() => navigate('/upload-receipts')}>
            Upload Receipt
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Welcome Card */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Welcome, John Doe!
              </Typography>
              <Typography variant="body1">
                Here's a quick overview of your recent activity and performance.
              </Typography>
            </Paper>
          </Grid>

          {/* Statistics and Graphs */}
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Transaction Trends
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={sampleData}>
                    <Line type="monotone" dataKey="transactions" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">Quick Actions</Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/transactions')}
                >
                  View Transactions
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/request')}
                >
                  New Request
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/upload-receipts')}
                >
                  Upload Receipt
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;

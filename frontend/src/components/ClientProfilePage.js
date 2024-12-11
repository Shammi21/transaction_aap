import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  ButtonGroup,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ClientProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the client from the passed state
  const client = location.state?.client;

  // Ensure hooks are called unconditionally
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!client) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          No client data available. Please navigate back and select a client.
        </Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  const tabContent = [
    { label: "Transactions", content: <div>List of all transactions for {client.name}</div> },
    { label: "Requests", content: <div>List of all requests for {client.name}</div> },
    { label: "Uploaded Receipts", content: <div>All uploaded receipts by {client.name}</div> },
    { label: "Failed Transactions", content: <div>Failed transactions of {client.name}</div> },
    { label: "Support Tickets", content: <div>Support tickets raised by {client.name}</div> },
  ];

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#4a90e2" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            {client.name}'s Profile
          </Typography>
          <ButtonGroup>
            <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <Card sx={{ mt: 2, mx: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {client.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Username: {client.username}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: {client.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Fee Percentage: {client.fee_percentage}%
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Wallet Address: {client.wallet_address}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, mx: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          {tabContent.map((tab, index) => (
            <Tab label={tab.label} key={index} />
          ))}
        </Tabs>
        <Box sx={{ mt: 2 }}>{tabContent[activeTab].content}</Box>
      </Box>
    </Box>
  );
};

export default ClientProfilePage;

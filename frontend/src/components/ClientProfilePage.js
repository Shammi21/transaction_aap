import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  useTheme,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClientTransactionHistory from "./ClientTransactionHistory";
import ClientFailTransactionHistory from "./ClientFailTransactionHistory";
import ClientRequest from "./ClientRequest";

// Styled button for active state
const StyledButton = styled(Button)(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.primary.dark : theme.palette.primary.light,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : theme.palette.primary.dark,
  },
  transition: 'background-color 0.3s ease, transform 0.2s',
  transform: active ? 'scale(1.05)' : 'scale(1)',
}));

const ClientProfilePage = ({ client }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeSection, setActiveSection] = React.useState("Transactions");
  const [openTransactionDialog, setOpenTransactionDialog] = React.useState(false);
  const [openFailedTransactionDialog, setOpenFailedTransactionDialog] = React.useState(false);
  const [openRequestDialog, setOpenRequestDialog] = React.useState(false);

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

  const sections = [
    { label: "Transactions" },
    { label: "Requests" },
    { label: "Uploaded Receipts", content: <div>All uploaded receipts by {client.name}</div> },
    { label: "Failed Transactions" },
    { label: "Support Tickets", content: <div>Support tickets raised by {client.name}</div> },
  ];

  const handleOpenTransactionDialog = () => {
    setOpenTransactionDialog(true);
  };

  const handleCloseTransactionDialog = () => {
    setOpenTransactionDialog(false);
  };

  const handleOpenFailedTransactionDialog = () => {
    setOpenFailedTransactionDialog(true);
  };

  const handleCloseFailedTransactionDialog = () => {
    setOpenFailedTransactionDialog(false);
  };

  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  return (
    <Box>
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
            Password: {client.password}
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
        <ButtonGroup variant="text" color="primary" sx={{ display: 'flex', gap: 2 }}>
          {sections.map((section) => (
            <StyledButton
              key={section.label}
              active={activeSection === section.label ? true : false}
              onClick={() => {
                setActiveSection(section.label);
                if (section.label === "Transactions") {
                  handleOpenTransactionDialog();
                }
                if (section.label === "Failed Transactions") {
                  handleOpenFailedTransactionDialog();
                }
                if (section.label === "Requests") {
                  handleOpenRequestDialog();
                }
              }}
            >
              {section.label}
            </StyledButton>
          ))}
        </ButtonGroup>

        <Box sx={{ mt: 2 }}>
          {sections.find((section) => section.label === activeSection)?.content}
        </Box>
      </Box>

      {/* Transaction History Dialog */}
      <ClientTransactionHistory
        client={client}
        open={openTransactionDialog}
        onClose={handleCloseTransactionDialog}
      />

      {/* Failed Transaction History Dialog */}
      <ClientFailTransactionHistory
        client={client}
        open={openFailedTransactionDialog}
        onClose={handleCloseFailedTransactionDialog}
      />

      {/* Requests Dialog */}
      <ClientRequest
        client={client}
        open={openRequestDialog}
        onClose={handleCloseRequestDialog}
      />
    </Box>
  );
};

export default ClientProfilePage;
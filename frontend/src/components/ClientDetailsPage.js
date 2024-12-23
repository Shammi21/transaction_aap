import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Snackbar,
  Alert,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  ButtonGroup,
  InputAdornment,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Search, Refresh, Edit } from "@mui/icons-material";
import AddClientPage from "./AddClientPage";
import ClientProfilePage from "./ClientProfilePage"; // Import the profile page

const ClientDetailsPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddClientOpen, setAddClientOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [updatedFee, setUpdatedFee] = useState("");
  const [selectedClient, setSelectedClient] = useState(null); // For modal

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleBack = () => {
    navigate('/admin-dashboard'); // Redirect back to the Dashboard
  };

  const clientData = [
    {
      username: "user1",
      email: "user1@example.com",
      name: "John Doe",
      password: "password123",
      fee_percentage: 5,
      wallet_address: "0x1234567890abcdef",
      type: "Client",
    },
    {
      username: "user2",
      email: "user2@example.com",
      name: "Jane Smith",
      password: "password456",
      fee_percentage: 10,
      wallet_address: "0xabcdef1234567890",
      type: "Client",
    },
  ];

  const [clients, setClients] = useState(clientData);

  const filteredClients = clients.filter(
    (client) =>
      client.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientClick = (client) => {
    setSelectedClient(client); // Open modal with the selected client
  };

  return (
    <Box>
      {isAddClientOpen && (
        <AddClientPage open={isAddClientOpen} onClose={() => setAddClientOpen(false)} />
      )}

      <AppBar position="static" sx={{ backgroundColor: "#4a90e2" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Client Management
          </Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "capitalize", mr: 1 }}
              onClick={handleBack}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "capitalize" }}
              onClick={() => setAddClientOpen(true)}
            >
              Add Client
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <Card sx={{ mt: 2, mx: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Client Details
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Refresh">
                <IconButton
                  color="primary"
                  onClick={() =>
                    setSnackbar({
                      open: true,
                      message: "Client details refreshed!",
                      severity: "info",
                    })
                  }
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
              <TextField
                placeholder="Search by Username, Email, or Name"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Fee Percentage</TableCell>
                  <TableCell>Wallet Address</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((client, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleClientClick(client)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.username}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.password}</TableCell>
                      <TableCell>{client.fee_percentage}%</TableCell>
                      <TableCell>{client.wallet_address}</TableCell>
                      <TableCell>{client.type}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredClients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Client Profile Modal */}
      {selectedClient && (
        <Dialog
          open={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            <Typography variant="h6">{selectedClient.name}'s Profile</Typography>
          </DialogTitle>
          <DialogContent>
            <ClientProfilePage client={selectedClient} />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default ClientDetailsPage;

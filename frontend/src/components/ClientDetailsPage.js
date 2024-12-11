import React, { useState } from "react";
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
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AdminClientPage from "./AddClientPage";

const ClientDetailsPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddClientOpen, setAddClientOpen] = useState(false);

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

  const clientData = [
    {
      username: "user1",
      email: "user1@example.com",
      name: "John Doe",
      fee_percentage: 5,
      wallet_address: "0x1234567890abcdef",
      type: "Client",
    },
    {
      username: "user2",
      email: "user2@example.com",
      name: "Jane Smith",
      fee_percentage: 10,
      wallet_address: "0xabcdef1234567890",
      type: "Client",
    },
    // Add more clients as needed
  ];

  const filteredClients = clientData.filter(
    (client) =>
      client.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {isAddClientOpen && (
        <AdminClientPage open={isAddClientOpen} onClose={() => setAddClientOpen(false)} />
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
              onClick={() => navigate("/admin-dashboard")}
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
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
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
                      sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                    >
                      <TableCell>{client.username}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.name}</TableCell>
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
    </Box>
  );
};

export default ClientDetailsPage;

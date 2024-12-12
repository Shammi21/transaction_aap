import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TablePagination,
} from "@mui/material";

const ClientRequest = ({ client, open, onClose }) => {
  const dummyRequests = [
    { id: 1, amount: 100, paymentType: "Card", username: "user1", actions: "Approve" },
    { id: 2, amount: 200, paymentType: "Bank", username: "user2", actions: "Reject" },
    { id: 3, amount: 150, paymentType: "Card", username: "user3", actions: "Approve" },
    { id: 4, amount: 300, paymentType: "Bank", username: "user4", actions: "Pending" },
    { id: 5, amount: 250, paymentType: "Card", username: "user5", actions: "Approve" },
  ];

  const requests = client?.requests || dummyRequests;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Requests for {client?.name || "Client"}</DialogTitle>
      <DialogContent>
        {requests.length > 0 ? (
          <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Type</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.amount}</TableCell>
                        <TableCell>{request.paymentType}</TableCell>
                        <TableCell>{request.username}</TableCell>
                        <TableCell>{request.actions}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={requests.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography variant="h6" color="textSecondary">
            No requests available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientRequest;

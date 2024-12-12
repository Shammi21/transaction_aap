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

const ClientTransactionHistory = ({ client, open, onClose }) => {
  const dummyData = [
    { id: 1, date: "2024-12-01", time: "10:00 AM", paymentType: "Card", status: "Completed" },
    { id: 2, date: "2024-12-02", time: "2:30 PM", paymentType: "Bank", status: "Completed" },
    { id: 3, date: "2024-12-03", time: "6:45 PM", paymentType: "Card", status: "Completed" },
    { id: 4, date: "2024-12-04", time: "11:15 AM", paymentType: "Bank", status: "Completed" },
    { id: 5, date: "2024-12-05", time: "9:00 AM", paymentType: "Card", status: "Completed" },
    { id: 6, date: "2024-12-06", time: "3:30 PM", paymentType: "Bank", status: "Completed" },
    { id: 7, date: "2024-12-07", time: "4:15 PM", paymentType: "Card", status: "Completed" },
  ];

  const transactions = client?.transactions || dummyData;

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
      <DialogTitle>Transaction History for {client?.name || "Client"}</DialogTitle>
      <DialogContent>
        {transactions.length > 0 ? (
          <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Payment Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{client?.username || "Guest"}</TableCell>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{`${transaction.date} ${transaction.time}`}</TableCell>
                        <TableCell>{transaction.paymentType}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={transactions.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography variant="h6" color="textSecondary">
            No transactions available.
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

export default ClientTransactionHistory;

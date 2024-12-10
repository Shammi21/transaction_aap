import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import ShareCardModal from './ShareCardModal';

const AdminRequestPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample data for requests
  const requests = [
    { amount: 250.0, transaction_type: "Card", user_name: "Sandy" },
    { amount: 150.0, transaction_type: "Bank", user_name: "John" },
    { amount: 350.0, transaction_type: "Card", user_name: "Abram" },
  ];

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open modal
  const handleOpenModal = (userName) => {
    setSelectedUser(userName);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f7f9fc', padding: '30px 0' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          All Requests
        </Typography>

        {/* Transactions Table */}
        <TableContainer component={Paper}>
          <Table aria-label="Transactions Table">
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.amount}</TableCell>
                    <TableCell>{request.transaction_type}</TableCell>
                    <TableCell>{request.user_name}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenModal(request.user_name)}
                      >
                        Share Card Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>

      {/* Modal */}
      <ShareCardModal
        open={modalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: 24,
  width: '300px',
  textAlign: 'center',
};

export default AdminRequestPage;

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
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

const ViewClientReceipts = ({ client, open, onClose }) => {
  // Dummy data for uploaded receipts
  const dummyReceipts = [
    {
      id: 1,
      username: "john_doe",
      transactionId: "TRX001",
      dateTime: "2023-06-15 14:30:45",
      paymentType: "Card",
      amount: 250.50,
      imageUrl: "https://example.com/receipt1.jpg"
    },
    {
      id: 2,
      username: "jane_smith",
      transactionId: "TRX002",
      dateTime: "2023-06-16 10:15:20",
      paymentType: "Bank Transfer",
      amount: 450.75,
      imageUrl: "https://example.com/receipt2.jpg"
    },
    {
      id: 3,
      username: "mike_johnson",
      transactionId: "TRX003",
      dateTime: "2023-06-17 16:45:10",
      paymentType: "PayPal",
      amount: 150.25,
      imageUrl: "https://example.com/receipt3.jpg"
    },
    {
      id: 4,
      username: "sarah_williams",
      transactionId: "TRX004",
      dateTime: "2023-06-18 09:20:30",
      paymentType: "Crypto",
      amount: 375.60,
      imageUrl: "https://example.com/receipt4.jpg"
    },
    {
      id: 5,
      username: "alex_brown",
      transactionId: "TRX005",
      dateTime: "2023-06-19 11:55:15",
      paymentType: "Card",
      amount: 620.90,
      imageUrl: "https://example.com/receipt5.jpg"
    }
  ];

  // Use client receipts if available, otherwise use dummy data
  const receipts = client?.uploadedReceipts || dummyReceipts;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewReceipt = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Uploaded Receipts for {client?.name || "Client"}</DialogTitle>
        <DialogContent>
          {receipts.length > 0 ? (
            <>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell>Date & Time</TableCell>
                      <TableCell>Payment Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Receipt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {receipts
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((receipt) => (
                        <TableRow key={receipt.id}>
                          <TableCell>{receipt.username}</TableCell>
                          <TableCell>{receipt.transactionId}</TableCell>
                          <TableCell>{receipt.dateTime}</TableCell>
                          <TableCell>{receipt.paymentType}</TableCell>
                          <TableCell>${receipt.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <IconButton 
                              color="primary" 
                              onClick={() => handleViewReceipt(receipt.imageUrl)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={receipts.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          ) : (
            <Typography variant="h6" color="textSecondary">
              No uploaded receipts available.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Popup Dialog */}
      <Dialog 
        open={openImageDialog} 
        onClose={handleCloseImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Receipt Image
          <IconButton
            aria-label="close"
            onClick={handleCloseImageDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedImage && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%',
                height: '500px'
              }}
            >
              <img 
                src={selectedImage} 
                alt="Receipt" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain' 
                }} 
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewClientReceipts;
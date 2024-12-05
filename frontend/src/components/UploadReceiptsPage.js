import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Paper,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadReceiptsPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    // Create Object URL for each file and store it along with the file details
    const newReceipts = files.map((file) => ({
      file,
      fileUrl: URL.createObjectURL(file), // Create Object URL
    }));
    setReceipts((prevReceipts) => [...prevReceipts, ...newReceipts]);
  };

  const handleDelete = () => {
    setReceipts((prevReceipts) =>
      prevReceipts.filter((_, index) => index !== deleteIndex)
    );
    setDeleteIndex(null); // Close the dialog
  };

  const handleOpenDeleteDialog = (index) => {
    setDeleteIndex(index); // Store the index of the file to delete
  };

  const handleCloseDeleteDialog = () => {
    setDeleteIndex(null); // Close the dialog without deleting
  };

  const handleBack = () => {
    navigate('/dashboard'); // Redirect back to the Dashboard
  };

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, '_blank'); // Open the file in a new tab
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Upload Your Receipts
        </Typography>

        {/* Upload Button */}
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 2, width: '80%' }}
        >
          Choose Files
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Accepted formats: JPG, PNG, PDF
        </Typography>

        {/* Receipts List */}
        <Box sx={{ maxHeight: 300, overflowY: 'auto', width: '100%' }}>
          <List>
            {receipts.map((receipt, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  mb: 1,
                  boxShadow: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                button
                onClick={() => handleOpenFile(receipt.fileUrl)} // Open the file in a new tab
              >
                <ListItemText primary={receipt.file.name} />
                <IconButton
                  edge="end"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening the file when clicking delete
                    handleOpenDeleteDialog(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Back Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBack}
          sx={{ mt: 3, width: '80%' }}
        >
          Back
        </Button>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteIndex !== null}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Are you sure you want to delete this file?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UploadReceiptsPage;

import React, { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
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
  TextField,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

dayjs.extend(isBetween);

const TransactionsPage = () => {
  const navigate = useNavigate();

  const transactions = [
    { id: 'T001', date: '2024-12-01', time: '10:30 AM', amount: 100.0, method: 'Card', status: 'Successful' },
    { id: 'T002', date: '2024-12-02', time: '12:00 PM', amount: 200.0, method: 'Bank', status: 'Failed' },
    { id: 'T003', date: '2024-12-03', time: '02:15 PM', amount: 50.0, method: 'Card', status: 'Successful' },
    { id: 'T004', date: '2024-12-04', time: '04:30 PM', amount: 75.0, method: 'Bank', status: 'Failed' },
    { id: 'T005', date: '2024-12-05', time: '06:00 PM', amount: 150.0, method: 'Card', status: 'Successful' },
  ];

  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('id'); // Default filter is by Transaction ID
  const [startDate, setStartDate] = useState(dayjs('2024-12-01')); // Initial Start Date
  const [endDate, setEndDate] = useState(dayjs('2024-12-15')); // Initial End Date

  // Filter transactions based on search and date range
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = dayjs(transaction.date);

    // Filter by date range
    if (!transactionDate.isBetween(startDate, endDate, null, '[]')) {
      return false;
    }

    // Apply additional filters based on search
    if (filterBy === 'id') {
      return transaction.id.toLowerCase().includes(search.toLowerCase());
    } else if (filterBy === 'date') {
      return transaction.date.includes(search);
    } else if (filterBy === 'method') {
      return transaction.method.toLowerCase().includes(search.toLowerCase());
    } else if (filterBy === 'status') {
      return transaction.status.toLowerCase().includes(search.toLowerCase());
    }

    return true;
  });

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f7f9fc', paddingBottom: '30px', position: 'relative' }}>
      {/* Back to Dashboard Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackToDashboard}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          borderRadius: '8px',
          padding: '10px 20px',
          zIndex: 10,
        }}
      >
        Back to Dashboard
      </Button>

      {/* Page Title */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Transaction History
        </Typography>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {/* Search Bar */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label={`Search by ${filterBy.charAt(0).toUpperCase() + filterBy.slice(1)}`}
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Filter Dropdown */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Search By</InputLabel>
                <Select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  label="Search By"
                >
                  <MenuItem value="id">Transaction ID</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="method">Payment Method</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Date Range Pickers */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                type="date"
                label="Start Date"
                value={startDate.format('YYYY-MM-DD')}
                onChange={(e) => setStartDate(dayjs(e.target.value))}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                type="date"
                label="End Date"
                value={endDate.format('YYYY-MM-DD')}
                onChange={(e) => setEndDate(dayjs(e.target.value))}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>

        {/* Transaction Table */}
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Transaction ID</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Amount (USD)</strong></TableCell>
                <TableCell><strong>Payment Method</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.status}
                        color={transaction.status === 'Successful' ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default TransactionsPage;

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
    Grid,
    Modal,
    Backdrop,
    Fade,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

dayjs.extend(isBetween);

const TransactionsPage = () => {
    const navigate = useNavigate();

    const transactions = [
        { "id": "T021", "date": "2024-01-05", "time": "11:15 AM", "amount": 250.0, "method": "Card", "status": "Successful" },
        { "id": "T022", "date": "2024-02-10", "time": "01:00 PM", "amount": 150.0, "method": "Bank", "status": "Failed" },
        { "id": "T023", "date": "2024-03-15", "time": "03:45 PM", "amount": 350.0, "method": "Card", "status": "Successful" },
        { "id": "T024", "date": "2024-04-20", "time": "10:00 AM", "amount": 500.0, "method": "Bank", "status": "Failed" },
        { "id": "T025", "date": "2024-05-25", "time": "06:30 PM", "amount": 700.0, "method": "Card", "status": "Successful" },
        { "id": "T026", "date": "2024-06-01", "time": "08:15 AM", "amount": 100.0, "method": "Card", "status": "Successful" },
        { "id": "T027", "date": "2024-07-04", "time": "09:45 AM", "amount": 200.0, "method": "Bank", "status": "Failed" },
        { "id": "T028", "date": "2024-08-09", "time": "02:30 PM", "amount": 600.0, "method": "Card", "status": "Successful" },
        { "id": "T029", "date": "2024-09-12", "time": "03:00 PM", "amount": 800.0, "method": "Bank", "status": "Failed" },
        { "id": "T030", "date": "2024-10-18", "time": "05:15 PM", "amount": 450.0, "method": "Card", "status": "Successful" },
        { "id": "T031", "date": "2024-11-22", "time": "11:00 AM", "amount": 300.0, "method": "Bank", "status": "Failed" },
        { "id": "T032", "date": "2024-12-25", "time": "07:45 PM", "amount": 1000.0, "method": "Card", "status": "Successful" },
        { "id": "T033", "date": "2024-01-15", "time": "12:30 PM", "amount": 150.0, "method": "Bank", "status": "Failed" },
        { "id": "T034", "date": "2024-02-20", "time": "09:15 AM", "amount": 500.0, "method": "Card", "status": "Successful" },
        { "id": "T035", "date": "2024-03-25", "time": "10:45 AM", "amount": 400.0, "method": "Bank", "status": "Failed" },
        { "id": "T036", "date": "2024-04-30", "time": "04:00 PM", "amount": 750.0, "method": "Card", "status": "Successful" },
        { "id": "T037", "date": "2024-05-10", "time": "08:30 AM", "amount": 1200.0, "method": "Bank", "status": "Failed" },
        { "id": "T038", "date": "2024-06-20", "time": "06:45 PM", "amount": 1300.0, "method": "Card", "status": "Successful" },
        { "id": "T039", "date": "2024-07-25", "time": "03:30 PM", "amount": 650.0, "method": "Bank", "status": "Failed" },
        { "id": "T040", "date": "2024-08-05", "time": "05:00 PM", "amount": 800.0, "method": "Card", "status": "Successful" },
        { "id": "T041", "date": "2024-09-10", "time": "02:15 PM", "amount": 200.0, "method": "Bank", "status": "Failed" },
        { "id": "T042", "date": "2024-10-15", "time": "01:00 PM", "amount": 300.0, "method": "Card", "status": "Successful" },
        { "id": "T043", "date": "2024-11-20", "time": "11:45 AM", "amount": 550.0, "method": "Bank", "status": "Failed" },
        { "id": "T044", "date": "2024-12-29", "time": "06:00 PM", "amount": 950.0, "method": "Card", "status": "Successful" },
        { "id": "T045", "date": "2024-01-02", "time": "09:30 AM", "amount": 175.0, "method": "Card", "status": "Successful" }
    ];

    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(dayjs('2024-12-01')); // Initial Start Date
    const [endDate, setEndDate] = useState(dayjs('2024-12-15')); // Initial End Date
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Filter transactions based on search and date range
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = dayjs(transaction.date);

        // Check if the transaction is within the selected date range
        if (!transactionDate.isBetween(startDate, endDate, null, '[]')) {
            return false;
        }

        // Check if the transaction matches the search input
        const searchLower = search.toLowerCase();
        return (
            transaction.id.toLowerCase().includes(searchLower) ||
            transaction.date.includes(searchLower) ||
            transaction.method.toLowerCase().includes(searchLower) ||
            transaction.status.toLowerCase().includes(searchLower)
        );
    });

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    // Reset Filters
    const resetFilters = () => {
        setSearch('');
        setStartDate(dayjs('2024-01-01')); // Earliest possible start date
        setEndDate(dayjs('2024-12-31')); // Latest possible end date
    };

    // Open Modal with Selected Transaction
    const handleOpenModal = (transaction) => {
        setSelectedTransaction(transaction);
        setModalOpen(true);
    };

    // Close Modal
    const handleCloseModal = () => {
        setSelectedTransaction(null);
        setModalOpen(false);
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
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    textTransform: 'none',
                    '&:hover': {
                        boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                Back to Dashboard
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={resetFilters}
                sx={{
                    position: 'absolute',
                    top: '80px',
                    right: '20px',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                }}
            >
                All Transactions
            </Button>

            {/* Page Title */}
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Transaction History
                </Typography>

                {/* Search and Date Range Filters */}
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        {/* Search Bar */}
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                fullWidth
                            />
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
                                    <TableRow
                                        key={transaction.id}
                                        onClick={() => handleOpenModal(transaction)}
                                        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                                    >
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

            {/* Modal for Transaction Details */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={modalOpen}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '10px',
                        }}
                    >
                        {selectedTransaction && (
                            <>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Transaction Details
                                </Typography>
                                <Typography><strong>ID:</strong> {selectedTransaction.id}</Typography>
                                <Typography><strong>Date:</strong> {selectedTransaction.date}</Typography>
                                <Typography><strong>Time:</strong> {selectedTransaction.time}</Typography>
                                <Typography><strong>Amount:</strong> ${selectedTransaction.amount.toFixed(2)}</Typography>
                                <Typography><strong>Method:</strong> {selectedTransaction.method}</Typography>
                                <Typography><strong>Status:</strong> {selectedTransaction.status}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCloseModal}
                                    sx={{ mt: 2, borderRadius: '20px' }}
                                >
                                    Close
                                </Button>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default TransactionsPage;

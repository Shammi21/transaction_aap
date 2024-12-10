import React, { useEffect, useState } from 'react';
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
    TablePagination,  // Import TablePagination component
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    // Pagination State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Calculate total amount of successful transactions
    const totalSuccessfulAmount = transactions
        .filter(transaction => transaction.status === 'Successful')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

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

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    const [token, setToken] = useState("");

    const fetchToken = async () => {
        const loginUrl = "https://nova.terrapayz.com/api/auth/login";
    
        try {
          console.log("Attempting to fetch token...");
    
          const response = await axios.post(loginUrl, {
            username: "admin",
            password: "admin",
          });
    
          console.log("Token response:", response.data);
    
          if (response.data && response.data.access_token) {
            const fetchedToken = response.data.access_token;
            setToken(fetchedToken);
    
            // Optionally, store the token in localStorage
            localStorage.setItem("authToken", fetchedToken);
    
            return fetchedToken;
          } else {
            console.error("Access token not found in response:", response.data);
            return null;
          }
        } catch (error) {
          console.error("Error fetching token:", error.response?.data || error.message);
          return null;
        }
      };

      const getAllTransactions = async () => {
        const apiUrl = "https://nova.terrapayz.com/api/transactions/all";
        let currentToken = token || (await fetchToken());
      
        // Check if token is available
        if (!currentToken) {
          console.error("Token not available. Cannot proceed.");
          return;
        }
      
        try {
          // Perform GET request with the correct structure
          const response = await axios.get(
            apiUrl,
            {
              headers: {
                Authorization: `Bearer ${currentToken}`,
              },
              data : {status: "true"}
            }
            
          );
          // Log response data
          console.log("Transactions fetched successfully:", response.data);
          return response.data; // Optionally return data for further processing
        } catch (error) {
          // Log detailed error
          console.error(
            "Error fetching transactions:",
            error.response?.data || error.message
          );
        }
      };
      
      

    // useEffect(() => {
    //     getAllTransactions()
    // }, [])

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f7f9fc', paddingBottom: '30px', position: 'relative' }}>
            {/* Back to Dashboard Button */}
            

            <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
                {/* Header */}
                <Box>
                <Typography variant="h4" gutterBottom>
                    Transaction History
                </Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={() => getAllTransactions()}
                // sx={{ position: 'absolute', top: 20, left: 20 }}
            >
                Back to Dashboard
            </Button>
                </Box>
                {/* Total Successful Amount */}
                <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                    Total Successful Transactions: <strong>${totalSuccessfulAmount.toFixed(2)}</strong>
                </Typography>

                {/* Filters */}
                <Grid container spacing={3} alignItems="center" marginBottom={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Search Transactions"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            InputLabelProps={{ shrink: true }}
                            value={startDate.format('YYYY-MM-DD')}
                            onChange={(e) => setStartDate(dayjs(e.target.value))}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            type="date"
                            label="End Date"
                            InputLabelProps={{ shrink: true }}
                            value={endDate.format('YYYY-MM-DD')}
                            onChange={(e) => setEndDate(dayjs(e.target.value))}
                        />
                    </Grid>
                </Grid>

                {/* Reset Filters Button */}
                <Button variant="outlined" onClick={resetFilters} sx={{ marginBottom: '20px' }}>
                    Reset Filters
                </Button>

                {/* Transactions Table */}
                <TableContainer component={Paper}>
                    <Table aria-label="Transactions Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Method</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {console.log(filteredTransactions)}
                            {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.time}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.method}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={transaction.status}
                                            color={transaction.status === 'Successful' ? 'success' : 'error'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleOpenModal(transaction)}>
                                            View
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
                    count={filteredTransactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
                    <Box sx={{ ...modalStyle }}>
                        {selectedTransaction && (
                            <div>
                                <Typography variant="h6">Transaction Details</Typography>
                                <Typography>ID: {selectedTransaction.id}</Typography>
                                <Typography>Date: {selectedTransaction.date}</Typography>
                                <Typography>Time: {selectedTransaction.time}</Typography>
                                <Typography>Amount: ${selectedTransaction.amount}</Typography>
                                <Typography>Method: {selectedTransaction.method}</Typography>
                                <Typography>Status: {selectedTransaction.status}</Typography>
                                <Button variant="contained" color="primary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </div>
                        )}
                    </Box>
                </Fade>
            </Modal>
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
    minWidth: '300px',
};

export default TransactionsPage;

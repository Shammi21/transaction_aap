import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import RequestPage from './components/NewRequestPage';
import CardDetailsPage from './components/CardDetailsPage';
import BankDetailsPage from './components/BankDetailsPage';
import UploadReceiptsPage from './components/UploadReceiptsPage';
import TransactionsPage from './components/TransactionsPage';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/card-details" element={<CardDetailsPage />} />
        <Route path="/bank-details" element={<BankDetailsPage />} />
        <Route path="/upload-receipts" element={<UploadReceiptsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />


        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

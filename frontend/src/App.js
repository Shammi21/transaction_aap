import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import RequestPage from './components/NewRequestPage';
import CardDetailsPage from './components/CardDetailsPage';
import BankDetailsPage from './components/BankDetailsPage';
import UploadReceiptsPage from './components/UploadReceiptsPage';
import TransactionsPage from './components/TransactionsPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AdminDashboard from './components/AdminDashboard';
import AddClientPage from './components/AddClientPage';
import AdminRequestPage from './components/AdminRequestPage';
import ClientDetailsPage from './components/ClientDetailsPage';
import ClientProfilePage from './components/ClientProfilePage';
import ClientTransactionHistory from './components/ClientTransactionHistory';
import ClientFailTransactionHistory from './components/ClientFailTransactionHistory';
import ClientRequest from './components/ClientRequest';
import ViewClientReceipts from './components/ViewClientReceipts';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/add-client" element={<AddClientPage />} />
        <Route path="/card-details" element={<CardDetailsPage />} />
        <Route path="/bank-details" element={<BankDetailsPage />} />
        <Route path="/upload-receipts" element={<UploadReceiptsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/admin-request" element={<AdminRequestPage />} />
        <Route path="/client-details" element={<ClientDetailsPage />} />
        <Route path="/client-profile" element={<ClientProfilePage />} />
        <Route path="/client-transaction-history" element={<ClientTransactionHistory />} />
        <Route path="/client-fail-transaction-history" element={<ClientFailTransactionHistory />} />
        <Route path="/client-request" element={<ClientRequest />} />
        <Route path="/view-client-receipts" element={<ViewClientReceipts />} />


        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TransactionsList from '../components/TransactionsList';
import IncomeSummary from '../components/IncomeSummary';
import ManageAdmins from '../components/ManageAdmins';
import EmployeeIncomeSummary from '../components/EmployeeIncomeSummary'; // Import new component
import Logout from '../components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <Routes>
          <Route path="/transactions" element={<TransactionsList />} />
          <Route path="/income-summary" element={<IncomeSummary />} />
          <Route path="/manage-admins" element={<ManageAdmins />} />
          <Route path="/employee-income-summary" element={<EmployeeIncomeSummary />} /> {/* New route */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

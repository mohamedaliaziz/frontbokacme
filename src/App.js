// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeLoginPage from './pages/EmployeeLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';

import 'bootstrap/dist/css/bootstrap.min.css' 
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee/login" element={<EmployeeLoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

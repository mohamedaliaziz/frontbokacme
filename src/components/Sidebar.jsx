import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <Nav className="flex-column bg-body">
      <Nav.Link as={NavLink} to="/admin/transactions">جدول المعاملات</Nav.Link>
      <Nav.Link as={NavLink} to="/admin/income-summary">مجموع الدخل</Nav.Link>
      <Nav.Link as={NavLink} to="/admin/manage-admins">اضافة موظف جديد</Nav.Link>
      <Nav.Link as={NavLink} to="/admin/employee-income-summary">مجموع الدخل لكل موظف</Nav.Link>
      <Nav.Link as={NavLink} to="/admin/logout">تسجيل خروج</Nav.Link>
    </Nav>
  );
}

export default Sidebar;

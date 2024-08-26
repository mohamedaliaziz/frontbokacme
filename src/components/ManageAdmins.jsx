import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: '',
    role: 'employee', // Default role
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('https://bokame-swpksvvn.b4a.run/api/transactions/admins')
      .then(response => setAdmins(response.data))
      .catch(error => console.error('Error fetching admins:', error));

    // Fetch list of employees
    axios.get('https://bokame-swpksvvn.b4a.run/api/transactions/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleAddAdmin = () => {
    axios.post('https://bokame-swpksvvn.b4a.run/api/transactions/add-admin', newAdmin)
      .then(response => {
        setAdmins([...admins, response.data]);
        setNewAdmin({ username: '', email: '', password: '', role: 'employee' });
      })
      .catch(error => console.error('Error adding admin:', error));
  };

  return (
    <div>
      <h2>Manage Admins</h2>
      <Row className="my-2">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Username"
            value={newAdmin.username}
            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            as="select"
            value={newAdmin.role}
            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Col>
      </Row>
      <Button variant="primary" onClick={handleAddAdmin}>Add Admin</Button>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin._id}>
              <td>{index + 1}</td>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageAdmins;

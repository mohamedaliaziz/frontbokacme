import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

function EmployeeIncomeSummary() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [incomeData, setIncomeData] = useState({});
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    // Fetch list of employees on component mount
    axios.get('https://bokame-swpksvvn.b4a.run/api/transactions/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleSearch = () => {
    if (selectedEmployee) {
      // Fetch income summary for the selected employee
      axios.get(`https://bokame-swpksvvn.b4a.run/api/transactions/income/${selectedEmployee}`)
        .then(response => setIncomeData(response.data))
        .catch(error => console.error('Error fetching income data:', error));
    }
  };
  console.log(
    employees
  );

  return (
    <>
      <Row className="my-2">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="البحث باسم الموظف"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            as="select"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">اختار موظف</option>
            {employees
              .filter(employee => employee.username.toLowerCase().includes(searchName.toLowerCase()))
              .map(employee => (
                <option key={employee._id} value={employee._id}>
                  {employee.username}
                </option>
              ))
            }
          </Form.Control>
        </Col>
        <Col md={4}>
          <Button variant="success" onClick={handleSearch}>Search</Button>
        </Col>
      </Row>

      {selectedEmployee && (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>الفتره </th>
              <th>الدخل</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>دخل اليوم</td>
              <td>{incomeData.dailyIncome || 0}</td>
            </tr>
            <tr>
              <td>الدخل الاسبوعي</td>
              <td>{incomeData.weeklyIncome || 0}</td>
            </tr>
            <tr>
              <td>الدخل الشهري</td>
              <td>{incomeData.monthlyIncome || 0}</td>
            </tr>
            <tr>
              <td>الدخل السانوي</td>
              <td>{incomeData.yearlyIncome || 0}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
}

export default EmployeeIncomeSummary;

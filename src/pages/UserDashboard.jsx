import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeePage.css';
import { Table, Button, Form, Col, Row, Modal } from 'react-bootstrap';


import moment from 'moment-hijri';
function EmployeePage() {


  const today = new Date();
  const hijriDate = moment(today).format('iD-iM-iYYYY ');
  const currentTime = today.toLocaleTimeString();


  const [receipt, setReceipt] = useState();
  const [sada, setSada] = useState();
  const [exhibition, setExhibition] = useState();
  const [transactionName, setTransactionName] = useState('');
  const [paymentType, setPaymentType] = useState('Cash');
  const [externalTransaction, setExternalTransaction] = useState();
  const [notes, setNotes] = useState('');
  const [expenses, setExpenses] = useState();
  const [transactions, setTransactions] = useState([]);
  const [userName, setUserName] = useState('');

  const fetchTransactions = async () => {
    const token = localStorage.getItem('employeeToken');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await axios.get('https://bokame-swpksvvn.b4a.run/api/transactions', {
        headers: {
          'x-auth-token': token
        }
      });
      setTransactions(response.data.transactions);
      setUserName(response.data.username); // Assuming the response includes the username
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('employeeToken');

    if (!userId || !token) {
      console.error('User ID or token not found');
      return;
    }

    // Check if receipt and transaction name are present
    if (!receipt || !transactionName) {
      console.error('Receipt or transaction name is missing');
      return;
    }

    try {
      await axios.post('https://bokame-swpksvvn.b4a.run/api/transactions/transaction', {
        userId,
        receipt,
        sada,
        exhibition,
        transactionName,
        paymentType,
        externalTransaction,
        notes,
      }, {
        headers: {
          'x-auth-token': token
        }
      });

      fetchTransactions(); // Refresh the transaction list
      // Clear the form fields
      setReceipt(0);
      setSada(0);
      setExhibition(0);
      setTransactionName('');
      setPaymentType('Cash');
      setExternalTransaction(0);
      setNotes('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleExpensesSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('employeeToken');

    if (!userId || !token) {
      console.error('User ID or token not found');
      return;
    }

    try {
      await axios.post('https://bokame-swpksvvn.b4a.run/api/transactions/expenses', {
        userId,
        expenses,
      }, {
        headers: {
          'x-auth-token': token
        }
      });
console.log(expenses);
      setExpenses(0); // Clear the expenses field after submission
      fetchTransactions(); // Refresh the transaction list
    } catch (error) {
      console.error('Error adding expenses:', error);
    }
  };

  return (
    <div className="employee-page container">
      <div className="header">
        <h1 className='text-danger'>وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ</h1>
        <div className="date-time text-primary h3 d-flex flex-column bd-highlight mb-3 justify-content-center">
      <div>{hijriDate}</div>
      <div>{currentTime}</div>
    </div>
      </div>

      {/* Transaction Form */}
      <form onSubmit={handleTransactionSubmit} className="transaction-form">
        <input
          type="number"
          placeholder="استلام"
          value={receipt}
          onChange={(e) => setReceipt(Number(e.target.value))}
          required 
        />
        <input
          type="number"
          placeholder="سداد"
          value={sada}
          onChange={(e) => setSada(Number(e.target.value))}
          
        />
        <input
          type="number"
          placeholder="معرض"
          value={exhibition}
          onChange={(e) => setExhibition(Number(e.target.value))}
          
        />
        <input
          type="text"
          placeholder="اسم المعامله"
          value={transactionName}
          onChange={(e) => setTransactionName(e.target.value)}
          required
        />
        <select
        className='btn btn-danger btn-sl dropdown-toggle'
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="Cash">كاش</option>
          <option value="Network">شبكة</option>
          <option value="Transfer">تحويل</option>
        </select>
        <input
          type="number"
          placeholder="معاملات خارجية"
          value={externalTransaction}
          onChange={(e) => setExternalTransaction(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="ملاحظات"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">اضف المعاملة</button>
      </form>

      {/* Expenses Form */}
      <form onSubmit={handleExpensesSubmit} className="transaction-form">
        <input
          type="number"
          placeholder="مصروفات"
          value={expenses}
          onChange={(e) => setExpenses(Number(e.target.value))}
        />
        <button className='btn btn-danger' type="submit">اضف المصروفات</button>
      </form>

      {/* Transactions Table */}
      <Table striped bordered hover responsive className="mt-3 bg-info ">
        <thead >
          <tr >
            <th className='text-danger'  >التاريخ و الوقت</th>
            <th className='text-danger'>الاستلام</th>
            <th className='text-danger'>سداد</th>
            <th className='text-danger'>معرض</th>
            <th className='text-danger'>الدخل</th>
            <th className='text-danger'>نوع المعامله</th>
            <th className='text-danger'>معاملات خارجية</th>
            <th className='text-danger'>اسم المعامله</th>
            <th className='text-danger'>ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className='text-danger'>{new Date(transaction.date).toLocaleString()}</td>
              <td>{transaction.receipt}</td>
              <td>{transaction.sada}</td>
              <td>{transaction.exhibition}</td>
              <td>{transaction.income}</td>
              <td>{transaction.paymentType}</td>
              <td>{transaction.externalTransaction}</td>
              <td>{transaction.transactionName}</td>
              <td>{transaction.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeePage;

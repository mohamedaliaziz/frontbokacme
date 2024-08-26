import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Form, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchName, setSearchName] = useState('');
  const [editTransaction, setEditTransaction] = useState(null);
  const [newReceiptValue, setNewReceiptValue] = useState('');
  const [newSadaValue, setNewSadaValue] = useState('');
  const [newExhibitionValue, setNewExhibitionValue] = useState('');
  const [newExpensesValue, setNewExpensesValue] = useState(''); // حقل المصروفات الجديد
  const [newIncomeValue, setNewIncomeValue] = useState('');
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newPaymentType, setNewPaymentType] = useState('Cash'); // حقل نوع المعاملة الجديد
  const [newExternalTransaction, setNewExternalTransaction] = useState(''); // حقل المعاملات الخارجية الجديد
  const [newNotes, setNewNotes] = useState('');
  const tableRef = useRef(); // مرجع للطباعة

  useEffect(() => {
    // استدعاء الـ API لجلب قائمة المعاملات
    axios.get('https://bokame-swpksvvn.b4a.run/api/transactions/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleSearch = () => {
    // استدعاء الـ API لتصفية النتائج بناءً على التاريخ واسم المعاملة
    axios.get('https://bokame-swpksvvn.b4a.run/api/transactions/transactions/search', {
      params: { date: searchDate, name: searchName }
    })
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error searching transactions:', error));
  };

  const openEditModal = (transaction) => {
    console.log(transaction);
    setEditTransaction(transaction);
    setNewReceiptValue(transaction.receipt);
    setNewSadaValue(transaction.sada);
    setNewExhibitionValue(transaction.exhibition);
    setNewExpensesValue(transaction.expenses); // عرض قيمة المصروفات في نافذة التعديل
    setNewIncomeValue(transaction.income);
    setNewTransactionName(transaction.transactionName);
    setNewPaymentType(transaction.paymentType); // عرض نوع المعاملة في نافذة التعديل
    setNewExternalTransaction(transaction.externalTransaction); // عرض المعاملات الخارجية في نافذة التعديل
    setNewNotes(transaction.notes);
  };

  const handleEdit = () => {
    const updatedData = {
      receipt: newReceiptValue,
      sada: newSadaValue,
      exhibition: newExhibitionValue,
      expenses: newExpensesValue, // إضافة المصروفات في تحديث البيانات
      income: newIncomeValue,
      transactionName: newTransactionName,
      paymentType: newPaymentType, // إضافة نوع المعاملة في تحديث البيانات
      externalTransaction: newExternalTransaction, // إضافة المعاملات الخارجية في تحديث البيانات
      notes: newNotes,
    };

    axios.put(`https://bokame-swpksvvn.b4a.run/api/transactions/transactions/${editTransaction._id}`, updatedData)
      .then(response => {
        setTransactions(transactions.map(transaction =>
          transaction._id === editTransaction._id ? response.data.transaction : transaction
        ));
        setEditTransaction(null); // اغلاق نافذة التعديل بعد التحديث
      })
      .catch(error => console.error('Error updating transaction:', error));
  };

  const handleDelete = (transactionId) => {
    axios.delete(`https://bokame-swpksvvn.b4a.run/api/transactions/transactions/${transactionId}`)
      .then(() => {
        setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
      })
      .catch(error => console.error('Error deleting transaction:', error));
  };

  return (
    <>
      <Row className="my-2">
        <Col md={4}>
          <Form.Control
            type="date"
            placeholder="البحث ب التاريخ"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="البحث باسم المعامله "
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button variant="success" onClick={handleSearch}>بحث</Button>
        </Col>
      </Row>
      <ReactToPrint
        trigger={() => <Button variant="primary" className="mb-3">طباعة الجدول</Button>}
        content={() => tableRef.current}
      />
      <Table striped bordered hover responsive className="mt-3 bg-info" ref={tableRef}>
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>الاستلام</th>
            <th>سداد</th>
            <th>معرض</th>
            <th>مصروفات</th> {/* إضافة عمود المصروفات */}
            <th>دخل</th>
            <th>نوع المعاملة</th> {/* إضافة عمود نوع المعاملة */}
            <th>المعاملات الخارجية</th> {/* إضافة عمود المعاملات الخارجية */}
            <th>اسم المعامله</th>
            <th>ملاحظات</th>
            <th>التاريخ</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.username}</td>
                <td>{transaction.receipt}</td>
                <td>{transaction.sada}</td>
                <td>{transaction.exhibition}</td>
                <td>{transaction.expenses}</td> {/* عرض قيمة المصروفات */}
                <td>{transaction.income}</td>
                <td>{transaction.paymentType}</td> {/* عرض نوع المعاملة */}
                <td>{transaction.externalTransaction}</td> {/* عرض المعاملات الخارجية */}
                <td>{transaction.transactionName}</td>
                <td>{transaction.notes}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>
                  <Button variant="warning" className="mr-2" onClick={() => openEditModal(transaction)}>تعديل</Button>
                  <Button variant="danger" onClick={() => handleDelete(transaction._id)}>حذف</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* نافذة التعديل */}
      {editTransaction && (
        <Modal show={true} onHide={() => setEditTransaction(null)}>
          <Modal.Header closeButton>
            <Modal.Title>تعديل المعاملة</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>استلام</Form.Label>
                <Form.Control type="number" value={newReceiptValue} onChange={(e) => setNewReceiptValue(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>سداد</Form.Label>
                <Form.Control type="number" value={newSadaValue} onChange={(e) => setNewSadaValue(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>معرض</Form.Label>
                <Form.Control type="number" value={newExhibitionValue} onChange={(e) => setNewExhibitionValue(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>مصروفات</Form.Label>
                <Form.Control type="number" value={newExpensesValue} onChange={(e) => setNewExpensesValue(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>دخل</Form.Label>
                <Form.Control type="number" value={newIncomeValue} onChange={(e) => setNewIncomeValue(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>نوع المعاملة</Form.Label>
                <Form.Control as="select" value={newPaymentType} onChange={(e) => setNewPaymentType(e.target.value)}>
                  <option value="Cash">كاش</option>
                  <option value="Network">شبكة</option>
                  <option value="Transfer">تحويل</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>معاملات خارجية</Form.Label>
                <Form.Control type="text" value={newExternalTransaction} onChange={(e) => setNewExternalTransaction(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>اسم المعاملة</Form.Label>
                <Form.Control type="text" value={newTransactionName} onChange={(e) => setNewTransactionName(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>ملاحظات</Form.Label>
                <Form.Control type="text" value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditTransaction(null)}>إلغاء</Button>
            <Button variant="primary" onClick={handleEdit}>حفظ التغييرات</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default TransactionsList;

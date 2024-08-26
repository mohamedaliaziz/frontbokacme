import React from 'react';

const AdminTable = ({ transactions }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Receipt</th>
            <th>Sada</th>
            <th>Exhibition</th>
            <th>Income</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.employeeName}</td> {/* عرض اسم الموظف */}
              <td>{transaction.receipt}</td>
              <td>{transaction.sada}</td>
              <td>{transaction.exhibition}</td>
              <td>{transaction.income}</td>
              <td>{transaction.notes}</td>
              <td>{transaction.date}</td>
              <td>
                {/* أزرار لتعديل وحذف المعاملة */}
                <button className="btn btn-warning btn-sm mr-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;

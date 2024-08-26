import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

function IncomeSummary() {
  // البيانات التي سنستخدمها في ملخص الدخل
  const [summary, setSummary] = useState({
    totalReceipt: 0,
    totalSada: 0,
    totalExhibition: 0,
    totalExternalTransactions: 0,
    totalIncome: 0,
    dailySummary: {
      Cash: 0,
      Network: 0,
      Transfer: 0,
      expenses: 0,
      income: 0,
      sada: 0,
      exhibition: 0,
      receipt: 0
    },
    weeklySummary: {
      Cash: 0,
      Network: 0,
      Transfer: 0,
      expenses: 0,
      income: 0,
      sada: 0,
      exhibition: 0,
      receipt: 0
    },
    monthlySummary: {
      Cash: 0,
      Network: 0,
      Transfer: 0,
      expenses: 0,
      income: 0,
      sada: 0,
      exhibition: 0,
      receipt: 0
    }
  });   

  // استخدام useEffect لتحديث البيانات من API (في حال وجود اتصال بالخادم)
  useEffect(() => {
    // Fetch summary data from API
    axios.get('https://bokame-swpksvvn.b4a.run/api/transactions/transactions/summary')
      .then(response => {
        setSummary(response.data);
        console.log(response.data)
      })
      .catch(error => console.error('Error fetching income summary:', error));
  }, []);

  return (
    <Tabs defaultActiveKey="cash" id="income-summary-tabs" className='nav text-infonavbar navbar-expand-lg navbar-light bg-light'>
      {/* قسم الكاش */}
      <Tab eventKey="cash" title="الكاش">
        <Row>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الكاش اليومي</Card.Title>
                <Card.Text>{summary.dailySummary.Cash}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الكاش الأسبوعي</Card.Title>
                <Card.Text>{summary.weeklySummary.Cash}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الكاش الشهري</Card.Title>
                <Card.Text>{summary.monthlySummary.Cash}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab>
      <Tab eventKey="Transfer" title="تحويل">
        <Row>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي التحويل اليومي</Card.Title>
                <Card.Text>{summary.dailySummary.Transfer}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي التحويل الأسبوعي</Card.Title>
                <Card.Text>{summary.weeklySummary.Transfer}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي التحويل الشهري</Card.Title>
                <Card.Text>{summary.monthlySummary.Transfer}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab>
      <Tab eventKey="Network" title="شبكه">
        <Row>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الشبكه اليومي</Card.Title>
                <Card.Text>{summary.dailySummary.Network}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الشبكه الأسبوعي</Card.Title>
                <Card.Text>{summary.weeklySummary.Network}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الشبكه الشهري</Card.Title>
                <Card.Text>{summary.monthlySummary.Network}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab>

      {/* قسم المصروفات */}
      <Tab eventKey="expenses" title="المصروفات">
        <Row>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي المصروفات اليومية</Card.Title>
                <Card.Text>{summary.dailySummary.expenses}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي المصروفات الأسبوعية</Card.Title>
                <Card.Text>{summary.weeklySummary.expenses}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي المصروفات الشهرية</Card.Title>
                <Card.Text>{summary.monthlySummary.expenses}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab>
      {/* قسم المعرض */}
      <Tab eventKey="exhibition" title="المعرض">
      <Row>
      <Col md={12}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded ">
              <Card.Body>
                <Card.Title>اجمالي المعرض</Card.Title>
                <Card.Text>{summary.totalExhibition}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي المعرض اليومي</Card.Title>
                <Card.Text>{summary.dailySummary.exhibition}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي المعرض الأسبوعي</Card.Title>
                <Card.Text>{summary.weeklySummary.exhibition}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي المعرض الشهري</Card.Title>
                <Card.Text>{summary.monthlySummary.exhibition}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab>
      {/* قسم السداد */}
      <Tab eventKey="Receipt" title="الاستلام">
      <Row className="">
      <Col md={12}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded ">
              <Card.Body>
                <Card.Title>اجمالي الاستلام</Card.Title>
                <Card.Text>{summary.totalReceipt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded ">
              <Card.Body>
                <Card.Title>اجمالي الاستلام اليومي</Card.Title>
                <Card.Text>{summary.dailySummary.receipt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الاستلام الأسبوعي</Card.Title>
                <Card.Text>{summary.weeklySummary.receipt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الاستلام الشهري</Card.Title>
                <Card.Text>{summary.monthlySummary.receipt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab>
      {/* قسم السداد */}
      <Tab eventKey="Sada" title="سداد">
      <Row>
      <Col md={12}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي السداد</Card.Title>
                <Card.Text>{summary.totalSada}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي السداد اليومي</Card.Title>
                <Card.Text>{summary.dailySummary.sada}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي السداد الأسبوعي</Card.Title>
                <Card.Text>{summary.weeklySummary.sada}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي السداد الشهري</Card.Title>
                <Card.Text>{summary.monthlySummary.sada}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab>

      {/* قسم الدخل */}
      <Tab eventKey="income" title="الدخل">
        <Row>

   
         
          <Col md={12}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الدخل</Card.Title>
                <Card.Text>{summary.totalIncome}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الدخل اليومي</Card.Title>
                <Card.Text>{summary.dailySummary.income}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الدخل الأسبوعي</Card.Title>
                <Card.Text>{summary.weeklySummary.income}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي الدخل الشهري</Card.Title>
                <Card.Text>{summary.monthlySummary.income}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      
        <Row>
 
        </Row>
      </Tab>

      {/* قسم المصروفات الخارجية */}
      <Tab eventKey="external-transactions" title="المصروفات الخارجية">
        <Row>
          <Col md={4}>
            <Card className="mb-3 text-center text-danger box-sh-lg shadow-lg p-3 mb-5 bg-body rounded">
              <Card.Body>
                <Card.Title>اجمالي المصروفات الخارجية</Card.Title>
                <Card.Text>{summary.totalExternalTransactions}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab>

      {/* إضافة أقسام أخرى حسب الحاجة */}
    </Tabs>
  );
}

export default IncomeSummary;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <div className=''>
      <h1 className='text-danger mb-6' >مرحباً بك في  مؤسسة البقمي</h1>

      </div>
      <div  className=' mt-3'>
      <button
      className='btn btn-info'
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
        onClick={() => navigate('/employee/login')}
      >
        صفحة الموظفين
      </button>
      <button
      className='btn btn-danger'
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
        onClick={() => navigate('/admin/login')}
      >
        صفحة الأدمن
      </button>
      </div>
    
    </div>
  );
};

export default HomePage;

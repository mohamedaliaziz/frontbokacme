import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post('https://bokame-swpksvvn.b4a.run/api/auth/register', { username, password });
    navigate('/');
  };

  return (
    <Container>
      <h2>تسجيل</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group>
          <Form.Label>اسم المستخدم</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>كلمة المرور</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">تسجيل</Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;

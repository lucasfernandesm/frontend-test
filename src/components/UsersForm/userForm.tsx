import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import './userForm.css';

const UserForm: React.FC<{ onUserAdded: () => void }> = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if(!name || !email || !password) {
      return alert("Preencha todos os dados!");
    }

    const response = await fetch('http://localhost:3333/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      setName('');
      setEmail('');
      setPassword('');
      onUserAdded();
    } else {
      console.error('Failed to add user');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="custom-form">
      <h2>Cadastro de usuário</h2>
      <Form.Field className="custom-field">
        <label>Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          onKeyDown={handleKeyDown}
        />
      </Form.Field >
      <Form.Field className="custom-field">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          onKeyDown={handleKeyDown}
        />
      </Form.Field >
      <Form.Field className="custom-field">
        <label>Senha</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          onKeyDown={handleKeyDown}
        />
      </Form.Field>
      <button type='submit' className="custom-button">Cadastrar</button>
    </Form>
  );
};

export default UserForm;
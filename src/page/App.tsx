import './App.css';
import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import UserForm from '../components/UsersForm/userForm';
import UserList from '../components/UsersList/userList';

const App: React.FC = () => {
  const [update, setUpdate] = useState(false);

  const handleUserAdded = () => {
    setUpdate(!update);
  };

  return (
    <Container>
      <h1>Cadastro e listagem de usuários</h1>
      <div id="users">
        <UserForm onUserAdded={handleUserAdded} />
        <UserList update={update} />
      </div>
    </Container>
  );
};

export default App;
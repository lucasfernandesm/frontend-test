import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import './userList.css';
import { AiTwotoneDelete } from "react-icons/ai";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface UserListProps {
  update: boolean;
}

const UserList: React.FC<UserListProps> = ({ update }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3333/users');
    const data = await response.json();
    setUsers(data);
  };

  const deleteUser = async (id: number) => {
    const response = await fetch(`http://localhost:3333/users/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setUsers(users.filter(user => user.id !== id));
    } else {
      console.error('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [update]);

  return (
    <Table className="custom-table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id} className="custom-tr">
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{new Date(user.created_at).toLocaleString()}</Table.Cell>
            <Table.Cell>
              <button onClick={() => deleteUser(user.id)}>
                <AiTwotoneDelete />
              </button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default UserList;
import React from 'react';
import { useParams } from 'react-router-dom';

const Users = () => {
  const id = useParams().id;

  fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  return <div>Users {id}</div>;
};

export default Users;

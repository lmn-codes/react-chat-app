import React from 'react';
import useAPIRequest from '../hooks/useAPIRequest';

const Users = () => {
  const {
    data,
    error,
    isLoading,
  } = useAPIRequest({
    url: '/user',
    method: 'get',
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <ul id="users-list">
      {data.map((user) => (
        <li>{user.name}</li>
      ))}
    </ul>
  );
};

export default Users;

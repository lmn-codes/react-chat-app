import React from 'react';
import PropTypes from 'prop-types';
import useAPIRequest from '../hooks/useAPIRequest';

const UsersContext = React.createContext(null);

function UsersContextProvider({ children }) {
  const {
    data: users,
    error,
    isLoading,
  } = useAPIRequest({
    url: '/user',
    method: 'get',
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
}

UsersContextProvider.propTypes = {
  children: PropTypes.element,
};

UsersContextProvider.defaultProps = {
  children: null,
};

export { UsersContextProvider, UsersContext };

import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }
  return context;
}

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};

AuthContextProvider.defaultProps = {
  children: null,
};

export { AuthContextProvider, useAuth };

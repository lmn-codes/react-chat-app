import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContextProvider';

function PasswordForm({ user }) {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();
  const history = useHistory();

  async function authenticateUser(e) {
    e.preventDefault();
    const url = 'http://localhost:4000/auth/login';
    const payload = {
      "username": user.name,
      "password": password,
    };
    try {
      const response = await axios.post(url, payload);
      dispatch({
        type: 'LOGIN',
        payload: {
          "user": user,
          "token": response.data.ACCESS_TOKEN,
        },
      });
      // this process is unique to this component
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('username', user.name);
      localStorage.setItem('token', response.data.ACCESS_TOKEN);
      history.push('/');
    } catch (err) {
      if (err.response) {
        // Request made and server responded
        setError(err.response.data.message);
      } else {
        setError(
          'Something went wrong with the server. Please refresh and try again!'
        );
      }
    }
  }

  return (
    <>
      <form className="login-password__form" action="POST">
        <label className="login-form__label" htmlFor="password">
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="*******"
            className="login-form__input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="login__button"
          type="submit"
          onClick={authenticateUser}
        >
          <h4>Login</h4>
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}

PasswordForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    last_seen_at: PropTypes.string,
  }),
};

PasswordForm.defaultProps = {
  user: null,
};

export default PasswordForm;

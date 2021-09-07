import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import storeJwtInMemory from '../../utils/auth/storeJwtInMemory';

function PasswordForm({ username, userId }) {
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    async function authenticateUser() {
        const url = 'http://localhost:4000/auth/login';
        const payload = {
            "username": username,
            "password": password
        }
        try {
            const response = await axios.post(url, payload);
            if (response.data) {
                console.log(response.data);
                storeJwtInMemory.setToken(response.data);
                localStorage.setItem("user_id", userId);
            }
        } catch (err) {
            setError(err);
        }
    }

    if(error) return <p>{error.message}</p>
    return (
        <>
            <form action="POST">
                <label htmlFor="password">
                    Password
                    <input type="password"
                           name="password"
                           placeholder="*******"
                           onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="button" onClick={authenticateUser}>Login</button>
            </form>
        </>
    )
}

PasswordForm.propTypes = {
    username: PropTypes.string,
    userId: PropTypes.number
};

PasswordForm.defaultProps = {
    username: '',
    userId: null
};

export default PasswordForm;
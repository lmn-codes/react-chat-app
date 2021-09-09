import React, { useState } from 'react';
import { LoginUserList, PasswordForm } from '../components';

function Login() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <main className="login__page">
            <h1>Choose your user</h1>
            <LoginUserList chooseUser={user => setCurrentUser(user)}/>
            {currentUser && <PasswordForm user={currentUser} />}
        </main>
    )
}

export default Login;
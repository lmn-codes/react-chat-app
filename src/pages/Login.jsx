import React, { useState } from 'react';
import { LoginUserList, PasswordForm } from '../components';

function Login() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <>
            <LoginUserList chooseUser={user => setCurrentUser(user)}/>
            {currentUser && <PasswordForm user={currentUser} />}
        </>
    )
}

export default Login;
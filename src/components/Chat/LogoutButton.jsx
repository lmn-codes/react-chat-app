import React from 'react';
import { useHistory } from "react-router-dom";
import {useAuth} from '../../contexts/AuthContextProvider';

function LogoutButton() {
    const history = useHistory();
    const {dispatch} = useAuth();

    function logout() {
        dispatch({
            type: 'LOGOUT'
        })
        history.push('/login');
    }

    return (
        <>
            <button className="logout__button" type="button" onClick={logout}>Logout</button>
        </>
    )

}

export default LogoutButton;
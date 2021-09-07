import React, {useContext, useState} from 'react';
import {UsersContext} from '../../contexts/UsersContextProvider';

// eslint-disable-next-line react/prop-types
function LoginUserList({chooseUser}) {
    const users = useContext(UsersContext);
    const [selected, setSelected] = useState(null);

    return (
        <>
            <ul id="login__users-list">
                {users.map((user) => (
                    <button className={selected === user.id ? 'user-button__selected' : 'user-button'}
                            key={user.id}
                            type="button"
                            onClick={() => {
                                chooseUser(user);
                                setSelected(user.id)
                            }}>
                        <div className="user-button__image"/>
                        <p className="user-button__username">{user.name}</p>
                    </button>
                ))}
            </ul>
        </>
    )
}

export default LoginUserList;
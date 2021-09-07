import React from 'react';
import './App.css';
import { UsersContextProvider } from './contexts/UsersContextProvider'
import Login from './pages/Login'

function App() {

    return (
        <div className="App">
            <UsersContextProvider>
                <Login />
            </UsersContextProvider>
        </div>
    );
}

export default App;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { UsersContextProvider } from './contexts/UsersContextProvider';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import Login from './pages/Login';
import Chat from './pages/Chat';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <UsersContextProvider>
          <Router>
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <ProtectedRoute path="/">
                <Chat />
              </ProtectedRoute>
            </Switch>
          </Router>
        </UsersContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

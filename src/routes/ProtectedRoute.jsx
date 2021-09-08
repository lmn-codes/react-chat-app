import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from '../contexts/AuthContextProvider';

function ProtectedRoute({ children }) {
    const {
        state: { isAuthenticated },
    }  = useAuth();

    return (
        <Route
            render={() =>
                isAuthenticated ? children : <Redirect to="/login" />
            }
        />
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.element
}

ProtectedRoute.defaultProps = {
    children: null
}

export default ProtectedRoute;

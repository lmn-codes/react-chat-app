import React from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({children}) {
    return (
        <Route
            render={() =>
                localStorage.getItem('token') ? children : <Redirect to="/login"/>
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

export default React.memo(ProtectedRoute);

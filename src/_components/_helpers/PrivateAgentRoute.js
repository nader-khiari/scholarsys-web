import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ROLES from "../../config/roles";

const PrivateAdminRoute = ({ component: Component, path }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
    if (
        currentUser.role === ROLES.STUDENT ||
        currentUser.role === ROLES.TEACHER
    ) {
        return <Redirect to="/unauthorizedadmin" />;
    }

    return <Route component={Component} path={path} />;
};

export default PrivateAdminRoute;

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import ROLES from "../../config/roles";

const PrivateStudentRoute = ({ component: Component, path }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    if (currentUser.role === ROLES.STUDENT) {
        return <Redirect to="/unauthorizedstudent" />;
    }

    return <Route component={Component} path={path} />;
};

export default PrivateStudentRoute;

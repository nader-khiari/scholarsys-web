import React from "react";
import { Redirect, Route } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import ACCOUNT_TYPES from "../../config/accountTypes";

const PrivateTeacherRoute = ({ component: Component, path }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
    if (currentUser.accountType === ACCOUNT_TYPES.STUDENT) {
        return <Redirect to="/unauthorizedddddd" />;
    }
    console.log(path);
    return <Route component={Component} path={path} />;
};

export default PrivateTeacherRoute;

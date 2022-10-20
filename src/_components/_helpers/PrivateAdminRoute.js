import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ACCOUNT_TYPES from "../../config/accountTypes";

const PrivateAgentRoute = ({ component: Component, path }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
    if (currentUser.accountType !== ACCOUNT_TYPES.ADMIN) {
        return <Redirect to="/unauthorizedagent" />;
    }

    return <Route component={Component} path={path} />;
};

export default PrivateAgentRoute;

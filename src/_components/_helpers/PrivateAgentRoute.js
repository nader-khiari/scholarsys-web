import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateAgentRoute = ({ component: Component, path }: RouteProps) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);


    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
    if (parseInt(currentUser.role) === 1 || parseInt(currentUser.role) === 666 ) {
        return <Redirect to="/unauthorizedagent" />;
    }
    
    return <Route component={Component} path={path} />;

};

export default PrivateAgentRoute;
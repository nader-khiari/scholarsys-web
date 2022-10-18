import React from 'react';
import { Router, Route } from 'react-router-dom';
//Import Layouts
import { AgentLayout, LoginLayout } from '../_components/layouts';
import config from 'config';

//Agent Layout
export const AgentLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <AgentLayout>
                <Component {...matchProps} />
            </AgentLayout>
        )} />
    )
};

// Login Layout
// export const LoginLayoutRoute = ({ component: Component, ...rest }) => {
//     return (
//         <Route {...rest} render={matchProps => (
//             <LoginLayout>
//                 <Component {...matchProps} />
//             </LoginLayout>
//         )} />
//     )
// };

const LoginLayoutRoute = (props) => {
    return(
        <Router basename={`${config.publicPath}`}>
            <Route render={(props)=> <LoginLayout {...props}/>} />
        </Router>
    );    
}
export {LoginLayoutRoute};
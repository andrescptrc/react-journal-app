
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

export const PublicRouter = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {

    return (
        <Route { ...rest } 
            component={ ( props ) => (
                ( !isLoggedIn ) 
                    ? ( <Component /> ) 
                    : <Redirect to="/" />
            ) }
        />
    )
}


PublicRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}


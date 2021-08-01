
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { firebase } from '../firestore/firestore-config';

import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";


import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect( () => {

        firebase.auth().onAuthStateChanged( user => {

            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( startLoadingNotes( user.uid ) );

                setIsLoggedIn( true );

            }else {
                setIsLoggedIn( false );
            }

            setChecking( false );
            
        } );


    }, [ dispatch, setChecking ]);


    if( checking ) {
        return (
            <div className="loadingPage">
                <h1 className="journal__app-title">Journal App</h1>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
        <Router>
            <Switch>
                <PublicRouter 
                    path="/auth"
                    isLoggedIn={ isLoggedIn }
                    component={ AuthRouter }
                />
                <PrivateRouter 
                    path="/" 
                    isLoggedIn={ isLoggedIn }
                    component={ JournalScreen } 
                />

                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

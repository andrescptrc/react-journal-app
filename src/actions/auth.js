
import { firebase, googleAuthProvider } from '../firestore/firestore-config';

import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';

import Swal from 'sweetalert2';


export const startGoogleLogin = () => {
    return async( dispatch ) => {
        try {

            dispatch( startLoading() );
            await firebase.auth().signInWithPopup( googleAuthProvider )
                .then( ({ user }) => {
                    dispatch( login( user.uid, user.displayName ) );
                    dispatch( finishLoading() );

                } );
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
                }); 
            dispatch( finishLoading() );  
        }
    }
}


export const startLoginWithEmailPassword = ( email, password ) => {

    return async( dispatch )  => {
        try {

            dispatch( startLoading() );

            await firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );

            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
              }); 
            dispatch( finishLoading() );  
        }
    }
}

export const startLogout = () => {

    return async( dispatch ) => {
        dispatch( startLoading() );
        
        try {
            await firebase.auth().signOut();
            dispatch( logout() );

            dispatch( finishLoading() );

        } catch ( error ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            }); 
            dispatch( finishLoading() );  
        }

    }
}

export const startRegisterWithEmailPassword = ( username, email, password ) => {

    return async( dispatch ) => {

        try {

            dispatch( startLoading() );
            await firebase.auth().createUserWithEmailAndPassword( email, password )
                .then( async ({ user }) => {
                    
                    await user.updateProfile({ displayName: username });
                    dispatch( login( user.uid, user.displayName ));
                    
                    dispatch( finishLoading() );
                });

        } catch ( error ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
              }); 
            dispatch( finishLoading() );
        }

    }
}

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout
});

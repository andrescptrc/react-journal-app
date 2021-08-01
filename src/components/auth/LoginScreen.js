
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';


import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;


    const handleLoginWithUserPassword = (e) => {
        e.preventDefault();

        if( isFormValid() ) {
            dispatch( startLoginWithEmailPassword( email, password ) );
        }
    }

    const isFormValid = () => {

        if( email === '' ) {
            dispatch( setError('The email is required') );
            return false;
        } else if( password === '' ) {
            dispatch( setError('The password is required') );
            return false;
        }

        dispatch( removeError() );
        return true;
    }
    
    const handleLoginWithGoogle = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <>
            <h3 className="auth__title">LoginScreen</h3>

            {
                msgError && 
                    ( <p className="alert alert-danger mt-5">{ msgError }</p> )
            }

            <form
                onSubmit={ handleLoginWithUserPassword }
            >

                <input 
                    type="email"
                    name="email"
                    className="auth__input"
                    placeholder="Your Email"
                    onChange={ handleInputChange }
                    value={ email }
                />

                <input 
                    type="password"
                    name="password"
                    className="auth__input"
                    placeholder="Your Password"
                    onChange={ handleInputChange }
                    value={ password }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-5"
                    disabled={ loading }
                >
                    Login
                </button>

                <div 
                    className="google-btn mt-5"
                    onClick={ handleLoginWithGoogle }
                    disabled={ loading }
                >
                    <div className="google-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Icon"/>
                    </div>
                    <div className="text-center google-text">
                        <p>Sign in with google</p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="btn btn-link mt-1"
                >
                    Create new account
                </Link>

            </form>


        </>
    )
}


import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmailPassword } from '../../actions/auth';


import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email:'',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = ( e ) => {
        e.preventDefault();

        if( isFormValid( name, email, password, password2 ) ) {
            dispatch( startRegisterWithEmailPassword( name, email, password ) );

        }

    }

    const isFormValid = () => {
        
        if( name === '' ) {
            dispatch( setError( 'Name is required!' ) );
            return false;
            
        }else if( email === '' ) {
            dispatch( setError( 'Email is required!' ) );
            return false;

        }else if( !validator.isEmail( email ) ) {
            dispatch( setError( 'Email is not valid!' ) );
            return false;

        }else if( password === '' ) {
            dispatch( setError( 'Password is required!' ) );
            return false;

        }else if( password2 === '' ) {
            dispatch( setError( 'Confirm password is required!' ) );
            return false;

        }else if( (password !== password2) || ( password.length < 5 ) ) {
            dispatch( setError( 'Password shoud be at least 6 characters and match each other!' ) );
            return false; 

        }

        dispatch( removeError() );
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Register Screen</h3>

            {
                msgError &&
                    ( <p className="alert alert-danger mt-5" >{ msgError }</p> )
            }

            <form
                onSubmit={ handleRegister }
            >

                <input 
                    type="text"
                    name="name"
                    className="auth__input"
                    placeholder="Name"
                    onChange={ handleInputChange }
                    value={ name }
                />

                <input 
                    type="email"
                    name="email"
                    className="auth__input"
                    placeholder="Email"
                    onChange={ handleInputChange }
                    value={ email }
                />

                <input 
                    type="password"
                    name="password"
                    className="auth__input"
                    placeholder="Password"
                    onChange={ handleInputChange }
                    value={ password }
                />

                <input 
                    type="password"
                    name="password2"
                    className="auth__input"
                    placeholder="Confirm"
                    onChange={ handleInputChange }
                    value={ password2 }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-5"
                    disabled={ loading }
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="btn btn-link mt-1"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}

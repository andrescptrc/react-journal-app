
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { startLogout } from '../../actions/auth';
import { cleaningNotesLogout, startAddNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';


export const Sidebar = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );
    const { name } = useSelector( state => state.auth );
    
    const handleLogout = () => {
        dispatch( startLogout() );
        dispatch( cleaningNotesLogout() );
    }

    const handleNewEntry = () => {
        dispatch( startAddNewNote() ); 
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3><i className="far fa-moon"></i> { name }</h3>
                <button
                    className="btn"
                    onClick={ handleLogout }
                    disabled={ loading }
                >
                    Logout
                </button>
            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleNewEntry }
                disabled={ loading }
            >
                <div className="journal__new-entry--btn">
                    <i className="far fa-calendar-plus fa-5x"></i>
                    <p>New Entry</p>
                </div>
            </div>

            <JournalEntries />

        </aside>
    )
}

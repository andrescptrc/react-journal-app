
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { activeNote, startDeletingNotes } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NotesScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.notes );
    
    const [ formInputValues, handleInputChange, reset ] = useForm( note );
    const { title, body, id } = formInputValues;

    const activeId = useRef( note.id );

    useEffect( () => { 

        if( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
 
    }, [ note, reset ]);

    useEffect( () => {

        dispatch( activeNote( formInputValues.id, { ...formInputValues } ) );

    }, [ formInputValues, dispatch ] );

    
    const handleDelete = () => {
        dispatch( startDeletingNotes( id ) );
    }

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input 
                    name="title"
                    type="text"
                    className="notes__title-input"
                    autoComplete="off"
                    placeholder="Some awesome title"
                    onChange={ handleInputChange }
                    value={ title }
                />

                <textarea 
                    name="body"
                    className="notes__body-textarea"
                    placeholder="What happened today"
                    onChange={ handleInputChange }
                    value={ body }
                >

                </textarea>
            </div>
            
            {
                note.url &&
                    (<div className="notes__image">
                        <img src={ note.url } alt="Notes"/>
                    </div>)
            }

            <button 
                className="btn btn-danger btn-block"
                onClick={ handleDelete }
            > 
                Delete Note
            </button>

        </div>
    )
}

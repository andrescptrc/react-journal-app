
import React from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { startSavingNotes, startUploadingImage } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch( startSavingNotes( note ) );
    }

    const handleInputFile = () => {
        document.querySelector('.input__file').click();
    }

    const handleFile = (e) => {

        const file = e.target.files[0];
        if( file ) {
            dispatch( startUploadingImage( file ) );
        }
    } 

    return (
        <div className="notes__app-bar">
            <span>28 de Agosto 2020</span>

            <div>

                <input 
                    type="file"
                    className="input__file"
                    onChange={ handleFile }
                    style={{ display: 'none' }}
                />

                <button 
                    className="btn"
                    onClick={ handleInputFile }
                >
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}

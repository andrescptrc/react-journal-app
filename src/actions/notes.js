
import Swal from "sweetalert2";


import { db } from "../firestore/firestore-config";
import { loadNotes } from "../helpers/loadNotes";
import { uploadFile } from "../helpers/uploadFile";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";


export const startAddNewNote = () => {
    return async( dispatch, getState ) => {

        try {

            dispatch( startLoading() );  

            const { uid } = getState().auth;
            
            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime()
            }

            const doc = await db.collection(`${ uid }/journal/notes`).add( newNote ); 
            dispatch( addNewNote( doc.id, newNote ) );
            dispatch( activeNote( doc.id, newNote ) );

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

export const startLoadingNotes = ( uid ) => {

    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSavingNotes = ( note ) => {

    return async( dispatch, getState ) => {

        try {

            const { uid } = getState().auth;

            if( !note.url ) {
                delete note.url;
            }

            const noteToFirestore = { ...note };
            delete noteToFirestore.id;

            await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );
            dispatch( refreshNotes( note.id, note ) );

            Swal.fire('Saved', note.title, 'success');
            
        } catch (error) {
            
        }

    }   
}

export const startUploadingImage = ( file ) => {

    return async( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await uploadFile( file );
        activeNote.url = fileUrl;

        dispatch( startSavingNotes( activeNote ) );

        Swal.close();
    }
}

export const startDeletingNotes = ( id ) => {

    return async( dispatch, getState ) => {

        try {

            const { uid } = getState().auth;

            Swal.fire({
                title: 'Deleating...',
                text: 'Please wait...',
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            await db.doc(`${ uid }/journal/notes/${ id }`).delete();
            dispatch( deleteNote( id ) );

            Swal.close();

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            });  
        }

    }
}

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const refreshNotes = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id, 
        ...note
    }
});

export const deleteNote = ( id ) => ({
    type: types.notesDeleted, 
    payload: id
});

export const cleaningNotesLogout = () => ({
    type: types.notesLogoutCleaning
});


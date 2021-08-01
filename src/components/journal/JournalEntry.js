
import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({
    id,
    title,
    body,
    date,
    url
}) => {

    const dispatch = useDispatch();
    const noteDate = moment( date );

    const note = {
        title,
        body,
        date,
        url
    }

    const handleActiveNote = () => {
        dispatch( activeNote( id, note ) );
    }

    return (
        <div 
            className="journal__entry"
            onClick={ handleActiveNote }
        >
            {
                url &&
                (
                    <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${ url })`
                    }}
                    >
                    </div> 
                )             
            }

            <div className="journal__entry-content">
                <p className="journal__entry-title">{ title }</p>
                <p className="journal__entry-body">{ body && ( `${ body.slice(0, 20) }...` ) }</p>
            </div>

            <div className="journal__entry-date-box">
                <span> { noteDate.format('dddd') } </span>
                <h4> { noteDate.format('Do') } </h4>
            </div>
        </div>
    )
}

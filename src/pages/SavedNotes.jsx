import React, { useEffect } from "react"; 
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

function SavedNotes(props) { 
    const handleDeleteNote = (index) => {
        const updatedNotes = props.notes.filter((note, i) => i !== index);
        props.setNotes(updatedNotes);
        // Update local storage after deleting note
        localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    };

    useEffect(() => {
        // Load saved notes from local storage on component mount
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
        if (savedNotes) {
            props.setNotes(savedNotes);
        }
    }, []);

    return(
        <div>
            <div className="main-container-noteapp-section-sticky-savedSection">
                <Link to="/">
                    <button>New Note</button>
                </Link>
            </div>
            
            <div className="main-container-noteapp-section-flow-savedsection">
                <div className="saveSection-MyNotes">
                    <h1 className="my-notes">My Notes</h1>
                </div>

                <div className="your-saved-notes-container">
                    {props.notes.map((note, index) => (
                        <div key={index} className="note-container">
                            <p className="delete-icon" onClick={() => handleDeleteNote(index)}> <DeleteIcon/> </p>
                            <h1>{note.title}</h1>
                            <p>{note.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SavedNotes;

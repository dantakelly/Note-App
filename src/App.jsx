import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NoteApp from "./pages/NoteApp";
import SavedNotes from "./pages/SavedNotes";
import NoPage from "./pages/NoPage";

function App() { 
    const [savedNotes, setSavedNotes] = useState([]);

    useEffect(() => {
        // Load saved notes from local storage on component mount
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
        if (savedNotes) {
            setSavedNotes(savedNotes);
        }
    }, []);

    function addNoteHandler(newNote) {
        setSavedNotes(prevNotes => [...prevNotes, newNote]);
        // Update local storage after adding new note
        localStorage.setItem("savedNotes", JSON.stringify([...savedNotes, newNote]));
    }

    return(
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <NoteApp onAdd={addNoteHandler} />} />
                    <Route path="/savednotes" render={() => <SavedNotes notes={savedNotes} setNotes={setSavedNotes} />} />
                    <Route component={NoPage} />
                </Switch>
            </Router>
        </div>
    )
}
export default App;

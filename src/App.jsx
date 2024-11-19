import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import Split from "react-split";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function App() {
	
	const [notes, setNotes] = useState(
		() => JSON.parse(localStorage.getItem("notes")) || []
	);

	// setting an initial value for the current note's id, if there are none yet
	// if there are no notes, currentNoteId starts an empty string and avoid crashing the app
	const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");

	const currentNote =
		notes.find((note) => note.id === currentNoteId) || notes[0];

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	// create a new note

	function createNewNote() {
		const newNote = {
			id: nanoid(),
			body: "#Type your markdown note's title here",
		};
		// updating the list of notes
		setNotes((prevNotes) => [newNote, ...prevNotes]);
		// sets the newly created note as teh current/active note
		setCurrentNoteId(newNote.id);
	}

	// update(modify) an existing note

	function updateNote(text) {
		// the most recently modified note needs to be at the top for convenience, so we store it in the state
		setNotes((oldNotes) => {
			// create a new empty array
			const newArray = [];
			// loop over the original array
			for (let i = 0; i < oldNotes.length; i++) {
				const oldNote = oldNotes[i];

				// if the id of the old note and the id of note the user has selected to modify match
				// put the updated note at the beginning of the newly created array
				if (oldNote.id === currentNoteId) {
					newArray.unshift({ ...oldNote, body: text });
					// else push the old note to the end of the newly created array
				} else {
					newArray.push(oldNote);
				}
			}
			// return the new array
			return newArray;
		});
	}

	// delete a note

	function deleteNote(event, noteId) {
		// This prevents the click event from "bubbling up" or affecting parent element sidebar
		event.stopPropagation();
		// create a new array of notes by filtering the old array,
		// and keeps all the notes except for the note to be deleted
		setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
	}

	return (
		<main>
			{notes.length > 0 ? (
				<Split className="split" sizes={[30, 70]} direction="horizontal">
					<Sidebar
						notes={notes}
						currentNote={currentNote}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={currentNote} updateNote={updateNote} />
					)}
				</Split>
			) : (
				<div className="no-notes">
					<h1>You have no notes yet</h1>
					<button className="first-note" onClick={createNewNote}>
						Create a Note
					</button>
				</div>
			)}
		</main>
	);
}

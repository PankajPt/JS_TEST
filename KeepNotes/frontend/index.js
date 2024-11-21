import config from "./config.js";
import utils from "./utils.js"
let noteIdCounter = 1;

document.getElementById('add-note-btn').addEventListener('click', addNote);

function addNote() {
    const noteContainer = document.getElementById('notes-container');
    const note = document.createElement('div');
    
    // Generate a unique ID for each note
    const noteId = `note-${noteIdCounter}`;
    note.setAttribute('id', noteId);
    note.classList.add('note');

    // Title input
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Note Title');
    let titleValue = '';
    let bodyValue = '';
    titleInput.addEventListener('input', function () {
        titleValue = titleInput.value.trim()
        // if (titleValue === '' && note.querySelector('textarea').value === '') {
        //     note.remove();
        // }
        utils.checkSubmitButton(titleValue, bodyValue, submitButton)
    });

    // Body textarea
    const bodyTextarea = document.createElement('textarea');
    bodyTextarea.setAttribute('placeholder', 'Note Body');

    bodyTextarea.addEventListener('input', function () {
        bodyValue = bodyTextarea.value.trim()
        // if (bodyValue === '' || titleValue === '') {
        //     note.remove();
        // }
        utils.checkSubmitButton(titleValue, bodyValue, submitButton)
        
    });

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.classList.add('submit-btn');
    submitButton.disabled = true

    utils.checkSubmitButton(titleValue, bodyValue, submitButton)

    submitButton.addEventListener('click', function () {
        const userNoteData = {
            title: titleInput.value,
            body: bodyTextarea.value
        }

        utils.postNote(userNoteData, config.git_uri)
            .then( (data) => {
                alert(`Note Submitted...\nTitle: ${data.title}\nNote: ${data.body}`)
                submitButton.disabled = true
            })
            .catch( (err) => {
                alert(`Something Went Wrong...\n${err.message}`)
            })
    });

    note.appendChild(titleInput);
    note.appendChild(bodyTextarea);
    note.appendChild(submitButton);
    noteContainer.appendChild(note);
    noteIdCounter++;
}

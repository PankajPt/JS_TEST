const fs = require('fs');

// Add Note
const notesArr = [];
let addNote = (title, body) => {
    if ( fs.existsSync('noteData.json')){
        const data = fs.readFileSync('noteData.json', 'utf-8')
        try {
            const parseData = JSON.parse(data)
            notesArr.push(...parseData)
            // console.log(notesArr)
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }

    const note = {
        title,
        body
    }
    notesArr.push(note)
    fs.writeFileSync('noteData.json', JSON.stringify(notesArr, null, 2))
}

// List all items
let getAll = () => {
    console.log('Getting all notes')
}

// Remove note
let removeNote = (title) => {
    console.log(`Remove note with title"${title}"`)
}

// Read note
let getNote = (title) => {
    const note = JSON.parse(fs.readFileSync('noteData.json', 'utf-8'));
    console.log(`${title}: ${note[0].body}`)
}

module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote
}
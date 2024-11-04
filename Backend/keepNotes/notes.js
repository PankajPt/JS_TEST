const fs = require('fs');
const { indexOf, split } = require('lodash');

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

    for (const arr of notesArr){
        if( arr.title === title ){
            console.log(`Duplicate values are not allowed in ADD method. Please use update to modifiy existing notes.`)
        } else {
            const note = {
                title,
                body
            }
            notesArr.push(note)
            fs.writeFileSync('noteData.json', JSON.stringify(notesArr, null, 2))
        }
    }
}

// List all items
let getAll = () => {
    console.log('Getting all notes')
}

// Remove note
let removeNote = (title) => {
    if ( fs.existsSync('noteData.json')){
        const data = JSON.parse(fs.readFileSync('noteData.json', 'utf-8'))
        notesArr.push(...data)
        for ( const element of data ){
            if ( element.title === title){
                const index = indexOf(element)
                notesArr.splice(index, 1)
                console.log(`note with title ${title} has been removed.`)
            }
        }
        fs.writeFileSync('noteData.json', JSON.stringify(notesArr, null, 2))
    }
}

// Read note
let getNote = (title) => {
    const note = JSON.parse(fs.readFileSync('noteData.json', 'utf-8'));
    console.log(`${title}: ${note[0].body}`)
}

// Update text in notes
let updateNote = (title, body) => {
        if ( fs.existsSync('noteData.json')){
        const data = fs.readFileSync('noteData.json', 'utf-8')
        try {
            const parseData = JSON.parse(data)
            notesArr.push(...parseData)
            for (const arr of notesArr){
                if( arr.title === title ){
                    arr.body = body;
                    fs.writeFileSync('noteData.json', JSON.stringify(notesArr, null, 2))
                    console.log(`note with title "${title}" has been updated.`)
                }
            }
            // console.log(notesArr)
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }


}
module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    updateNote
}
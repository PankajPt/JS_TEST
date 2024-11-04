const fs = require('fs');
const { indexOf, split } = require('lodash');
let duplicateValue = false;
let index = -1;
// Add Note
const notesArr = [];
let pushData = (title, body) => {
    const note = {
        title,
        body
    }
    notesArr.push(note)
    fs.writeFileSync('noteData.json', JSON.stringify(notesArr, null, 2))
    console.log(`Note added in database.`)
}

let addNote = (title, body) => {
    if ( fs.existsSync('noteData.json')){
        const data = fs.readFileSync('noteData.json', 'utf-8')
        try {
            const parseData = JSON.parse(data)
            notesArr.push(...parseData)
            for (const arr of notesArr){
                if( arr.title === title ){
                    duplicateValue = true
                }
            }
            if (duplicateValue){
                console.log(`Duplicate values are not allowed in ADD method. Please use update to modifiy existing notes.`)
            } else {
                pushData(title, body)
            }
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    } else {
        pushData(title, body)
    }
}

// List all items
let getAll = () => {
    const notes = JSON.parse(fs.readFileSync('noteData.json', 'utf-8'))
    for (const note of notes){
        console.log(`Title: ${note.title}\t Body: ${note.body}`)
    }
}

// Remove note
let removeNote = (title) => {
    if ( fs.existsSync('noteData.json')){
        const data = JSON.parse(fs.readFileSync('noteData.json', 'utf-8'))
        notesArr.push(...data)
        for ( const element of notesArr ){
            if ( element.title === title ){
                duplicateValue=true;
                index = notesArr.indexOf(element)
            }
        }
        if (duplicateValue && index !== -1){
            notesArr.splice(index, 1)
            fs.writeFileSync('noteData.json', JSON.stringify(notesArr, null, 2))
            console.log(`note with title ${title} has been removed.`)
        } else {
            console.log(`Mentioned title: "${title}" not found in notes list.`)
        }
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
                    duplicateValue=true;
                    index = notesArr.indexOf(arr)
                }
            }
            if (duplicateValue && index !== -1){
                notesArr[index].body = body;
                fs.writeFileSync('noteData.json', JSON.stringify(notesArr, null, 2))
                console.log(`note with title "${title}" has been updated.`)
            } else {
                console.log(`Mentioned title: "${title}" not found in notes list.`)
            }
            // console.log(notesArr)
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    } else {
        console.log('"noteData.json" File not found.')
    }


}
module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    updateNote
}
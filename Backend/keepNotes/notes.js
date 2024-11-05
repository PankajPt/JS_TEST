const fs = require('fs');
// const { unlinkSync } = require('node:fs');
const unlinkSync = fs.unlinkSync;
let duplicateValue = false;
let index = -1;
const notesArr = [];
let noteArrLen = notesArr.length;

let pushData = (title, body) => {
    const note = {
        title,
        body
    }
    notesArr.push(note)
    fs.writeFileSync('noteData.json', JSON.stringify(notesArr, null, 2))
    console.log(`Note added in database.`)
}

//remove file in case of no data(blank file) or update array with file data 
const emptyFileHandler = () => {
    if (fs.existsSync('noteData.json')){
        const data = fs.readFileSync('noteData.json', 'utf-8')
        if ( !data ) {
            try {
                unlinkSync('noteData.json')
                console.log(`The corrupted file was cleared successfully.`)
            } catch (error) {
                console.log(`An error occurred while clearing the file. Please remove "noteData.json" manually\nERROR:${error.message}`)
            }
        } else {
            const parseData = JSON.parse(data);
            notesArr.push(...parseData);
            noteArrLen = notesArr.length
        }
    }
}
// Add Note
let addNote = (title, body) => {
    emptyFileHandler();
    if ( noteArrLen ){
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
    } else {
        pushData(title, body)
    }
}

// List all items
let getAll = () => {
    emptyFileHandler();
    if ( noteArrLen ){
        for (const arr of notesArr){
            console.log(`Title: ${arr.title}\t Body: ${arr.body}`)
        }
    } else {
        console.log(`Data not available.`);
    }
}

// Remove note
let removeNote = (title) => {
    emptyFileHandler();
    if ( noteArrLen ){
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
    } else {
        console.log(`Data not available—file is empty`)
    }
}

// Read note
let getNote = (title) => {
    emptyFileHandler();
    if ( noteArrLen ){
        for (const note of notesArr){
            if ( note.title === title){
                duplicateValue=true
                index = notesArr.indexOf(note)
            }
        }
        if ( duplicateValue && index !== -1){
            console.log(`${title}: ${notesArr[index].body}`)
        } else {
            console.log(`Mentioned title: "${title}" not found in notes list.`)
        }
    } else {
        console.log(`Data not available—file is empty`)
    }   
}

// Update text in notes
let updateNote = (title, body) => {
    emptyFileHandler();
    if ( noteArrLen ){
        try {
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
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    } else {
        console.log('"noteData.json" File not found.')
    }    
}

// update exports object with newly created functions 
module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    updateNote
}
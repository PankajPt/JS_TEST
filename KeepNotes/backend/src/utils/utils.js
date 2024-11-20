import * as fs from 'fs'

const notesArray = []
const jsonFile = '../db/notes-data.json'
let isFileAvailable = false;

const emptyFileHandler = function (){
    if(fs.existsSync(jsonFile)){
        const data = fs.readFileSync(jsonFile, 'utf-8')
        if (!data){
            try {
                fs.unlinkSync(jsonFile)
                console.log(`The corrupted file was cleared successfully.`)
            } catch (error) {
                console.log(`An error occurred while clearing the file. Please remove "noteData.json" manually\nERROR:${error.message}`)
            } finally{
                return isFileAvailable = false
            }
        } else {
            const parseData = JSON.parse(data)
            notesArray.push(...parseData)
            return isFileAvailable = true
        }
    } else {
        return isFileAvailable = false
    }
}

const addNote = function (note){
    emptyFileHandler()
    notesArray.push(...JSON.parse(note))
    fs.writeFileSync('notes-data.json', notesArray)
}

const removeNote = function(id){
    isFileAvailable = emptyFileHandler()
    if (isFileAvailable){
        const noteIdx = notesArray.findIndex(index => index.id === parseInt(id))
        if (noteIdx === -1){
            return `Mentioned Index: "${id}" not found in notes list.`
        } else {
            notesArray.splice(noteIdx, 1)
            fs.writeFileSync(jsonFile, JSON.parse(notesArray))
            return `note with index ${id} has been removed.`
        }
    } else {
        console.log(`Data not available — notes-data.json file not exists..`)
    }
}
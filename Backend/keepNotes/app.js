console.log('Starting application...')
const yargs = require('yargs');
const notes = require('./notes.js')

// const _ = require('lodash');
// console.log(process.argv)
// console.log(yArgv);

const userCmd = process.argv[2];
const yArgv = yargs.argv;

if (userCmd === 'add'){
    notes.addNote(yArgv.title, yArgv.body)
} else if( userCmd === 'list' ){
    notes.getAll()
} else if( userCmd === 'read' ){
    notes.getNote(yArgv.title)
} else if( userCmd === 'remove' ){
    notes.removeNote(yArgv.title)
} else if ( userCmd === 'update'){
    notes.updateNote(yArgv.title, yArgv.body)
} else {
    console.log('Command not recognize.')
}
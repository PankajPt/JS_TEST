const yargs = require('yargs');
const yArgv = yargs.argv;
const notes = require('./notes.js')
const userCmd = process.argv[2];
// console.log(process.argv)
// console.log(yargs.argv);
// console.log(process.argv)

console.log('Initializing QuickNotes...')

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
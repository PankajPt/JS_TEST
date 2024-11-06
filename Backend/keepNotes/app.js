const yargs = require('yargs');
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: 'Content of note',
    demand: true,
    alias: 'b'
}
const yArgv = yargs
    .command('add', 'Add new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'All note list')
    .command('read', 'View specific note', {
        title: titleOptions
    })
    .command('remove', 'Remove note from database', {
        title: titleOptions
    })
    .command('update', 'Update content of note.', {
        title: titleOptions,
        body: bodyOptions
    })
    .help()
    .version('1.0.1')
    .argv;

const notes = require('./notes.js')
const userCmd = process.argv[2];

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
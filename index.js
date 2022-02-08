const yargs = require('yargs')
const {addNote, printNotes, removeNote} = require('./notes.controller')

yargs.command({
    command:'add',
    describe:'Add new note to list',
    builder:{
        title:{
            type: 'string',
            describe: 'title of note',
            demandOption: true
        }
    },
    handler({title}) {
        addNote(title)
    }
})

yargs.command({
    command:'list',
    describe:'Print all notes',
    async handler() {
        const notes = await printNotes()
        console.log(notes)
    }
})

yargs.command({
    command:'remove',
    describe:'remove note by id',
    builder:{
        id:{
            type: 'string',
            describe: 'note id',
            demandOption: true
        }
    },
    handler({id}) {
        removeNote(id)
    }
})

yargs.parse()
const notes = require('./notes.js')
const yargs = require('yargs')



yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNotes(argv['title'], argv['body'])
        console.log(`Adding a new note with title ${argv['title']} and body ${argv['body']}`);
    }
})


yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNotes(argv['title'])
        console.log('Removing a note with title ',argv['title']);
    }
})

//Challange 
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler: function () {
        notes.listnotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder:{
        title:{
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        const requiredNote=notes.getNotes(argv['title']);
        console.log(requiredNote);
    }
})

yargs.parse()
const notes = require('./notes');
const yargs = require('yargs');

const argv = yargs.argv;
const command = argv._[0];

if (command === 'add') {
  const note  = notes.addNote(argv.title, argv.body);
  if (note) {
    notes.logNote(argv.title, argv.body);
  } else {
    console.log('Title aleady exits');
  }
} else if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  for(note of allNotes) {
    notes.logNote(note);
  }
} else if (command === 'read') {
  const note = notes.getNote(argv.title.toLowerCase());
  if (note) { 
   notes.logNote(note.title, note.body);
  } else {
    console.log('Note not found');
  }
} else if ( command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title.toLowerCase());
  const message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not known');
}

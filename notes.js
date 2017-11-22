const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}
 
const saveNotes = (notes) => {
  fs.writeFileSync('data.json', JSON.stringify(notes));
}

const logNote = (title, body) => {
  console.log('Note found');
  console.log('---------------');
  console.log(`Title: ${title}`);
  console.log(`Body: ${body}`);
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  const note = {
    title,
    body
  }
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return notes;
  } 
};

const getAll = () => {
  return fetchNotes();
};

const getNote = (title) => {
  let notes = fetchNotes();
  return notes.filter(note => note.title.toLowerCase() === title)[0];
};

const removeNote = (title) => {
  const notes = fetchNotes();
  const updatedNote = notes.filter(note => note.title.toLowerCase() !== title);
  saveNotes(updatedNote);
  return updatedNote.length !== notes.length;
};

module.exports = {
  addNote, 
  getNote,
  getAll,
  removeNote,
  logNote
}

// Create a new Parse object.
let projectNote = new Parse.Object("ProjectNote");

// Set the attributes of the object.
projectNote.set("notes", "This is a note about a project.");
projectNote.set("contents", "The contents of the note.");
projectNote.set("objectId", "my-unique-object-id");

// Save the object to the Parse server.
projectNote.save();


// Create a new Parse object.
let projectFile = new Parse.Object("projectfile");

// Set the attributes of the object.
projectFile.set("ACL", {}); // No ACL yet.
projectFile.set("owner", null); // No owner yet.
projectFile.set("project", null); // No project yet.
projectFile.set("filename", "projectfile.pdf");
projectFile.set("objectId", "my-unique-object-id");
projectFile.set("createdAt", new Date());
projectFile.set("updatedAt", new Date());
projectFile.set("fileattach", null); // No file attached yet.
projectFile.set("is_deleted", false);

// Save the object to the Parse server.
projectFile.save();
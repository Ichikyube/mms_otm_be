let taskfile = new Parse.Object("taskfile");

// Set the attributes of the object.
taskfile.set("task", null); // No task yet.
taskfile.set("owner", null); // No owner yet.
taskfile.set("_rperm", []); // No read permissions yet.
taskfile.set("_wperm", []); // No write permissions yet.
taskfile.set("filename", "taskfile.pdf");
taskfile.set("objectId", "my-unique-object-id");
taskfile.set("createdAt", new Date());
taskfile.set("updatedAt", new Date());
taskfile.set("fileattach", null); // No file attached yet.
taskfile.set("is_deleted", false);

// Save the object to the Parse server.
taskfile.save();
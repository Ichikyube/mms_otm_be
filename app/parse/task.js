let task = new Parse.Object("task");

// Set the attributes of the object.
task.set("ACL", {}); // No ACL yet.
task.set("tags", []); // No tags yet.
task.set("type", "New Task");
task.set("follow", []); // No followers yet.
task.set("number", 1);
task.set("enddate", "2023-12-31");
task.set("related", null); // No related object yet.
task.set("assignto", []); // No assignees yet.
task.set("objectId", "my-unique-object-id");
task.set("priority", "High");
task.set("repeated", "No");
task.set("taskname", "My New Task");
task.set("checklist", []); // No checklist items yet.
task.set("createdAt", new Date());
task.set("startdate", "2023-09-12");
task.set("updatedAt", new Date());
task.set("is_deleted", false);
task.set("statustask", "In Progress");
task.set("description", "This is a new task.");
task.set("related_reference", null); // No related object reference yet.

// Save the object to the Parse server.
task.save();
let taskreminder = new Parse.Object("taskreminder");

// Set the attributes of the object.
taskreminder.set("date", "2023-09-12");
taskreminder.set("title", "My Task Reminder");
taskreminder.set("_rperm", []); // No read permissions yet.
taskreminder.set("_wperm", []); // No write permissions yet.
taskreminder.set("createby", null); // No createby yet.
taskreminder.set("objectId", "my-unique-object-id");
taskreminder.set("reminder", null); // No reminder yet.
taskreminder.set("createdAt", new Date());
taskreminder.set("updatedAt", new Date());

// Save the object to the Parse server.
taskreminder.save();
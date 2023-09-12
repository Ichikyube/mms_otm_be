let errorlog = new Parse.Object("errorlog");

// Set the attributes of the object.
errorlog.set("_rperm", []); // No read permissions yet.
errorlog.set("_wperm", []); // No write permissions yet.
errorlog.set("objectId", "my-unique-object-id");
errorlog.set("createdAt", new Date());
errorlog.set("updatedAt", new Date());
errorlog.set("error_object", null); // No error object yet.
errorlog.set("error_message", null); // No error message yet.

// Save the object to the Parse server.
errorlog.save();
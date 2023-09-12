let project = new Parse.Object("project");

// Set the attributes of the object.
project.set("po", "PO-123456");
project.set("name", "My Project");
project.set("value", "10000");
project.set("_rperm", []);
project.set("_wperm", []);
project.set("number", "1");
project.set("vendor", "Acme Corp.");
project.set("enddate", "2023-12-31");
project.set("objectId", "my-unique-object-id");
project.set("createdAt", new Date());
project.set("startdate", "2023-09-12");
project.set("updatedAt", new Date());
project.set("is_deleted", false);

// Save the object to the Parse server.
project.save();
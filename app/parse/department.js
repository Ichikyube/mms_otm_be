let department = new Parse.Object("departments");

// Set the attributes of the object.
department.set("name", "Engineering");
department.set("parent", null); // No parent department.
department.set("status", true);
department.set("manager", null); // No manager yet.
department.set("objectId", "my-unique-object-id");
department.set("createdAt", new Date());
department.set("updatedAt", new Date());
department.set("is_deleted", false);
department.set("is_activated", true);

// Save the object to the Parse server.
department.save();
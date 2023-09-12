let masterYear = new Parse.Object("masteryear");

// Set the attributes of the object.
masterYear.set("year", "2023");
masterYear.set("_rperm", []); // No read permissions yet.
masterYear.set("_wperm", []); // No write permissions yet.
masterYear.set("objectId", "my-unique-object-id");
masterYear.set("createdAt", new Date());
masterYear.set("updatedAt", new Date());
masterYear.set("is_deleted", false);

// Save the object to the Parse server.
masterYear.save();
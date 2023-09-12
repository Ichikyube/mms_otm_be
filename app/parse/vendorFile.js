let vendorfile = new Parse.Object("vendorfile");

// Set the attributes of the object.
vendorfile.set("owner", null); // No owner yet.
vendorfile.set("_rperm", []); // No read permissions yet.
vendorfile.set("_wperm", []); // No write permissions yet.
vendorfile.set("vendor", null); // No vendor yet.
vendorfile.set("filename", "vendorfile.pdf");
vendorfile.set("objectId", "my-unique-object-id");
vendorfile.set("createdAt", new Date());
vendorfile.set("updatedAt", new Date());
vendorfile.set("fileattach", null); // No file attached yet.
vendorfile.set("is_deleted", false);

// Save the object to the Parse server.
vendorfile.save();
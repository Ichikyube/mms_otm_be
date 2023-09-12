let certificate = new Parse.Object("certificate");

// Set the attributes of the object.
certificate.set("ACL", {}); // No ACL yet.
certificate.set("file", null); // No file yet.
certificate.set("name", "My Certificate");
certificate.set("notes", "This is a certificate.");
certificate.set("vendor", "Acme Corp.");
certificate.set("filename", "certificate.pdf");
certificate.set("objectId", "my-unique-object-id");
certificate.set("reminder", 30); // 30 days reminder.
certificate.set("createdAt", new Date());
certificate.set("issuedate", "2023-09-12");
certificate.set("updatedAt", new Date());
certificate.set("checkingdt", null); // No checking date yet.
certificate.set("expiredate", "2024-09-12");
certificate.set("is_deleted", false);
certificate.set("expdatetime", null); // No expiration date time yet.
certificate.set("issuedatetime", null); // No issue date time yet.

// Save the object to the Parse server.
certificate.save();
let dailyReport = new Parse.Object("dailyreport");

// Set the attributes of the object.
dailyReport.set("notes", "This is a daily report.");
dailyReport.set("_rperm", []);
dailyReport.set("_wperm", []); 
dailyReport.set("changeat", new Date());
dailyReport.set("changeby", null);
dailyReport.set("objectId", "my-unique-object-id");
dailyReport.set("createdAt", new Date());
dailyReport.set("createdby", null);
dailyReport.set("updatedAt", new Date());
dailyReport.set("createdate", "2023-09-12");
dailyReport.set("is_deleted", false);
dailyReport.set("depchangeby", null);
dailyReport.set("depcreateby", null);

// Save the object to the Parse server.
dailyReport.save();
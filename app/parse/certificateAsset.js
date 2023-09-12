let certificateAsset = new Parse.Object("certificateasset");

// Set the attributes of the object.
certificateAsset.set("asset", {
  type: "Pointer",
  targetClass: "asset",
});
certificateAsset.set("_rperm", {
  type: "Array",
  contents: {
    type: "String",
  },
});
certificateAsset.set("_wperm", {
  type: "Array",
  contents: {
    type: "String",
  },
});
certificateAsset.set("objectId", "my-unique-object-id");
certificateAsset.set("createdAt", new Date());
certificateAsset.set("updatedAt", new Date());
certificateAsset.set("is_deleted", false);
certificateAsset.set("certificate", {
  type: "Pointer",
  targetClass: "certificate",
});

// Save the object to the Parse server.
certificateAsset.save()
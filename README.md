To Do:
Buat Docker Image untuk backend
Sambungkan dengan volume ke path folder project
Buat Docker Compose
Buat script untuk menjalankan deploy database


Create
ParseObject todo = ParseObject('Todo');
todo.set<String>('title', 'My Todo');
todo.set<bool>('done', false);
await todo.save();

const MyClass = Parse.Object.extend('MyClass');
const myClass = new MyClass();

myClass.set('field', 'value');
myClass.save()
  .then((object) => {
    // The object was saved successfully.
  }, (error) => {
    // The save failed.
  });


Read
const readTodos = async function () {
  const parseQuery = new Parse.Query('Todo');
  try {
    let todos = await parseQuery.find();
    // Process the retrieved todos
  } catch (error) {
    // Handle the error
  }
};

const MyClass = Parse.Object.extend('MyClass');
const query = new Parse.Query(MyClass);

query.find()
  .then((results) => {
    // results is an array of Parse.Object.
  }, (error) => {
    // The query failed.
  });


Update
ParseQuery<ParseObject> query = ParseQuery.getQuery("Todo");
query.getInBackground("objectId", new GetCallback<ParseObject>() {
    public void done(ParseObject todo, ParseException e) {
        if (e == null) {
            todo.put("title", "Updated Todo");
            todo.put("done", true);
            todo.saveInBackground();
        } else {
            // Handle the error
        }
    }
});

const MyClass = Parse.Object.extend('MyClass');
const query = new Parse.Query(MyClass);

query.get('objectId')
  .then((object) => {
    object.set('field', 'new value');
    return object.save();
  })
  .then((object) => {
    // The object was updated.
  }, (error) => {
    // The query failed.
  });


Delete
const deleteTodo = async function (objectId) {
  const parseQuery = new Parse.Query('Todo');
  try {
    let todo = await parseQuery.get(objectId);
    await todo.destroy();
    // Object deleted successfully
  } catch (error) {
    // Handle the error
  }
};

const MyClass = Parse.Object.extend('MyClass');
const query = new Parse.Query(MyClass);

query.get('objectId')
  .then((object) => {
    return object.destroy();
  })
  .then((object) => {
    // The object was deleted.
  }, (error) => {
    // The query failed.
  });



const Employee = Parse.Object.extend('Employee');
const query = new Parse.Query(Employee);
query.find().then((employees) => {
  // employees is an array of Parse.Object.
  console.log(employees);
}, (error) => {
  // The query failed.
  console.error(error);
});
employees.forEach((employee) => {
  console.log(employee.get('columnName'));
});

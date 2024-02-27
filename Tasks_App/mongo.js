const url = "mongodb://localhost:27017";
const databaseName = "tasks-app";
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(url);

const id = new ObjectId();
console.log(id.getTimestamp());

client
  .connect()
  .then((response) => {
    console.log("Connected to database ");
    const db = client.db(databaseName);
    // db.collection("users")
    //   .insertMany([
    //     {
    //       name: "Gunther",
    //       age: 25,
    //     },
    //     {
    //       name: "Jen",
    //       age: 27,
    //     },
    //   ])
    //   .then(() => console.log("Documents inserted sucessfully"))
    //   .catch((err) => console.log(`Oh no error adding users ${err}`));

    //Challange

    // db.collection("tasks")
    //   .insertMany([
    //     {
    //       description: "Study Hard",
    //       completed: true,
    //     },
    //     {
    //       description: "Exercise",
    //       completed: false,
    //     },
    //     {
    //       description: "Sleep",
    //       completed: true,
    //     },
    //   ])
    //   .then(() => console.log("Documents inserted sucessfully"))
    //   .catch((err) => console.log(`Oh no error adding tasks ${err}`));

    // const users = db
    //   .collection("users")
    //   .find({})
    //   .limit(1)
    //   .toArray()
    //   .then((users) => {
    //     users.forEach((user) => {
    //       console.log(user);
    //     });
    //   });

    //Challange
    // const user = db
    //   .collection("users")
    //   .findOne({ _id: new ObjectId("65d571d29418be078bfa9b57") })
    //   .then((user) => {
    //     console.log(user);
    //   });

    //   const updateUser = db
    //   .collection("users")
    //   .updateOne({ _id: new ObjectId('65d571d29418be078bfa9b57')},
    //   {$set:{name:"Jenilia"}})
    //   .then((result)=>{
    //     console.log(result);
    //   })

    //Challange
    // const updateTask = db
    //   .collection("tasks")
    //   .updateMany({}, { $set: { completed: true } })
    //   .then((result) => {
    //     console.log(result);
    //   });

    const deleteTask = db
      .collection("tasks")
      .deleteOne({ description: "Sleep" })
      .then((result) => {
        console.log(result);
      });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

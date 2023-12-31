const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleWare
app.use(cors());
app.use(express.json()); // eta set na korle body undefined thakto

const uri =
  "mongodb+srv://YousufJoy:Esdwb76KLVXUzzgb@cluster0.b9hatji.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const usersCollection = database.collection("users");

    //1) Get all users data from frontEnd
    app.get("/users", async (req, res) => {
      //db code
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //1) Get One users data from frontEnd

    app.get("/users/:id", async (req, res) => {
      let id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });

    //2) Post data from FrontEnd
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("New user", user);
      //db code
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    //3) Delete data from frontEnd

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Please delete from db", id);
      //db code
      const query = { _id: new ObjectId(id) }; // Ekhane Object id evabe use korte hobe karon data base ei format ase check korte paro!
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // 4) Update data from frontEnd

    // put thakle update kore na thakle nije theke banay fele
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(id, user);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        updatedUser,
        options
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Simple Crud is running");
});
app.listen(port, () => {
  console.log(`SIMPLE CRUD IS RUNNING ON PORT, ${port}`);
});

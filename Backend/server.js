const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser');


dotenv.config();
// console.log(process.env.MONGO_URL); //to check if its working/connected

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOp';
const app = express()
const port = 3000
app.use(bodyparser.json());

client.connect();

//get all the password
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})
//save password
app.post('/', async(req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult});
})
//delete a password

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
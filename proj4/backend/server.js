require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const app = express();

app.use(cors()); // Enable CORS for routes
app.use(express.json()); // Middleware to parse JSON bodies

const port = process.env.PORT || 3001;

// Mongodb connection

const uri = process.env.CONNECTION_STRING
const client = new MongoClient(uri);

// Endpoint to populate the database
app.post('/api/populate', async (req, res) => {
  try {

    // Connect to database
    console.log("Connecting");
    await client.connect()
    console.log("Finished connecting");

    // Go to collection
    const db = client.db('recipes-group2');
    const collection = db.collection('recipes')


    // Grab data
    const newData = req.body;
    if (newData.signal !== undefined) {
      // Json upload
      const jsonData = fs.readFileSync('recipes.json', 'utf8');
      const data = JSON.parse(jsonData);

      const entriesToPopulate = data.slice(0, 782);
      await collection.insertMany(entriesToPopulate);


    } else if (newData.entry !== undefined) {
      // Single upload
      const { entry } = newData; // Destructure entry
      console.log(entry);
      await collection.insertOne(entry); 
    }


    console.log("Insertion completed")


    res.status(200).send('Database populated successfully');
  } catch (error) {
    console.error('Error adding entry to database:', error)
    res.status(500).send('Error populating database');
  }
});


app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  const searchTerm = query; 

  try {
    const mongodbResponse = await axios.post(
      `${process.env.MONGODB_API_ENDPOINT}/action/find`, // MONGODB_API_ENDPOINT env var
      {
        collection: 'recipes',
        database: process.env.DATABASE_NAME, // DATABASE_NAME env var
        dataSource: process.env.CLUSTER_NAME, // CLUSTER_NAME env var
        filter: {
          "$or": [
            { "name": { "$regex": searchTerm, "$options": "i" } },
            { "description": { "$regex": searchTerm, "$options": "i" } },
            { "ingredients": { "$regex": searchTerm, "$options": "i" } }
            // If we want to search by other fields add them here
          ]
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': process.env.MONGODB_API_KEY // MONGODB_API_KEY env var
        }
      }
    );

    res.json(mongodbResponse.data);
  } catch (error) {
    console.error("Error searching the database:", error);
    res.status(error.response ? error.response.status : 500).send("Error searching the database");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

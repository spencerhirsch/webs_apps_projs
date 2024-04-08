require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();

app.use(cors()); // Enable CORS for routes
app.use(express.json()); // Middleware to parse JSON bodies

const port = process.env.PORT || 3001;

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

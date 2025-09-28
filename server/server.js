import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import 'dotenv/config'; // Use this for ES Module dotenv

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    
    const database = client.db("AnomaliseDB");
    const submissionsCollection = database.collection("submissions");

    // --- API Route for Form Submission ---
    app.post('/api/submit', async (req, res) => {
      try {
        const submission = req.body;
        console.log('Received submission:', submission);

        const result = await submissionsCollection.insertOne(submission);
        console.log(`New submission created with id: ${result.insertedId}`);
        
        res.status(201).json({ message: 'Submission successful', id: result.insertedId });
      } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ message: 'Error saving to database' });
      }
    });

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
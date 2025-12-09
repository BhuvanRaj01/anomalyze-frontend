import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import Submission from './models/Submission.js'; 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Connect to MongoDB Atlas ---
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
  .catch(err => console.error("❌ Failed to connect to MongoDB", err));

app.post('/api/submit', async (req, res) => {
  try {
    console.log('Received raw submission:', req.body);

    // --- TRANSLATION LAYER ---
    // We map the incoming "messy" names to our "clean" Schema names
    const cleanData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phoneNumber,    // Frontend sends 'phoneNumber', we save as 'phone'
      company: req.body.company,
      targetUrl: req.body.targetURL,  // Frontend sends 'targetURL', we save as 'targetUrl'
      scope: req.body.scope,
      tests: req.body.services,       // Frontend sends 'services', we save as 'tests'
      consent: req.body.consent
    };

    // Create and Save
    const newSubmission = new Submission(cleanData);
    const result = await newSubmission.save();
    
    console.log(`✅ Saved to DB with ID: ${result._id}`);
    res.status(201).json({ message: 'Submission successful', id: result._id });

  } catch (error) {
    console.error('❌ Error saving submission:', error);
    
    // Send the specific validation error back to the frontend
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    }
    res.status(500).json({ message: 'Error saving to database' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
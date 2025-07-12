// connection.js
import dotenv from 'dotenv';

import { MongoClient, ServerApiVersion } from "mongodb";

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

// Get the URI from the environment
const uri = process.env.ATLAS_URI;

if (!uri) {
  throw new Error("❌ MongoDB URI is missing! Check your config.env file.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1); // Exit the app if connection fails
}

// Use your actual database name here (e.g., "employeems")
const db = client.db("employeems");

export default db;

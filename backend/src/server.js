import express from "express"; // requires   "type": "module", inside package.json
import dotenv from "dotenv";
import cors from 'cors';

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import ratelLimiter from "./middleware/rateLimiter.js";

/*
  Notes on Route Organization by Concern
  - We can organize routes by different concerns (or categories) 
    to keep them logically grouped, as shown below.

    app.use("/api/products", productRoutes);
    app.use("/api/payments", paymentRoutes);


  Notes: Full-Stack Flow Overview
  - How does a full-stack app link together
    - client for the frontend
    - server for the backend
    - database (e.g mongo) for storing data

    -1 The client sends a request (e.g. via fetch or axios) to the backend to add a new note.
    -2 The server receives the request and sends a query/command to the database to store the note.
    -3 The database saves the note and returns a success or result.
    -4 The server sends a response back to the client (e.g. "Note saved" or the newly created note).
    -5 The client updates the UI to reflect the new note.

  Notes on mongoose
  - Installation 
    inside the folder where you want mongoose inside the terminal - npm install mongoose@7.0.3 (version just for this project)

  Notes Environment variable
  - Install pkg - npm install dotenv

  Notes Express
  express.json() 
  - parses the JSON body content sent by the frontend into a JavaScript object, so your backend can easily access it via req.body.
  - An Express-specific middleware! It’s built into Express to help your server easily handle JSON request bodies.
  - body is the data sent by the frontend to the backend

  app.use()
  - Registers middleware functions in Express.

  Notes Middleware
  - Middleware is code that sits between receiving a request and sending a response.
  - It can inspect, modify, or handle requests and responses.
  - Often used to add features like logging, authentication, parsing, and error handling.

  CORS
  - Cross-origin Resource Sharing
  - A browser security rule
  - When a website tries to get data from another website like our frontend calling an api
    on a different domain the browser might block it for security reasons.

    
*/

// import express
const app = express(); 

// Environment variables
dotenv.config(); // Always call BEFORE connecting
// console.log(process.env.MONGO_URI);

// Cors middleware
app.use(cors({ origin: "http://localhost:5173" }));
// Middleware will parse JSON bodies:  req.body
app.use(express.json());
// Rate limiter middleware
app.use(ratelLimiter);

// Routes
app.use("/api/notes", notesRoute); // Assigning all note-related API endpoints to the /api/notes route

// Connect to mongo databa
connectDB().then(() => {
  console.log("Database connected")
  app.listen(5001, () => {
    console.log("Server started on port 5001");
  });
});
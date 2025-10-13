import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesController.js";

const router = express.Router();

/*
 Routes
 get method 
  - app.get(path, callback)
  - The route path (a string like "/api/notes")
  - The callback function that gets executed when a request matches that route.

  Seperate each routes callback function into its own file (Controller folder) for better readability

*/

// Routes
// Get
router.get("/", getAllNotes);
// get specific note
router.get("/:id", getNoteById);
// Post
router.post("/", createNote);
// Edit
router.put("/:id", updateNote);
// Delete
router.delete("/:id", deleteNote);

export default router
import Note from "../models/Note.js"

// Controllers
/*
  Notes
  Controllers
  - Contains the logic that runs when that route is accessed. It processes the request, interacts with models or services, and prepares the response.


  Notes status codes
  200 - Existing resource modified, return updated data
  201 - New resource added

        Meaning                                           When to use
  400	- Bad Request	The request is malformed or invalid	- Missing fields, validation errors
  401	- Unauthorized	Authentication required or failed	- User not logged in or bad token
  403	- Forbidden	Authenticated but not allowed to do this - Access denied despite login
  404	- Not Found	Requested resource doesn’t exist -	Invalid ID or URL
  405	- Method Not Allowed	HTTP method not supported on this route	- Using POST on a GET-only endpoint
  409	- Conflict	Conflict with current state of resource	- Duplicate entries, version conflicts


  Notes MongoDB/mongoose methods
  find()
  - A MongoDB/Mongoose method used to search for documents in a collection.
    Returns all matching documents as an array (empty query {} returns all documents).

  new Note({...})
  - Creates a new Mongoose document instance based on the Note model.
    This creates an object in memory but does not save it to the database yet.

  save()
  - A method on a Mongoose document instance that saves the document to the MongoDB database.
    It’s asynchronous and returns a Promise, so you typically use await to wait for completion.

  findByIdAndUpdate(id, update, options)
  - Is a Mongoose-specific method.
  - id - The _id of the document (string/ObjectId)
  - update - What you want to change (e.g. from { name: "John" } to {name: "Mike"})
  - options - (Optional) Settings to control behavior
    - new: true - is an option you pass to Mongoose update methods (like findByIdAndUpdate) that tells 
      Mongoose to return the updated document after the update is applied, rather than the original document before the update.

*/

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1}); // show newest first
    res.status(200).json(notes);

  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const noteById = await Note.findById(req.params.id);

    if (!noteById) return res.status(404).json({message: "Note not found"});

    res.status(200).json(noteById);
  } catch (error) {
    console.log("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal error" });
  }
};

// Creating note
export const createNote = async (req,res) => {
  try {
    const { title, content } = req.body; 
    const newNote = new Note({title, content});
    
    await newNote.save();
    res.status(201).json(newNote);

  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Updating a note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, {new: true});

    // early return/throw error
    if (!updatedNote) return res.status(404).json({message: "Note not found"});
    res.status(200).json(updateNote);

  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}; 

// Deleting note
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });

  } catch (error) {
    console.log("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
import mongoose from "mongoose";

/*
  Notes creating mongo model
  - 1 create a schema
  - 2 model based off of that schema

  Creating a schema
  - new mongoose.Schema({ ... }) - defines the structure of your MongoDB documents
  - specify fields, their types, and options like required, default, trim, etc. (Mongoose schemas act more like TypeScript type declarations)

  - While technically it's a JavaScript object under the hood, Mongoose schemas act more like TypeScript type declarations — they tell MongoDB (through Mongoose):
    What fields exist
    What type each field should be
    What rules apply (required, default, unique, etc.)

*/

const noteSchema = new mongoose.Schema({
  title: {
    type: String, // uppercase 'String' not 'string'
    requred: true
  },
  content: {
    type: String,
    required: true
  },
}, {timestamps: true}) // createdAt, updatedAt (given with mongoos)

const Note = mongoose.model("Note", noteSchema);

/*
  "Note" – The name of the model (Mongoose will automatically pluralize it to "notes" as the collection name in MongoDB).
  noteSchema – The schema you defined earlier using new mongoose.Schema({ ... }).
  Note – The model you'll use in your code to create, read, update, or delete notes.
*/

export default Note;
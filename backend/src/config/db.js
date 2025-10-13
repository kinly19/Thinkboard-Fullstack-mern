import mongoose from "mongoose"; 

/*
  Notes on mongoose
*/

// Connecting to database (mongoose)
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(`Connection failed ${err}`);
  }
};
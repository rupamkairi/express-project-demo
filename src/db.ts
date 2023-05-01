import mongoose from "mongoose";

// const mongoURI = "mongodb://127.0.0.1:27017/cutshort-api";
const mongoURI =
  "mongodb+srv://rupamkairi:Rupam435Kairi@cluster0.5whf3.mongodb.net/";

export async function dbConnect() {
  try {
    const connection = await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    throw error;
  }
}

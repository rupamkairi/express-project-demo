import mongoose from "mongoose";

const mongoURI = process.env.MONGODBURI!;
console.log(mongoURI);
// const mongoURI =
//   "mongodb+srv://rupamkairi:Rupam435Kairi@cluster0.5whf3.mongodb.net/cutshort-todo";

export async function dbConnect() {
  try {
    const connection = await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    throw error;
  }
}

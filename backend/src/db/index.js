import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectingDB = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Wohoooo");
  } catch (error) {
    console.log(process.env.MONGODB_URI,"process")
    console.log("There was an error connecting DB", error);
    process.exit(1);
  }
};

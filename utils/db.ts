import mongoose from "mongoose";

// Helper function to connect to MongoDB
export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!, {});
  }
};

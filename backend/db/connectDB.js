import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        dbName: "Restaurant-management",
      })
      .then(() => console.log("Database connected successfully"));
  } catch (error) {
    console.error("Database failed to connect:", error.message);
    process.exit(1);
  }
};

export default connectDB;

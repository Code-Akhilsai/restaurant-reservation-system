import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Restaurant-management",
    });

    console.log("Database connected successfully");
    console.log("Connected database:", mongoose.connection.name);
  } catch (error) {
    console.log("Database failed to connect:", error.message);
    process.exit(1);
  }
};

export default connectDB;

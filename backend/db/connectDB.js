import mongoose from "mongoose";

const connectDB = async () => {
  const mongo_uri = process.env.MONGO_URI;
  try {
    await mongoose
      .connect(mongo_uri)
      .then(() => console.log(`Database connected successfully `));
  } catch (error) {
    console.log(`Database failed to connect ${error}`);
  }
};

export default connectDB;

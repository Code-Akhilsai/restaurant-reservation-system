import dotenv from "dotenv";
import mongoose from "mongoose";
import { Table } from "./models/table.models.js";

dotenv.config();

const seedTables = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Restaurant-management",
    });

    const tables = Array.from({ length: 9 }, (_, index) => ({
      table_number: index + 1,
      table_capacity: 4,
    }));

    await Table.deleteMany();

    await Table.insertMany(tables);

    console.log("9 tables seeded successfully");
    console.log("Database:", mongoose.connection.name);

    await mongoose.connection.close();
  } catch (error) {
    console.log("Table seeding failed:", error.message);
    process.exit(1);
  }
};

//seedTables();

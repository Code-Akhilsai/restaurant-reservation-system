import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    table_number: {
      type: Number,
      unique: true,
      required: true,
    },

    table_capacity: {
      type: Number,
      default: 4,
      required: true,
    },
  },
  { timestamps: true },
);

export const Table = mongoose.model("Table", tableSchema);

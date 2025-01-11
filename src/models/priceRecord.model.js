import mongoose, { Schema } from "mongoose";

const priceRecordSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    usd_price: {
      type: Number,
      required: true,
      min: 0,
    }
  },
  {
    timestamps: {
      createdAt: true, 
      updatedAt: false, 
    },
  }
);

const PriceRecord = mongoose.model("PriceRecord", priceRecordSchema);

export default PriceRecord;

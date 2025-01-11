import mongoose, { Schema } from "mongoose"

const statsSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["bitcoin", "ethereum", "matic-network"]
    },
    usd_price: {
        type: Number,
        required: true,
        min: 0
    },
    usd_marketCap: {
        type: String,
        required: true
    },
    usd_24h_change: {
        type: Schema.Types.Decimal128,
        required: true
    }
})

const Stats = mongoose.model("Stats", statsSchema)

export default Stats
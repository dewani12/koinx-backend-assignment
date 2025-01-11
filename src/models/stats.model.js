import mongoose, { Schema } from "mongoose"

const statsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    usd_price: {
        type: Number,
        required: true
    },
    usd_marketcap: {
        type: Number,
        required: true
    },
    usd_price_change_24h: {
        type: Number,
        required: true
    },
    latestUpdatedAt: {
        type: Date,
        required: true
    }
})

const Stats = mongoose.model("Stats", statsSchema)

export default Stats
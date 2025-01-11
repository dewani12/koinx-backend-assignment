import Stats from '../models/stats.model.js'
import PriceRecord from '../models/priceRecord.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'

const getStats = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return new ApiError(400, "Id parameter is missing")
    }

    const cryptoDetails = await Stats.findOne({ name: id })

    if (!cryptoDetails) {
        return new ApiError(404, "CryptoCurrency not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Crypto data fetched successfully", cryptoDetails))
}

const getDeviation = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return new ApiError(400, "Id parameter is missing")
    }

    try {
        const records = await PriceRecord.find({ name: id })
            .sort(
                {
                    createdAt: -1
                }
            )
            .limit(100)

        if (records.length === 0) {
            return new ApiError(404, "No records found for the specified cryptoCurrency")
        }

        const prices = records.map(record => record.usd_price);

        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;

        const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;

        const standardDeviation = Math.sqrt(variance);

        return res
            .status(200)
            .json(new ApiResponse(200, "Deviation calculated successfully",
                {
                    deviation: standardDeviation.toFixed(2)
                }))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, "Internal Server Error"))
    }
}

export { getStats, getDeviation }
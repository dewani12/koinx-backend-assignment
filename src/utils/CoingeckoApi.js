import axios from 'axios'
import { COINGECKO_BASEURL } from '../constants.js'
import Stats from '../models/stats.model.js'
import PriceRecord from '../models/priceRecord.model.js'

const fetchCryptoPrices = async (cryptoIds = ["bitcoin", "ethereum", "matic-network"]) => {
    try {
        const params = {
            vs_currencies: 'usd',
            include_market_cap: true,
            include_24hr_change: true,
            ids: cryptoIds.join(','),
            x_cg_demo_api_key: process.env.COINGECKO_API_KEY
        }
        const response = await axios.get(COINGECKO_BASEURL, { params })
        // console.log(response.data)

        for (const cryptoId of cryptoIds) {
            const data = response.data[cryptoId]
            if (data) {
                await Stats.findOneAndUpdate(
                    {
                        name: cryptoId
                    },
                    {
                        usd_price: data.usd,
                        usd_marketCap: data.usd_market_cap.toString(),
                        usd_24h_change: data.usd_24h_change
                    },
                    {
                        new: true,
                        upsert: true,
                        // runValidators: true
                    }
                )
                console.log(`Updated stats for ${cryptoId}`)
                const priceRecord = new PriceRecord({
                    name: cryptoId,
                    usd_price: data.usd
                })
                await priceRecord.save()
                console.log(`Price record for ${cryptoId} saved`)
            }
        }
    } catch (error) {
        console.log("Error fetching and saving crypto prices", error)
    }
}

export default fetchCryptoPrices

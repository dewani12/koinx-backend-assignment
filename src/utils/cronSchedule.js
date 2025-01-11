import fetchCryptoPrices from './CoingeckoApi.js'
import cron from "node-cron"

cron.schedule('0 */2 * * *', async () => {
    await fetchCryptoPrices()
})
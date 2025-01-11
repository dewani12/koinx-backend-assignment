import fetchCryptoPrices from './CoingeckoApi.js'
import cron from "node-cron"

cron.schedule('* * * * *', async () => {
    // console.log("Running a task every minute")
    await fetchCryptoPrices()
})
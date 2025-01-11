import express from "express"
import statsRouter from "./routes/stats.routes.js"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit: "16kb", extended: true}))

app.use("/api/v1", statsRouter)

export default app
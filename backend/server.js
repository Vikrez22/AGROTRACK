import express from 'express'
import cors from 'cors'
import 'dotenv/config'


const app = express()

const PORT = process.env.PORT


app.use(cors())
app.use(express.json())


app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()

    })
})

app.listen(PORT, () => {
    console.log(`SERVER is live on port ${PORT}`)
})

export default app

import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.js'
import 'dotenv/config'


const app = express()

const PORT = process.env.PORT


app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)


app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()

    })
})

app.listen(PORT, () => {
    console.log(`SERVER is live on port ${PORT}`)
    console.log('project id value')
})

export default app

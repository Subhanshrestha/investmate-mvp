import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import quizRoutes from './routes/quiz.js'
import planRoutes from './routes/plans.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => res.json({ ok: true }))

app.use('/api/quiz', quizRoutes)
app.use('/api/plans', planRoutes)

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Server error' })
})

export default app

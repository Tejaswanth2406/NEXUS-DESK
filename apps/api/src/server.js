import express from 'express'
import helmet from 'helmet'
import { IncidentRouter } from './routes/incidents.js'

const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(express.json({ limit: '64kb' }))
app.use('/api/x_nexus_desk/incidents', IncidentRouter)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`NEXUS Desk API listening on ${port}`))

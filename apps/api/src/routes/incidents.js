import express from 'express'
import { validateIncident } from '../../../../src/domain/rules.js'

export const IncidentRouter = express.Router()

IncidentRouter.post('/', (request, response) => {
  const validation = validateIncident(request.body)
  if (!validation.valid) return response.status(400).json({ error: 'Validation failed', fields: validation.errors })
  response.status(201).json({
    result: {
      number: `INC${String(Date.now()).slice(-7)}`,
      state: '1',
      priority: '2',
      assignmentGroup: 'Service Desk',
    },
  })
})

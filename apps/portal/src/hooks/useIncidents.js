import { useCallback, useEffect, useState } from 'react'
import { IncidentApi } from '../services/incidentApi'
import { AssignmentRouter, PriorityEngine, TicketClassifier } from '../domain/rules'

const api = new IncidentApi()
const classifier = new TicketClassifier()
const priorityEngine = new PriorityEngine()
const assignmentRouter = new AssignmentRouter()

export default function useIncidents() {
  const [incidents, setIncidents] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    api.list()
      .then((records) => { if (active) setIncidents(records) })
      .catch(() => { if (active) setError('Unable to load incidents. Please try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const submitIncident = useCallback(async (form) => {
    setSubmitting(true)
    setError('')
    const classification = classifier.classify(form.description, form.category)
    const payload = {
      ...form,
      priority: priorityEngine.evaluate(form.impact, form.urgency),
      assignmentGroup: assignmentRouter.route(classification),
    }
    try {
      const created = await api.create(payload)
      setIncidents((current) => [created, ...current])
      return created
    } catch (submissionError) {
      setError(submissionError.message || 'Unable to submit incident. Please try again.')
      throw submissionError
    } finally {
      setSubmitting(false)
    }
  }, [])

  return { incidents, loading, submitting, error, submitIncident }
}

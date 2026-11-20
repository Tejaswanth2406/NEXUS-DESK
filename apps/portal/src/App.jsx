import { useEffect, useMemo, useState } from 'react'
import { AssignmentRouter, PriorityEngine, TicketClassifier, validateIncident } from './domain/rules'
import { IncidentApi } from './services/incidentApi'

const api = new IncidentApi()
const priorityEngine = new PriorityEngine()
const classifier = new TicketClassifier()
const router = new AssignmentRouter()

const stateLabels = { 1: 'New', 2: 'In progress', 3: 'On hold', 6: 'Resolved', 7: 'Closed' }

function StatusBadge({ state }) {
  return <span className={`badge state-${state}`}>{stateLabels[state] ?? 'Unknown'}</span>
}

function IncidentForm({ onSubmitted }) {
  const [form, setForm] = useState({ shortDescription: '', description: '', category: '', impact: '3', urgency: '3' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  async function submit(event) {
    event.preventDefault()
    const result = validateIncident(form)
    setErrors(result.errors)
    if (!result.valid) return
    setSubmitting(true)
    const classification = classifier.classify(form.description, form.category)
    const payload = {
      ...form,
      priority: priorityEngine.evaluate(form.impact, form.urgency),
      assignmentGroup: router.route(classification),
    }
    try {
      const created = await api.create(payload)
      onSubmitted(created)
      setForm({ shortDescription: '', description: '', category: '', impact: '3', urgency: '3' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h2>Submit an incident</h2>
      <label>Short description
        <input name="shortDescription" value={form.shortDescription} onChange={update} placeholder="What is affected?" />
        {errors.shortDescription && <span className="error">{errors.shortDescription}</span>}
      </label>
      <label>Description
        <textarea name="description" value={form.description} onChange={update} rows="5" placeholder="Include impact and reproduction steps" />
        {errors.description && <span className="error">{errors.description}</span>}
      </label>
      <div className="field-row">
        <label>Category
          <select name="category" value={form.category} onChange={update}>
            <option value="">Select category</option>
            <option value="network">Network</option>
            <option value="identity">Identity</option>
            <option value="email">Email</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="general">General</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </label>
        <label>Impact
          <select name="impact" value={form.impact} onChange={update}>
            <option value="1">High</option><option value="2">Medium</option><option value="3">Low</option>
          </select>
        </label>
        <label>Urgency
          <select name="urgency" value={form.urgency} onChange={update}>
            <option value="1">High</option><option value="2">Medium</option><option value="3">Low</option>
          </select>
        </label>
      </div>
      <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit incident'}</button>
    </form>
  )
}

function IncidentTable({ incidents }) {
  return (
    <div className="card table-card">
      <h2>My incidents</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Number</th><th>Summary</th><th>Priority</th><th>Status</th><th>Assignment</th></tr></thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.number}>
                <td><strong>{incident.number}</strong></td>
                <td>{incident.shortDescription}</td>
                <td>P{incident.priority}</td>
                <td><StatusBadge state={incident.state} /></td>
                <td>{incident.assignmentGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Dashboard({ incidents }) {
  const counts = useMemo(() => ({
    open: incidents.filter((item) => !['6', '7'].includes(String(item.state))).length,
    high: incidents.filter((item) => ['1', '2'].includes(String(item.priority))).length,
    teams: new Set(incidents.map((item) => item.assignmentGroup)).size,
  }), [incidents])
  return (
    <div className="metrics">
      <div className="metric"><span>Open incidents</span><strong>{counts.open}</strong></div>
      <div className="metric"><span>Priority 1-2</span><strong>{counts.high}</strong></div>
      <div className="metric"><span>Active teams</span><strong>{counts.teams}</strong></div>
    </div>
  )
}

export default function App() {
  const [incidents, setIncidents] = useState([])
  const [toast, setToast] = useState('')

  useEffect(() => { api.list().then(setIncidents).catch(() => setToast('Unable to load incidents')) }, [])

  function onSubmitted(incident) {
    setIncidents((current) => [incident, ...current])
    setToast(`Incident ${incident.number} submitted`)
  }

  return (
    <div className="app-shell">
      <aside>
        <div className="brand"><span>N</span><strong>NEXUS Desk</strong></div>
        <nav><button className="active">Overview</button><button>Submit incident</button><button>My incidents</button><button>Knowledge</button></nav>
      </aside>
      <main>
        <header><div><p>Employee portal</p><h1>Good morning</h1></div><div className="avatar">TC</div></header>
        {toast && <div className="toast" role="status">{toast}</div>}
        <Dashboard incidents={incidents} />
        <div className="content-grid">
          <IncidentForm onSubmitted={onSubmitted} />
          <IncidentTable incidents={incidents} />
        </div>
      </main>
    </div>
  )
}

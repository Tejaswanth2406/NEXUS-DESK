import { useState } from 'react'
import IncidentForm from '../components/IncidentForm'
import useIncidents from '../hooks/useIncidents'
import Overview from '../pages/Overview'

export default function App() {
  const { incidents, loading, submitting, error, submitIncident } = useIncidents()
  const [toast, setToast] = useState('')

  async function handleSubmit(form) {
    const incident = await submitIncident(form)
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
        {error && <div className="error-banner" role="alert">{error}</div>}
        {loading ? <p role="status">Loading incidents...</p> : <Overview incidents={incidents} />}
        <div className="content-grid">
          <IncidentForm onSubmit={handleSubmit} submitting={submitting} />
        </div>
      </main>
    </div>
  )
}

const stateLabels = { 1: 'New', 2: 'In progress', 3: 'On hold', 6: 'Resolved', 7: 'Closed' }

function StatusBadge({ state }) {
  return <span className={`badge state-${state}`}>{stateLabels[state] ?? 'Unknown'}</span>
}

export default function Overview({ incidents }) {
  const openCount = incidents.filter((item) => !['6', '7'].includes(String(item.state))).length
  const highPriorityCount = incidents.filter((item) => ['1', '2'].includes(String(item.priority))).length
  const activeTeams = new Set(incidents.map((item) => item.assignmentGroup).filter(Boolean)).size

  return (
    <>
      <div className="metrics">
        <div className="metric"><span>Open incidents</span><strong>{openCount}</strong></div>
        <div className="metric"><span>Priority 1-2</span><strong>{highPriorityCount}</strong></div>
        <div className="metric"><span>Active teams</span><strong>{activeTeams}</strong></div>
      </div>
      <section className="card table-card">
        <h2>My incidents</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Number</th><th>Summary</th><th>Priority</th><th>Status</th><th>Assignment</th></tr></thead>
            <tbody>
              {incidents.length === 0
                ? <tr><td colSpan="5">No incidents to display.</td></tr>
                : incidents.map((incident) => (
                  <tr key={incident.number}>
                    <td><strong>{incident.number}</strong></td>
                    <td>{incident.shortDescription}</td>
                    <td>P{incident.priority}</td>
                    <td><StatusBadge state={incident.state} /></td>
                    <td>{incident.assignmentGroup || 'Unassigned'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

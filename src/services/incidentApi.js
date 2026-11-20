const seed = [
  { number: 'INC0012401', shortDescription: 'Unable to connect to VPN', category: 'network', impact: '2', urgency: '2', priority: '2', state: '2', assignmentGroup: 'Network Operations', updatedAt: '2026-11-20T18:12:00Z' },
  { number: 'INC0012398', shortDescription: 'Outlook password prompt', category: 'email', impact: '3', urgency: '2', priority: '3', state: '1', assignmentGroup: 'Messaging Support', updatedAt: '2026-11-20T16:41:00Z' },
  { number: 'INC0012384', shortDescription: 'Laptop monitor not detected', category: 'hardware', impact: '3', urgency: '3', priority: '4', state: '6', assignmentGroup: 'Desktop Support', updatedAt: '2026-11-19T14:20:00Z' },
]

export class IncidentApi {
  constructor(baseUrl = import.meta.env.VITE_NEXUS_API_BASE || '/api/x_nexus_desk') {
    this.baseUrl = baseUrl
  }

  async list() {
    if (this.baseUrl === '/api/x_nexus_desk') return structuredClone(seed)
    const response = await fetch(`${this.baseUrl}/incidents`)
    if (!response.ok) throw new Error(`Unable to retrieve incidents (${response.status})`)
    return (await response.json()).result
  }

  async create(payload) {
    if (this.baseUrl === '/api/x_nexus_desk') {
      return { number: `INC${String(Date.now()).slice(-7)}`, state: '1', priority: payload.priority, ...payload }
    }
    const response = await fetch(`${this.baseUrl}/incidents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(`Unable to submit incident (${response.status})`)
    return (await response.json()).result
  }
}

export class IncidentAdapter {
  async create(payload) {
    return {
      number: `INC${String(Date.now()).slice(-7)}`,
      state: '1',
      priority: payload.priority ?? '4',
      assignmentGroup: payload.assignmentGroup ?? 'Service Desk',
    }
  }
}

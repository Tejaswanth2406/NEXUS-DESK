import { IncidentAdapter } from '../adapters/serviceNowAdapter.js'

export class IncidentService {
  constructor(adapter = new IncidentAdapter()) {
    this.adapter = adapter
  }

  create(payload) {
    return this.adapter.create(payload)
  }
}

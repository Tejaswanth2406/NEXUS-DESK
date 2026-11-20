export const Impact = Object.freeze({ LOW: '3', MEDIUM: '2', HIGH: '1' })
export const Urgency = Object.freeze({ LOW: '3', MEDIUM: '2', HIGH: '1' })

export function validateIncident(input) {
  const errors = {}
  if (!String(input.shortDescription ?? '').trim()) errors.shortDescription = 'Short description is required'
  if (!String(input.description ?? '').trim()) errors.description = 'Description is required'
  if (!input.category) errors.category = 'Category is required'
  if (!Object.values(Impact).includes(input.impact)) errors.impact = 'Valid impact is required'
  if (!Object.values(Urgency).includes(input.urgency)) errors.urgency = 'Valid urgency is required'
  return { valid: Object.keys(errors).length === 0, errors }
}

export class PriorityEngine {
  constructor(matrix = {
    '1:1': '1', '1:2': '1', '1:3': '2', '2:1': '1', '2:2': '2', '2:3': '3',
    '3:1': '2', '3:2': '3', '3:3': '4',
  }) {
    this.matrix = matrix
  }
  evaluate(impact, urgency) {
    return this.matrix[`${impact}:${urgency}`] ?? '4'
  }
}

export class TicketClassifier {
  classify(text, category) {
    const normalized = `${category ?? ''} ${text ?? ''}`.toLowerCase()
    if (/vpn|network|wifi|dns|connect/.test(normalized)) return 'network'
    if (/password|login|account|mfa|locked/.test(normalized)) return 'identity'
    if (/email|outlook|mail/.test(normalized)) return 'email'
    if (/laptop|printer|hardware|device|monitor/.test(normalized)) return 'hardware'
    if (/software|application|app|error/.test(normalized)) return 'software'
    return 'general'
  }
}

export class AssignmentRouter {
  constructor(routes = {
    network: 'Network Operations',
    identity: 'Identity & Access',
    email: 'Messaging Support',
    hardware: 'Desktop Support',
    software: 'Application Support',
    general: 'Service Desk',
  }) {
    this.routes = routes
  }
  route(classification) {
    return this.routes[classification] ?? this.routes.general
  }
}

export function createResolutionProvider(aiAvailable = false) {
  const deterministic = {
    name: 'deterministic',
    resolve(input) {
      const classification = new TicketClassifier().classify(input.description, input.category)
      const suggestions = {
        network: ['Check the network adapter and Wi-Fi status', 'Confirm VPN configuration and recent changes'],
        identity: ['Confirm account status and MFA enrollment', 'Guide the employee through the approved password reset'],
        email: ['Verify mailbox server connectivity', 'Clear cached Outlook credentials and reauthenticate'],
        hardware: ['Restart the device and verify power/cable connections', 'Review hardware warranty and asset status'],
        software: ['Capture the exact error and reproduce it', 'Check the service status and approved application logs'],
        general: ['Collect affected service and reproduction details', 'Follow the standard Service Desk triage checklist'],
      }
      return { provider: 'deterministic', classification, suggestions: suggestions[classification], reviewRequired: false }
    },
  }
  if (!aiAvailable) return deterministic
  return {
    name: 'ai',
    resolve(input) {
      const result = deterministic.resolve(input)
      return { ...result, provider: 'ai', reviewRequired: true }
    },
  }
}

import { describe, expect, it } from 'vitest'
import { AssignmentRouter, PriorityEngine, TicketClassifier, createResolutionProvider, validateIncident } from './rules'

describe('NEXUS Desk validation', () => {
  it('rejects incomplete incidents', () => {
    expect(validateIncident({}).valid).toBe(false)
  })
  it('accepts complete incidents', () => {
    expect(validateIncident({
      shortDescription: 'VPN unavailable', description: 'Cannot connect to corporate VPN',
      category: 'network', impact: '2', urgency: '2',
    }).valid).toBe(true)
  })
})

describe('NEXUS Desk triage', () => {
  it('calculates priority from impact and urgency', () => {
    expect(new PriorityEngine().evaluate('1', '1')).toBe('1')
    expect(new PriorityEngine().evaluate('3', '3')).toBe('4')
  })
  it('classifies and routes incidents', () => {
    const classification = new TicketClassifier().classify('VPN authentication failing', 'network')
    expect(classification).toBe('network')
    expect(new AssignmentRouter().route(classification)).toBe('Network Operations')
  })
  it('uses deterministic fallback when AI is unavailable', () => {
    const provider = createResolutionProvider(false)
    const result = provider.resolve({ description: 'Account locked', category: 'identity' })
    expect(result.provider).toBe('deterministic')
    expect(result.suggestions.length).toBeGreaterThan(0)
  })
  it('requires review for AI-generated decisions', () => {
    expect(createResolutionProvider(true).resolve({ description: 'Email error', category: 'email' }).reviewRequired).toBe(true)
  })
})

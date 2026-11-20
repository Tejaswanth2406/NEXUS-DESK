import { useState } from 'react'
import { validateIncident } from '../utils/validation'

const initialForm = { shortDescription: '', description: '', category: '', impact: '3', urgency: '3' }

export default function IncidentForm({ onSubmit, submitting = false }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    const validation = validateIncident(form)
    setErrors(validation.errors)
    if (!validation.valid) return
    try {
      await onSubmit(form)
      setForm(initialForm)
      setErrors({})
    } catch {
      // The incident hook surfaces submission errors in the page alert.
    }
  }

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h2>Submit an incident</h2>
      <label>Short description
        <input name="shortDescription" maxLength="160" value={form.shortDescription} onChange={update} placeholder="What is affected?" aria-invalid={Boolean(errors.shortDescription)} />
        {errors.shortDescription && <span className="error">{errors.shortDescription}</span>}
      </label>
      <label>Description
        <textarea name="description" maxLength="4000" value={form.description} onChange={update} rows="5" placeholder="Include impact and reproduction steps" aria-invalid={Boolean(errors.description)} />
        {errors.description && <span className="error">{errors.description}</span>}
      </label>
      <div className="field-row">
        <label>Category
          <select name="category" value={form.category} onChange={update} aria-invalid={Boolean(errors.category)}>
            <option value="">Select category</option>
            <option value="network">Network</option><option value="identity">Identity</option>
            <option value="email">Email</option><option value="hardware">Hardware</option>
            <option value="software">Software</option><option value="general">General</option>
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

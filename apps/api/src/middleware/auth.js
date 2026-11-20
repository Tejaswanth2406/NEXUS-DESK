export function requireEmployee(request, response, next) {
  if (!request.headers.authorization) {
    return response.status(401).json({ error: 'OAuth bearer token required' })
  }
  next()
}

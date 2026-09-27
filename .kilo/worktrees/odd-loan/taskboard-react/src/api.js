const API_URL = 'http://127.0.0.1:8000/api'

export async function api(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      'Something went wrong.'
    )
  }

  return data
}
import { useState } from 'react'
import { api } from '../api'

function AddProjectForm({ setProjects }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim()) {
      return
    }

    setError('')
    setLoading(true)

    try {
      const data = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim()
        })
      })

      const newProject = data.data || data

      setProjects((currentProjects) => [
        ...currentProjects,
        newProject
      ])

      setName('')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-project">
      <h2>Add Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter project name"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default AddProjectForm

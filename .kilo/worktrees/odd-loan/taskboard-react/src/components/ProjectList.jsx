import { useEffect, useState } from 'react'
import { api } from '../api'

function ProjectList({ projects, setProjects, onSelectProject }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await api('/projects')
        setProjects(data.data || [])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [setProjects])

  if (loading) {
    return <p>Loading projects...</p>
  }

  if (error) {
    return <p className="error">{error}</p>
  }

  return (
    <section>
      <h2 className="project-list-header">Projects</h2>

      {projects.length === 0 ? (
        <p className="empty">No projects yet. Add your first project below.</p>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <div
              className="project-row"
              key={project.id}
              onClick={() => onSelectProject(project.id)}
            >
              <div>
                <h3>{project.name}</h3>
              </div>

              <span className="task-count">
                {project.tasks_count ?? 0} {project.tasks_count === 1 ? 'task' : 'tasks'}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectList

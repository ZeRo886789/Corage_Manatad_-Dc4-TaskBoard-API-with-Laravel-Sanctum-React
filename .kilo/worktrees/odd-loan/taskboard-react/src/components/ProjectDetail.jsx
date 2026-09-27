import { useEffect, useState } from 'react'
import { api } from '../api'

function ProjectDetail({ projectId, onBack }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await api(`/projects/${projectId}`)
        setProject(data.data || data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [projectId])

  async function handleTaskChange(task) {
    try {
      const data = await api(`/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          is_done: !task.is_done
        })
      })

      const updatedTask = data.data || data

      setProject((currentProject) => ({
        ...currentProject,
        tasks: currentProject.tasks.map((currentTask) =>
          currentTask.id === task.id
            ? {
                ...currentTask,
                ...updatedTask,
                is_done: !task.is_done
              }
            : currentTask
        )
      }))
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return <p>Loading project...</p>
  }

  if (error) {
    return (
      <div className="project-detail">
        <p className="error">{error}</p>
        <button className="back-link" onClick={onBack}>
          ← Back to Projects
        </button>
      </div>
    )
  }

  return (
    <div className="project-detail">
      <button className="back-link" onClick={onBack}>
        ← Back to Projects
      </button>

      <h2>{project.name}</h2>

      {project.owner && (
        <p className="owner">
          Owner: {project.owner.name}
        </p>
      )}

      <h3>Tasks</h3>

      {!project.tasks || project.tasks.length === 0 ? (
        <p className="empty">No tasks yet.</p>
      ) : (
        <div className="task-list">
          {project.tasks.map((task) => (
            <div className="task" key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(task.is_done)}
                  onChange={() => handleTaskChange(task)}
                />

                <span className={task.is_done ? 'done' : ''}>
                  {task.title}
                </span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectDetail

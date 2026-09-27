import { useState } from 'react'
import LoginForm from './components/LoginForm'
import ProjectList from './components/ProjectList'
import AddProjectForm from './components/AddProjectForm'
import LogoutButton from './components/LogoutButton'
import ProjectDetail from './components/ProjectDetail'
import './index.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [projects, setProjects] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  function handleLogin(newToken) {
    setToken(newToken)
  }

  function handleLogout() {
    setToken(null)
    setProjects([])
    setSelectedProjectId(null)
  }

  if (!token) {
    return <LoginForm onLogin={handleLogin} />
  }

  if (selectedProjectId) {
    return (
      <div className="app">
        <header className="app-header">
          <div>
            <h1>Taskboard</h1>
            <p>Manage your projects and tasks</p>
          </div>
          <LogoutButton onLogout={handleLogout} />
        </header>

        <ProjectDetail
          projectId={selectedProjectId}
          onBack={() => setSelectedProjectId(null)}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Taskboard</h1>
          <p>Manage your projects and tasks</p>
        </div>
        <LogoutButton onLogout={handleLogout} />
      </header>

      <main>
        <AddProjectForm setProjects={setProjects} />

        <ProjectList
          projects={projects}
          setProjects={setProjects}
          onSelectProject={setSelectedProjectId}
        />
      </main>
    </div>
  )
}

export default App

import { api } from '../api'

function LogoutButton({ onLogout }) {
  async function handleLogout() {
    try {
      await api('/logout', {
        method: 'POST'
      })
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.removeItem('token')
      onLogout()
    }
  }

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Log out
    </button>
  )
}

export default LogoutButton

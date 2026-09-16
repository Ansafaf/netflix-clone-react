import { useState, type ReactNode } from 'react'
import { AuthContext } from './auth'
const authStorageKey = 'netflix-clone-user'

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(sessionStorage.getItem(authStorageKey)))

  const login = (email: string) => {
    sessionStorage.setItem(authStorageKey, email)
    setIsAuthenticated(true)
  }

  const logout = () => {
    sessionStorage.removeItem(authStorageKey)
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export { AuthProvider }

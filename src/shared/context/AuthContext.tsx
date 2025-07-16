import { createContext, useContext, useState, useEffect } from 'react'

type AuthContextType = {
  isAuth: boolean
  setAuth: (auth: boolean) => void
}

const AuthContext = createContext<AuthContextType>({ isAuth: false, setAuth: () => {} })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('isAuth') === 'true'
    setIsAuth(stored)
    setIsReady(true)
  }, [])

  if (!isReady) return null

  return (
    <AuthContext.Provider value={{ isAuth, setAuth: setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

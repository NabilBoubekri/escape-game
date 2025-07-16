import { Navigate } from "react-router-dom"
import { useAuth } from "../shared/context/AuthContext"

type Props = {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: Props) {
  const { isAuth } = useAuth()

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />
}
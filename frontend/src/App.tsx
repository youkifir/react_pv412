import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./Context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App

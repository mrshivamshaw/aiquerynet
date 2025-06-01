import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/routeAuth/ProtectedRoute"
import Login from "./pages/Login"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><div>Home</div></ProtectedRoute>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default App
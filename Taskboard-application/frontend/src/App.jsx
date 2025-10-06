import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./context/AuthContext";

function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />

        <Route path="/login" element ={<Login/>}></Route>
        <Route path="/register" element ={<Register/>}></Route>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<h2>404 - nat foud</h2>} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;

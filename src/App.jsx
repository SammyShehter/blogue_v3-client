import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"
import { AuthContext } from "./contexts/auth.context"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from "./hooks/auth.hook"

function App() {
    const { token, login, logout, auhtenticated, verifyUser } = useAuth()
    const authContextValue = {
        token,
        login,
        logout,
        auhtenticated,
        verifyUser
    }

    const routes = useRoutes(auhtenticated)

    return (
        <AuthContext.Provider value={authContextValue}>
            <ToastContainer />
            <Router>
                <div className="h-screen">{routes}</div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App

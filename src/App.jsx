import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"
import { AuthContext } from "./contexts/auth.context"
import { ToastContainer } from "react-toastify"
import { useAuth } from "./hooks/auth.hook"
import { FullLoader } from "./components/loader/loader.component"
import "react-toastify/dist/ReactToastify.css"

function App() {
    const { token, login, logout, auhtenticated, verifyUser, ready } = useAuth()
    const authContextValue = {
        token,
        login,
        logout,
        auhtenticated,
        verifyUser,
        ready,
    }

    const routes = useRoutes(auhtenticated)

    return (
        <AuthContext.Provider value={authContextValue}>
            <ToastContainer />
            {ready ? (
                <Router>
                    <div className="h-screen">{routes}</div>
                </Router>
            ) : (
                <FullLoader />
            )}
        </AuthContext.Provider>
    )
}

export default App

import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from "./routes"
import { AppContext } from "./contexts/app.context"
import { ToastContainer } from "react-toastify"
import { useAuth } from "./hooks/auth.hook"
import { usePosts } from "./hooks/posts.hook"
import { FullLoader } from "./components/loader/loader.component"
import "react-toastify/dist/ReactToastify.css"


function App() {
    const { token, login, logout, auhtenticated, verifyUser, ready } = useAuth()
    const { posts, addPostToStorage } = usePosts()
    const contextValue = {
        token,
        login,
        logout,
        auhtenticated,
        verifyUser,
        ready,
        posts,
        addPostToStorage
    }

    const routes = useRoutes(auhtenticated)

    return (
        <AppContext.Provider value={contextValue}>
            <ToastContainer />
            {ready ? (
                <Router>
                    <div className="h-screen">{routes}</div>
                </Router>
            ) : (
                <FullLoader />
            )}
        </AppContext.Provider>
    )
}

export default App

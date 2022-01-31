import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import AuthContext from './contexts/auth.context'
import { Loader } from './components/loader/loader.component'


function App() {
    const { token, login, logout, ready } = useAuth()
    const isAuhtenticated = false
    const authContextValue = {
        token,
        login,
        logout,
        isAuhtenticated,
    }
    const routes = useRoutes(isAuhtenticated)

    if(!ready){
        return <Loader />
    }
    return (
        <AuthContext.Provider value={authContextValue}>
            <Router>
                <div className='h-screen'>{routes}</div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App

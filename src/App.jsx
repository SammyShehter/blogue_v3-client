import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import AuthContext from './contexts/auth.context'
import { Navbar } from './components/navbar/navbar.component'
import { Loader } from './components/loader/loader.component'
import { PrivateNavBar } from './components/privateNavbar/privateNavbar.component'

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
                {isAuhtenticated ? <PrivateNavBar/> : <Navbar/>}
                <div className='container'>{routes}</div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App

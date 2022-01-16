import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import authContext from '../../contexts/auth.context'
import './privateNavbar.component.scss'

export const PrivateNavBar = () => {
    const history = useNavigate()
    const auth = useContext(authContext)

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <h1>hi</h1>
    )
}

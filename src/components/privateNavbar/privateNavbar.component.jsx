import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import authContext from '../../contexts/auth.context'
import M from 'materialize-css'
import './privateNavbar.component.scss'

export const PrivateNavBar = () => {
    const history = useNavigate()
    const auth = useContext(authContext)
    useEffect(() => {
        const sidebar = document.querySelector('#mobile')
        M.Sidenav.init(sidebar, {
            draggable: true,
        })
    }, [])

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <>
            <nav className='main-navbar blue darken-1'>
                <div className='nav-wrapper'>
                    <span className='brand-logo'>Blogue</span>
                    <a
                        href='#'
                        data-target='mobile'
                        className='sidenav-trigger'
                    >
                        <i className='material-icons'>menu</i>
                    </a>
                    <ul id='nav-mobile' className='right hide-on-med-and-down'>
                        <li>
                            <NavLink to='/create'>Create</NavLink>
                        </li>
                        <li>
                            <NavLink to='/'>To Main Page</NavLink>
                        </li>
                        <li>
                            <a href='/links' onClick={logoutHandler}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <ul className='sidenav' id='mobile'>
                <li>
                    <NavLink to='/create' className='sidenav-close'>
                        Create
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/links' className='sidenav-close'>
                        Links
                    </NavLink>
                </li>
                <li>
                    <a
                        href='/links'
                        className='sidenav-close'
                        onClick={logoutHandler}
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </>
    )
}

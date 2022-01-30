import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import authContext from '../../contexts/auth.context'
import './navbar.component.scss'
import { base64Boy } from './base64Boy.js'

export const Navbar = () => {
    const ref = useRef()
    const history = useNavigate()
    const auth = useContext(authContext)
    const [switchMobMenu, setSwitchMobMenu] = useState(false)

    const manipulateMobileMenu = () => {
        setSwitchMobMenu(!switchMobMenu)
    }

    useEffect(() => {
        const clickOutsideHamburger = (e) => {
            if (
                switchMobMenu &&
                ref.current &&
                !ref.current.contains(e.target) &&
                !e.target.classList.contains('hamMenu')
            ) {
                setSwitchMobMenu(!switchMobMenu)
            }
        }
        document.addEventListener('mousedown', clickOutsideHamburger)

        return () => {
            document.removeEventListener('mousedown', clickOutsideHamburger)
        }
    }, [switchMobMenu])

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <>
            <nav class='bg-white'>
                <div className='max-w-screen-2xl mx-auto'>
                    <div className='flex justify-between items-center'>
                        <div className='flex space-x-4 py-0'>
                            {/* logo */}
                            <div className='flex'>
                                <NavLink to='/'>
                                    <img src={base64Boy} alt='Best boi' />
                                </NavLink>
                            </div>
                            {/* pipe */}
                            <div className='hidden md:flex items-center'>
                                <span>|</span>
                            </div>
                            {/* primary nav */}
                            <div className='hidden md:flex item-center text-gray-700'>
                                <a
                                    href='#'
                                    className='py-3 px-7 hover:text-black transition duration-300'
                                >
                                    Num1
                                </a>
                                <a
                                    href='#'
                                    className='py-3 px-4 hover:text-black transition duration-300'
                                >
                                    Num2
                                </a>
                            </div>
                        </div>
                        {/* secondary nav */}
                        <div>
                            <div className='hidden md:flex item-center text-gray-700 hover:text-black transition duration-300'>
                                <NavLink to='/login' className='py-3 px-7'>
                                    Login
                                </NavLink>
                            </div>
                        </div>
                        {/* mobile buttons here */}
                        <button
                            className='md:hidden flex item-center py-3 px-7 hamMenu relative'
                            onClick={manipulateMobileMenu}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6 hamMenu'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* mobile menu */}
                <div
                    className={`md:hidden${
                        switchMobMenu ? '' : ' hidden'
                    } absolute z-10 bg-white w-full px-4`}
                    ref={ref}
                >
                    <a
                        href='#'
                        className='block py-2 text-sm hover:bg-grey-200'
                    >
                        First link
                    </a>
                    <a
                        href='#'
                        className='block py-2 text-sm hover:bg-grey-200'
                    >
                        Second link
                    </a>
                </div>
            </nav>
        </>
    )
}

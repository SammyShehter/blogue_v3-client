import React, { useContext, useState } from 'react'
import './login.page.scss'
import { useHttp } from '../../hooks/http.hook'
import { useEffect } from 'react'
import { useMessage } from '../../hooks/message.hook'
import authContext from '../../contexts/auth.context'

export const AuthPage = () => {
    const auth = useContext(authContext)
    const message = useMessage()
    const { loading, request, errors } = useHttp()
    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        errors.forEach((error) => {
            message(`${error.param}: ${error.message}`)
        })
    }, [errors, message])

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }
    const loginHandler = async () => {
        try {
            const { token } = await request('localhost:10000/login', 'POST', {
                ...form,
            })
            auth.login(token)
        } catch (e) {}
    }

    return (
        <div className='grid place-content-center h-screen'>
            <div className='p-8 bg-gray-600 login-box'>
                <div class='p-2'>
                    <input
                        type='text'
                        class='relative outline-none border border-gray-400 rounded py-3 px-3 w-full bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline'
                        placeholder='placeholder'
                    />
                </div>
                <div class='p-2'>
                    <input
                        type='text'
                        class='relative outline-none border border-gray-400 rounded py-3 px-3 w-full bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline'
                        placeholder='placeholder'
                    />
                </div>
            </div>
        </div>
    )
}

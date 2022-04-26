import React, { useContext, useState, useEffect } from "react"
import "./login.page.scss"
import { useHttp } from "../../hooks/http.hook"
import { Loader } from "../../components/loader/loader.component"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"


export const AuthPage = () => {
    const { loading, request, errors } = useHttp()
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
        if (errors.length) {
            toast(errors[0].msg)
        }
    }, [errors])

    const changeHandler = event => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }
    const loginHandler = async () => {
        try {
            const response = await request("localhost:10000/login", "POST", {
                ...form,
            })
            login(response.data.token)
            toast('Welcome back')
            navigate('/admin')
        } catch (e) {
            console.log(e)
        }
    }

    const dayNightBg = () => {
        const clock = new Date().getHours()
        const inlineStyle = {
            background: 'url("./12.jpeg") center',
            backgroundSize: "cover",
        }
        clock > 7 && clock < 19
            ? (inlineStyle.background = 'url("./12.jpeg") center')
            : (inlineStyle.background = 'url("./24.jpeg") center')
        return inlineStyle
    }

    return (
        <div
            className="grid place-content-center h-screen"
            style={dayNightBg()}
        >
            <div className="p-8 bg-gray-300/50 login-box">
                <h3 className="text-center p-1 text-3xl text-white">Welcome</h3>
                <div className="p-2">
                    <input
                        type="text"
                        name="username"
                        className="relative outline-none border border-gray-400 rounded py-3 px-3 w-full bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
                        placeholder="Username"
                        onChange={changeHandler}
                    />
                </div>
                <div className="p-2">
                    <input
                        type="password"
                        name="password"
                        className="relative outline-none border border-gray-400 rounded py-3 px-3 w-full bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        onChange={changeHandler}
                    />
                </div>
                <div className="p-2">
                    <button
                        className="w-full bg-blue-500 rounded h-10 text-white"
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    )
}

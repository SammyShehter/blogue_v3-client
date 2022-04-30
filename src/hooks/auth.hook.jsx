import { useState, useCallback, useEffect } from "react"
import { routes } from "../utils/dictionary"
import { useHttp } from "./http.hook"

const storageName = "userData"
const success = "SUCCESS"
const role = "ADMIN"
export const useAuth = () => {
    const [token, setToken] = useState("")
    const [auhtenticated, setAuthenticated] = useState(false)
    const [ready, setReady] = useState(false)
    const { request } = useHttp()

    const login = useCallback(async jwtToken => {
        try {
            setReady(false)
            setToken(jwtToken)
            localStorage.setItem(
                storageName,
                JSON.stringify({ token: jwtToken })
            )
            await verifyUser(jwtToken)
            setReady(true)
        } catch (e) {
            setReady(true)
            setAuthenticated(false)
        }
    }, [])

    const logout = useCallback(() => {
        setToken("")
        localStorage.removeItem(storageName)
        setAuthenticated(false)
    }, [])

    async function verifyUser(token) {
        try {
            if (!token) {
                setAuthenticated(false)
                return
            }
            const headers = { Authorization: `Bearer ${token}` }
            const response = await request(
                `${routes.USERS}/validation`,
                "POST",
                {},
                headers
            )
            const validUser =
                response.data &&
                response.message === success &&
                response.data.portals.includes("blogue") &&
                response.data.role === role

            if (validUser) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        } catch (e) {
            setAuthenticated(false)
        }
    }
    async function _init() {
        try {
            setReady(false)
            const userData = localStorage.getItem(storageName)
            const data = JSON.parse(userData)

            if (data && data.token) {
                await login(data.token)
            }
            setReady(true)
        } catch (e) {
            logout()
        }
    }
    useEffect(_init, [login, logout])

    return { login, logout, token, auhtenticated, verifyUser, ready }
}

import { useState, useCallback, useEffect } from "react"
import { useHttp } from "./http.hook"

const storageName = "userData"
const success = "SUCCESS"
const role = 'ADMIN'
export const useAuth = () => {
    const [token, setToken] = useState("")
    const [auhtenticated, setAuthenticated] = useState(false)
    const { request } = useHttp()

    const login = useCallback(async jwtToken => {
        try {
            setToken(jwtToken)
            localStorage.setItem(
                storageName,
                JSON.stringify({ token: jwtToken })
            )
            await verifyUser(jwtToken)
        } catch (e) {
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
                "localhost:10000/validation",
                "POST",
                {},
                headers
            )
            const validUser =
                response.data &&
                response.message === success &&
                response.data.portals.includes("blogue") &&
                response.data.role == role

            if (validUser) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        } catch (e) {
            setAuthenticated(false)
        }
    }

    useEffect(() => {
        try {
            const userData = localStorage.getItem(storageName)
            const data = JSON.parse(userData)

            if (data && data.token) {
                login(data.token)
            }
        } catch (e) {
            logout()
        }
    }, [login, logout])

    return { login, logout, token, auhtenticated, verifyUser }
}

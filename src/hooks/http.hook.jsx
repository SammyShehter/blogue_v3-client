import { useCallback, useState } from 'react'
import axios from 'axios'
import { routes } from '../utils/dictionary'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const request = useCallback(
        async (url, method = 'GET', data = {}, headers = {}) => {
            try {
                setLoading(true)
                const response = await axios({
                    method,
                    url: `${routes.HTTP}://${url}`,
                    data,
                    headers,
                })
                setLoading(false)
                return response.data
            } catch (e) {
                setErrors(e.response.data.errors)
                setLoading(false)
                throw e
            }
        },
        []
    )

    const clearErrors = useCallback(() => setErrors([]))

    return { loading, request, errors, clearErrors }
}

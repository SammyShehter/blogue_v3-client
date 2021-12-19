import {createContext} from 'react'

export const defaultState = {
    token: '',
    login: () => {},
    logout: () => {},
    isAuhtenticated: false
}

export default createContext(defaultState)
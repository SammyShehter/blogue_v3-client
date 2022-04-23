import {createContext} from 'react'

export const AuthContext = createContext({
    token: '',
    login: async () => {},
    logout: () => {},
    isAuhtenticated: false,
    verifyUser: async () => {}
})
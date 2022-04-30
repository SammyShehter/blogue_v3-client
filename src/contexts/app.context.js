import {createContext} from 'react'

export const AppContext = createContext({
    isAuhtenticated: false,
    token: '',
    posts: {},
    login: async () => {},
    logout: () => {},
    verifyUser: async () => {},
    addPostToStorage: () => {},
    dateOptions: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }
})
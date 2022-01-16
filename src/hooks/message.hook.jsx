import { useCallback } from "react"

export const useMessage = () => {
    return useCallback((text) => {
        if(true){
            console.log('x');
        }
    }, [])
}
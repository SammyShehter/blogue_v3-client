import { useState, useEffect } from 'react'

export const usePosts = () => {
    const [posts, setPosts] = useState({})

    function addPostToStorage(post) {
        const updatedStore = {...posts}
        updatedStore[post.slug] = post
        sessionStorage.setItem('posts', JSON.stringify(updatedStore))
        setPosts(updatedStore)
    }

    function _init() {
        const dataFromStorage = sessionStorage.getItem('posts')
        const data = dataFromStorage ? JSON.parse(dataFromStorage) : {}
        setPosts(data)
    }

    useEffect(_init, [])
    return { posts, addPostToStorage }
}

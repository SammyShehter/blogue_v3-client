import React, { useCallback, useEffect, useState } from 'react'
// import { useContext } from 'react'
import { ArticlesList } from '../../components/articlesList/articlesList.component'
import { Loader } from '../../components/loader/loader.component'
import authContext from '../../contexts/auth.context'
import { useHttp } from '../../hooks/http.hook'

export const MainPage = () => {
    const { request, loading } = useHttp()
    // const { token } = useContext(authContext)
    const [articles, setArticles] = useState([])

    const getArticles = useCallback(async () => {
        try {
            const articles = await request(`localhost:8000/posts`, 'GET')
            setArticles(articles.data)
            console.log(articles);
        } catch (e) {}
    }, [request])

    useEffect(() => {
        getArticles()
    }, [getArticles])

    if (loading) return <Loader />

    return <>{!loading && <ArticlesList articles={articles} />}</>
}

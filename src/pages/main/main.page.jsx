import React, { useCallback, useContext, useEffect, useState } from 'react'
import {AppContext} from '../../contexts/app.context'
import { ArticlesList } from '../../components/articlesList/articlesList.component'
import { FullLoader } from '../../components/loader/loader.component'
import { useHttp } from '../../hooks/http.hook'
import { Navbar } from '../../components/navbar/navbar.component'
import { PrivateNavBar } from '../../components/privateNavbar/privateNavbar.component'

export const MainPage = () => {
    const { auhtenticated } = useContext(AppContext)
    const { request, loading } = useHttp()
    const [articles, setArticles] = useState([])

    const getArticles = useCallback(async () => {
        try {
            const articles = await request(`${routes.BLOGUE}/posts`, 'GET')
            setArticles(articles.data)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        getArticles()
    }, [getArticles])

    if (loading) return <FullLoader />

    return (
        <>
        {auhtenticated ? <PrivateNavBar/> : <Navbar/>}
        <ArticlesList articles={articles}/>
        </>
    )
}

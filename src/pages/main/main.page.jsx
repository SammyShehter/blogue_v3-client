import React, { useCallback, useContext, useEffect, useState } from 'react'
import {AuthContext} from '../../contexts/auth.context'
import { ArticlesList } from '../../components/articlesList/articlesList.component'
import { FullLoader } from '../../components/loader/loader.component'
import { useHttp } from '../../hooks/http.hook'
import { Navbar } from '../../components/navbar/navbar.component'
import { PrivateNavBar } from '../../components/privateNavbar/privateNavbar.component'

export const MainPage = () => {
    const { auhtenticated } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [articles, setArticles] = useState([])

    const getArticles = useCallback(async () => {
        try {
            // const articles = await request(`blogue.sammyshehter.com/posts`, 'GET')
            const articles = {
                data: [
                    {
                        id: 1,
                        title: 'First Post',
                        slug: 'first_post',
                        preview: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
                        viewed: 0,
                        image: 'default',
                        createdAt: '2022-01-13T16:01:24.575Z',
                        updatedAt: '2022-01-13T16:01:24.575Z',
                    },
                ],
            }
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

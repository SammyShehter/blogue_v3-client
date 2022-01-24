import React, { useCallback, useEffect, useState } from 'react'
// import { useContext } from 'react'
import { ArticlesList } from '../../components/articlesList/articlesList.component'
import { Loader } from '../../components/loader/loader.component'
// import authContext from '../../contexts/auth.context'
import { useHttp } from '../../hooks/http.hook'

export const MainPage = () => {
    const { request, loading } = useHttp()
    // const { token } = useContext(authContext)
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
                        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
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

    if (loading) return <Loader />

    return (
        
            <div className='flex h-screen justify-center items-center flex-col'>
                <h1 className='text-3xl'>
                    Welcome to <strong>www.sammyshehter.com</strong>
                </h1>
                <p className='text-2xl'>Website is under construction</p>
                <p className='text-2xl'>
                    For now you can listen to{' '}
                    <a href='radio.sammyshehter.com'>
                        <u><strong>radio</strong></u>
                    </a>
                </p>
            </div>
    )
}

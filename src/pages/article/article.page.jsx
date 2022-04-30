import React, { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ArticleView } from "../../components/articleView/articleView.component"
import { FullLoader } from "../../components/loader/loader.component"
import { Navbar } from "../../components/navbar/navbar.component"
import { PrivateNavBar } from "../../components/privateNavbar/privateNavbar.component"
import { AppContext } from "../../contexts/app.context"
import { useHttp } from "../../hooks/http.hook"

export const ArticlePage = () => {
    const { request, loading: httpLoading } = useHttp()
    const { token, auhtenticated, posts, addPostToStorage } = useContext(AppContext)
    const { slug } = useParams()
    const [post, setPost] = useState({})

    const getPost = useCallback(async () => {
        try {
            if (posts[slug]) {
                setPost(posts[slug])
                return
            }

            const postData = await request(
                `${routes.BLOGUE}/post/${slug}`,
                "GET",
                {},
                { authorization: `Bearer ${token}` }
            )
            setPost(postData.data)
            addPostToStorage(postData.data)
        } catch (e) {}
    }, [token, slug, request])

    useEffect(() => {
        getPost()
    }, [])

    if (httpLoading) return <FullLoader />
    return (
        <>
            {auhtenticated ? <PrivateNavBar /> : <Navbar />}
            {!httpLoading && post && <ArticleView post={post} />}
        </>
    )
}

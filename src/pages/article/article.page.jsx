import React, { useCallback, useContext, useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import { ArticlePreview } from "../../components/articlePreview/articlePreview.component";
import { Loader } from "../../components/loader/loader.component";
import authContext from "../../contexts/auth.context";
import { useHttp } from "../../hooks/http.hook";

export const ArticlePage = () => {
    const {request, loading} = useHttp()
    const {token} = useContext(authContext)
    const [link, setLink] = useState({})
    const {id} = useParams()

    const getLink = useCallback(async () => {
        try {
            const linkData = await request(`/links/byId/${id}`, 'GET', {}, {authorization: `Bearer ${token}`})
            setLink(linkData)
        } catch (e) {}
    }, [token, id, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading)
        return <Loader />
    return (
        <>
        {!loading && link && <ArticlePreview link={link}/>}
        </>
    )
}
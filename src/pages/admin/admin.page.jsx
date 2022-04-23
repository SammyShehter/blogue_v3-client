import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FullLoader, Loader } from "../../components/loader/loader.component"
import { AuthContext } from "../../contexts/auth.context"
import { useHttp } from "../../hooks/http.hook"
import "./admin.page.scss"

export const CreatePage = () => {
    const navigate = useNavigate()
    const { request, loading } = useHttp()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [preview, setPreview] = useState("")
    const { verifyUser, token, logout } = useContext(AuthContext)

    useEffect(_initAdmin, [])

    async function _initAdmin() {
        if (!token) {
            logout()
        }
        await verifyUser(token)
    }

    const pressHandler = async e => {
        if (e.key === "Enter") {
            try {
                if (!title || !text || !title) {
                    toast("No valid post")
                    return
                }
                const data = await request(
                    "localhost:8000/post",
                    "POST",
                    {
                        title,
                        text,
                        preview,
                    },
                    { authorization: `Bearer ${token}` }
                )
                console.log(data)
                // navigate(`/details/${data.link._id}`) //TODO add redirect to article page
                toast(data.message)
                return
            } catch (e) {}
        }
    }

    // const buttonHandler = async e => {
    //     try {
    //         if (!link) throw new Error("")
    //         const data = await request(
    //             "/links/add",
    //             "POST",
    //             { from: link },
    //             { authorization: `Bearer ${token}` }
    //         )
    //         navigate(`/details/${data}`)
    //     } catch (e) {}
    // }

    return (
        <div className="row">
            <div className="col s8 offset-s2 create-page">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="input-field" onKeyPress={pressHandler}>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <label htmlFor="title">Title</label>
                        <br />
                        <input
                            id="preview"
                            type="text"
                            value={preview}
                            onChange={e => setPreview(e.target.value)}
                        />
                        <label htmlFor="preview">Preview</label>
                        <br />
                        <input
                            id="text"
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <label htmlFor="text">Text</label>
                    </div>
                )}
                {/* <button
                    className="waves-effect waves-light blue btn"
                    onClick={buttonHandler}
                >
                    Save
                </button> */}
            </div>
        </div>
    )
}

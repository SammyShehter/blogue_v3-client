import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useHttp } from '../../hooks/http.hook'
import './admin.page.scss'

export const CreatePage = () => {
    const navigate = useNavigate()
    const { request } = useHttp()
    const [link, setLink] = useState('')
    const {verifyUser, token, logout} = useContext(AuthContext)
    useEffect(async () => {
        if(!token) {
            logout()
        }
        await verifyUser(token)
    }, []) 
    

    const pressHandler = async (e) => {
        if (e.key === 'Enter') {
            try {
                if (!link) throw new Error('')
                const data = await request(
                    '/links/add',
                    'POST',
                    { from: link },
                    { authorization: `Bearer ${token}` }
                )
                navigate(`/details/${data.link._id}`)
            } catch (e) {}
        }
    }

    const buttonHandler = async (e) => {
        try {
            if (!link) throw new Error('')
            const data = await request(
                '/links/add',
                'POST',
                { from: link },
                { authorization: `Bearer ${token}` }
            )
            navigate(`/details/${data}`)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className='col s8 offset-s2 create-page'>
                <div className='input-field'>
                    <input
                        id='link'
                        type='text'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor='link'>Link</label>
                </div>
                <button
                    className='waves-effect waves-light blue btn'
                    onClick={buttonHandler}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

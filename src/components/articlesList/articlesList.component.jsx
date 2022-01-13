import React from 'react'
import { Link } from 'react-router-dom'
import './articlesList.component.scss'

export const ArticlesList = ({ articles }) => {
    if (!articles.length) return <h1>No Articles here yet!</h1>

    const articlesOrder = articles.map((article) => {
        return (
            <div className='card hoverable' key='{article.slug}'>
                <div className='card-image'>
                    <img src={`./${article.image}.jpg`} />
                    <span className='card-title'>Card Title</span>
                </div>
                <div className='card-content'>
                    <div className='text-sky-500 dark:text-sky-400'>
                        {article.title}
                    </div>
                    <div className='text-gray-700 dark:text-gray-500'>
                        <Link to={`post/${article.slug}`}>Details</Link>
                    </div>
                    <p>{article.text}</p>
                </div>
            </div>
        )
    })

    return <div className='col s12 m8'>{articlesOrder}</div>
}

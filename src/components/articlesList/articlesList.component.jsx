import React from 'react'
import { Link } from 'react-router-dom'

export const ArticlesList = ({ articles }) => {

    if (!articles.length) return <h1>No Links here yet!</h1>

    const articlesOrder = articles.map((article) => {
        return (
            <tr key={article.slug}>
                <td>{article.title}</td>
                <td>{article.text}</td>
                <td><Link to={`post/${article.slug}`}>Details</Link></td>
            </tr>
        )
    })

    return (
        <>
            <h2>Articles</h2>
            <table className='striped responsive-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Origin</th>
                        <th>Short</th>
                        <th>Open</th>
                    </tr>
                </thead>

                <tbody>{articlesOrder}</tbody>
            </table>
        </>
    )
}

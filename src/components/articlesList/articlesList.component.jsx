import React from 'react'
import { Link } from 'react-router-dom'

export const ArticlesList = ({ articles }) => {
    if (!articles.length) return <h1>No Links here yet!</h1>

    const articlesOrder = articles.map((article) => {
        return (
            <figure
                class='md:flex bg-gray-100 rounded-xl p-8 md:p-0 dark:bg-gray-800'
                key={article.slug}
            >
                <img
                    class='w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto'
                    src='./default.jpg'
                    alt=''
                    width='384'
                    height='512'
                />
                <div class='pt-6 md:p-8 text-center md:text-left space-y-4'>
                    <blockquote>
                        <p class='text-lg font-medium'>{article.text}</p>
                    </blockquote>
                    <figcaption class='font-medium'>
                        <div class='text-sky-500 dark:text-sky-400'>
                            {article.title}
                        </div>
                        <div class='text-gray-700 dark:text-gray-500'>
                            <Link to={`post/${article.slug}`}>Details</Link>
                        </div>
                    </figcaption>
                </div>
            </figure>
        )
    })

    return (
        <>
            <h2>Articles</h2>
            <div className='striped responsive-table'>{articlesOrder}</div>
        </>
    )
}

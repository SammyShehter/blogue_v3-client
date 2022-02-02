import React from 'react'
import { Link } from 'react-router-dom'
import './articlesList.component.scss'

export const ArticlesList = ({ articles }) => {
    if (!articles.length) return <h1>No Articles here yet!</h1>

    const dateOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    const articlesOrder = articles.map((article) => {
        return (
            <div
                className='flex flex-col bg-white mx-3 mt-12 lg:px-0 lg:w-7/12'
                key='{article.slug}'
            >
                <img
                    className='object-cover h-96'
                    src={`./${article.image}.jpg`}
                    alt='x'
                />

                <div className='p-6 md:p-8 text-left space-y-4'>
                    <div className='text-sky-500 dark:text-sky-400'>
                        <p>
                            {new Date(article.createdAt).toLocaleString(
                                'he-IL',
                                dateOptions
                            )}
                        </p>
                    </div>
                    <blockquote>
                        <Link
                            className='text-lg font-medium'
                            to={`post/${article.slug}`}
                        >
                            {article.title}
                        </Link>
                    </blockquote>
                    <figcaption className='font-medium'>
                        <div className='text-slate-700 dark:text-slate-500'>
                            {article.preview}
                        </div>
                    </figcaption>
                </div>
            </div>
        )
    })

    return <div className='container mx-auto'>{articlesOrder}</div>
}

import React from 'react'
import { Link } from 'react-router-dom'
import './articlesList.component.scss'

export const ArticlesList = ({ articles }) => {
    if (!articles.length) return <h1>No Articles here yet!</h1>

    const articlesOrder = articles.map((article) => {
        return (
            <div
                className='flex flex-col bg-white mx-3 mt-12 lg:px-0 lg:w-7/12'
                key='{article.slug}'
            >
                <img
                    class='object-cover h-96'
                    src={`./${article.image}.jpg`}
                    alt='x'
                />

                <div class='p-6 md:p-8 text-left space-y-4'>
                    <div class='text-sky-500 dark:text-sky-400'>
                        <p>date-here</p>
                    </div>
                    <blockquote>
                        <Link
                            class='text-lg font-medium'
                            to={`post/${article.slug}`}
                        >
                            {article.title}
                        </Link>
                    </blockquote>
                    <figcaption class='font-medium'>
                        <div class='text-slate-700 dark:text-slate-500'>
                            Some text
                        </div>
                    </figcaption>
                </div>
            </div>
        )
    })

    return <div className='col s12 m8'>{articlesOrder}</div>
}

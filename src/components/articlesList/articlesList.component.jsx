import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../contexts/app.context'
import './articlesList.component.scss'

export const ArticlesList = ({ articles }) => {

    const {dateOptions} = useContext(AppContext)

    if (!articles.length) return <h1>No Articles here yet!</h1>

    const articlesOrder = articles.map((article) => {
        return (
            <div
                className='flex flex-col bg-white mx-1 mt-12 lg:px-0 lg:w-7/12'
                key={article.slug}
            >
                <img
                    className='object-cover h-96'
                    src={`/${article.image}.jpg`}
                    alt={article.image}
                />

                <div className='p-6 md:p-8 text-left space-y-4'>
                    <div className='text-sky-500 dark:text-sky-400 text-sm'>
                        <p>
                            {new Date(article.createdAt).toLocaleString(
                                'he-IL',
                                dateOptions
                            )}
                        </p>
                    </div>
                    <blockquote>
                        <Link
                            className='font-medium text-2xl'
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

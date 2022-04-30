import React, { useContext } from "react"
import { AppContext } from "../../contexts/app.context"

export const ArticleView = ({ post }) => {
    const { dateOptions } = useContext(AppContext)

    return (
        <div className="container mx-auto">
            <div className="flex flex-col bg-white mt-12 p-5 lg:max-w-5xl">
                <blockquote>
                    <h2 className="font-normal text-2xl pt-3 pb-5">
                        {post.title}
                    </h2>
                </blockquote>
                <div className="text-sky-500 dark:text-sky-400 pb-8">
                    <p>
                        {new Date(post.createdAt).toLocaleString(
                            "he-IL",
                            dateOptions
                        )}
                    </p>
                </div>
                <img
                    className="aspect-auto"
                    src={`/${post.image}.jpg`}
                    alt={post.image}
                />

                <div className=" pt-8 text-left space-y-4">
                    <figcaption className="font-medium">
                        <p className="">{post.text}</p>
                    </figcaption>
                </div>
            </div>
        </div>
    )

    /* <div className="bg-quote container flex items-center justify-center h-screen mx-auto">
                <blockquote className="bg-black font-serif mx-4 p-4 text-center text-white md:p-8">
                    <p className="font-bold italic text-3xl">
                        &ldquo;{post.preview}&rdquo;
                    </p>
                </blockquote>
    </div> */
}

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from '../pages/auth/auth.page'
import { CreatePage } from '../pages/admin/admin.page'
import { ArticlePage } from '../pages/article/article.page'
import { MainPage } from '../pages/main/main.page'

export const useRoutes = (isAuhtenticated) => {
    if (isAuhtenticated) {
        return (
            <Routes>
                <Route exact path='/admin' element={<CreatePage />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="*" element={<Navigate to ="/" />} />
            <Route exact path='/' element={<MainPage />} />
            <Route exact path="/auth" element={<AuthPage/>} />
            <Route exact path='/post/:slug' element={<ArticlePage />} />
        </Routes>
    )
}

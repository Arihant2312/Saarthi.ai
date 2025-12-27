import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import Layout from './pages/Layout'
import GenrateImages from './pages/GenerateImages'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import RemoveBackground from './pages/RemoveBackground'
import Community from './pages/Community'
import MusicRecommend from './pages/MusicRecommend'
import Summarisetext from './pages/Summarisetext'

function App() {
  return (
    <div>
      <Toaster />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='write-article' element={<WriteArticle />} />
          <Route path='blog-titles' element={<BlogTitles />} />
          <Route path='generate-image' element={<GenrateImages />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='music-recommend' element={<MusicRecommend />} />
          <Route path='article-summarize' element={<Summarisetext />} />
          <Route path='community' element={<Community />} />
        </Route>
      </Routes>

      {/* ✅ Vercel Analytics – render once */}
      <Analytics />
    </div>
  )
}

export default App

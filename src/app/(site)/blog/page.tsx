import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog | Hari Mishra - Full Stack Developer',
    description: 'Insights and articles about web development, MERN stack technologies, coding best practices, and my journey as a full-stack developer.',
}
import BlogList from '@/components/Blog/BlogList'
import HeroSub from '@/components/SharedComponent/HeroSub'

const BlogPage = () => {
  const breadcrumbLinks = [
    { href: '/', text: 'Home' },
    { href: '/blog', text: 'Blog' },
  ]
  return (
    <>
      <HeroSub
        title='Blog'
        description='Insights and articles about web development, MERN stack technologies, coding best practices, and my journey as a full-stack developer.'
        breadcrumbLinks={breadcrumbLinks}
      />
      <React.Suspense fallback={<div className="py-40 text-center dark:text-white">Loading Articles...</div>}>
        <BlogList />
      </React.Suspense>
    </>
  )
}

export default BlogPage

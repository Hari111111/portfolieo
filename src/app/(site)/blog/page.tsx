import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Web Development Blog | MERN Stack, Node.js & Coding Tips - Hari Mishra",

  description:
    "Explore in-depth articles on web development, MERN stack, Node.js, system design, and coding best practices. Learn from real-world projects and improve your developer skills with Hari Mishra.",

  keywords: [
    "web development blog",
    "mern stack blog",
    "node js tutorials",
    "javascript blog",
    "full stack developer blog",
    "coding best practices",
    "system design articles",
    "react js blog",
    "backend development guide",
    "hari mishra blog",

    // 🔥 Added keywords
    "javascript tutorials for beginners",
    "advanced javascript concepts",
    "node js api development",
    "express js tutorial",
    "mongodb database guide",
    "react js projects",
    "full stack development tutorial",
    "how to become full stack developer",
    "web development tips and tricks",
    "frontend vs backend development",
    "software engineering best practices",
    "clean code principles",
    "scalable backend architecture",
    "rest api design best practices",
    "real time applications using socket io",
    "authentication and authorization jwt",
    "next js blog tutorial",
    "seo for developers",
    "website performance optimization",
    "coding interview preparation",
    "data structures and algorithms javascript",
    "build projects for portfolio",
    "freelancing web development tips",
    "earn money from coding",
    "latest web development trends",
    "modern javascript es6 features",
    "typescript for beginners",
    "react hooks guide",
    "state management in react",
    "node js best practices",
    "api security best practices",
    "deployment using vercel and netlify"
  ],

  authors: [{ name: "Hari Mishra" }],
  creator: "Hari Mishra",

  metadataBase: new URL("https://portfolieo-five.vercel.app"),

  alternates: {
    canonical: "/blog",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Web Development Blog | MERN, Node.js & Full Stack Guides",
    description:
      "Read practical guides on MERN stack, Node.js, React, and backend development. Improve your coding and system design skills.",
    url: "https://portfolieo-five.vercel.app/blog",
    siteName: "Hari Mishra Blog",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Web Dev Blog | MERN Stack & Node.js Tutorials",
    description:
      "Level up your development skills with real-world coding articles, tutorials, and best practices.",
  },

  category: "technology",
};
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

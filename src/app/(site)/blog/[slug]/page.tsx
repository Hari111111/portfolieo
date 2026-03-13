import React from 'react'
import HeroSub from '@/components/SharedComponent/HeroSub'
import BlogDetailsClient from '@/components/Blog/BlogDetailsClient'
import { getBlogBySlug } from '@/app/api/users/blog.services'
import { Metadata } from 'next'

type Props = {
    params: { slug: string }
}

// Dynamic Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const response = await getBlogBySlug(params.slug);
        const blog = response.data || response;
        
        return {
            title: `${blog.title} | Hari Mishra`,
            description: blog.description,
            openGraph: {
                title: blog.title,
                description: blog.description,
                images: [blog.image],
            },
        }
    } catch (error) {
        return {
            title: 'Blog Not Found | Hari Mishra',
        }
    }
}

const BlogDetailsPage = ({ params }: Props) => {
    return (
        <main className="dark:bg-darkmode pb-20">
            <BlogDetailsClient slug={params.slug} />
        </main>
    )
}

export default BlogDetailsPage

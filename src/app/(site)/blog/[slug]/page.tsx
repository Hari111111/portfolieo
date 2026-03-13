import React from 'react'
import BlogDetailsClient from '@/components/Blog/BlogDetailsClient'
import { getBlogBySlug } from '@/app/api/users/blog.services'
import { Metadata } from 'next'

type Props = {
    params: { slug: string }
}

// 🚀 Dynamic Metadata: This is the "Best" SEO for Google & Social Media
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const response = await getBlogBySlug(params.slug);
        const blog = response.data || response;
        
        return {
            title: `${blog.title} | Hari Mishra`,
            description: blog.description,
            alternates: {
                canonical: `https://harimishra.com/blog/${params.slug}`,
            },
            openGraph: {
                title: blog.title,
                description: blog.description,
                url: `https://harimishra.com/blog/${params.slug}`,
                siteName: 'Hari Mishra Portfolio',
                images: [
                    {
                        url: blog.image || '/images/blog/default.jpg',
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                    },
                ],
                locale: 'en_US',
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: blog.title,
                description: blog.description,
                images: [blog.image || '/images/blog/default.jpg'],
            },
        }
    } catch (error) {
        return {
            title: 'Blog Post | Hari Mishra',
            description: 'Read the latest technical insights on the Hari Mishra portfolio.',
        }
    }
}

const BlogDetailsPage = ({ params }: Props) => {
    return (
        <main className="dark:bg-darkmode pb-20">
            {/* We pass the slug so the client can find it in the cache instantly */}
            <BlogDetailsClient slug={params.slug} />
        </main>
    )
}

export default BlogDetailsPage

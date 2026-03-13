'use client'
import React, { useEffect, useState } from 'react'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { getBlogBySlug } from '@/app/api/users/blog.services'
import { Blog } from '@/types/blog'
import { format } from 'date-fns'
import Image from 'next/image'
import markdownToHtml from '@/utils/markdownToHtml'

const BlogDetailsClient = ({ slug }: { slug: string }) => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [contentHtml, setContentHtml] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlogBySlug(slug);
                const blogData = response.data || response;
                setBlog(blogData);
                
                if (blogData.content) {
                    const html = await markdownToHtml(blogData.content);
                    setContentHtml(html);
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) return (
        <div className="flex justify-center items-center py-40 min-h-screen dark:bg-darkmode">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!blog) return (
        <div className="text-center py-40 min-h-screen dark:bg-darkmode">
            <h2 className="text-3xl font-bold dark:text-white">Blog Not Found</h2>
        </div>
    );

    const breadcrumbLinks = [
        { href: '/', text: 'Home' },
        { href: '/blog', text: 'Blog' },
        { href: `/blog/${blog.slug}`, text: blog.title },
    ]

    return (
        <>
            <HeroSub
                title={blog.title}
                description={blog.description}
                breadcrumbLinks={breadcrumbLinks}
            />

            <article className="container mx-auto max-w-4xl px-4">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 shadow-xl" data-aos="fade-up">
                    {blog.image ? (
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-border dark:bg-dark_border flex items-center justify-center text-grey">
                            No Cover Image
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-border dark:border-dark_border" data-aos="fade-up">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                            {blog.category}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-grey dark:text-white/60">
                         <span className="font-medium text-sm">
                            {format(new Date(blog.createdAt), "dd MMMM yyyy")}
                        </span>
                    </div>
                </div>

                <div 
                    className="prose prose-lg dark:prose-invert max-w-none blog-content"
                    data-aos="fade-up"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                <div className="mt-16 pt-10 border-t border-border dark:border-dark_border" data-aos="fade-up">
                    <h5 className="text-lg font-bold dark:text-white mb-4">Tags:</h5>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags && blog.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-border dark:bg-dark_border rounded-lg text-sm dark:text-white">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>

            <style jsx global>{`
                .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 700;
                    color: inherit;
                }
                .blog-content p {
                    margin-bottom: 1.5rem;
                    line-height: 1.8;
                    color: inherit;
                }
                .blog-content ul, .blog-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .blog-content li {
                    margin-bottom: 0.5rem;
                }
                .blog-content img {
                    border-radius: 0.5rem;
                    margin: 2rem 0;
                }
                .blog-content blockquote {
                    border-left: 4px solid var(--primary);
                    padding-left: 1.5rem;
                    font-style: italic;
                    margin: 2rem 0;
                }
            `}</style>
        </>
    )
}

export default BlogDetailsClient

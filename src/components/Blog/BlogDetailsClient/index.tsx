'use client'
import React, { useEffect, useState } from 'react'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Icon } from '@iconify/react'
import { getBlogBySlug, getBlogs } from '@/app/api/users/blog.services'
import { Blog } from '@/types/blog'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import markdownToHtml from '@/utils/markdownToHtml'

import { getBlogFromCache } from '@/utils/blogCache'

const BlogDetailsClient = ({ slug }: { slug: string }) => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [contentHtml, setContentHtml] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // Try cache first
                let blogData = getBlogFromCache(slug);
                
                // If not in cache, fetch
                if (!blogData) {
                    const response = await getBlogBySlug(slug);
                    blogData = response.data || response;
                }

                if (blogData) {
                    setBlog(blogData);
                    
                    if (blogData.content) {
                        // Replace {{skills}} placeholder with a list of tags
                        let processedContent = blogData.content;
                        if (blogData.tags && blogData.tags.length > 0) {
                            const skillsListHtml = blogData.tags
                                .map(tag => `<li class="skill-item">${tag}</li>`)
                                .join('');
                            processedContent = processedContent.replace('{{skills}}', skillsListHtml);
                        }

                        // Process markdown to HTML
                        const html = await markdownToHtml(processedContent);
                        setContentHtml(html);
                    }
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
                title="Blog Post"
                description="Dive into the details of this article"
                breadcrumbLinks={breadcrumbLinks}
            />

            <article className="container mx-auto max-w-4xl px-4 -mt-10 mb-20 relative z-10">
                <div className="bg-white dark:bg-darklight rounded-3xl shadow-2xl border border-border dark:border-dark_border overflow-hidden">
                    {/* Blog Cover Image */}
                    <div className="relative w-full aspect-video group overflow-hidden">
                        {blog.image ? (
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-border dark:bg-dark_border flex items-center justify-center text-grey">
                                <Icon icon="solar:gallery-bold-duotone" width="64" />
                            </div>
                        )}
                        <div className="absolute top-6 left-6">
                            <span className="px-4 py-1.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                {blog.category}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-6 text-grey dark:text-white/60">
                            <div className="flex items-center gap-2">
                                <Icon icon="solar:calendar-bold-duotone" className="text-primary text-lg" />
                                <span className="text-sm font-bold uppercase tracking-wide">
                                    {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
                                </span>
                            </div>
                            <div className="h-4 w-[1px] bg-border dark:bg-dark_border"></div>
                            <div className="flex items-center gap-2">
                                <Icon icon="solar:stopwatch-bold-duotone" className="text-primary text-lg" />
                                <span className="text-sm font-bold uppercase tracking-wide">5 min read</span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl md:text-5xl font-black text-midnight_text dark:text-white leading-tight mb-8">
                            {blog.title}
                        </h1>

                        {/* Content */}
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none blog-content selection:bg-primary/20"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-16 pt-10 border-t border-border dark:border-dark_border flex flex-wrap gap-3">
                                <Icon icon="solar:tag-bold-duotone" className="text-primary text-xl mt-1" />
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className="px-4 py-2 bg-[#f8f9fa] dark:bg-black/20 rounded-xl text-sm font-bold text-grey dark:text-white/80 hover:text-primary transition-colors cursor-default">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </article>

            <style jsx global>{`
                .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                    font-weight: 800;
                    line-height: 1.3;
                    color: inherit;
                }
                .blog-content p {
                    margin-bottom: 1.75rem;
                    line-height: 1.85;
                    font-size: 1.125rem;
                    color: inherit;
                    opacity: 0.9;
                }
                .blog-content ul, .blog-content ol {
                    margin-bottom: 2rem;
                    padding-left: 1.5rem;
                }
                .blog-content li {
                    margin-bottom: 0.75rem;
                    line-height: 1.7;
                }
                .skill-item {
                   list-style-type: none;
                   display: inline-block;
                   padding: 0.5rem 1rem;
                   background: var(--primary);
                   color: white;
                   margin: 0.25rem;
                   border-radius: 99px;
                   font-size: 0.875rem;
                   font-weight: bold;
                }
                .blog-content img {
                    border-radius: 1.5rem;
                    margin: 3rem 0;
                    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
                }
                .blog-content blockquote {
                    border-left: 5px solid var(--primary);
                    padding: 1rem 0 1rem 2rem;
                    font-style: italic;
                    font-size: 1.25rem;
                    margin: 2.5rem 0;
                    background: rgba(var(--primary-rgb), 0.05);
                    border-radius: 0 1rem 1rem 0;
                }
                .blog-content code {
                    background: rgba(0,0,0,0.05);
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.4rem;
                    font-size: 0.9em;
                }
                .dark .blog-content code {
                    background: rgba(255,255,255,0.1);
                }
                .blog-content pre {
                    background: #1e293b;
                    color: #f8fafc;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    overflow-x: auto;
                    margin: 2rem 0;
                }
            `}</style>
        </>
    )
}

export default BlogDetailsClient

'use client'
import React, { useEffect, useState } from 'react'
import { getBlogs } from '@/app/api/users/blog.services'
import { Blog } from '@/types/blog'
import { format } from 'date-fns'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import markdownToHtml from '@/utils/markdownToHtml'
import Link from 'next/link'

import BlogCard from '@/components/SharedComponent/Blog/blogCard'
import { setBlogCache } from '@/utils/blogCache'

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs();
                const blogData = response.data || response;
                setBlogs(blogData);
                setBlogCache(blogData); // Populate cache
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center py-40 min-h-[50vh] dark:bg-darkmode">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <section className='pt-8 pb-16 dark:bg-darkmode' id='blog'>
            <div className='container mx-auto max-w-6xl px-4'>
                {blogs.length > 0 ? (
                    <div className='grid grid-cols-12 gap-7'>
                        {blogs.map((blog, i) => (
                            <div
                                key={i}
                                className='w-full lg:col-span-4 md:col-span-6 col-span-12'
                                data-aos='fade-up'
                                data-aos-delay={i * 100}
                                data-aos-duration='1000'>
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-grey dark:text-white/50">
                        <Icon icon="solar:document-add-bold-duotone" width="64" className="mx-auto mb-4 opacity-20" />
                        <h3 className="text-2xl font-bold mb-4">No Blogs Found</h3>
                        <p>Check back later for new articles!</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BlogList

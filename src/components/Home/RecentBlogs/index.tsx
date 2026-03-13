'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { getBlogs } from '@/app/api/users/blog.services'
import { Blog } from '@/types/blog'
import BlogCard from '@/components/SharedComponent/Blog/blogCard'
import Link from 'next/link'

const RecentBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs();
                const data = response.data || response;
                setBlogs(data.slice(0, 3)); // Only show top 3 for home page
            } catch (error) {
                console.error("Error fetching recent blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading || blogs.length === 0) return null;

    return (
        <section id='blog' className='bg-section dark:bg-darklight py-16 md:py-24'>
            <div className='container mx-auto max-w-6xl px-4'>
                <div className='flex flex-wrap justify-between items-end mb-12' data-aos='fade-up'>
                    <div className='max-w-2xl'>
                        <div className='flex gap-2 items-center mb-4'>
                            <span className='w-3 h-3 rounded-full bg-primary'></span>
                            <span className='font-medium text-midnight_text text-sm dark:text-white/50'>
                                Latest Updates
                            </span>
                        </div>
                        <h2 className='text-4xl md:text-5xl font-bold text-midnight_text dark:text-white mb-4'>
                            Recent Blog Posts
                        </h2>
                        <p className='text-grey dark:text-white/70 text-lg'>
                            Deep dive into the latest technologies, coding tips, and my development experiences.
                        </p>
                    </div>
                    <div className='mt-6 md:mt-0'>
                        <Link 
                            href='/blog' 
                            className='inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all'
                        >
                            View All Articles <Icon icon='solar:arrow-right-bold' />
                        </Link>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {blogs.map((blog, index) => (
                        <div 
                            key={blog._id} 
                            data-aos='fade-up' 
                            data-aos-delay={index * 100}
                        >
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RecentBlogs

'use client'
import React, { useEffect, useState } from 'react'
import BlogCard from '@/components/SharedComponent/Blog/blogCard'
import { getBlogs } from '@/app/api/users/blog.services'
import { Blog } from '@/types/blog'

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data || response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-20 bg-white dark:bg-darklight min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <section
      className='flex flex-wrap justify-center pt-8 md:pb-24 pb-16 dark:bg-darkmode'
      id='blog'>
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
            <h3 className="text-2xl font-bold mb-4">No Blogs Found</h3>
            <p>Check back later for new articles!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogList

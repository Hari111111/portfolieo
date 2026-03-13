"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/app/api/users/project.services'

const PortfolioList = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data || response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id='portfolio' className='md:pb-24 pb-16 pt-8 dark:bg-darkmode'>
      <div className='flex flex-wrap gap-[2.125rem] lg:px-[2.125rem] px-0 max-w-[120rem] w-full justify-center m-auto'>
        {projects.map((item, index) => (
          <div key={index} className={`w-[18rem] group ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
             <div className='relative overflow-hidden rounded-lg min-h-[250px] bg-border dark:bg-dark_border group-hover:scale-[1.1] transition-all duration-500'>
                {item.image && (
                   <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={800}
                    style={{ width: '100%', height: 'auto', minHeight: '250px', objectFit: 'cover' }}
                  />
                )}
              </div>
              <h4 className='pb-[0.3125rem] pt-[2.1875rem] group-hover:text-primary group-hover:cursor-pointer text-2xl text-midnight_text font-bold dark:text-white truncate'>
                {item.title}
              </h4>
              <p className='text-secondary font-normal text-lg group-hover:text-primary group-hover:cursor-pointer dark:text-white/50 line-clamp-2'>
                {item.description}
              </p>
          </div>
        ))}
        {projects.length === 0 && (
           <div className="text-center text-grey py-10 w-full">
              No projects found.
           </div>
        )}
      </div>
    </section>
  )
}

export default PortfolioList


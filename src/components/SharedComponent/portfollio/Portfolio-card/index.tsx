'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getProjects } from '@/app/api/users/project.services'

const PortfolioCard = () => {
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

  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 100,
    slidesToShow: projects.length < 5 ? projects.length : 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: Math.min(projects.length, 4),
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(projects.length, 4),
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(projects.length, 3),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(projects.length, 2),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  if (loading) return null; // Or show a skeleton/loader

  return (
    <div id='portfolio' className='dark:bg-darkmode pb-20'>
      <div className='lg:px-9 m-auto px-0 max-w-[1600px] slider-container'>
        <Slider {...settings}>
          {projects.map((item, index) => (
            <div key={index} className={`px-3 group ${index % 2 !== 0 ? 'lg:mt-24 ' : ''}`}>
               <div className='relative overflow-hidden rounded-lg min-h-[250px] bg-border dark:bg-dark_border'>
                {item.image && (
                   <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={800}
                    style={{ width: '100%', height: 'auto', minHeight: '250px', objectFit: 'cover' }}
                    className='group-hover:scale-110 transition-all duration-500'
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                   {item.liveUrl && (
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary text-white rounded-full">
                         <Icon icon="solar:link-bold" />
                      </a>
                   )}
                </div>
              </div>
              <h4 className='pb-1 pt-9 group-hover:text-primary group-hover:cursor-pointer text-2xl text-midnight_text font-bold dark:text-white truncate'>
                {item.title}
              </h4>
              <p className='text-secondary font-normal text-lg group-hover:text-primary group-hover:cursor-pointer dark:text-white/50 line-clamp-2'>
                {item.description}
              </p>
            </div>
          ))}
        </Slider>
        {projects.length === 0 && (
           <div className="text-center text-grey py-10">
              No projects to display.
           </div>
        )}
      </div>
    </div>
  )
}

// Small helper for Icon if needed, or import it
import { Icon } from '@iconify/react'

export default PortfolioCard


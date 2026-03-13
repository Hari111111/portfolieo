'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getProjects } from '@/app/api/users/project.services'

const SlickSlider = () => {
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
    dots: true,
    arrows: false,
    infinite: projects.length > 2,
    speed: 500,
    slidesToShow: Math.min(projects.length, 2),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(projects.length, 2),
        },
      },
    ],
  }

  if (loading || projects.length === 0) return null;

  return (
    <Slider {...settings}>
      {projects.map((item, index) => (
        <div className={`px-2`} key={index}>
          <div className="relative overflow-hidden rounded-lg min-h-[200px] bg-border dark:bg-dark_border">
            {item.image && (
                <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={150}
                    quality={100}
                    className='rounded-lg object-cover'
                    style={{ width: '100%', height: 'auto', minHeight: '200px' }}
                />
            )}
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default SlickSlider


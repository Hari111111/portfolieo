"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getServices } from '@/app/api/users/service.services'
import { Icon } from '@iconify/react'
import Image from 'next/image'

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data || response); // response.data because axiosHelper returns response.data
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <section className='bg-section dark:bg-darklight' id='services'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div
          className='flex gap-2 items-center justify-center'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          <span className='w-3 h-3 rounded-full bg-success'></span>
          <span className='font-medium text-midnight_text text-sm dark:text-white/50'>
            our services
          </span>
        </div>
        <h2
          className='sm:text-4xl text-[28px] leading-tight font-bold text-midnight_text md:text-center text-start pt-7 pb-20 md:w-4/6 w-full m-auto dark:text-white'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'>
          Services specifically designed to meet your business needs
        </h2>
        <div className='grid md:grid-cols-12 sm:grid-cols-8 grid-cols-1 gap-7 pb-20'>
          {services.map((item, index) => (
            <div
              key={index}
              data-aos='fade-up'
              data-aos-delay={`${index * 200}`}
              data-aos-duration='1000'
              data-aos-offset='300'
              className='col-span-4 bg-white flex flex-col justify-between items-center text-center py-14 px-7 shadow-service rounded-md gap-8 dark:bg-darkmode transition-all hover:scale-105'>
              {item.icon.startsWith('/') || item.icon.startsWith('http') ? (
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className='w-10 h-10 object-contain'
                />
              ) : (
                <div className="text-4xl text-primary">
                   <Icon icon={item.icon} />
                </div>
              )}
              <h3 className='max-w-44 mx-auto text-2xl font-bold'>
                {item.title}
              </h3>
              <p className='dark:text-white/50 text-base font-normal'>
                {item.description}
              </p>
              <Link
                href='#'
                className='hover:text-blue-700 text-lg font-medium text-primary group flex items-center'>
                Get Started
                <span>
                  <Icon
                    icon='ei:chevron-right'
                    width='30'
                    height='30'
                    className=''
                  />
                </span>
              </Link>
            </div>
          ))}
          {services.length === 0 && (
            <div className="col-span-12 text-center text-grey py-10">
               No services available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Services


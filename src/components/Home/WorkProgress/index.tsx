'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Progress as ProgressData } from '@/app/api/data' // Assuming Progress is correctly imported
import { getImgPath } from '@/utils/image'
import axiosHelper from '@/utils/axiosHelper'

// Define the interface for ProgressItem
interface ProgressItem {
  title: string
  Progress: number
}

const Progresswork = ({ isColorMode }: { isColorMode: Boolean }) => {
  const [progressValues, setProgressValues] = useState<ProgressItem[]>([]) 
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setProgressValues(ProgressData);
    const fetchProfile = async () => {
      try {
        const data: any = await axiosHelper.get('/profile');
        if (data && data.name && data.name !== 'Your Name') {
          setProfile(data);
        }
      } catch (err) {
        console.error("Progresswork: Profile fetch failed", err);
      }
    };
    fetchProfile();
  }, [])

  const displayTitle = profile?.title || "Build amazing websites and landing pages with ease";
  const displayAbout = profile?.about || "MERN Stack Developer dedicated to creating innovative web solutions and high-quality software with a focus on user experience and scalability.";

  return (
    <section
      className={`scroll-mt-25 py-24 ${
        isColorMode
          ? 'dark:bg-darklight bg-section'
          : 'dark:bg-darkmode bg-white'
      }`}
      id='about'>
      <div className='container mx-auto max-w-6xl px-6'>
        <div className='grid md:grid-cols-12 items-center gap-12 lg:gap-20'>
          <div className='md:col-span-6 order-2 md:order-1'>
            <div className='relative group'>
                <div className='absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity'></div>
                <Image
                  src={getImgPath('/images/work-progress/progress-work.png')}
                  alt='About Me Illustration'
                  width={500}
                  height={500}
                  quality={100}
                  style={{ width: '100%', height: 'auto' }}
                  className='relative z-10 hover:scale-105 transition-transform duration-500'
                />
            </div>
          </div>
          <div
            className='md:col-span-6 order-1 md:order-2'
            data-aos='fade-left'
            data-aos-delay='200'
            data-aos-duration='1000'>
            <div className='flex gap-4 items-center mb-6'>
              <span className='w-4 h-4 rounded-full bg-success shadow-[0_0_10px_#10b981] animate-pulse'></span>
              <span className='font-bold text-midnight_text text-[10px] md:text-xs dark:text-white/50 uppercase tracking-[0.3em] italic'>
                Discover My DNA
              </span>
            </div>
            <h2 className='text-midnight_text font-black dark:text-white text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-8 tracking-tighter uppercase italic'>
              {displayTitle}
            </h2>
            <p className='text-gray dark:text-white/80 text-base md:text-lg font-medium leading-relaxed mb-10'>
              {displayAbout}
            </p>

            <div className='space-y-6 h-[300px] overflow-y-auto pr-2 custom-scrollbar lg:pr-6'>
              {progressValues.map((item, index) => (
                <div
                  key={index}
                  className='progress_bar_item group'>
                  <div className='flex justify-between items-center mb-3'>
                    <div className='text-[10px] font-black text-midnight_text uppercase tracking-widest dark:text-white group-hover:text-primary transition-colors'>
                      {item.title}
                    </div>
                    <div className='text-[10px] font-black text-primary'>
                      {item.Progress}%
                    </div>
                  </div>
                  <div className='relative h-1.5 w-full bg-primary/5 rounded-full overflow-hidden'>
                    <div
                      className='progress absolute left-0 top-0 bottom-0 h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_#10b981]'
                      style={{ width: `${item.Progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Progresswork

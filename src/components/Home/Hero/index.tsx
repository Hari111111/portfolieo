'use client'
import { getImgPath } from '@/utils/image'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axiosHelper from '@/utils/axiosHelper'

const Hero = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await axiosHelper.get('/profile');
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const displayName = profile?.name || "Hari Mishra";
  const displayTitle = profile?.title || "Full Stack MERN Developer";
  const displayAbout = profile?.about || "MERN Stack Expert & Professional UI Designer crafting next-gen digital experiences.";

  return (
    <section className='relative py-12 md:py-24 bg-white dark:bg-darklight overflow-hidden'>
      {/* Background Orbs for Deep UI */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      <div className='container mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10'>
        <div
          className='md:col-span-7 space-y-8'
          data-aos='fade-right'
          data-aos-delay='200'
          data-aos-duration='1000'>
          
          <div className='flex gap-4 items-center'>
            <span className='w-12 h-1 bg-primary rounded-full'></span>
            <span className='font-black text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] italic'>
              {displayTitle}
            </span>
          </div>

          <h1 className='text-midnight_text font-black dark:text-white text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tighter uppercase italic'>
            Hi, I'm <br /> 
            <span className='text-primary decoration-8 underline-offset-[16px] hover:scale-105 transition-transform cursor-pointer inline-block'>
              {displayName}
            </span>
          </h1>

          <p className='text-grey dark:text-white/70 text-base md:text-xl font-medium leading-relaxed max-w-xl'>
            {displayAbout}
          </p>

          <div className='flex flex-wrap gap-6 pt-6'>
            <Link
              href='/portfolio'
              className='px-10 py-5 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all hover:scale-105 shadow-2xl shadow-primary/30 flex items-center justify-center min-w-[180px]'>
              View Protocols
            </Link>
            {profile?.resumeLink && (
              <a
                href={profile.resumeLink.includes('cloudinary.com') ? profile.resumeLink.replace('/upload/', '/upload/fl_attachment/') : profile.resumeLink}
                download="Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className='px-10 py-5 border-2 border-border dark:border-dark_border text-midnight_text dark:text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:border-primary transition-all hover:scale-105 flex items-center justify-center min-w-[180px]'>
                Get Resume
              </a>
            )}
          </div>
        </div>

        <div className='md:col-span-5 relative'>
          <div className='relative group max-w-[400px] mx-auto md:ml-auto'>
            <div className='absolute inset-0 bg-primary/20 rounded-[3rem] blur-2xl group-hover:bg-primary/30 transition-all'></div>
            <div className='relative z-10 p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl'>
                <Image
                  src={getImgPath('/images/hero/hero-image.jpg')}
                  alt='hero-image'
                  width={500}
                  height={500}
                  quality={100}
                  className='rounded-[3rem] hover:scale-105 transition-transform duration-700 object-cover aspect-square grayscale hover:grayscale-0'
                />
            </div>
            
            {/* Floating Telemetry Chips */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-darkmode p-4 rounded-2xl border border-primary/20 shadow-xl hidden lg:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-midnight_text dark:text-white uppercase tracking-widest leading-none">Status: Available</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

'use client'
import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'
import axiosHelper from '@/utils/axiosHelper'

const Footer: FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data: any = await axiosHelper.get('/profile');
        if (data && data.name && data.name !== 'Your Name') {
          setProfile(data);
        }
      } catch (err) {
        console.error("Footer: Profile fetch failed", err);
      }
    };
    fetchProfile();
  }, []);

  const displayEmail = profile?.email || "harimishra922@gmail.com";
  const displayPhone = profile?.phone || "+91 8303573350";
  const displayGithub = profile?.socials?.github || "#";
  const displayLinkedin = profile?.socials?.linkedin || "#";
  const displayWebsite = profile?.socials?.website || "/";

  return (
    <footer className='bg-section dark:bg-darkmode relative z-1 border-t border-border dark:border-dark_border px-6'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div className='grid md:grid-cols-12 grid-cols-1 sm:grid-cols-12'>
          <div className='md:col-span-4 sm:col-span-6 col-span-12 sm:border-r border-b border-solid border-dark_border flex items-center sm:border-b-0 sm:min-h-25 py-10 shrink-0 '>
            <div className='sm:content-normal sm:text-start text-center content-center sm:w-auto w-full'>
              <Link href='/' className='md:block flex justify-center'>
                <Image
                  src={getImgPath('/images/logo/logo-white.png')}
                  alt='logo'
                  width={160}
                  height={50}
                  style={{ width: 'auto', height: 'auto' }}
                  quality={100}
                  unoptimized
                />
              </Link>
              <h2 className='text-midnight_text dark:text-white py-10 text-[40px] leading-tight font-bold'>
                Let's Build Something Amazing Together!
              </h2>
              <Link
                href='/contact'
                className='px-9 py-3 rounded-lg bg-primary text-white hover:bg-blue-700 hover:shadow-none'>
                Get Started
              </Link>
            </div>
          </div>
          <div className='md:col-span-4 sm:col-span-6 col-span-12 sm:flex items-center sm:min-h-25 py-10 justify-center shrink-0 md:border-r border-b sm:border-b-0 border-solid border-dark_border'>
            <div className='flex flex-col md:items-start items-center'>
              <span className='text-lg font-bold text-midnight_text dark:text-white pb-4 inline-block'>
                Support
              </span>
              <div className='pb-5 sm:block flex flex-col items-center md:items-start'>
                <p className='text-base font-bold text-midnight_text dark:text-white'>Phone</p>
                <Link
                  href={`tel:${displayPhone}`}
                  className='text-xl text-grey dark:text-white/50 hover:text-primary dark:hover:text-white'>
                  {displayPhone}
                </Link>
              </div>
              <div className='sm:block flex flex-col items-center md:items-start gap-1'>
                <p className='text-base font-bold text-midnight_text dark:text-white'>Email</p>
                <Link
                  href={`mailto:${displayEmail}`}
                  className='text-xl text-grey dark:text-white/50 hover:text-primary dark:hover:text-white'>
                  {displayEmail}
                </Link>
              </div>
              <div>
                <ul className='flex items-center gap-3 mt-[1.875rem]'>
                  <li className='group'>
                    <Link href={displayGithub} target="_blank" rel="noopener noreferrer">
                      <svg
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='#A3BBD1'
                        xmlns='http://www.w3.org/2000/svg'
                        className='group-hover:fill-primary transition-all duration-300 transform group-hover:scale-125'>
                          {/* GitHub Icon Path */}
                          <path d="M12.5 0C5.59414 0 0 5.59414 0 12.5C0 18.0234 3.58203 22.707 8.55078 24.3633C9.17578 24.4766 9.40234 24.0937 9.40234 23.7617C9.40234 23.4648 9.38672 22.4648 9.38281 21.418C6 22.1055 5.25781 20.0156 5.25781 20.0156C4.70703 18.6172 3.91016 18.2461 3.91016 18.2461C2.8125 17.4922 3.99219 17.5078 3.99219 17.5078C5.20703 17.5937 5.84766 18.7539 5.84766 18.7539C6.92578 20.5977 8.67578 20.0664 9.36328 19.7578C9.47266 18.9766 9.78516 18.4453 10.1289 18.1445C7.43359 17.8398 4.60156 16.7969 4.60156 12.1445C4.60156 10.8164 5.07422 9.73438 5.85547 8.88281C5.73047 8.57422 5.3125 7.33594 5.97656 5.66797C5.97656 5.66797 6.99609 5.34375 9.32031 6.91406C10.293 6.64453 11.332 6.51172 12.3672 6.50781C13.4023 6.51172 14.4414 6.64453 15.4141 6.91406C17.7344 5.34375 18.7539 5.66797 18.7539 5.66797C19.418 7.33594 19.0039 8.57422 18.8789 8.88281C19.6602 9.73438 20.1289 10.8164 20.1289 12.1445C20.1289 16.8086 17.293 17.8359 14.5859 18.1367C15.0234 18.5156 15.4141 19.2617 15.4141 20.4062C15.4141 22.043 15.3984 23.3633 15.3984 23.7617C15.3984 24.0977 15.6211 24.4844 16.2539 24.3633C21.2188 22.7031 24.8008 18.0234 24.8008 12.5C24.8008 5.59414 19.207 0 12.5 0V0Z" />
                      </svg>
                    </Link>
                  </li>
                  <li className='group'>
                    <Link href={displayLinkedin} target="_blank" rel="noopener noreferrer">
                      <svg
                        width='23'
                        height='23'
                        viewBox='0 0 23 23'
                        fill='#A3BBD1'
                        xmlns='http://www.w3.org/2000/svg'
                        className='group-hover:fill-primary transition-all duration-300 transform group-hover:scale-125'>
                          {/* LinkedIn Icon Path */}
                          <path d="M21.3412 0H1.65878C0.742615 0 0 0.742615 0 1.65878V21.3412C0 22.2574 0.742615 23 1.65878 23H21.3412C22.2574 23 23 22.2574 23 21.3412V1.65878C23 0.742615 22.2574 0 21.3412 0ZM7.80353 17.3848H5.12453V8.95858H7.80353V17.3848ZM6.46411 7.80798H6.44666C5.54767 7.80798 4.96625 7.161 4.96625 6.35241C4.96625 5.52557 5.56546 4.89648 6.4819 4.89648C7.39835 4.89648 7.96231 5.52557 7.97977 6.35241C7.97977 7.161 7.39835 7.80798 6.46411 7.80798ZM17.4634 17.3848H14.7848V12.877C14.7848 11.7441 14.3969 10.9715 13.4276 10.9715C12.6875 10.9715 12.2468 11.4926 12.0531 11.9957C11.9822 12.1758 11.965 12.4274 11.965 12.6792V17.3848H9.28612C9.28612 17.3848 9.3212 9.7491 9.28612 8.95858H11.965V10.1516C12.321 9.57748 12.9579 8.76082 14.3793 8.76082C16.1418 8.76082 17.4634 9.96511 17.4634 12.5532V17.3848Z" />
                      </svg>
                    </Link>
                  </li>
                  <li className='group'>
                    <Link href={displayWebsite} target="_blank" rel="noopener noreferrer">
                      <svg
                        width='22'
                        height='23'
                        viewBox='0 0 22 23'
                        fill='#A3BBD1'
                        xmlns='http://www.w3.org/2000/svg'
                        className='group-hover:fill-primary transition-all duration-300 transform group-hover:scale-125'>
                          {/* Website/Globe Icon Path */}
                          <path d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zm0 2c1.785 0 3.398.674 4.621 1.777L13.121 6.278C12.502 5.945 11.781 5.75 11 5.75s-1.502.195-2.121.528l-2.5-2.501C7.602 2.674 9.215 2 11 2zm-6.221 3.199l2.5 2.501C6.445 8.498 6.25 9.219 6.25 10c0 .781.195 1.502.528 2.121l-2.501 2.5C3.374 13.398 2.7 11.785 2.7 10c0-1.785.674-3.398 1.777-4.621l.302-.18zm1.854 10.177l2.501-2.5C9.498 13.555 10.219 13.75 11 13.75s1.502-.195 2.121-.528l2.501 2.5c-1.102 1.221-2.715 1.895-4.622 1.895-1.93 0-3.565-.694-4.754-1.945zm11.744-1.854l-2.501-2.5C15.555 11.502 15.75 10.781 15.75 10s-.195-1.502-.528-2.121l2.5-2.501c1.104 1.222 1.778 2.836 1.778 4.622s-.674 3.398-1.777 4.621z" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='md:col-span-4 col-span-12 border-t md:border-none border-solid border-dark_border sm:flex items-center justify-end md:min-h-25 py-10 shrink-0'>
            <div className='md:w-3/4 w-full sm:text-start text-center'>
              <span className='font-bold text-midnight_text dark:text-white pb-4 inline-block text-2xl uppercase tracking-tighter italic'>
                Subscribe newsletter
              </span>
              <p className='text-MistyBlue text-base pb-7 text-grey dark:text-white/50'>
                Stay updated with the latest web development trends and tips
              </p>
              <form className='newsletter-form flex rounded-lg sm:w-full w-3/4 sm:mx-0 mx-auto'>
                <input
                  type='email'
                  placeholder='Email*'
                  className='p-4 text-sm font-bold rounded-s-2xl rounded-e-none outline-0 w-[calc(100%_-_137px)] flex bg-white dark:bg-midnight_text text-midnight_text dark:text-white border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary'
                />
                <button
                  type='submit'
                  className='text-xs font-black uppercase tracking-widest bg-primary text-white border-none cursor-pointer rounded-e-2xl outline-0 text-center w-[8.5625rem] hover:bg-blue-700 hover:shadow-none transition-all'>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center gap-4 md:gap-0 flex-wrap p-7 border-t border-solid border-dark_border'>
        <div>
          <ul className='flex justify-center mb-4 items-center sm:gap-7 gap-3 text-xs font-black uppercase tracking-widest'>
            <li className='text-grey dark:text-white/50'>
              <Link href='/#about' className='hover:text-primary transition-colors'>
                About
              </Link>
            </li>
            <li className='text-grey dark:text-white/50'>
              <Link href='/#services' className='hover:text-primary transition-colors'>
                Services
              </Link>
            </li>
            <li className='text-grey dark:text-white/50'>
              <Link href='/portfolio' className='hover:text-primary transition-colors'>
                Portfolio
              </Link>
            </li>
            <li className='text-grey dark:text-white/50'>
              <Link href='/blog' className='hover:text-primary transition-colors'>
                Blog
              </Link>
            </li>
            <li className='text-grey dark:text-white/50'>
              <Link href='/contact' className='hover:text-primary transition-colors'>
                Contact
              </Link>
            </li>
            <li className='text-grey dark:text-white/50'>
              <Link href='/resume-builder' className='hover:text-primary transition-colors'>
                Resume Builder
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-[10px] font-black uppercase tracking-[0.4em] text-grey dark:text-white/30 italic'>
            © {new Date().getFullYear()} {profile?.name || "Hari Mishra"} • Synthesis of Logic and Design
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

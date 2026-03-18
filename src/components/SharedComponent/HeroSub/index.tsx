import React, { FC } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { BreadcrumbLink } from '@/types/breadcrumb'

interface HeroSubProps {
  title: string
  description: string
  breadcrumbLinks: BreadcrumbLink[]
}

const HeroSub: FC<HeroSubProps> = ({ title, description, breadcrumbLinks }) => {
  return (
    <>
      <section className='text-center md:py-8 py-6 md:pt-28 pt-20 bg-white dark:bg-blue'>
        <h1 className='md:text-3xl text-2xl font-black text-midnight_text uppercase tracking-tight dark:text-white'>
          {title}
        </h1>
        <p className='text-base text-slate-500 font-medium max-w-2xl mx-auto my-4 sm:px-0 px-4'>
          {description}
        </p>
        <Breadcrumb links={breadcrumbLinks} />
      </section>
    </>
  )
}

export default HeroSub

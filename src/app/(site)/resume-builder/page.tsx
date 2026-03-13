import React from 'react'
import ResumeBuilder from '@/components/ResumeBuilder'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "AI-Powered Resume Builder | Hari Mishra",
    description: "Create a professional, high-impact resume in minutes with our free resume builder. Choose from premium templates and download as PDF instantly.",
    keywords: ["resume builder", "CV maker", "free resume", "professional resume templates", "PDF resume generator"]
}

const ResumeBuilderPage = () => {
  const breadcrumbLinks = [
    { href: '/', text: 'Home' },
    { href: '/resume-builder', text: 'Resume Builder' },
  ]

  return (
    <>
      <HeroSub
        title='Professional Resume Builder'
        description='Craft a winning resume with our premium templates. Fast, free, and no login required.'
        breadcrumbLinks={breadcrumbLinks}
      />
      <ResumeBuilder />
    </>
  )
}

export default ResumeBuilderPage

import React from 'react'
import ResumeBuilder from '@/components/ResumeBuilder'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Best Free Online AI Resume Builder | Professional CV Maker",
  description: "Build a job-winning, ATS-friendly resume in minutes with our free AI-powered builder. Professional templates, instant PDF download, and developer-focused layouts.",
  keywords: [
    "best resume builder 2024",
    "free CV maker online",
    "professional resume templates",
    "ATS friendly resume generator",
    "online resume maker with PDF",
    "job-winning resume builder",
    "developer resume builder",
    "software engineer CV templates",
    "free online CV builder",
    "modern resume designs",

    "online resume builder",
    "AI resume builder",
    "best CV builder online",
    "free resume generator",
    "resume builder for freshers",
    "resume maker with templates",
    "simple resume builder",
    "resume creator online",
    "resume builder with download",
    "easy resume maker online",

    "professional CV builder",
    "best resume templates free",
    "modern CV templates",
    "creative resume templates",
    "professional resume design",
    "minimal resume template",
    "corporate CV template",
    "job ready resume template",

    "ATS optimized resume",
    "ATS friendly CV template",
    "ATS resume builder free",
    "ATS compliant resume generator",
    "ATS resume format",
    "best ATS resume template",
    "ATS resume checker",

    "software engineer resume template",
    "developer resume template",
    "frontend developer resume",
    "backend developer resume",
    "full stack developer resume",
    "IT professional resume template",
    "programmer resume template",

    "resume builder with PDF download",
    "CV maker with PDF export",
    "download resume as PDF",
    "resume builder with Word format",
    "printable resume template",

    "make resume online free",
    "create CV online free",
    "build resume online",
    "resume maker free download",
    "free resume builder for jobs",
    "best CV builder for students",
    "resume maker for job application",

    "free resume builder for software developers",
    "ATS friendly resume builder for freshers",
    "best resume builder for IT jobs"
  ],
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

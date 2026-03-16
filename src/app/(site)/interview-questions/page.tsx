import React from 'react';
import { Metadata } from 'next';
import InterviewQuestionsClient from '@/components/InterviewQuestions/InterviewQuestionsClient';

export const metadata: Metadata = {
    title: 'Top Technical Interview Questions & Answers | Master Coding Interviews',
    description: 'Prepare for your MERN stack, Full-Stack, and Technical interviews with our curated bank of 500+ questions. Expert answers on React, Next.js, Node.js, Frontend, Backend, and System Design.',
    keywords: [
        "technical interview questions",
        "frontend development interview",
        "backend interview q&a",
        "MERN stack interview preparation",
        "React.js interview questions",
        "Next.js interview guide",
        "JavaScript coding questions",
        "Node.js interview answers",
        "database interview topics",
        "system design interview prep",
        "coding interview bank",
        "software engineer interview",

        "full stack developer interview questions",
        "frontend developer interview questions",
        "backend developer interview questions",
        "JavaScript interview questions and answers",
        "advanced JavaScript interview questions",
        "Node.js backend interview questions",
        "React developer interview preparation",
        "Next.js developer interview questions",
        "MongoDB interview questions",
        "SQL interview questions for developers",
        "REST API interview questions",
        "GraphQL interview questions",

        "professional resume builder",
        "online resume builder",
        "ATS friendly resume builder",
        "resume builder for developers",
        "software engineer resume builder",
        "free online resume maker",
        "CV builder online",
        "create resume online free",
        "resume builder with PDF download",
        "ATS resume templates",
        "developer CV templates",
        "modern resume templates",
        "resume maker for job applications",

        "data structures interview questions",
        "algorithms interview questions",
        "DSA coding interview preparation",
        "coding interview practice questions",
        "programming interview questions",

        "system design interview questions",
        "low level design interview questions",
        "high level design interview questions",
        "scalable system design interview",

        "software engineering interview questions",
        "web developer interview questions",
        "IT interview preparation guide",
        "coding test practice for developers",
        "technical interview preparation"
    ],
    openGraph: {
        title: 'Master Your Technical Interview | Expert Q&A Bank',
        description: 'Deep dive into technical concepts with our categorized interview questions. Master React, Node, SQL, and more.',
        images: ['/images/interview/og-image.jpg'],
    },
};

export default function InterviewQuestionsPage() {
    return <InterviewQuestionsClient />;
}

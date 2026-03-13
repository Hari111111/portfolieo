import React from 'react';
import { Metadata } from 'next';
import InterviewQuestionsClient from '@/components/InterviewQuestions/InterviewQuestionsClient';

export const metadata: Metadata = {
    title: 'Interview Q&A | Hari Mishra - Technical Interview Preparation',
    description: 'Master your next technical interview with my curated list of questions and answers. Categories include Frontend (React, Next.js), Backend (NestJS, Node.js), Databases (MongoDB, PostgreSQL), and more.',
    openGraph: {
        title: 'Interview Q&A | Hari Mishra',
        description: 'Professional interview preparation guide for modern full-stack development. Master React, Next.js, NestJS, and more.',
        images: ['/images/interview/og-image.jpg'],
    },
};

export default function InterviewQuestionsPage() {
    return <InterviewQuestionsClient />;
}

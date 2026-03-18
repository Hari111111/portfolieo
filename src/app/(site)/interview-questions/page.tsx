import React from 'react';
import { Metadata } from 'next';
import InterviewQuestionsClient from '@/components/InterviewQuestions/InterviewQuestionsClient';

export const metadata: Metadata = {
    title: "Technical Interview Questions & Answers | Crack Coding & System Design Interviews",

    description:
        "Master technical interviews with 500+ curated questions and answers on JavaScript, React, Node.js, MERN stack, DSA, and system design. Perfect for frontend, backend, and full stack developers preparing for top tech companies.",

    keywords: [
        // 🔥 Core Keywords
        "technical interview questions",
        "coding interview questions",
        "software engineer interview",
        "programming interview questions",
        "technical interview preparation",

        // 💻 JavaScript / MERN Stack
        "javascript interview questions and answers",
        "advanced javascript interview questions",
        "react js interview questions",
        "next js interview questions",
        "node js interview questions",
        "mern stack interview questions",

        // 🧠 Backend / API / DB
        "backend developer interview questions",
        "rest api interview questions",
        "graphql interview questions",
        "mongodb interview questions",
        "sql interview questions",

        // 🎯 Role-Based
        "frontend developer interview questions",
        "backend developer interview questions",
        "full stack developer interview questions",
        "web developer interview questions",

        // 🧮 DSA / Coding
        "data structures interview questions",
        "algorithms interview questions",
        "dsa interview preparation",
        "coding interview practice questions",
        "leetcode style questions",

        // 🏗️ System Design
        "system design interview questions",
        "low level design interview questions",
        "high level design interview questions",
        "scalable system design interview",
        "system design for beginners",

        // 🔍 Long-Tail (High Ranking Power)
        "top technical interview questions for software engineers",
        "frontend and backend interview questions with answers",
        "complete guide to crack coding interviews",
        "most asked javascript interview questions 2025",
        "system design interview questions with answers for beginners",
        "full stack developer interview preparation guide"
    ],

    alternates: {
        canonical: "https://harimishra.com/interview-questions",
    },

    openGraph: {
        title: "Crack Technical Interviews | 500+ Questions & Expert Answers",
        description:
            "Prepare for coding interviews with real-world questions on JavaScript, React, Node.js, DSA, and system design.",
        url: "https://harimishra.com/interview-questions",
        type: "website",
        images: [
            {
                url: "https://harimishra.com/images/interview/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Technical Interview Questions and Answers",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Technical Interview Prep | 500+ Coding Questions",
        description:
            "Ace your next interview with curated questions on MERN, DSA, and system design.",
    },
};

export default function InterviewQuestionsPage() {
    return <InterviewQuestionsClient />;
}

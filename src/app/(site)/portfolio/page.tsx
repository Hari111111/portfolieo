import React from "react";
import PortfolioShowcase from "@/components/portfolio/PortfolioShowcase";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Project Portfolio | Hari Mishra - MERN Stack Showcase",
    description: "Explore a collection of web development projects, AI tools, and UI/UX designs built by Hari Mishra. Showcasing expertise in React, Next.js, and Full Stack development.",
};

const PortfolioPage = () => {
    return (
        <>
            <PortfolioShowcase />
        </>
    );
};

export default PortfolioPage;
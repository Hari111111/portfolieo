import React from "react";
import PortfolioShowcase from "@/components/portfolio/PortfolioShowcase";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Portfolio | Hari Mishra",
};

const PortfolioPage = () => {
    return (
        <>
            <PortfolioShowcase />
        </>
    );
};

export default PortfolioPage;
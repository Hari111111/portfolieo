
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import Counter from "@/components/Home/Counter";
import Progresswork from "@/components/Home/WorkProgress";
import Services from "@/components/Home/Services";
export const metadata: Metadata = {
  title: "Services | Hari",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
  ];
  return (
    <>
      <HeroSub
        title="Services"
        description="Professional MERN stack development services including full-stack web applications, RESTful APIs, and modern responsive designs."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Services />
    </>
  );
};

export default page;

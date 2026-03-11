
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import Counter from "@/components/Home/Counter";
import Progresswork from "@/components/Home/WorkProgress";
export const metadata: Metadata = {
  title: "About Hari Mishra | MERN Stack Developer & Software Engineer",
  description: "Learn more about Hari Mishra, a BTech Graduate and experienced MERN Stack Developer dedicated to creating innovative web solutions and high-quality software.",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
  ];
  return (
    <>
      <HeroSub
        title="About Me"
        description="BTech Graduate and MERN Stack Developer with experience at Sileo Technology Pvt Ltd and currently delivering innovative web solutions at Websultante Pvt Ltd."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Counter isColorMode={true} />
      <Progresswork isColorMode={true} />
    </>
  );
};

export default page;

import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact | Hari Mishra",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <HeroSub
        title="Contact Me"
        description="Have a project in mind? Let's connect and discuss how I can help bring your web development ideas to life with modern MERN stack solutions."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      {/* <ContactForm /> */}
      {/* <Location /> */}
    </>
  );
};

export default page;

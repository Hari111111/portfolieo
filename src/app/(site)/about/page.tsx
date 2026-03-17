'use client'
import React, { useState, useEffect } from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Counter from "@/components/Home/Counter";
import Progresswork from "@/components/Home/WorkProgress";
import axiosHelper from "@/utils/axiosHelper";

const AboutPage = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data: any = await axiosHelper.get('/profile');
        if (data && data.name && data.name !== 'Your Name') {
          setProfile(data);
        }
      } catch (err) {
        console.error("AboutPage: Profile fetch failed", err);
      }
    };
    fetchProfile();
  }, []);

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
  ];

  const displayDescription = profile?.about || "BTech Graduate and MERN Stack Developer with experience at Sileo Technology Pvt Ltd and currently delivering innovative web solutions at Websultante Pvt Ltd.";

  return (
    <>
      <HeroSub
        title="About Me"
        description={displayDescription}
        breadcrumbLinks={breadcrumbLinks}
      />
      <div className="py-6 md:py-16">
        <div className="container mx-auto max-w-6xl px-6">
            <div className="bg-slate-50 dark:bg-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 dark:border-white/10 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h3 className="text-2xl md:text-3xl font-black text-midnight_text dark:text-white uppercase tracking-tighter italic mb-6">
                            The <span className="text-primary underline decoration-4 underline-offset-8">Architect</span> Behind the Code
                        </h3>
                        <div className="space-y-4 text-gray dark:text-white/70 text-base md:text-lg font-medium leading-relaxed">
                            <p>
                                {profile?.about || displayDescription}
                            </p>
                            <p>
                                Currently based in {profile?.location || 'India'}, I specialize in building high-performance applications that bridge the gap between complex backend logic and intuitive user experiences.
                            </p>
                        </div>
                    </div>
                    <div className="bg-primary/5 dark:bg-primary/10 p-6 md:p-10 rounded-[2rem] border border-primary/10 order-1 md:order-2">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Quick Stats Matrix</h4>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-primary/10 pb-4">
                                <span className="text-[10px] font-bold text-midnight_text dark:text-white uppercase tracking-widest leading-none">Global Location</span>
                                <span className="text-xs font-black text-primary uppercase leading-none">{profile?.location || 'Pune, India'}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-primary/10 pb-4">
                                <span className="text-[10px] font-bold text-midnight_text dark:text-white uppercase tracking-widest leading-none">Primary Engine</span>
                                <span className="text-xs font-black text-primary uppercase leading-none">MERN / NEXT.JS</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-primary/10 pb-4">
                                <span className="text-[10px] font-bold text-midnight_text dark:text-white uppercase tracking-widest leading-none">Availability</span>
                                <span className="text-xs font-black text-success uppercase tracking-widest leading-none">Open for Logic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Counter isColorMode={true} />
      <Progresswork isColorMode={true} />
    </>
  );
};

export default AboutPage;

'use client'
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'
import axiosHelper from '@/utils/axiosHelper'

const Resume = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data: any = await axiosHelper.get('/profile');
                if (data && data.name && data.name !== 'Your Name') {
                    setProfile(data);
                }
            } catch (error) {
                console.error("Failed to fetch resume profile:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const staticExperiences = [
        {
            company: 'Websultante Pvt Ltd',
            position: 'MERN Stack Developer',
            period: 'Present',
            location: 'Pune, Maharashtra, India',
            type: 'Current',
            description: 'Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Building scalable RESTful APIs and responsive user interfaces.',
            achievements: [
                'Developed and deployed 10+ production-ready web applications',
                'Implemented RESTful APIs serving 1000+ daily active users',
                'Optimized application performance by 40% through code refactoring',
            ]
        },
        {
            company: 'Sileo Technology Pvt Ltd',
            position: 'Full Stack Developer',
            period: 'Previous',
            location: 'India',
            type: 'Previous',
            description: 'Worked on web development projects using modern JavaScript frameworks and Node.js backend development.',
            achievements: [
                'Built responsive web applications with React.js',
                'Collaborated with cross-functional teams on 5+ projects',
                'Maintained and enhanced existing codebases',
            ]
        }
    ]

    const staticEducation = [
        {
            degree: 'Bachelor of Technology (BTech)',
            field: 'Computer Science & Engineering',
            description: 'Strong foundation in computer science fundamentals, data structures, algorithms, and software engineering principles.'
        }
    ]

    const staticSkills = [
        {
            category: 'Frontend',
            items: [
                { name: 'React.js', level: 90 },
                { name: 'Next.js', level: 90 },
                { name: 'JavaScript/TypeScript', level: 85 },
                { name: 'HTML5 & CSS3', level: 90 },
                { name: 'Tailwind CSS', level: 85 },
            ]
        },
        {
            category: 'Backend',
            items: [
                { name: 'Node.js', level: 85 },
                { name: 'Express.js', level: 85 },
                { name: 'RESTful APIs', level: 88 },
                { name: 'Authentication & Security', level: 80 },
            ]
        },
        {
            category: 'Database & Tools',
            items: [
                { name: 'MongoDB', level: 80 },
                { name: 'Git & GitHub', level: 85 },
                { name: 'VS Code', level: 90 },
                { name: 'Postman', level: 80 },
            ]
        }
    ]

    // Map dynamic data if available
    const displayExperiences = profile?.experience?.length > 0 
        ? profile.experience.map((exp: any) => ({
            company: exp.company,
            position: exp.position,
            period: exp.duration,
            location: profile.location || 'India',
            type: exp.duration.toLowerCase().includes('present') ? 'Current' : 'Previous',
            description: exp.description,
            achievements: [] // Backend doesn't have achievements yet
        }))
        : staticExperiences;

    const displayEducation = profile?.education?.length > 0
        ? profile.education.map((edu: any) => ({
            degree: edu.degree,
            field: edu.school,
            description: `Graduated in ${edu.year}. Specialized in ${edu.degree} from ${edu.school}.`
        }))
        : staticEducation;

    const displaySkills = profile?.skills?.length > 0
        ? [{
            category: 'Technical Skills',
            items: profile.skills.map((skill: string) => ({ name: skill, level: 85 }))
          }]
        : staticSkills;

    const stats = [
        { icon: 'solar:star-bold', value: '4.9', label: 'Client Rating' },
        { icon: 'solar:case-minimalistic-bold', value: '20+', label: 'Projects Completed' },
        { icon: 'solar:calendar-bold', value: '2+', label: 'Years Experience' },
        { icon: 'solar:code-bold', value: '100%', label: 'Commitment' },
    ]

    return (
        <section className='bg-white dark:bg-darklight py-16 md:py-24' id="resume">
            <div className='container mx-auto max-w-6xl px-4'>
                {/* Header */}
                <div className='text-center mb-16' data-aos='fade-up'>
                    <div className='flex gap-2 items-center justify-center mb-4'>
                        <span className='w-3 h-3 rounded-full bg-success'></span>
                        <span className='font-medium text-midnight_text text-sm dark:text-white/50 animate-pulse'>
                            Professional Background
                        </span>
                    </div>
                    <h2 className='text-3xl md:text-5xl font-extrabold text-midnight_text dark:text-white mb-4 italic uppercase tracking-tighter'>
                        Resume & Experience
                    </h2>
                    <p className='text-grey dark:text-white/70 text-base md:text-lg max-w-2xl mx-auto font-medium'>
                        {profile?.about || 'A comprehensive overview of my professional journey, skills, and accomplishments as a MERN Stack Developer'}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-20' data-aos='fade-up' data-aos-delay='100'>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className='bg-section dark:bg-darkmode p-5 md:p-8 rounded-3xl text-center border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300 group shadow-sm hover:shadow-xl'
                        >
                            <Icon icon={stat.icon} className='text-3xl md:text-4xl text-primary mx-auto mb-4 group-hover:scale-110 transition-transform' />
                            <h3 className='text-2xl md:text-3xl font-black text-midnight_text dark:text-white mb-1'>
                                {stat.value}
                            </h3>
                            <p className='text-[10px] md:text-xs text-grey dark:text-white/40 font-black uppercase tracking-[0.2em]'>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Experience Section */}
                <div className='mb-24'>
                    <h3
                        className='text-2xl md:text-3xl font-black text-midnight_text dark:text-white mb-10 flex items-center gap-4 italic uppercase tracking-tight'
                        data-aos='fade-up'
                    >
                        <div className='w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center'>
                            <Icon icon='solar:case-bold' className='text-primary text-2xl' />
                        </div>
                        Work Experience
                    </h3>
                    <div className='grid grid-cols-1 gap-8'>
                        {displayExperiences.map((exp: any, index: number) => (
                            <div
                                key={index}
                                className='bg-section dark:bg-darkmode p-6 md:p-10 rounded-[2.5rem] border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300 relative overflow-hidden group'
                                data-aos='fade-up'
                                data-aos-delay={index * 100}
                            >
                                <div className='absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-primary/10 transition-colors'></div>
                                <div className='flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10'>
                                    <div className='flex-1'>
                                        <div className='flex flex-wrap items-center gap-3 mb-4'>
                                            <h4 className='text-xl md:text-2xl font-black text-midnight_text dark:text-white uppercase tracking-tighter leading-none'>
                                                {exp.position}
                                            </h4>
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${exp.type === 'Current'
                                                    ? 'bg-success/20 text-success'
                                                    : 'bg-grey/20 text-grey dark:text-white/40'
                                                }`}>
                                                {exp.type}
                                            </span>
                                        </div>
                                        <p className='text-primary font-black text-base md:text-lg mb-4 uppercase tracking-tight'>{exp.company}</p>
                                        <div className='flex flex-wrap gap-x-8 gap-y-3 text-grey dark:text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.15em]'>
                                            <span className='flex items-center gap-2'>
                                                <Icon icon='solar:calendar-bold' className="text-primary text-sm" />
                                                {exp.period}
                                            </span>
                                            <span className='flex items-center gap-2'>
                                                <Icon icon='solar:map-point-bold' className="text-primary text-sm" />
                                                {exp.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-grey dark:text-white/70 mb-8 leading-relaxed font-medium text-sm md:text-base relative z-10'>{exp.description}</p>
                                {exp.achievements?.length > 0 && (
                                    <div className='space-y-3'>
                                        <p className='font-black text-midnight_text dark:text-white text-xs uppercase tracking-[0.2em] mb-4 text-primary'>
                                            Key Synthetic Achievements:
                                        </p>
                                        {exp.achievements.map((achievement: string, idx: number) => (
                                            <div key={idx} className='flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5'>
                                                <Icon icon='solar:check-circle-bold' className='text-success mt-0.5 flex-shrink-0' />
                                                <p className='text-grey dark:text-white/70 text-sm font-medium'>{achievement}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education & Skills Grid */}
                <div className='grid lg:grid-cols-2 gap-12'>
                    {/* Education Section */}
                    <div>
                        <h3
                            className='text-3xl font-bold text-midnight_text dark:text-white mb-8 flex items-center gap-3 italic uppercase'
                            data-aos='fade-up'
                        >
                            <Icon icon='solar:book-bold' className='text-primary text-4xl' />
                            Education
                        </h3>
                        <div className="space-y-6">
                            {displayEducation.map((edu: any, idx: number) => (
                                <div
                                    key={idx}
                                    className='bg-section dark:bg-darkmode p-8 rounded-[2rem] border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300'
                                    data-aos='fade-up'
                                    data-aos-delay={idx * 100}
                                >
                                    <h4 className='text-xl font-black text-midnight_text dark:text-white mb-1 uppercase tracking-tighter'>
                                        {edu.degree}
                                    </h4>
                                    <p className='text-primary font-black text-lg mb-4 uppercase tracking-tight'>{edu.field || edu.school}</p>
                                    <p className='text-grey dark:text-white/70 font-medium leading-relaxed'>{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div>
                        <h3
                            className='text-3xl font-bold text-midnight_text dark:text-white mb-8 flex items-center gap-3 italic uppercase'
                            data-aos='fade-up'
                        >
                            <Icon icon='solar:code-bold' className='text-primary text-4xl' />
                            Technical Matrix
                        </h3>
                        <div className='space-y-6'>
                            {displaySkills.map((skillGroup, groupIndex) => (
                                <div
                                    key={groupIndex}
                                    className='bg-section dark:bg-darkmode p-8 rounded-[2.5rem] border border-border dark:border-dark_border shadow-xl'
                                    data-aos='fade-up'
                                    data-aos-delay={groupIndex * 100}
                                >
                                    <h4 className='text-xs font-black text-primary mb-8 pb-3 border-b border-border dark:border-dark_border uppercase tracking-[0.3em]'>
                                        {skillGroup.category}
                                    </h4>
                                    <div className='grid grid-cols-1 gap-6'>
                                        {skillGroup.items.map((skill: any, skillIndex: number) => (
                                            <div key={skillIndex}>
                                                <div className='flex justify-between mb-3'>
                                                    <span className='text-xs font-black text-midnight_text dark:text-white uppercase tracking-widest'>
                                                        {skill.name}
                                                    </span>
                                                    <span className='text-xs text-primary font-black'>{skill.level}%</span>
                                                </div>
                                                <div className='w-full bg-border dark:bg-dark_border rounded-full h-1.5 overflow-hidden shadow-inner'>
                                                    <div
                                                        className='bg-gradient-to-r from-primary to-blue-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]'
                                                        style={{ width: `${skill.level}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Download Resume Button */}
                <div className='text-center mt-20' data-aos='fade-up'>
                    <a
                        href={profile?.resumeLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='inline-flex items-center gap-4 px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-blue-700 transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 text-xs'
                    >
                        <Icon icon='solar:download-bold' className='text-xl' />
                        Download Neural Resume
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Resume

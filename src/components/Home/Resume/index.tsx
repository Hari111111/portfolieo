'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'

const Resume = () => {
    const experiences = [
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

    const education = {
        degree: 'Bachelor of Technology (BTech)',
        field: 'Computer Science & Engineering',
        description: 'Strong foundation in computer science fundamentals, data structures, algorithms, and software engineering principles.'
    }

    const skills = [
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

    const stats = [
        { icon: 'solar:star-bold', value: '4.9', label: 'Client Rating' },
        { icon: 'solar:case-minimalistic-bold', value: '20+', label: 'Projects Completed' },
        { icon: 'solar:calendar-bold', value: '2+', label: 'Years Experience' },
        { icon: 'solar:code-bold', value: '100%', label: 'Commitment' },
    ]

    return (
        <section className='bg-white dark:bg-darklight py-16 md:py-24'>
            <div className='container mx-auto max-w-6xl px-4'>
                {/* Header */}
                <div className='text-center mb-16' data-aos='fade-up'>
                    <div className='flex gap-2 items-center justify-center mb-4'>
                        <span className='w-3 h-3 rounded-full bg-success'></span>
                        <span className='font-medium text-midnight_text text-sm dark:text-white/50'>
                            Professional Background
                        </span>
                    </div>
                    <h2 className='text-4xl md:text-5xl font-bold text-midnight_text dark:text-white mb-4'>
                        Resume & Experience
                    </h2>
                    <p className='text-grey dark:text-white/70 text-lg max-w-2xl mx-auto'>
                        A comprehensive overview of my professional journey, skills, and accomplishments as a MERN Stack Developer
                    </p>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16' data-aos='fade-up' data-aos-delay='100'>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className='bg-section dark:bg-darkmode p-6 rounded-xl text-center border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300'
                        >
                            <Icon icon={stat.icon} className='text-4xl text-primary mx-auto mb-3' />
                            <h3 className='text-3xl font-bold text-midnight_text dark:text-white mb-1'>
                                {stat.value}
                            </h3>
                            <p className='text-grey dark:text-white/50 text-sm'>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Experience Section */}
                <div className='mb-16'>
                    <h3
                        className='text-3xl font-bold text-midnight_text dark:text-white mb-8 flex items-center gap-3'
                        data-aos='fade-up'
                    >
                        <Icon icon='solar:case-bold' className='text-primary text-4xl' />
                        Work Experience
                    </h3>
                    <div className='space-y-6'>
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className='bg-section dark:bg-darkmode p-8 rounded-xl border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300'
                                data-aos='fade-up'
                                data-aos-delay={index * 100}
                            >
                                <div className='flex flex-wrap items-start justify-between mb-4'>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-3 mb-2'>
                                            <h4 className='text-2xl font-bold text-midnight_text dark:text-white'>
                                                {exp.position}
                                            </h4>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${exp.type === 'Current'
                                                    ? 'bg-success/20 text-success'
                                                    : 'bg-grey/20 text-grey dark:text-white/50'
                                                }`}>
                                                {exp.type}
                                            </span>
                                        </div>
                                        <p className='text-primary font-semibold text-lg mb-1'>{exp.company}</p>
                                        <div className='flex flex-wrap gap-4 text-grey dark:text-white/50 text-sm'>
                                            <span className='flex items-center gap-1'>
                                                <Icon icon='solar:calendar-linear' />
                                                {exp.period}
                                            </span>
                                            <span className='flex items-center gap-1'>
                                                <Icon icon='solar:map-point-linear' />
                                                {exp.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-grey dark:text-white/70 mb-4'>{exp.description}</p>
                                <div className='space-y-2'>
                                    <p className='font-semibold text-midnight_text dark:text-white text-sm mb-2'>
                                        Key Achievements:
                                    </p>
                                    {exp.achievements.map((achievement, idx) => (
                                        <div key={idx} className='flex items-start gap-2'>
                                            <Icon icon='solar:check-circle-bold' className='text-success mt-1 flex-shrink-0' />
                                            <p className='text-grey dark:text-white/70 text-sm'>{achievement}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <div className='mb-16'>
                    <h3
                        className='text-3xl font-bold text-midnight_text dark:text-white mb-8 flex items-center gap-3'
                        data-aos='fade-up'
                    >
                        <Icon icon='solar:book-bold' className='text-primary text-4xl' />
                        Education
                    </h3>
                    <div
                        className='bg-section dark:bg-darkmode p-8 rounded-xl border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300'
                        data-aos='fade-up'
                    >
                        <h4 className='text-2xl font-bold text-midnight_text dark:text-white mb-2'>
                            {education.degree}
                        </h4>
                        <p className='text-primary font-semibold text-lg mb-4'>{education.field}</p>
                        <p className='text-grey dark:text-white/70'>{education.description}</p>
                    </div>
                </div>

                {/* Skills Section */}
                <div>
                    <h3
                        className='text-3xl font-bold text-midnight_text dark:text-white mb-8 flex items-center gap-3'
                        data-aos='fade-up'
                    >
                        <Icon icon='solar:code-bold' className='text-primary text-4xl' />
                        Technical Skills
                    </h3>
                    <div className='grid md:grid-cols-3 gap-8'>
                        {skills.map((skillGroup, groupIndex) => (
                            <div
                                key={groupIndex}
                                className='bg-section dark:bg-darkmode p-6 rounded-xl border border-border dark:border-dark_border'
                                data-aos='fade-up'
                                data-aos-delay={groupIndex * 100}
                            >
                                <h4 className='text-xl font-bold text-midnight_text dark:text-white mb-6 pb-3 border-b border-border dark:border-dark_border'>
                                    {skillGroup.category}
                                </h4>
                                <div className='space-y-4'>
                                    {skillGroup.items.map((skill, skillIndex) => (
                                        <div key={skillIndex}>
                                            <div className='flex justify-between mb-2'>
                                                <span className='text-sm font-medium text-midnight_text dark:text-white'>
                                                    {skill.name}
                                                </span>
                                                <span className='text-sm text-primary font-semibold'>{skill.level}%</span>
                                            </div>
                                            <div className='w-full bg-border dark:bg-dark_border rounded-full h-2'>
                                                <div
                                                    className='bg-primary h-2 rounded-full transition-all duration-500'
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

                {/* Download Resume Button */}
                <div className='text-center mt-16' data-aos='fade-up'>
                    <a
                        href='#'
                        className='inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
                    >
                        <Icon icon='solar:download-bold' className='text-xl' />
                        Download Full Resume
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Resume

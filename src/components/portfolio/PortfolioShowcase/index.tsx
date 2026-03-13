'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { getProjects } from '@/app/api/users/project.services'

const PortfolioShowcase = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data || response);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const stats = [
        { icon: 'solar:star-bold', value: '20+', label: 'Projects Delivered', color: 'text-yellow-500' },
        { icon: 'solar:users-group-two-rounded-bold', value: '15+', label: 'Happy Clients', color: 'text-blue-500' },
        { icon: 'solar:code-bold', value: '100K+', label: 'Lines of Code', color: 'text-green-500' },
        { icon: 'solar:cup-star-bold', value: '4.9/5', label: 'Client Rating', color: 'text-purple-500' },
    ]

    const techStack = [
        { name: 'MongoDB', icon: 'simple-icons:mongodb', color: 'text-green-600' },
        { name: 'Express.js', icon: 'simple-icons:express', color: 'text-gray-600' },
        { name: 'React.js', icon: 'simple-icons:react', color: 'text-cyan-500' },
        { name: 'Node.js', icon: 'simple-icons:nodedotjs', color: 'text-green-600' },
        { name: 'Next.js', icon: 'simple-icons:nextdotjs', color: 'text-gray-900 dark:text-white' },
        { name: 'TypeScript', icon: 'simple-icons:typescript', color: 'text-blue-600' },
        { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss', color: 'text-cyan-500' },
        { name: 'Git', icon: 'simple-icons:git', color: 'text-orange-600' },
    ]

    const colors = [
        'from-blue-500 to-purple-600',
        'from-green-500 to-teal-600',
        'from-pink-500 to-rose-600',
        'from-orange-500 to-amber-600',
        'from-indigo-500 to-blue-600',
        'from-cyan-500 to-blue-600'
    ];

    if (loading) return (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-darklight min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <section className='bg-white dark:bg-darklight py-16 md:py-24'>
            <div className='container mx-auto max-w-6xl px-4'>
                {/* Header */}
                <div className='text-center mb-16' data-aos='fade-up'>
                    <div className='flex gap-2 items-center justify-center mb-4'>
                        <span className='w-3 h-3 rounded-full bg-success'></span>
                        <span className='font-medium text-midnight_text text-sm dark:text-white/50'>
                            My Work & Projects
                        </span>
                    </div>
                    <h2 className='text-4xl md:text-5xl font-bold text-midnight_text dark:text-white mb-4'>
                        Portfolio & Projects
                    </h2>
                    <p className='text-grey dark:text-white/70 text-lg max-w-2xl mx-auto'>
                        Showcasing my journey in MERN stack development through real-world projects and innovative solutions
                    </p>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16' data-aos='fade-up'>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className='bg-section dark:bg-darkmode p-6 rounded-xl text-center border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300'
                        >
                            <Icon icon={stat.icon} className={`text-4xl ${stat.color} mx-auto mb-3`} />
                            <h3 className='text-3xl font-bold text-midnight_text dark:text-white mb-1'>
                                {stat.value}
                            </h3>
                            <p className='text-grey dark:text-white/50 text-sm'>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                <div className='mb-16' data-aos='fade-up'>
                    <h3 className='text-2xl font-bold text-midnight_text dark:text-white text-center mb-8'>
                        Technologies I Work With
                    </h3>
                    <div className='flex flex-wrap justify-center gap-6'>
                        {techStack.map((tech, index) => (
                            <div
                                key={index}
                                className='flex flex-col items-center gap-2 p-4 bg-section dark:bg-darkmode rounded-lg border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300'
                                data-aos='zoom-in'
                                data-aos-delay={index * 50}
                            >
                                <Icon icon={tech.icon} className={`text-4xl ${tech.color}`} />
                                <span className='text-sm font-medium text-midnight_text dark:text-white'>
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div>
                    <h3
                        className='text-3xl font-bold text-midnight_text dark:text-white mb-8 flex items-center gap-3'
                        data-aos='fade-up'
                    >
                        <Icon icon='solar:case-bold' className='text-primary text-4xl' />
                        Featured Projects
                    </h3>
                    <div className='space-y-8'>
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className='bg-section dark:bg-darkmode rounded-xl border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-all duration-300 overflow-hidden'
                                data-aos='fade-up'
                                data-aos-delay={index * 100}
                            >
                                <div className='grid md:grid-cols-2 gap-0'>
                                    {/* Project Image */}
                                    <div className={`bg-gradient-to-br ${colors[index % colors.length]} p-0 flex items-center justify-center order-2 md:order-1 relative min-h-[300px]`}>
                                        {project.image ? (
                                            <Image 
                                                src={project.image} 
                                                alt={project.title} 
                                                fill 
                                                className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                                            />
                                        ) : (
                                            <div className='text-white text-center p-12'>
                                                <Icon icon='solar:layers-minimalistic-bold' className='text-8xl mb-4 opacity-50' />
                                                <h4 className='text-2xl font-bold'>{project.title}</h4>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-all flex items-center justify-center gap-4 opacity-0 hover:opacity-100">
                                            {project.liveUrl && (
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-midnight_text hover:bg-primary hover:text-white transition-colors">
                                                    <Icon icon="solar:link-bold" className="text-xl" />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-midnight_text hover:bg-primary hover:text-white transition-colors">
                                                    <Icon icon="simple-icons:github" className="text-xl" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className='p-8 order-1 md:order-2'>
                                        <div className='mb-4'>
                                            {project.featured && (
                                                <span className='inline-block px-3 py-1 bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-semibold mb-3 mr-2'>
                                                    ⭐ Featured
                                                </span>
                                            )}
                                            <span className='inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium mb-3'>
                                                Full Stack Project
                                            </span>
                                            <h4 className='text-2xl font-bold text-midnight_text dark:text-white mb-3'>
                                                {project.title}
                                            </h4>
                                            <p className='text-grey dark:text-white/70 mb-4 line-clamp-3'>{project.description}</p>
                                        </div>

                                        <div className='mb-6'>
                                            <h5 className='font-semibold text-midnight_text dark:text-white text-sm mb-3'>
                                                Technologies & Tools:
                                            </h5>
                                            <div className='flex flex-wrap gap-2'>
                                                {project.technologies && project.technologies.map((tech: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className='px-3 py-1 bg-border/50 dark:bg-dark_border/50 rounded-full text-xs text-midnight_text dark:text-white'
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            {project.liveUrl && (
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                                                    Live Demo <Icon icon="solar:arrow-right-up-bold" />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-grey dark:text-white/50 font-semibold text-sm hover:underline">
                                                    Source Code <Icon icon="simple-icons:github" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className='text-center mt-16' data-aos='fade-up'>
                    <p className='text-grey dark:text-white/70 mb-6 text-lg'>
                        Interested in working together? Let's build something amazing!
                    </p>
                    <a
                        href='/contact'
                        className='inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
                    >
                        <Icon icon='solar:letter-bold' className='text-xl' />
                        Start a Project
                    </a>
                </div>
            </div>
        </section>
    )
}

export default PortfolioShowcase


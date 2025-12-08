'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'

const PortfolioShowcase = () => {
    const projects = [
        {
            title: 'E-Commerce Platform',
            category: 'Full Stack Web Application',
            description: 'A comprehensive e-commerce solution built with MERN stack featuring user authentication, product management, shopping cart, payment integration, and admin dashboard.',
            technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Stripe', 'JWT'],
            features: [
                'User authentication & authorization',
                'Product catalog with search & filters',
                'Shopping cart & checkout system',
                'Payment gateway integration',
                'Admin panel for inventory management',
                'Order tracking & email notifications'
            ],
            image: '/images/portfolio/ecommerce.jpg',
            color: 'from-blue-500 to-purple-600'
        },
        {
            title: 'Task Management System',
            category: 'Web Application',
            description: 'A collaborative task management tool enabling teams to organize projects, assign tasks, track progress, and communicate effectively in real-time.',
            technologies: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'Express.js', 'Redux'],
            features: [
                'Real-time collaboration with Socket.io',
                'Kanban board interface',
                'Task assignments and deadlines',
                'Team chat & notifications',
                'Progress tracking & analytics',
                'Role-based access control'
            ],
            image: '/images/portfolio/taskmanager.jpg',
            color: 'from-green-500 to-teal-600'
        },
        {
            title: 'Social Media Dashboard',
            category: 'Analytics Platform',
            description: 'An analytics dashboard for social media management with data visualization, post scheduling, engagement metrics, and multi-platform integration.',
            technologies: ['Next.js', 'Node.js', 'MongoDB', 'Chart.js', 'REST APIs'],
            features: [
                'Multi-platform integration',
                'Interactive data visualizations',
                'Post scheduling & automation',
                'Engagement analytics & insights',
                'Custom report generation',
                'Real-time metrics tracking'
            ],
            image: '/images/portfolio/analytics.jpg',
            color: 'from-pink-500 to-rose-600'
        },
        {
            title: 'RESTful API Services',
            category: 'Backend Development',
            description: 'Developed multiple scalable RESTful APIs serving various applications with robust authentication, data validation, and comprehensive documentation.',
            technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Swagger', 'Postman'],
            features: [
                'JWT-based authentication',
                'Input validation & sanitization',
                'Error handling & logging',
                'API documentation with Swagger',
                'Rate limiting & security',
                'Database optimization'
            ],
            image: '/images/portfolio/api.jpg',
            color: 'from-orange-500 to-amber-600'
        },
        {
            title: 'Real Estate Listing Platform',
            category: 'Full Stack Application',
            description: 'A property listing platform with advanced search filters, virtual tours, booking system, and integrated map views for buyers and sellers.',
            technologies: ['React.js', 'Node.js', 'MongoDB', 'Google Maps API', 'Cloudinary'],
            features: [
                'Property listing & management',
                'Advanced search & filters',
                'Interactive map integration',
                'Image gallery & virtual tours',
                'Booking & inquiry system',
                'User reviews & ratings'
            ],
            image: '/images/portfolio/realestate.jpg',
            color: 'from-indigo-500 to-blue-600'
        },
        {
            title: 'Blog & Content Management',
            category: 'CMS Platform',
            description: 'A modern content management system with rich text editor, media management, SEO optimization, and role-based publishing workflow.',
            technologies: ['Next.js', 'MongoDB', 'Express.js', 'TinyMCE', 'AWS S3'],
            features: [
                'Rich text editor for content creation',
                'Media library & management',
                'SEO optimization tools',
                'Draft & publish workflow',
                'Multi-author support',
                'Categories & tags system'
            ],
            image: '/images/portfolio/cms.jpg',
            color: 'from-cyan-500 to-blue-600'
        }
    ]

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
                                    {/* Project Image/Placeholder */}
                                    <div className={`bg-gradient-to-br ${project.color} p-12 flex items-center justify-center order-2 md:order-1`}>
                                        <div className='text-white text-center'>
                                            <Icon icon='solar:layers-minimalistic-bold' className='text-8xl mb-4 opacity-50' />
                                            <h4 className='text-2xl font-bold'>{project.title}</h4>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className='p-8 order-1 md:order-2'>
                                        <div className='mb-4'>
                                            <span className='inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium mb-3'>
                                                {project.category}
                                            </span>
                                            <h4 className='text-2xl font-bold text-midnight_text dark:text-white mb-3'>
                                                {project.title}
                                            </h4>
                                            <p className='text-grey dark:text-white/70 mb-4'>{project.description}</p>
                                        </div>

                                        <div className='mb-4'>
                                            <h5 className='font-semibold text-midnight_text dark:text-white text-sm mb-3'>
                                                Key Features:
                                            </h5>
                                            <div className='grid grid-cols-1 gap-2'>
                                                {project.features.slice(0, 4).map((feature, idx) => (
                                                    <div key={idx} className='flex items-start gap-2'>
                                                        <Icon
                                                            icon='solar:check-circle-bold'
                                                            className='text-success mt-0.5 flex-shrink-0'
                                                        />
                                                        <p className='text-grey dark:text-white/70 text-sm'>{feature}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className='font-semibold text-midnight_text dark:text-white text-sm mb-3'>
                                                Technologies:
                                            </h5>
                                            <div className='flex flex-wrap gap-2'>
                                                {project.technologies.map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className='px-3 py-1 bg-border dark:bg-dark_border rounded-full text-xs text-midnight_text dark:text-white'
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
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

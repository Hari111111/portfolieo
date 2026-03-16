'use client'
import React, { useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import { ResumeData, TemplateId } from '@/types/resume'
import {
    ModernTemplate, ElegantTemplate, MinimalTemplate, ProfessionalTemplate, CreativeTemplate, ExecutiveTemplate,
    TechTemplate, AcademicTemplate, SideSplitTemplate, GeometricTemplate, PastelTemplate, HighImpactTemplate,
    CompactTemplate, FunctionalTemplate, ChronoTemplate, HybridTemplate, RetroTemplate, GlassyTemplate,
    DarkTemplate, InfographicTemplate, StartupTemplate, MinimalistProTemplate, GradientTemplate, BoardTemplate, JournalTemplate
} from './Templates'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'react-hot-toast'

const initialData: ResumeData = {
    personalInfo: {
        fullName: "Lorem Ipsum",
        email: "lorem@example.com",
        phone: "+00 123456789",
        address: "Lorem City, Ipsum Country",
        website: "www.loremipsum.com",
        jobTitle: "Full Stack Software Developer",
        summary:
            "Passionate software developer with experience in building scalable web applications using modern technologies. Skilled in frontend and backend development, performance optimization, and clean architecture. Strong problem-solving ability with a focus on delivering high-quality products.",
    },

    education: [
        {
            school: "Lorem University",
            degree: "Bachelor of Computer Science",
            startDate: "2018",
            endDate: "2022",
            description:
                "Focused on software engineering, data structures, algorithms, and web development.",
        },
        {
            school: "Ipsum Institute of Technology",
            degree: "Diploma in Information Technology",
            startDate: "2016",
            endDate: "2018",
            description:
                "Studied programming fundamentals, networking, database systems, and operating systems.",
        },
    ],

    experience: [
        {
            company: "Lorem Technologies",
            position: "Frontend Developer",
            startDate: "2022",
            endDate: "Present",
            description:
                "Developed modern responsive web applications using React, Next.js, and TypeScript. Improved application performance by optimizing rendering and API usage.",
        },
        {
            company: "Ipsum Solutions",
            position: "Junior Web Developer",
            startDate: "2021",
            endDate: "2022",
            description:
                "Worked on building dynamic websites using JavaScript, HTML, CSS, and Node.js. Collaborated with the design team to improve UI/UX and implemented REST APIs.",
        },
        {
            company: "Dolor Digital",
            position: "Web Development Intern",
            startDate: "2020",
            endDate: "2021",
            description:
                "Assisted in developing internal tools and dashboards. Learned best practices for version control, code reviews, and agile development.",
        },
    ],

    skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "REST APIs",
        "Git",
        "Docker",
    ],

    projects: [
        {
            name: "Task Management System",
            link: "github.com/lorem/task-manager",
            description:
                "A full-stack task management application built with React, Node.js, and MongoDB that allows teams to track tasks and productivity.",
        },
        {
            name: "E-commerce Platform",
            link: "github.com/lorem/ecommerce",
            description:
                "Developed a scalable online store with payment integration, product management, and admin dashboard.",
        },
        {
            name: "Real-time Chat Application",
            link: "github.com/lorem/chat-app",
            description:
                "Built a real-time chat application using Socket.IO with authentication and message persistence.",
        },
    ],

    languages: [
        "English (Fluent)",
        "Spanish (Intermediate)",
        "French (Basic)"
    ],
    customization: {
        primaryColor: "#3b82f6",
        fontFamily: "Inter"
    }
};
const ResumeBuilder = () => {
    const [data, setData] = useState<ResumeData>(initialData)
    const [activeTemplate, setActiveTemplate] = useState<TemplateId>('modern')
    const [activeTab, setActiveTab] = useState('personal')
    const [skillInput, setSkillInput] = useState('')
    const [langInput, setLangInput] = useState('')
    const resumeRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [selectedCategory, setSelectedCategory] = useState<'All' | 'Classic' | 'Modern' | 'Creative' | 'Specialized'>('All');
    const handlePrint = useReactToPrint({ contentRef });

    const categories = {
        Classic: ['modern', 'minimal', 'professional', 'executive', 'chrono', 'minimalist_pro', 'board'],
        Modern: ['elegant', 'creative', 'hybrid', 'startup', 'gradient', 'glassy'],
        Creative: ['pastel', 'journal', 'geometric', 'infographic'],
        Specialized: ['tech', 'academic', 'sidebar', 'high_impact', 'compact', 'functional', 'retro', 'dark']
    };

    const allTemplates: TemplateId[] = [
        'modern', 'elegant', 'minimal', 'professional', 'creative', 'executive',
        'tech', 'academic', 'sidebar', 'geometric', 'pastel', 'high_impact',
        'compact', 'functional', 'chrono', 'hybrid', 'retro', 'glassy',
        'dark', 'infographic', 'startup', 'minimalist_pro', 'gradient', 'board', 'journal'
    ];

    const filteredTemplates = selectedCategory === 'All'
        ? allTemplates
        : (categories[selectedCategory as keyof typeof categories] as TemplateId[]);

    const handleCustomizationChange = (field: 'primaryColor' | 'fontFamily', value: string) => {
        setData(prev => ({
            ...prev,
            customization: {
                primaryColor: prev.customization?.primaryColor || "#3b82f6",
                fontFamily: prev.customization?.fontFamily || "Inter",
                [field]: value
            }
        }))
    }

    const resetData = () => {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            setData(initialData)
            toast.success('Data reset successfully')
        }
    }

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value }
        }))
    }

    const addItem = (section: 'education' | 'experience' | 'projects') => {
        const newItem = section === 'projects'
            ? { name: '', link: '', description: '' }
            : { school: '', company: '', degree: '', position: '', startDate: '', endDate: '', description: '' }

        setData(prev => ({
            ...prev,
            [section]: [...(prev[section] as any), newItem]
        }))
    }

    const removeItem = (section: 'education' | 'experience' | 'projects' | 'skills' | 'languages', index: number) => {
        setData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }))
    }

    const updateItem = (section: 'education' | 'experience' | 'projects', index: number, field: string, value: string) => {
        setData(prev => {
            const newList = [...(prev[section] as any)]
            newList[index] = { ...newList[index], [field]: value }
            return { ...prev, [section]: newList }
        })
    }

    const handleListInput = (section: 'skills' | 'languages', value: string) => {
        const setter = section === 'skills' ? setSkillInput : setLangInput;
        setter(value);

        if (value.endsWith(',')) {
            const cleanValue = value.slice(0, -1).trim()
            if (cleanValue) {
                setData(prev => ({
                    ...prev,
                    [section]: [...prev[section], cleanValue]
                }))
                setter(''); // Clear on success
            }
        }
    }
    // Use handlePrint from react-to-print instead of manual PDF generation
    const renderTemplate = () => {
        switch (activeTemplate) {
            case 'elegant': return <ElegantTemplate data={data} />
            case 'minimal': return <MinimalTemplate data={data} />
            case 'professional': return <ProfessionalTemplate data={data} />
            case 'creative': return <CreativeTemplate data={data} />
            case 'executive': return <ExecutiveTemplate data={data} />
            case 'tech': return <TechTemplate data={data} />
            case 'academic': return <AcademicTemplate data={data} />
            case 'sidebar': return <SideSplitTemplate data={data} />
            case 'geometric': return <GeometricTemplate data={data} />
            case 'pastel': return <PastelTemplate data={data} />
            case 'high_impact': return <HighImpactTemplate data={data} />
            case 'compact': return <CompactTemplate data={data} />
            case 'functional': return <FunctionalTemplate data={data} />
            case 'chrono': return <ChronoTemplate data={data} />
            case 'hybrid': return <HybridTemplate data={data} />
            case 'retro': return <RetroTemplate data={data} />
            case 'glassy': return <GlassyTemplate data={data} />
            case 'dark': return <DarkTemplate data={data} />
            case 'infographic': return <InfographicTemplate data={data} />
            case 'startup': return <StartupTemplate data={data} />
            case 'minimalist_pro': return <MinimalistProTemplate data={data} />
            case 'gradient': return <GradientTemplate data={data} />
            case 'board': return <BoardTemplate data={data} />
            case 'journal': return <JournalTemplate data={data} />
            default: return <ModernTemplate data={data} />
        }
    }

    const fonts = [
        "Inter", "Roboto", "Poppins", "Montserrat", "Playfair Display",
        "Open Sans", "Raleway", "Merriweather", "Ubuntu", "Lato"
    ];

    const colors = [
        "#2563eb", "#dc2626", "#059669", "#d97706", "#4f46e5",
        "#db2777", "#0d9488", "#1e293b", "#000000", "#7c3aed"
    ];

    const tabIcons = {
        personal: "solar:user-bold-duotone",
        experience: "solar:case-bold-duotone",
        education: "solar:notebook-bold-duotone",
        skills: "solar:star-bold-duotone",
        languages: "solar:chat-round-dots-bold-duotone",
        projects: "solar:folder-path-connect-bold-duotone"
    };

    return (
        <section className="min-h-screen bg-[#f0f9ff] py-8 px-4 md:px-8 selection:bg-primary/20">
            <div className="max-w-[1600px] mx-auto">
                {/* MODERN TOP BAR */}
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-900/5 border border-white p-4 mb-8 flex flex-wrap items-center justify-between gap-6 sticky top-6 z-40 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                            <Icon icon="solar:document-bold-duotone" width="28" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-midnight_text dark:text-white leading-none tracking-tight">ResumePro</h2>
                            <p className="text-[10px] text-primary dark:text-primary font-black uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                                AI-Powered Editor v2.5
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={resetData} className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300">
                            <Icon icon="solar:restart-bold" className="text-lg group-hover:rotate-180 transition-transform duration-500" />
                            <span>Reset</span>
                        </button>

                        <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>

                        <button
                            onClick={() => handlePrint()}
                            className="bg-primary hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-2xl shadow-xl shadow-primary/25 flex items-center gap-3 transform active:scale-95 transition-all duration-300 group"
                        >
                            <Icon icon="solar:download-minimalistic-bold" width="20" className="group-hover:translate-y-0.5 transition-transform" />
                            <span>Export PDF</span>
                        </button>
                    </div>
                </div>

                {/* TEMPLATE GALLERY - COMPACT & ELEGANT */}
                <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] border border-white p-8 mb-10 group/gallery animate-fadeIn">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black text-midnight_text flex items-center gap-3">
                                <Icon icon="solar:widget-bold-duotone" className="text-primary text-3xl" />
                                Premium Templates
                            </h3>
                            <p className="text-sm text-slate-500 font-medium pl-10 italic">Select a blueprint that resonates with your professional identity</p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-fit">
                            {['All', 'Classic', 'Modern', 'Creative', 'Specialized'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat as any)}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${selectedCategory === cat ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-md' : 'text-slate-500 hover:text-midnight_text dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4 max-h-[250px] overflow-y-auto pr-4 custom-scrollbar">
                        {filteredTemplates.map(t => (
                            <button
                                key={t}
                                onClick={() => setActiveTemplate(t)}
                                className={`group relative p-2 rounded-2xl transition-all duration-500 border-2 ${activeTemplate === t ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-transparent hover:bg-slate-50 dark:hover:bg-white/5'}`}
                            >
                                <div className={`aspect-[3/4] rounded-xl overflow-hidden transition-all duration-500 shadow-sm group-hover:shadow-md ${activeTemplate === t ? 'shadow-primary/20 ring-4 ring-primary/10' : 'bg-slate-100 dark:bg-black/20'}`}>
                                    <div className="w-full h-full flex items-center justify-center relative bg-gradient-to-b from-white to-slate-50 dark:from-darklight dark:to-black">
                                        <Icon
                                            icon={activeTemplate === t ? "solar:check-read-linear" : "solar:file-text-bold-duotone"}
                                            className={`text-3xl transition-all duration-500 ${activeTemplate === t ? 'text-primary' : 'text-slate-300 group-hover:text-primary/40 group-hover:scale-110'}`}
                                        />
                                        {activeTemplate === t && (
                                            <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px] flex items-center justify-center">
                                                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
                                                    <Icon icon="solar:check-circle-bold" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className={`mt-3 text-[10px] font-black uppercase tracking-widest block text-center truncate px-1 transition-colors duration-300 ${activeTemplate === t ? 'text-primary' : 'text-slate-400 group-hover:text-midnight_text dark:group-hover:text-white'}`}>
                                    {t.replace('_', ' ')}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8 items-start">
                    {/* LEFT PANEL: SMART FORM */}
                    <div className="col-span-12 lg:col-span-5 2xl:col-span-4 space-y-6 lg:sticky lg:top-32">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white overflow-hidden">
                            {/* NAVIGATION TABS - VERTICAL STYLE OR RICH HORIZONTAL */}
                            <div className="flex bg-slate-50/50 border-b border-slate-100 overflow-x-auto no-scrollbar scroll-smooth p-2 gap-1">
                                {Object.keys(tabIcons).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex flex-col items-center justify-center min-w-[80px] py-4 px-2 rounded-2xl transition-all duration-500 ${activeTab === tab ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-xl shadow-primary/10 dark:shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-white/5'}`}
                                    >
                                        <Icon icon={tabIcons[tab as keyof typeof tabIcons]} width="22" className={`mb-1.5 transition-transform duration-500 ${activeTab === tab ? 'scale-110' : 'opacity-60'}`} />
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em]">{tab}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="p-10 max-h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar-premium">
                                {/* Personal Info */}
                                {activeTab === 'personal' && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="text-sm font-black text-grey uppercase mb-2 block">Full Name</label>
                                                <input name="fullName" value={data.personalInfo.fullName} onChange={handlePersonalInfoChange} className="resume-input" placeholder="e.g. Hari Mishra" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm font-black text-grey uppercase mb-2 block">Job Title</label>
                                                <input name="jobTitle" value={data.personalInfo.jobTitle} onChange={handlePersonalInfoChange} className="resume-input" placeholder="e.g. Full Stack Developer" />
                                            </div>
                                            <div>
                                                <label className="text-sm font-black text-grey uppercase mb-2 block">Email</label>
                                                <input name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} className="resume-input" placeholder="email@example.com" />
                                            </div>
                                            <div>
                                                <label className="text-sm font-black text-grey uppercase mb-2 block">Phone</label>
                                                <input name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} className="resume-input" placeholder="+91 ..." />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm font-black text-grey uppercase mb-2 block">Address</label>
                                                <input name="address" value={data.personalInfo.address} onChange={handlePersonalInfoChange} className="resume-input" placeholder="City, Country" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm font-black text-grey uppercase mb-2 block">Website</label>
                                                <input name="website" value={data.personalInfo.website} onChange={handlePersonalInfoChange} className="resume-input" placeholder="portfolio.com" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm font-black text-grey uppercase mb-2 block">Professional Summary</label>
                                                <textarea name="summary" value={data.personalInfo.summary} onChange={handlePersonalInfoChange} rows={4} className="resume-input" placeholder="Briefly describe your career..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Experience */}
                                {activeTab === 'experience' && (
                                    <div className="space-y-8 animate-fadeIn">
                                        {data.experience.map((exp, i) => (
                                            <div key={i} className="group relative p-8 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                                                <button
                                                    onClick={() => removeItem('experience', i)}
                                                    className="absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-darkmode text-red-500 rounded-full shadow-lg border border-red-100 dark:border-red-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white transform hover:scale-110"
                                                >
                                                    <Icon icon="solar:trash-bin-trash-bold" width="20" />
                                                </button>
                                                <div className="space-y-5">
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Company</label>
                                                        <input value={exp.company} onChange={e => updateItem('experience', i, 'company', e.target.value)} className="resume-input-small text-lg font-bold" placeholder="e.g. Google" />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Position</label>
                                                        <input value={exp.position} onChange={e => updateItem('experience', i, 'position', e.target.value)} className="resume-input-small font-medium" placeholder="e.g. Senior Developer" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Start Date</label>
                                                            <input value={exp.startDate} onChange={e => updateItem('experience', i, 'startDate', e.target.value)} className="resume-input-small" placeholder="MM/YYYY" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">End Date</label>
                                                            <input value={exp.endDate} onChange={e => updateItem('experience', i, 'endDate', e.target.value)} className="resume-input-small" placeholder="Present" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Responsibilities</label>
                                                        <textarea value={exp.description} onChange={e => updateItem('experience', i, 'description', e.target.value)} rows={4} className="resume-input-small text-sm leading-relaxed" placeholder="Describe your impact and achievements..." />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('experience')} className="w-full py-6 border-2 border-dashed border-slate-200 dark:border-white/10 text-slate-500 hover:text-primary hover:border-primary/50 font-black rounded-3xl flex items-center justify-center gap-3 transition-all duration-500 group">
                                            <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <Icon icon="solar:add-circle-bold" width="24" />
                                            </div>
                                            Add Work Experience
                                        </button>
                                    </div>
                                )}

                                {/* Education */}
                                {activeTab === 'education' && (
                                    <div className="space-y-8 animate-fadeIn">
                                        {data.education.map((edu, i) => (
                                            <div key={i} className="group relative p-8 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500">
                                                <button onClick={() => removeItem('education', i)} className="absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-darkmode text-red-500 rounded-full shadow-lg border border-red-100 dark:border-red-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white transform hover:scale-110">
                                                    <Icon icon="solar:trash-bin-trash-bold" width="18" />
                                                </button>
                                                <div className="space-y-5">
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Institution</label>
                                                        <input value={edu.school} onChange={e => updateItem('education', i, 'school', e.target.value)} className="resume-input-small text-lg font-bold" placeholder="e.g. Stanford University" />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Degree</label>
                                                        <input value={edu.degree} onChange={e => updateItem('education', i, 'degree', e.target.value)} className="resume-input-small font-medium" placeholder="e.g. Bachelor of Science" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Start Year</label>
                                                            <input value={edu.startDate} onChange={e => updateItem('education', i, 'startDate', e.target.value)} className="resume-input-small" placeholder="20XX" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">End Year</label>
                                                            <input value={edu.endDate} onChange={e => updateItem('education', i, 'endDate', e.target.value)} className="resume-input-small" placeholder="20XX" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('education')} className="w-full py-6 border-2 border-dashed border-slate-200 dark:border-white/10 text-slate-500 hover:text-primary hover:border-primary/50 font-black rounded-3xl flex items-center justify-center gap-3 transition-all duration-500 group">
                                            <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <Icon icon="solar:add-circle-bold" width="24" />
                                            </div>
                                            Add Academic Degree
                                        </button>
                                    </div>
                                )}

                                {/* Skills */}
                                {activeTab === 'skills' && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <div>
                                            <label className="text-xs font-bold text-grey uppercase mb-2 block">Skills (Type & Press Enter or Comma)</label>
                                            <input
                                                onChange={e => handleListInput('skills', e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') {
                                                        const val = skillInput.trim();
                                                        if (val) {
                                                            setData(prev => ({
                                                                ...prev,
                                                                skills: [...prev.skills, val]
                                                            }));
                                                            setSkillInput('');
                                                        }
                                                    }
                                                }}
                                                value={skillInput}
                                                className="resume-input"
                                                placeholder="React, Next.js, etc."
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills.map((skill, i) => (
                                                <span key={i} className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg flex items-center gap-2 group">
                                                    {skill}
                                                    <Icon onClick={() => removeItem('skills', i)} icon="solar:close-circle-bold" className="cursor-pointer opacity-50 hover:opacity-100" />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Languages */}
                                {activeTab === 'languages' && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <div>
                                            <label className="text-xs font-bold text-grey uppercase mb-2 block">Add Languages (Comma separated)</label>
                                            <input
                                                onChange={e => handleListInput('languages', e.target.value)}
                                                value={langInput}
                                                className="resume-input"
                                                placeholder="e.g. English, French, Hindi..."
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {data.languages.map((lang, i) => (
                                                <span key={i} className="px-4 py-2 bg-green-500/10 text-green-600 font-bold rounded-lg flex items-center gap-2 group">
                                                    {lang}
                                                    <Icon onClick={() => removeItem('languages', i)} icon="solar:close-circle-bold" className="cursor-pointer opacity-50 hover:opacity-100" />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Projects */}
                                {activeTab === 'projects' && (
                                    <div className="space-y-8 animate-fadeIn">
                                        {data.projects.map((proj, i) => (
                                            <div key={i} className="p-6 bg-[#f8f9fa] dark:bg-black/20 rounded-2xl relative group">
                                                <button onClick={() => removeItem('projects', i)} className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"><Icon icon="solar:trash-bin-trash-bold" /></button>
                                                <div className="space-y-4">
                                                    <input value={proj.name} onChange={e => updateItem('projects', i, 'name', e.target.value)} className="resume-input-small font-bold" placeholder="Project Name" />
                                                    <input value={proj.link} onChange={e => updateItem('projects', i, 'link', e.target.value)} className="resume-input-small" placeholder="Project Link" />
                                                    <textarea value={proj.description} onChange={e => updateItem('projects', i, 'description', e.target.value)} rows={2} className="resume-input-small" placeholder="Brief description..." />
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('projects')} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                                            <Icon icon="solar:add-circle-bold" /> Add Project
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LIVE PRINTER-READY PREVIEW */}
                    <div className="col-span-12 lg:col-span-7 2xl:col-span-8">
                        <div className="lg:sticky lg:top-32 group/preview">
                            <div className="bg-slate-900/5 dark:bg-black/40 rounded-[3rem] p-4 md:p-10 border border-slate-200/50 dark:border-white/5 backdrop-blur-3xl shadow-3xl">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/30"></div>
                                            <div className="w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/30"></div>
                                            <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/30"></div>
                                        </div>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] hidden sm:block">Live Print Preview</span>
                                    </div>

                                    {/* QUICK CUSTOMIZATION BAR */}
                                    <div className="flex flex-wrap items-center gap-6 bg-white/40 dark:bg-black/20 p-2.5 rounded-[1.5rem] border border-white dark:border-white/5 backdrop-blur-md">
                                        {/* Color Quick Picker */}
                                        <div className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-white/10">
                                            <div className="flex gap-1.5">
                                                {colors.slice(0, 5).map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => handleCustomizationChange('primaryColor', color)}
                                                        className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${data.customization?.primaryColor?.toLowerCase() === color.toLowerCase() ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="relative w-6 h-6 rounded-full border border-slate-200 overflow-hidden bg-white dark:bg-darkmode flex items-center justify-center">
                                                <input
                                                    type="color"
                                                    value={data.customization?.primaryColor || "#3b82f6"}
                                                    onChange={(e) => handleCustomizationChange('primaryColor', e.target.value)}
                                                    className="absolute inset-0 w-full h-full scale-[3] cursor-pointer opacity-0"
                                                />
                                                <Icon icon="solar:pipette-bold" width="14" className="text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Font Quick Picker */}
                                        <div className="flex items-center gap-3">
                                            <Icon icon="solar:letter-bold-duotone" width="18" className="text-primary" />
                                            <select
                                                value={data.customization?.fontFamily || 'Inter'}
                                                onChange={(e) => handleCustomizationChange('fontFamily', e.target.value)}
                                                className="bg-transparent text-xs font-black uppercase tracking-widest outline-none border-none cursor-pointer text-midnight_text dark:text-white"
                                            >
                                                {fonts.map(font => (
                                                    <option key={font} value={font} className="bg-white dark:bg-darklight text-midnight_text dark:text-white">{font}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="h-4 w-px bg-slate-200 dark:bg-white/10"></div>

                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                            <Icon icon="solar:magnifer-zoom-in-bold" />
                                            <span>75% Zoom</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-h-[85vh] overflow-auto custom-scrollbar-premium rounded-3xl group-hover/preview:shadow-2xl transition-all duration-500">
                                    <div className="flex justify-center p-8 bg-slate-200/50 dark:bg-black/30 rounded-3xl min-w-fit">
                                        <div className="resume-preview-wrapper scale-[0.35] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.75] xl:scale-[0.8] 2xl:scale-[0.9] origin-top transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] hover:shadow-primary/20 bg-white">
                                            <div ref={resumeRef} className="bg-white overflow-hidden" style={{ fontFamily: `${data.customization?.fontFamily || 'Inter'}, sans-serif` }}>
                                                {renderTemplate()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SMART TIP BOX */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-primary/5 border border-primary/10 p-5 rounded-3xl flex items-start gap-4 transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                        <Icon icon="solar:lightbulb-bolt-bold-duotone" width="24" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-midnight_text dark:text-white uppercase tracking-tight">Pro Tip</h4>
                                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">Try the 'Creative' templates for startups or 'Classic' for bigger firms.</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-3xl flex items-start gap-4 transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
                                        <Icon icon="solar:cloud-check-bold-duotone" width="24" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-midnight_text dark:text-white uppercase tracking-tight">Cloud Save</h4>
                                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">Your progress is automatically cached in your local browser storage.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRINT NODE - ZERO MARGIN OPTIMIZED */}
            <div className="print-only" ref={contentRef} style={{ fontFamily: `${data.customization?.fontFamily || 'Inter'}, sans-serif` }}>
                {renderTemplate()}
            </div>

            {/* Font Loading */}
            <link
                href={`https://fonts.googleapis.com/css2?family=${(data.customization?.fontFamily || 'Inter').replace(' ', '+')}:wght@300;400;500;700;900&display=swap`}
                rel="stylesheet"
            />

            <style jsx global>{`
                #resume-content {
                    --primary: ${data.customization?.primaryColor || '#3b82f6'} !important;
                    font-family: ${data.customization?.fontFamily || 'Inter'}, sans-serif !important;
                }
                #resume-content .text-primary { color: var(--primary) !important; }
                #resume-content .bg-primary { background-color: var(--primary) !important; }
                #resume-content .border-primary { border-color: var(--primary) !important; }
                #resume-content .from-primary { --tw-gradient-from: var(--primary) !important; --tw-gradient-to: rgb(255 255 255 / 0) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
                #resume-content .to-primary { --tw-gradient-to: var(--primary) !important; }
                
                /* Override specific colors if they are used as primary accents in templates */
                #resume-content .text-blue-600, 
                #resume-content .text-indigo-600, 
                #resume-content .text-emerald-600,
                #resume-content .text-rose-400 { color: var(--primary) !important; }
                
                #resume-content .bg-blue-600, 
                #resume-content .bg-indigo-600, 
                #resume-content .bg-emerald-600,
                #resume-content .bg-rose-400 { background-color: var(--primary) !important; }
                
                #resume-content .border-blue-600, 
                #resume-content .border-indigo-600, 
                #resume-content .border-emerald-600,
                #resume-content .border-rose-400 { border-color: var(--primary) !important; }
                
                #resume-content .from-blue-600,
                #resume-content .from-indigo-600 { --tw-gradient-from: var(--primary) !important; }
            `}</style>

            <style jsx>{`
                @media screen {
                    .print-only {
                        display: none;
                    }
                }
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .print-only {
                        display: block !important;
                        width: 210mm;
                        height: auto;
                        min-height: 297mm;
                        background: white !important;
                    }
                    /* Smooth Auto Page Breaking */
                    #resume-content section, 
                    #resume-content .experience-item,
                    #resume-content .education-item {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                }
            `}</style>

            <style jsx global>{`
                .resume-input {
                    width: 100%;
                    padding: 1rem 1.75rem;
                    border-radius: 1.5rem;
                    border: 2.5px solid #e2e8f0;
                    background-color: #ffffff;
                    color: #0f172a;
                    font-size: 0.9375rem;
                    font-weight: 600;
                    outline: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }
                .dark .resume-input {
                    background-color: #ffffff;
                    border-color: #e2e8f0;
                    color: #0f172a;
                }
                .resume-input:focus {
                    background-color: white;
                    border-color: var(--color-primary);
                    box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.15);
                    transform: translateY(-2px);
                }
                .dark .resume-input:focus {
                    background-color: white;
                }
                .resume-input::placeholder {
                    color: #94a3b8;
                }
                .resume-input-small {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 2.5px solid #e2e8f0;
                    padding: 0.75rem 0;
                    outline: none;
                    transition: all 0.3s;
                    color: #0f172a;
                    font-weight: 700;
                }
                .dark .resume-input-small {
                    border-bottom-color: #e2e8f0;
                    color: #0f172a;
                }
                .resume-input-small:focus {
                    border-bottom-color: var(--primary);
                    padding-left: 0.5rem;
                }
                .resume-preview-wrapper {
                    width: 794px;
                    min-height: 1123px;
                    height: auto;
                    flex-shrink: 0;
                    background: white;
                }
                .custom-scrollbar-premium::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar-premium::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar-premium::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 20px;
                }
                .dark .custom-scrollbar-premium::-webkit-scrollbar-thumb {
                    background: #334155;
                }
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite ease-in-out;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
            `}</style>
        </section>
    )
}

export default ResumeBuilder

'use client'
import React, { useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import { ResumeData, TemplateId } from '@/types/resume'
import { RESUME_IMPORT_STORAGE_KEY } from '@/lib/ai'
import {
    ModernTemplate, ElegantTemplate, MinimalTemplate, ProfessionalTemplate, CreativeTemplate, ExecutiveTemplate,
    TechTemplate, AcademicTemplate, SideSplitTemplate, GeometricTemplate, PastelTemplate, HighImpactTemplate,
    CompactTemplate, FunctionalTemplate, ChronoTemplate, HybridTemplate, RetroTemplate, GlassyTemplate,
    DarkTemplate, InfographicTemplate, StartupTemplate, MinimalistProTemplate, GradientTemplate, BoardTemplate, JournalTemplate
} from './Templates'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import axiosHelper from '@/utils/axiosHelper'
import ResumeAnalyzer from '@/components/ResumeAnalyzer'

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
        fontFamily: "Inter",
        fontSize: 14,
        sectionSpacing: 28,
        summarySpacing: 28,
        experienceSpacing: 28,
        projectsSpacing: 28,
        educationSpacing: 28,
        skillsSpacing: 28,
        languagesSpacing: 28,
        // Multi-page spacing controls
        pageBreakSpacing: 40,
        secondPageTopSpacing: 60,
        secondPageBottomSpacing: 40,
        thirdPageTopSpacing: 60,
        thirdPageBottomSpacing: 40,
        additionalPageTopSpacing: 50,
        additionalPageBottomSpacing: 30,
        personalInfoSpacing: 20,
        headerSpacing: 30,
        footerSpacing: 20,
        lineHeight: 1.5,
        letterSpacing: 0,
        visibleSections: ['summary', 'experience', 'projects', 'education', 'skills', 'languages'],
        sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills', 'languages']
    }
};

const mergeResumeData = (incoming: ResumeData): ResumeData => ({
    ...initialData,
    ...incoming,
    personalInfo: {
        ...initialData.personalInfo,
        ...incoming.personalInfo,
    },
    education: incoming.education?.length ? incoming.education : [],
    experience: incoming.experience?.length ? incoming.experience : [],
    skills: incoming.skills?.length ? incoming.skills : [],
    projects: incoming.projects?.length ? incoming.projects : [],
    languages: incoming.languages?.length ? incoming.languages : [],
    customization: {
        ...initialData.customization,
        ...incoming.customization,
    }
});

const getResumeDensity = (resume: ResumeData): 'normal' | 'dense' | 'compact' => {
    const summaryLength = resume.personalInfo.summary?.length || 0;
    const experienceLength = resume.experience.reduce((total, item) => total + (item.description?.length || 0), 0);
    const projectLength = resume.projects.reduce((total, item) => total + (item.description?.length || 0), 0);
    const educationLength = resume.education.reduce((total, item) => total + (item.description?.length || 0), 0);
    const skillsLength = resume.skills.join(', ').length;
    const languagesLength = resume.languages.join(', ').length;

    const totalLength = summaryLength + experienceLength + projectLength + educationLength + skillsLength + languagesLength;
    const totalItems =
        resume.experience.length +
        resume.projects.length +
        resume.education.length +
        resume.skills.length +
        resume.languages.length;

    if (totalLength > 5200 || totalItems > 28) return 'compact';
    if (totalLength > 3400 || totalItems > 18) return 'dense';
    return 'normal';
};

const ResumeBuilder = () => {
    const [data, setData] = useState<ResumeData>(initialData)
    const [activeTemplate, setActiveTemplate] = useState<TemplateId>('modern')
    const [activeTab, setActiveTab] = useState('personal')
    const [skillInput, setSkillInput] = useState('')
    const [langInput, setLangInput] = useState('')
    const [activeSubTab, setActiveSubTab] = useState<'Typography' | 'Spacing' | 'MultiPage' | 'Sections'>('Typography');
    const [aiPrompt, setAiPrompt] = useState('')
    const [aiLoading, setAiLoading] = useState(false)
    const resumeRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [selectedCategory, setSelectedCategory] = useState<'All' | 'Classic' | 'Modern' | 'Creative' | 'Specialized'>('All');
    const [showAdvancedMode, setShowAdvancedMode] = useState(false)
    const [livePreviewMode, setLivePreviewMode] = useState(true)
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
    const handlePrint = useReactToPrint({ contentRef });
    const exportDensity = getResumeDensity(data);

    // Load data from DB if user is logged in
    useEffect(() => {
        const applyImportedResume = () => {
            const imported = localStorage.getItem(RESUME_IMPORT_STORAGE_KEY);
            if (!imported) {
                return false;
            }

            try {
                const parsed = JSON.parse(imported);
                if (parsed?.resumeData) {
                    setData(mergeResumeData(parsed.resumeData));
                    toast.success('Imported resume data has been applied');
                    localStorage.removeItem(RESUME_IMPORT_STORAGE_KEY);
                    return true;
                }
            } catch (error) {
                console.error('Error applying imported resume data:', error);
            }

            return false;
        };

        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const fetchResumeData = async () => {
                const loadingToast = toast.loading('Synchronizing with account...');
                try {
                    const response: any = await axiosHelper.get('/resume');
                    if (response) {
                        setData(mergeResumeData(response));
                        toast.success('Your resume data has been restored', { id: loadingToast });
                    }
                    applyImportedResume();
                } catch (error: any) {
                    if (error.response?.status === 404) {
                        toast.dismiss(loadingToast);
                    } else {
                        console.error('Error fetching resume data:', error);
                        toast.error('Could not sync with your account', { id: loadingToast });
                    }
                    applyImportedResume();
                }
            };
            fetchResumeData();
        } else {
            applyImportedResume();
        }
    }, []);

    const saveResumeData = async (silent = false) => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            if (!silent) toast.error('Please login to save your progress');
            return false;
        }

        const loadingToast = silent ? null : toast.loading('Saving to account...');
        try {
            await axiosHelper.post('/resume', data);
            if (!silent && loadingToast) toast.success('Progress saved to your account', { id: loadingToast });
            return true;
        } catch (error) {
            console.error('Error saving resume data:', error);
            if (!silent && loadingToast) toast.error('Failed to save to account', { id: loadingToast });
            return false;
        }
    }

    const onExportPDF = async () => {
        await saveResumeData(true); // Silent save before exporting
        handlePrint();
    }

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

    const handleCustomizationChange = (field: keyof NonNullable<ResumeData['customization']>, value: any) => {
        setData(prev => ({
            ...prev,
            customization: {
                ...prev.customization,
                [field]: value
            }
        }))
    }

    const toggleSectionVisibility = (section: string) => {
        const current = data.customization?.visibleSections || ['summary', 'experience', 'projects', 'education', 'skills', 'languages'];
        const next = current.includes(section) 
            ? current.filter(s => s !== section)
            : [...current, section];
        handleCustomizationChange('visibleSections', next);
    }
    
    const moveItem = (section: 'education' | 'experience' | 'projects', fromIndex: number, toIndex: number) => {
        setData(prev => {
            const newList = [...(prev[section] as any)];
            const [movedItem] = newList.splice(fromIndex, 1);
            newList.splice(toIndex, 0, movedItem);
            return { ...prev, [section]: newList };
        });
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

    const getCurrentSectionData = () => {
        if (activeTab === 'personal') {
            return data.personalInfo
        }
        if (activeTab === 'experience') {
            return data.experience
        }
        if (activeTab === 'education') {
            return data.education
        }
        if (activeTab === 'projects') {
            return data.projects
        }
        if (activeTab === 'skills') {
            return data.skills
        }
        if (activeTab === 'languages') {
            return data.languages
        }
        return null
    }

    const handleAiWrite = async () => {
        if (activeTab === 'appearance') {
            toast.error('AI writing is available for resume content sections only');
            return;
        }

        if (!aiPrompt.trim()) {
            toast.error('Write a prompt for the section first');
            return;
        }

        setAiLoading(true);

        try {
            const response = await fetch('/api/ai/resume-write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    section: activeTab,
                    prompt: aiPrompt,
                    resumeData: data,
                    currentSectionData: getCurrentSectionData(),
                }),
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload.error || 'AI writing failed');
            }

            setData(prev => {
                if (activeTab === 'personal') {
                    return {
                        ...prev,
                        personalInfo: {
                            ...prev.personalInfo,
                            summary: typeof payload.summary === 'string' ? payload.summary : prev.personalInfo.summary,
                            jobTitle: typeof payload.jobTitle === 'string' && payload.jobTitle ? payload.jobTitle : prev.personalInfo.jobTitle,
                        }
                    }
                }

                if (activeTab === 'experience' && Array.isArray(payload.experience)) {
                    return { ...prev, experience: payload.experience }
                }

                if (activeTab === 'education' && Array.isArray(payload.education)) {
                    return { ...prev, education: payload.education }
                }

                if (activeTab === 'projects' && Array.isArray(payload.projects)) {
                    return { ...prev, projects: payload.projects }
                }

                if (activeTab === 'skills' && Array.isArray(payload.skills)) {
                    return { ...prev, skills: payload.skills }
                }

                if (activeTab === 'languages' && Array.isArray(payload.languages)) {
                    return { ...prev, languages: payload.languages }
                }

                return prev
            })

            toast.success('Section updated with AI')
        } catch (error) {
            console.error('Resume AI write error:', error)
            toast.error(error instanceof Error ? error.message : 'AI writing failed')
        } finally {
            setAiLoading(false)
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
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-4 px-3 md:px-6 selection:bg-primary/20 overflow-x-hidden">
            <div className="max-w-[1920px] mx-auto">
                {/* ENHANCED TOP BAR */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2rem] md:rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white/50 dark:border-slate-800 p-4 mb-6 flex flex-col lg:flex-row items-center justify-between gap-6 sticky top-4 z-40 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 rotate-3 hover:rotate-0 transition-all duration-500 group-hover:scale-110">
                            <Icon icon="solar:document-bold-duotone" width="28" className="md:w-[32px]" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">Resume<span className="text-primary">Canvas</span></h2>
                            <p className="text-[8px] md:text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5 flex items-center gap-1.5 whitespace-nowrap">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
                                Professional Builder v3.0
                            </p>
                        </div>
                    </div>

                    {/* ENHANCED CONTROL PANEL */}
                    <div className="flex items-center justify-between w-full lg:w-auto gap-2 md:gap-3">
                        {/* Mode Toggle */}
                        <div className="hidden md:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <button
                                onClick={() => setShowAdvancedMode(!showAdvancedMode)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${showAdvancedMode ? 'bg-primary text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {showAdvancedMode ? 'Advanced' : 'Simple'}
                            </button>
                        </div>

                        {/* Live Preview Toggle */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <span className="text-[8px] font-black text-slate-500">Live</span>
                            <button
                                onClick={() => setLivePreviewMode(!livePreviewMode)}
                                className={`w-8 h-4 rounded-full transition-all duration-300 ${livePreviewMode ? 'bg-primary' : 'bg-slate-300'} relative`}
                            >
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 ${livePreviewMode ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                            </button>
                        </div>

                        <div className="h-6 md:h-8 w-px bg-slate-200 dark:bg-white/10 mx-1 md:mx-2"></div>

                        <button onClick={resetData} className="group flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl text-[10px] md:text-sm font-bold text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300">
                            <Icon icon="solar:restart-bold" className="text-base md:text-lg group-hover:rotate-180 transition-transform duration-500" />
                            <span className="hidden xs:inline">Reset</span>
                        </button>

                        <div className="h-6 md:h-8 w-px bg-slate-200 dark:bg-white/10 mx-1 md:mx-2"></div>

                        <button
                            onClick={() => saveResumeData()}
                            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 border border-slate-200 dark:border-slate-800"
                        >
                            <Icon icon="solar:cloud-upload-bold" width="18" className="md:w-[20px] opacity-70 group-hover:scale-110" />
                            <span className="hidden md:inline">Save Progress</span>
                            <span className="md:hidden">Save</span>
                        </button>

                        <button
                            onClick={onExportPDF}
                            className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black px-5 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl shadow-xl shadow-primary/25 flex items-center gap-2 md:gap-3 transform active:scale-95 transition-all duration-300 group"
                        >
                            <Icon icon="solar:download-minimalistic-bold" width="18" className="md:w-[20px] group-hover:translate-y-0.5 transition-transform" />
                            <span className="text-[10px] md:text-sm">Export <span className="hidden xs:inline">PDF</span></span>
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    <ResumeAnalyzer
                        compact
                        title="Import Existing Resume"
                        description="Upload or paste an old resume and let AI extract the data directly into this builder."
                        showBuilderLink={false}
                        onImport={(resumeData) => setData(mergeResumeData(resumeData))}
                    />
                </div>

                {/* ENHANCED TEMPLATE GALLERY */}
                <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] border border-white dark:border-slate-800 p-4 md:p-8 mb-8 group/gallery animate-fadeIn">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 mb-6 md:mb-8">
                        <div className="space-y-1">
                            <h3 className="text-xl md:text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3 md:gap-4">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Icon icon="solar:widget-bold-duotone" width="20" className="text-white md:w-[24px]" />
                                </div>
                                Template Gallery
                            </h3>
                            <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 font-medium pl-11 md:pl-14 italic max-w-xl">Choose from 27+ professional templates designed for every industry</p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 md:gap-2 p-1.5 md:p-2 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl md:rounded-2xl w-full sm:w-fit backdrop-blur-sm shadow-inner">
                            {['All', 'Classic', 'Modern', 'Creative', 'Specialized'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat as any)}
                                    className={`flex-1 sm:flex-none px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg transform scale-105' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-white/50'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 md:gap-4 max-h-[180px] md:max-h-[250px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
                        {filteredTemplates.map(t => (
                            <button
                                key={t}
                                onClick={() => setActiveTemplate(t)}
                                className={`group relative p-1.5 md:p-2 rounded-xl md:rounded-2xl transition-all duration-500 border-2 ${activeTemplate === t ? 'border-primary bg-gradient-to-br from-primary/5 to-blue-50 scale-[1.02] shadow-lg shadow-primary/20' : 'border-transparent hover:bg-slate-50 dark:hover:bg-white/5 hover:border-primary/30'}`}
                            >
                                <div className={`aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden transition-all duration-500 shadow-sm group-hover:shadow-md ${activeTemplate === t ? 'shadow-primary/20 ring-2 md:ring-4 ring-primary/10 bg-gradient-to-br from-primary/10 to-blue-50' : 'bg-slate-100 dark:bg-black/20'}`}>
                                    <div className="w-full h-full flex items-center justify-center relative">
                                        <Icon
                                            icon={activeTemplate === t ? "solar:check-read-linear" : "solar:file-text-bold-duotone"}
                                            width="24"
                                            className={`md:w-[32px] transition-all duration-500 ${activeTemplate === t ? 'text-primary scale-110' : 'text-slate-300 group-hover:text-primary/40 group-hover:scale-110'}`}
                                        />
                                        {activeTemplate === t && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-50 flex items-center justify-center">
                                                <div className="w-6 h-6 md:w-8 md:h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
                                                    <Icon icon="solar:check-circle-bold" className="text-xs md:text-base" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className={`mt-2 md:mt-3 text-[8px] md:text-[10px] font-black uppercase tracking-widest block text-center truncate px-1 transition-colors duration-300 ${activeTemplate === t ? 'text-primary font-bold' : 'text-slate-400 group-hover:text-midnight_text dark:group-hover:text-white'}`}>
                                    {t.replace('_', ' ')}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Template Stats */}
                    <div className="mt-6 flex items-center justify-between text-[8px] md:text-[10px] text-slate-500">
                        <span className="flex items-center gap-2">
                            <Icon icon="solar:sparkles-bold" width="12" className="text-primary" />
                            {filteredTemplates.length} templates available
                        </span>
                        <span className="flex items-center gap-2">
                            <Icon icon="solar:clock-circle-bold" width="12" className="text-green-500" />
                            ATS-friendly & Print-optimized
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
                    {/* LEFT PANEL: SMART FORM */}
                    <div className="col-span-12 lg:col-span-6 2xl:col-span-6 space-y-6 lg:sticky lg:top-28">
                        <div className="bg-white dark:bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 overflow-hidden">
                            {/* NAVIGATION TABS - SOLID BACKGROUND */}
                            <div className="flex bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar scroll-smooth p-1.5 md:p-2 gap-1">
                                {Object.keys(tabIcons).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] py-3 md:py-4 px-2 rounded-xl md:rounded-2xl transition-all duration-500 ${activeTab === tab ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-xl shadow-primary/10 dark:shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-white/5'}`}
                                    >
                                        <Icon icon={tabIcons[tab as keyof typeof tabIcons]} width="20" className={`mb-1 md:mb-1.5 transition-transform duration-500 md:w-[22px] ${activeTab === tab ? 'scale-110' : 'opacity-60'}`} />
                                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em]">{tab}</span>
                                    </button>
                                ))}
                                <button
                                    onClick={() => setActiveTab('appearance')}
                                    className={`flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] py-3 md:py-4 px-2 rounded-xl md:rounded-2xl transition-all duration-500 ${activeTab === 'appearance' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-xl shadow-primary/10 dark:shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-white/5'}`}
                                >
                                    <Icon icon="solar:settings-bold-duotone" width="22" className={`mb-1.5 ${activeTab === 'appearance' ? 'scale-110' : 'opacity-60'}`} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Layout</span>
                                </button>
                            </div>

                            <div className="p-5 md:p-10 h-auto md:h-[75vh] 2xl:h-[85vh] overflow-y-auto custom-scrollbar-premium bg-white dark:bg-slate-950">
                                {activeTab !== 'appearance' && (
                                    <div className="mb-6 md:mb-8 rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-blue-50 p-4 md:p-6 dark:from-primary/10 dark:via-slate-950 dark:to-slate-900">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div>
                                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">AI Resume Writer</p>
                                                <h4 className="mt-2 text-sm md:text-lg font-black text-slate-900 dark:text-white">
                                                    Improve the {activeTab} section with one proper prompt
                                                </h4>
                                                <p className="mt-2 text-[11px] md:text-sm text-slate-500 dark:text-slate-400">
                                                    Ask for ATS-friendly summary, bullet points, project descriptions, technical skills, or cleaner resume wording.
                                                </p>
                                            </div>
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <Icon icon="solar:stars-bold-duotone" width="22" className="md:w-[26px]" />
                                            </div>
                                        </div>

                                        <textarea
                                            value={aiPrompt}
                                            onChange={(e) => setAiPrompt(e.target.value)}
                                            rows={4}
                                            className="resume-input !min-h-[120px] !text-sm md:!text-base"
                                            placeholder={`Example: Write this ${activeTab} section in a strong, professional style with clear bullet points and ATS-friendly wording.`}
                                        />

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {[
                                                'Make it ATS-friendly',
                                                'Write stronger bullet points',
                                                'Make it more professional',
                                            ].map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    type="button"
                                                    onClick={() => setAiPrompt(suggestion)}
                                                    className="px-3 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-primary hover:border-primary/30 transition-all"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={handleAiWrite}
                                                disabled={aiLoading}
                                                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 md:px-6 py-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-blue-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                <Icon icon={aiLoading ? "solar:refresh-bold" : "solar:magic-stick-3-bold"} className={aiLoading ? 'animate-spin' : ''} />
                                                {aiLoading ? 'Writing...' : 'Write With AI'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Personal Info */}
                                {activeTab === 'personal' && (
                                        <div className="grid grid-cols-2 gap-4 md:gap-5">
                                            <div className="col-span-2">
                                                <div className="flex items-center gap-2 mb-2 md:mb-3">
                                                    <div className="w-1 md:w-1.5 h-5 md:h-6 bg-primary rounded-full"></div>
                                                    <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Basic Information</h4>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase mb-1.5 md:mb-2 block ml-1">Full Identity</label>
                                                <input name="fullName" value={data.personalInfo.fullName} onChange={handlePersonalInfoChange} className="resume-input text-sm md:text-base" placeholder="e.g. Hari Mishra" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase mb-1.5 md:mb-2 block ml-1">Professional Title</label>
                                                <input name="jobTitle" value={data.personalInfo.jobTitle} onChange={handlePersonalInfoChange} className="resume-input text-sm md:text-base" placeholder="e.g. Full Stack Developer" />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase mb-1.5 md:mb-2 block ml-1">Email Address</label>
                                                <input name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} className="resume-input text-sm md:text-base" placeholder="email@example.com" />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase mb-1.5 md:mb-2 block ml-1">Contact Number</label>
                                                <input name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} className="resume-input text-sm md:text-base" placeholder="+91 ..." />
                                            </div>
                                            <div className="col-span-2">
                                                <div className="flex items-center gap-2 mb-2 md:mb-3 mt-3 md:mt-4">
                                                    <div className="w-1 md:w-1.5 h-5 md:h-6 bg-primary/40 rounded-full"></div>
                                                    <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Location & Presence</h4>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase mb-1.5 md:mb-2 block ml-1">Physical Address</label>
                                                <input name="address" value={data.personalInfo.address} onChange={handlePersonalInfoChange} className="resume-input text-sm md:text-base" placeholder="City, Country" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase mb-1.5 md:mb-2 block ml-1">Digital Presence (URL)</label>
                                                <input name="website" value={data.personalInfo.website} onChange={handlePersonalInfoChange} className="resume-input text-sm md:text-base" placeholder="portfolio.com" />
                                            </div>
                                            <div className="col-span-2">
                                                <div className="flex items-center gap-2 mb-2 md:mb-3 mt-3 md:mt-4">
                                                    <div className="w-1 md:w-1.5 h-5 md:h-6 bg-indigo-500 rounded-full"></div>
                                                    <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Professional Summary</h4>
                                                </div>
                                                <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase mb-1.5 md:mb-2 block ml-1">About Your Career</label>
                                                <textarea name="summary" value={data.personalInfo.summary} onChange={handlePersonalInfoChange} rows={5} className="resume-input leading-relaxed text-sm md:text-base" placeholder="Briefly describe your career..." />
                                            </div>
                                        </div>
                                )}

                                {/* Experience */}
                                {activeTab === 'experience' && (
                                    <div className="space-y-6 md:space-y-8 animate-fadeIn">
                                {data.experience.map((exp, i) => (
                                            <div key={i} className="group relative p-5 md:p-8 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                                                {/* Reorder Controls */}
                                                <div className="absolute -top-2 left-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button onClick={() => moveItem('experience', i, i - 1)} disabled={i === 0} className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400"><Icon icon="solar:arrow-up-bold" /></button>
                                                    <button onClick={() => moveItem('experience', i, i + 1)} disabled={i === data.experience.length - 1} className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400"><Icon icon="solar:arrow-down-bold" /></button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem('experience', i)}
                                                    className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-white dark:bg-darkmode text-red-500 rounded-full shadow-lg border border-red-100 dark:border-red-900/30 flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white transform hover:scale-110 z-10"
                                                >
                                                    <Icon icon="solar:trash-bin-trash-bold" width="16" className="md:w-[20px]" />
                                                </button>
                                                <div className="space-y-4 md:space-y-5">
                                                    <div>
                                                        <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block">Company</label>
                                                        <input value={exp.company} onChange={e => updateItem('experience', i, 'company', e.target.value)} className="resume-input-small text-base md:text-lg font-bold" placeholder="e.g. Google" />
                                                    </div>
                                                    <div>
                                                        <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block">Position</label>
                                                        <input value={exp.position} onChange={e => updateItem('experience', i, 'position', e.target.value)} className="resume-input-small text-sm md:text-base font-medium" placeholder="e.g. Senior Developer" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                                                        <div>
                                                            <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block">Start Date</label>
                                                            <input value={exp.startDate} onChange={e => updateItem('experience', i, 'startDate', e.target.value)} className="resume-input-small text-xs md:text-sm" placeholder="MM/YYYY" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block">End Date</label>
                                                            <input value={exp.endDate} onChange={e => updateItem('experience', i, 'endDate', e.target.value)} className="resume-input-small text-xs md:text-sm" placeholder="Present" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block flex justify-between">
                                                            Responsibilities
                                                            <span className="text-[8px] opacity-60">Separate lines for bullet points</span>
                                                        </label>
                                                        <textarea value={exp.description} onChange={e => updateItem('experience', i, 'description', e.target.value)} rows={4} className="resume-input-small text-xs md:text-sm leading-relaxed" placeholder="• Achieved X using Y...&#10;• Led a team of..." />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('experience')} className="w-full py-4 md:py-6 border-2 border-dashed border-slate-200 dark:border-white/10 text-slate-500 hover:text-primary hover:border-primary/50 font-black rounded-2xl md:rounded-3xl flex items-center justify-center gap-2 md:gap-3 transition-all duration-500 group">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 dark:bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <Icon icon="solar:add-circle-bold" width="20" className="md:w-[24px]" />
                                            </div>
                                            <span className="text-[10px] md:text-sm">Add Work Experience</span>
                                        </button>
                                    </div>
                                )}

                                {/* Education */}
                                {activeTab === 'education' && (
                                    <div className="space-y-6 md:space-y-8 animate-fadeIn">
                                        {data.education.map((edu, i) => (
                                            <div key={i} className="group relative p-5 md:p-8 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500">
                                                <div className="absolute -top-2 left-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button onClick={() => moveItem('education', i, i - 1)} disabled={i === 0} className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400"><Icon icon="solar:arrow-up-bold" /></button>
                                                    <button onClick={() => moveItem('education', i, i + 1)} disabled={i === data.education.length - 1} className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400"><Icon icon="solar:arrow-down-bold" /></button>
                                                </div>
                                                <button onClick={() => removeItem('education', i)} className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-white dark:bg-darkmode text-red-500 rounded-full shadow-lg border border-red-100 dark:border-red-900/30 flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white transform hover:scale-110 z-10">
                                                    <Icon icon="solar:trash-bin-trash-bold" width="16" className="md:w-[18px]" />
                                                </button>
                                                <div className="space-y-4 md:space-y-5">
                                                    <div>
                                                        <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block">Institution</label>
                                                        <input value={edu.school} onChange={e => updateItem('education', i, 'school', e.target.value)} className="resume-input-small text-base md:text-lg font-bold" placeholder="e.g. Stanford University" />
                                                    </div>
                                                    <div>
                                                        <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block">Degree</label>
                                                        <input value={edu.degree} onChange={e => updateItem('education', i, 'degree', e.target.value)} className="resume-input-small text-sm md:text-base font-medium" placeholder="e.g. Bachelor of Science" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                                                        <div>
                                                            <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block">Start Year</label>
                                                            <input value={edu.startDate} onChange={e => updateItem('education', i, 'startDate', e.target.value)} className="resume-input-small text-xs md:text-sm" placeholder="20XX" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 block">End Year</label>
                                                            <input value={edu.endDate} onChange={e => updateItem('education', i, 'endDate', e.target.value)} className="resume-input-small text-xs md:text-sm" placeholder="20XX" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('education')} className="w-full py-4 md:py-6 border-2 border-dashed border-slate-200 dark:border-white/10 text-slate-500 hover:text-primary hover:border-primary/50 font-black rounded-2xl md:rounded-3xl flex items-center justify-center gap-2 md:gap-3 transition-all duration-500 group">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 dark:bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <Icon icon="solar:add-circle-bold" width="20" className="md:w-[24px]" />
                                            </div>
                                            <span className="text-[10px] md:text-sm">Add Academic Degree</span>
                                        </button>
                                    </div>
                                )}

                                {/* Skills */}
                                {activeTab === 'skills' && (
                                    <div className="space-y-5 md:space-y-6 animate-fadeIn">
                                        <div>
                                            <label className="text-[10px] md:text-xs font-bold text-grey uppercase mb-2 block">Skills (Type & Press Enter)</label>
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
                                                className="resume-input text-sm md:text-base"
                                                placeholder="React, Next.js, etc."
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills.map((skill, i) => (
                                                <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 text-primary font-bold rounded-lg text-xs md:text-sm flex items-center gap-2 group">
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
                                                <div className="absolute -top-2 left-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button onClick={(e) => { e.stopPropagation(); moveItem('projects', i, i - 1); }} disabled={i === 0} className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400"><Icon icon="solar:arrow-up-bold" /></button>
                                                    <button onClick={(e) => { e.stopPropagation(); moveItem('projects', i, i + 1); }} disabled={i === data.projects.length - 1} className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-400"><Icon icon="solar:arrow-down-bold" /></button>
                                                </div>
                                                <button onClick={() => removeItem('projects', i)} className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"><Icon icon="solar:trash-bin-trash-bold" /></button>
                                                <div className="space-y-4">
                                                    <input value={proj.name} onChange={e => updateItem('projects', i, 'name', e.target.value)} className="resume-input-small font-bold" placeholder="Project Name" />
                                                    <input value={proj.link} onChange={e => updateItem('projects', i, 'link', e.target.value)} className="resume-input-small" placeholder="Project Link" />
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block flex justify-between">
                                                            Brief Description
                                                            <span className="text-[8px] opacity-60">Supports bullet points via new lines</span>
                                                        </label>
                                                        <textarea value={proj.description} onChange={e => updateItem('projects', i, 'description', e.target.value)} rows={2} className="resume-input-small" placeholder="• Built using React...&#10;• Optimized for speed..." />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('projects')} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                                            <Icon icon="solar:add-circle-bold" /> Add Project
                                        </button>
                                    </div>
                                )}

                                {/* Configuration - Advanced Config */}
                                {activeTab === 'appearance' && (
                                    <div className="space-y-6 pb-10 animate-fadeIn h-full overflow-y-auto no-scrollbar">
                                        {/* Configuration Tabs */}
                                        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl mb-2">
                                            {['Typography', 'Spacing', 'MultiPage', 'Sections'].map((subtab) => (
                                                <button
                                                    key={subtab}
                                                    onClick={() => setActiveSubTab(subtab as any)}
                                                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeSubTab === subtab ? 'bg-primary text-white shadow-lg' : 'text-slate-400'}`}
                                                >
                                                    {subtab}
                                                </button>
                                            ))}
                                        </div>

                                        {activeSubTab === 'Typography' && (
                                            <div className="space-y-6 animate-fadeIn">
                                                <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-slate-100 dark:border-white/5">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
                                                        <Icon icon="solar:text-bold-duotone" width="18" /> Detail Control
                                                    </h4>
                                                    
                                                    <div className="space-y-8">
                                                        <div>
                                                            <div className="flex justify-between mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                                <span>Text Height</span>
                                                                <span className="text-primary">{data.customization?.lineHeight || 1.5}</span>
                                                            </div>
                                                            <input type="range" min="1" max="2.5" step="0.1" value={data.customization?.lineHeight || 1.5} onChange={(e) => handleCustomizationChange('lineHeight', parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                                <span>Letter Spacing</span>
                                                                <span className="text-primary">{data.customization?.letterSpacing || 0}px</span>
                                                            </div>
                                                            <input type="range" min="-1" max="10" step="0.5" value={data.customization?.letterSpacing || 0} onChange={(e) => handleCustomizationChange('letterSpacing', parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeSubTab === 'Spacing' && (
                                            <div className="space-y-6 animate-fadeIn">
                                                <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6 flex items-center gap-2">
                                                        <Icon icon="solar:tuning-square-bold-duotone" width="18" /> Section Spacing Control
                                                    </h4>
                                                    
                                                    {/* Global Spacing Control */}
                                                    <div className="mb-8 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-500/10 dark:to-blue-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
                                                        <div className="flex justify-between items-center mb-3">
                                                            <label className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Global Spacing</label>
                                                            <span className="text-indigo-600 dark:text-indigo-400 text-[9px] font-bold">{data.customization?.sectionSpacing || 28}px</span>
                                                        </div>
                                                        <input 
                                                            type="range" 
                                                            min="0" 
                                                            max="80" 
                                                            step="2" 
                                                            value={data.customization?.sectionSpacing || 28} 
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value);
                                                                handleCustomizationChange('sectionSpacing', value);
                                                                // Apply to all sections
                                                                ['summarySpacing', 'experienceSpacing', 'projectsSpacing', 'educationSpacing', 'skillsSpacing', 'languagesSpacing'].forEach(spacing => {
                                                                    handleCustomizationChange(spacing as any, value);
                                                                });
                                                            }} 
                                                            className="w-full h-2 bg-indigo-100 dark:bg-indigo-800 rounded-full appearance-none cursor-pointer accent-indigo-500" 
                                                        />
                                                        <p className="text-[8px] text-indigo-500 dark:text-indigo-400 mt-2 italic">Adjust all sections at once</p>
                                                    </div>

                                                    {/* Individual Section Spacing */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                                        {[
                                                            { id: 'summarySpacing', label: 'Summary', icon: 'solar:user-bold-duotone', color: 'blue' },
                                                            { id: 'experienceSpacing', label: 'Experience', icon: 'solar:case-bold-duotone', color: 'green' },
                                                            { id: 'projectsSpacing', label: 'Projects', icon: 'solar:folder-path-connect-bold-duotone', color: 'purple' },
                                                            { id: 'educationSpacing', label: 'Education', icon: 'solar:notebook-bold-duotone', color: 'orange' },
                                                            { id: 'skillsSpacing', label: 'Skills', icon: 'solar:star-bold-duotone', color: 'pink' },
                                                            { id: 'languagesSpacing', label: 'Languages', icon: 'solar:chat-round-dots-bold-duotone', color: 'cyan' }
                                                        ].map((ctrl) => (
                                                            <div key={ctrl.id} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <Icon icon={ctrl.icon} width="16" className={`text-${ctrl.color}-500`} />
                                                                    <div className="flex justify-between items-center flex-1">
                                                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">{ctrl.label}</label>
                                                                        <span className={`text-${ctrl.color}-500 text-[9px] font-bold`}>{data.customization?.[ctrl.id as keyof typeof data.customization] || 28}px</span>
                                                                    </div>
                                                                </div>
                                                                <input 
                                                                    type="range" 
                                                                    min="0" 
                                                                    max="80" 
                                                                    step="2" 
                                                                    value={data.customization?.[ctrl.id as keyof typeof data.customization] || 28} 
                                                                    onChange={(e) => handleCustomizationChange(ctrl.id as any, parseInt(e.target.value))} 
                                                                    className={`w-full h-1 bg-${ctrl.color}-100 dark:bg-${ctrl.color}-800 rounded-full appearance-none cursor-pointer accent-${ctrl.color}-500`} 
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Quick Presets */}
                                                    <div className="mt-8 p-4 bg-slate-100 dark:bg-white/5 rounded-2xl">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3">Quick Presets</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {[
                                                                { name: 'Compact', value: 16 },
                                                                { name: 'Normal', value: 28 },
                                                                { name: 'Comfortable', value: 40 },
                                                                { name: 'Spacious', value: 56 }
                                                            ].map((preset) => (
                                                                <button
                                                                    key={preset.name}
                                                                    onClick={() => {
                                                                        ['sectionSpacing', 'summarySpacing', 'experienceSpacing', 'projectsSpacing', 'educationSpacing', 'skillsSpacing', 'languagesSpacing'].forEach(spacing => {
                                                                            handleCustomizationChange(spacing as any, preset.value);
                                                                        });
                                                                    }}
                                                                    className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[8px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all"
                                                                >
                                                                    {preset.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* AI Spacing Suggestions */}
                                                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 rounded-2xl border border-purple-100 dark:border-purple-500/20">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Icon icon="solar:magic-stick-3-bold" width="16" className="text-purple-500" />
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">AI Spacing Assistant</p>
                                                        </div>
                                                        <p className="text-[8px] text-slate-600 dark:text-slate-400 mb-3 italic">Get optimal spacing based on your content length and profession</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {[
                                                                { name: 'Tech Resume', spacing: { summary: 24, experience: 32, projects: 28, education: 24, skills: 20, languages: 16 } },
                                                                { name: 'Executive', spacing: { summary: 32, experience: 40, projects: 24, education: 28, skills: 20, languages: 16 } },
                                                                { name: 'Academic', spacing: { summary: 28, experience: 32, projects: 32, education: 36, skills: 24, languages: 20 } },
                                                                { name: 'Creative', spacing: { summary: 36, experience: 36, projects: 40, education: 28, skills: 28, languages: 24 } }
                                                            ].map((suggestion) => (
                                                                <button
                                                                    key={suggestion.name}
                                                                    onClick={() => {
                                                                        Object.entries(suggestion.spacing).forEach(([section, value]) => {
                                                                            const spacingKey = `${section}Spacing` as any;
                                                                            handleCustomizationChange(spacingKey, value);
                                                                        });
                                                                        toast.success(`Applied ${suggestion.name} spacing profile`);
                                                                    }}
                                                                    className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 rounded-lg text-[8px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all"
                                                                >
                                                                    {suggestion.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeSubTab === 'MultiPage' && (
                                            <div className="space-y-6 animate-fadeIn">
                                                <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-6 flex items-center gap-2">
                                                        <Icon icon="solar:document-text-bold-duotone" width="18" /> Personal & Page Spacing
                                                    </h4>
                                                    
                                                    {/* Personal Info Spacing */}
                                                    <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-500/10 dark:to-amber-500/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <Icon icon="solar:user-bold-duotone" width="16" className="text-orange-500" />
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">Personal Details Spacing</p>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-600">Name Top Space</label>
                                                                    <span className="text-orange-500 text-[8px] font-bold">{data.customization?.personalInfoSpacing || 20}px</span>
                                                                </div>
                                                                <input 
                                                                    type="range" 
                                                                    min="0" 
                                                                    max="60" 
                                                                    step="2" 
                                                                    value={data.customization?.personalInfoSpacing || 20} 
                                                                    onChange={(e) => handleCustomizationChange('personalInfoSpacing', parseInt(e.target.value))} 
                                                                    className="w-full h-1 bg-orange-100 dark:bg-orange-800 rounded-full appearance-none cursor-pointer accent-orange-500" 
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <label className="text-[8px] font-black uppercase tracking-widest text-slate-600">Header Bottom Space</label>
                                                                    <span className="text-orange-500 text-[8px] font-bold">{data.customization?.headerSpacing || 30}px</span>
                                                                </div>
                                                                <input 
                                                                    type="range" 
                                                                    min="0" 
                                                                    max="80" 
                                                                    step="2" 
                                                                    value={data.customization?.headerSpacing || 30} 
                                                                    onChange={(e) => handleCustomizationChange('headerSpacing', parseInt(e.target.value))} 
                                                                    className="w-full h-1 bg-orange-100 dark:bg-orange-800 rounded-full appearance-none cursor-pointer accent-orange-500" 
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Page Break Controls */}
                                                    <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-2xl border border-blue-100 dark:border-blue-500/20">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <Icon icon="solar:document-add-bold-duotone" width="16" className="text-blue-500" />
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Dynamic Page Management</p>
                                                        </div>
                                                        
                                                        {/* Second Page Controls */}
                                                        <div className="mb-6 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                                                            <p className="text-[8px] font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1">
                                                                <Icon icon="solar:document-text-bold" width="12" />
                                                                Second Page Spacing
                                                            </p>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div>
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <label className="text-[7px] font-black uppercase tracking-widest text-slate-600">Top Space</label>
                                                                        <span className="text-blue-500 text-[7px] font-bold">{data.customization?.secondPageTopSpacing || 60}px</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="0" 
                                                                        max="120" 
                                                                        step="4" 
                                                                        value={data.customization?.secondPageTopSpacing || 60} 
                                                                        onChange={(e) => handleCustomizationChange('secondPageTopSpacing', parseInt(e.target.value))} 
                                                                        className="w-full h-1 bg-blue-100 dark:bg-blue-800 rounded-full appearance-none cursor-pointer accent-blue-500" 
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <label className="text-[7px] font-black uppercase tracking-widest text-slate-600">Bottom Space</label>
                                                                        <span className="text-blue-500 text-[7px] font-bold">{data.customization?.secondPageBottomSpacing || 40}px</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="0" 
                                                                        max="100" 
                                                                        step="4" 
                                                                        value={data.customization?.secondPageBottomSpacing || 40} 
                                                                        onChange={(e) => handleCustomizationChange('secondPageBottomSpacing', parseInt(e.target.value))} 
                                                                        className="w-full h-1 bg-blue-100 dark:bg-blue-800 rounded-full appearance-none cursor-pointer accent-blue-500" 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Third Page Controls */}
                                                        <div className="mb-6 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                                                            <p className="text-[8px] font-bold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1">
                                                                <Icon icon="solar:document-text-bold" width="12" />
                                                                Third Page Spacing
                                                            </p>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div>
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <label className="text-[7px] font-black uppercase tracking-widest text-slate-600">Top Space</label>
                                                                        <span className="text-indigo-500 text-[7px] font-bold">{data.customization?.thirdPageTopSpacing || 60}px</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="0" 
                                                                        max="120" 
                                                                        step="4" 
                                                                        value={data.customization?.thirdPageTopSpacing || 60} 
                                                                        onChange={(e) => handleCustomizationChange('thirdPageTopSpacing', parseInt(e.target.value))} 
                                                                        className="w-full h-1 bg-indigo-100 dark:bg-indigo-800 rounded-full appearance-none cursor-pointer accent-indigo-500" 
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <label className="text-[7px] font-black uppercase tracking-widest text-slate-600">Bottom Space</label>
                                                                        <span className="text-indigo-500 text-[7px] font-bold">{data.customization?.thirdPageBottomSpacing || 40}px</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="0" 
                                                                        max="100" 
                                                                        step="4" 
                                                                        value={data.customization?.thirdPageBottomSpacing || 40} 
                                                                        onChange={(e) => handleCustomizationChange('thirdPageBottomSpacing', parseInt(e.target.value))} 
                                                                        className="w-full h-1 bg-indigo-100 dark:bg-indigo-800 rounded-full appearance-none cursor-pointer accent-indigo-500" 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Additional Pages Controls */}
                                                        <div className="p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                                                            <p className="text-[8px] font-bold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-1">
                                                                <Icon icon="solar:document-text-bold" width="12" />
                                                                Additional Pages (4+)
                                                            </p>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div>
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <label className="text-[7px] font-black uppercase tracking-widest text-slate-600">Top Space</label>
                                                                        <span className="text-purple-500 text-[7px] font-bold">{data.customization?.additionalPageTopSpacing || 50}px</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="0" 
                                                                        max="120" 
                                                                        step="4" 
                                                                        value={data.customization?.additionalPageTopSpacing || 50} 
                                                                        onChange={(e) => handleCustomizationChange('additionalPageTopSpacing', parseInt(e.target.value))} 
                                                                        className="w-full h-1 bg-purple-100 dark:bg-purple-800 rounded-full appearance-none cursor-pointer accent-purple-500" 
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <label className="text-[7px] font-black uppercase tracking-widest text-slate-600">Bottom Space</label>
                                                                        <span className="text-purple-500 text-[7px] font-bold">{data.customization?.additionalPageBottomSpacing || 30}px</span>
                                                                    </div>
                                                                    <input 
                                                                        type="range" 
                                                                        min="0" 
                                                                        max="100" 
                                                                        step="4" 
                                                                        value={data.customization?.additionalPageBottomSpacing || 30} 
                                                                        onChange={(e) => handleCustomizationChange('additionalPageBottomSpacing', parseInt(e.target.value))} 
                                                                        className="w-full h-1 bg-purple-100 dark:bg-purple-800 rounded-full appearance-none cursor-pointer accent-purple-500" 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Page Break Spacing */}
                                                        <div className="mt-4 p-3 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-500/10 dark:to-teal-500/10 rounded-xl border border-cyan-100 dark:border-cyan-500/20">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <label className="text-[8px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Page Break Gap</label>
                                                                <span className="text-cyan-500 text-[8px] font-bold">{data.customization?.pageBreakSpacing || 40}px</span>
                                                            </div>
                                                            <input 
                                                                type="range" 
                                                                min="0" 
                                                                max="100" 
                                                                step="4" 
                                                                value={data.customization?.pageBreakSpacing || 40} 
                                                                onChange={(e) => handleCustomizationChange('pageBreakSpacing', parseInt(e.target.value))} 
                                                                className="w-full h-1 bg-cyan-100 dark:bg-cyan-800 rounded-full appearance-none cursor-pointer accent-cyan-500" 
                                                            />
                                                        </div>

                                                        {/* Multi-Page Quick Presets */}
                                                        <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 rounded-xl border border-amber-100 dark:border-amber-500/20">
                                                            <p className="text-[8px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">Multi-Page Presets</p>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {[
                                                                    { name: 'Compact Pages', config: { secondPageTopSpacing: 40, secondPageBottomSpacing: 20, thirdPageTopSpacing: 40, thirdPageBottomSpacing: 20, additionalPageTopSpacing: 30, additionalPageBottomSpacing: 15 }},
                                                                    { name: 'Balanced Pages', config: { secondPageTopSpacing: 60, secondPageBottomSpacing: 40, thirdPageTopSpacing: 60, thirdPageBottomSpacing: 40, additionalPageTopSpacing: 50, additionalPageBottomSpacing: 30 }},
                                                                    { name: 'Spacious Pages', config: { secondPageTopSpacing: 80, secondPageBottomSpacing: 60, thirdPageTopSpacing: 80, thirdPageBottomSpacing: 60, additionalPageTopSpacing: 70, additionalPageBottomSpacing: 50 }},
                                                                    { name: 'Professional', config: { secondPageTopSpacing: 50, secondPageBottomSpacing: 35, thirdPageTopSpacing: 55, thirdPageBottomSpacing: 35, additionalPageTopSpacing: 45, additionalPageBottomSpacing: 25 }}
                                                                ].map((preset) => (
                                                                    <button
                                                                        key={preset.name}
                                                                        onClick={() => {
                                                                            Object.entries(preset.config).forEach(([key, value]) => {
                                                                                handleCustomizationChange(key as any, value);
                                                                            });
                                                                            toast.success(`Applied ${preset.name} layout`);
                                                                        }}
                                                                        className="px-2 py-1.5 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 rounded-lg text-[7px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all text-center"
                                                                    >
                                                                        {preset.name}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Footer Spacing */}
                                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 rounded-2xl border border-purple-100 dark:border-purple-500/20">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Icon icon="solar:document-minimalistic-bold-duotone" width="16" className="text-purple-500" />
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">Footer Spacing</p>
                                                        </div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <label className="text-[8px] font-black uppercase tracking-widest text-slate-600">Bottom Margin</label>
                                                            <span className="text-purple-500 text-[8px] font-bold">{data.customization?.footerSpacing || 20}px</span>
                                                        </div>
                                                        <input 
                                                            type="range" 
                                                            min="0" 
                                                            max="80" 
                                                            step="2" 
                                                            value={data.customization?.footerSpacing || 20} 
                                                            onChange={(e) => handleCustomizationChange('footerSpacing', parseInt(e.target.value))} 
                                                            className="w-full h-1 bg-purple-100 dark:bg-purple-800 rounded-full appearance-none cursor-pointer accent-purple-500" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeSubTab === 'Sections' && (
                                            <div className="space-y-6 animate-fadeIn">
                                                <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-6 flex items-center gap-2">
                                                        <Icon icon="solar:hamburger-menu-bold-duotone" width="18" /> Availability
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {['summary', 'experience', 'projects', 'education', 'skills', 'languages'].map(sec => (
                                                            <button 
                                                                key={sec}
                                                                onClick={() => toggleSectionVisibility(sec)}
                                                                className={`w-full p-4 rounded-2xl flex items-center justify-between border transition-all ${data.customization?.visibleSections?.includes(sec) ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 opacity-50'}`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <Icon icon={data.customization?.visibleSections?.includes(sec) ? "solar:eye-bold-duotone" : "solar:eye-closed-bold-duotone"} className={data.customization?.visibleSections?.includes(sec) ? "text-emerald-500" : "text-slate-400"} />
                                                                    <span className="text-[10px] font-black uppercase tracking-widest">{sec}</span>
                                                                </div>
                                                                {data.customization?.visibleSections?.includes(sec) && <Icon icon="solar:check-circle-bold" className="text-emerald-500" />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="bg-emerald-500/5 rounded-3xl p-8 border border-emerald-500/10 text-center">
                                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600 mb-4 px-2 italic font-serif">Advanced Configuration v4.1</h4>
                                            
                                            <button onClick={onExportPDF} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 active:scale-95 transition-all group">
                                                <Icon icon="solar:file-download-bold" width="24" className=" group-hover:translate-y-1 transition-transform" />
                                                PRO-GENERATE PDF
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LIVE PRINTER-READY PREVIEW */}
                    <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
                        <div className="lg:sticky lg:top-28 group/preview">
                            <div className="bg-slate-200/50 dark:bg-slate-900/50 rounded-[2rem] md:rounded-[3rem] p-3 md:p-8 border border-white dark:border-slate-800 backdrop-blur-3xl shadow-inner">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8 px-2 md:px-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 md:gap-2">
                                            <div className="w-2 md:w-3 h-2 md:h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/30"></div>
                                            <div className="w-2 md:w-3 h-2 md:h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/30"></div>
                                            <div className="w-2 md:w-3 h-2 md:h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/30"></div>
                                        </div>
                                        <span className="text-[9px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">Live Print Preview</span>
                                    </div>

                                    {/* QUICK CUSTOMIZATION BAR */}
                                    <div className="flex flex-wrap items-center gap-3 md:gap-6 bg-white/40 dark:bg-black/20 p-2 md:p-2.5 rounded-xl md:rounded-[1.5rem] border border-white dark:border-white/5 backdrop-blur-md">
                                        {/* Color Quick Picker */}
                                        <div className="flex items-center gap-2 pr-3 md:pr-4 border-r border-slate-200 dark:border-white/10">
                                            <div className="flex gap-1 md:gap-1.5">
                                                {colors.slice(0, 5).map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => handleCustomizationChange('primaryColor', color)}
                                                        className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-2 transition-all hover:scale-110 ${data.customization?.primaryColor?.toLowerCase() === color.toLowerCase() ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="relative w-4 h-4 md:w-6 md:h-6 rounded-full border border-slate-200 overflow-hidden bg-white dark:bg-darkmode flex items-center justify-center">
                                                <input
                                                    type="color"
                                                    value={data.customization?.primaryColor || "#3b82f6"}
                                                    onChange={(e) => handleCustomizationChange('primaryColor', e.target.value)}
                                                    className="absolute inset-0 w-full h-full scale-[3] cursor-pointer opacity-0"
                                                />
                                                <Icon icon="solar:pipette-bold" width="10" className="md:w-[14px] text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Font Quick Picker */}
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <Icon icon="solar:letter-bold-duotone" width="14" className="md:w-[18px] text-primary" />
                                            <select
                                                value={data.customization?.fontFamily || 'Inter'}
                                                onChange={(e) => handleCustomizationChange('fontFamily', e.target.value)}
                                                className="bg-transparent text-[9px] md:text-xs font-black uppercase tracking-wider md:tracking-widest outline-none border-none cursor-pointer text-midnight_text dark:text-white"
                                            >
                                                {fonts.map(font => (
                                                    <option key={font} value={font} className="bg-white dark:bg-darklight text-midnight_text dark:text-white">{font}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-white/10"></div>

                                        <div className="hidden sm:flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-bold text-slate-500">
                                            <Icon icon="solar:magnifer-zoom-in-bold" />
                                            <span>Scale: Auto</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[50vh] md:h-[75vh] 2xl:h-[85vh] overflow-auto custom-scrollbar-premium rounded-[1.5rem] md:rounded-[2rem] group-hover/preview:shadow-2xl transition-all duration-500 bg-slate-100 dark:bg-slate-950/40 p-1">
                                    <div className="flex justify-center p-4 md:p-8 min-w-fit">
                                        <div className="resume-preview-wrapper scale-[0.35] xs:scale-[0.45] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-[0.95] origin-top transition-all duration-700 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-primary/30 bg-white">
                                            <div ref={resumeRef} className="bg-white overflow-hidden" style={{ fontFamily: `${data.customization?.fontFamily || 'Inter'}, sans-serif` }}>
                                                {renderTemplate()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ENHANCED SMART TIP BOXES */}
                            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Pro Tip */}
                                <div className="group bg-gradient-to-br from-primary/5 via-blue-50 to-primary/5 border border-primary/10 p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl flex items-start gap-3 md:gap-4 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/20">
                                        <Icon icon="solar:lightbulb-bolt-bold-duotone" width="20" className="md:w-[24px]" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs md:text-sm font-black text-primary dark:text-white uppercase tracking-tight mb-1">Pro Tip</h4>
                                        <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Choose templates based on your target industry for maximum impact.</p>
                                    </div>
                                </div>

                                {/* AI Assistant */}
                                <div className="group bg-gradient-to-br from-purple/5 via-purple-50 to-purple/5 border border-purple/10 p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl flex items-start gap-3 md:gap-4 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple/20">
                                        <Icon icon="solar:magic-stick-3-bold" width="20" className="md:w-[24px]" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs md:text-sm font-black text-purple-600 dark:text-purple-400 uppercase tracking-tight mb-1">AI Assistant</h4>
                                        <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Use AI to generate professional content and optimize your resume.</p>
                                    </div>
                                </div>

                                {/* ATS Score */}
                                <div className="group bg-gradient-to-br from-emerald-500/5 via-emerald-50 to-emerald-500/5 border border-emerald-500/10 p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl flex items-start gap-3 md:gap-4 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                                        <Icon icon="solar:shield-check-bold-duotone" width="20" className="md:w-[24px]" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs md:text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tight mb-1">ATS Optimized</h4>
                                        <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">All templates are ATS-friendly and tested with real systems.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions Bar */}
                            <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                                            <Icon icon="solar:zap-bold" width="16" className="text-white" />
                                        </div>
                                        <div>
                                            <h5 className="text-[10px] font-black text-slate-800 dark:text-white">Quick Actions</h5>
                                            <p className="text-[8px] text-slate-500">Common resume tasks</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[8px] font-black text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all">
                                            Import LinkedIn
                                        </button>
                                        <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[8px] font-black text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all">
                                            Check Grammar
                                        </button>
                                        <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[8px] font-black text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all">
                                            Share Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRINT NODE - ZERO MARGIN OPTIMIZED */}
            <div
                className="print-only resume-export-shell"
                data-export-density={exportDensity}
                ref={contentRef}
                style={{ fontFamily: `${data.customization?.fontFamily || 'Inter'}, sans-serif` }}
            >
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
                    --base-font-size: ${data.customization?.fontSize || 14}px;
                    --section-spacing: ${data.customization?.sectionSpacing || 28}px;
                    --summary-spacing: ${data.customization?.summarySpacing || data.customization?.sectionSpacing || 28}px;
                    --experience-spacing: ${data.customization?.experienceSpacing || data.customization?.sectionSpacing || 28}px;
                    --projects-spacing: ${data.customization?.projectsSpacing || data.customization?.sectionSpacing || 28}px;
                    --education-spacing: ${data.customization?.educationSpacing || data.customization?.sectionSpacing || 28}px;
                    --skills-spacing: ${data.customization?.skillsSpacing || data.customization?.sectionSpacing || 28}px;
                    --languages-spacing: ${data.customization?.languagesSpacing || data.customization?.sectionSpacing || 28}px;
                    --personal-info-spacing: ${data.customization?.personalInfoSpacing || 20}px;
                    --header-spacing: ${data.customization?.headerSpacing || 30}px;
                    --page-break-spacing: ${data.customization?.pageBreakSpacing || 40}px;
                    --second-page-top-spacing: ${data.customization?.secondPageTopSpacing || 60}px;
                    --second-page-bottom-spacing: ${data.customization?.secondPageBottomSpacing || 40}px;
                    --third-page-top-spacing: ${data.customization?.thirdPageTopSpacing || 60}px;
                    --third-page-bottom-spacing: ${data.customization?.thirdPageBottomSpacing || 40}px;
                    --additional-page-top-spacing: ${data.customization?.additionalPageTopSpacing || 50}px;
                    --additional-page-bottom-spacing: ${data.customization?.additionalPageBottomSpacing || 30}px;
                    --footer-spacing: ${data.customization?.footerSpacing || 20}px;
                    --line-height: ${data.customization?.lineHeight || 1.5} !important;
                    --letter-spacing: ${data.customization?.letterSpacing || 0}px !important;
                    font-family: ${data.customization?.fontFamily || 'Inter'}, sans-serif !important;
                }
                #resume-content section { line-height: var(--line-height); letter-spacing: var(--letter-spacing); }
                #resume-content h1, #resume-content h2, #resume-content h3 { letter-spacing: var(--letter-spacing); }
                
                #resume-content section[data-sec="summary"] { display: ${data.customization?.visibleSections?.includes('summary') ? 'block' : 'none'}; }
                #resume-content section[data-sec="experience"] { display: ${data.customization?.visibleSections?.includes('experience') ? 'block' : 'none'}; }
                #resume-content section[data-sec="projects"] { display: ${data.customization?.visibleSections?.includes('projects') ? 'block' : 'none'}; }
                #resume-content section[data-sec="education"] { display: ${data.customization?.visibleSections?.includes('education') ? 'block' : 'none'}; }
                #resume-content section[data-sec="skills"] { display: ${data.customization?.visibleSections?.includes('skills') ? 'block' : 'none'}; }
                #resume-content section[data-sec="languages"] { display: ${data.customization?.visibleSections?.includes('languages') ? 'block' : 'none'}; }
                
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

                .resume-export-shell {
                    background: white;
                }

                .resume-export-shell[data-export-density="dense"] #resume-content {
                    --base-font-size: calc(${data.customization?.fontSize || 14}px - 1px) !important;
                    --section-spacing: calc((${data.customization?.sectionSpacing || 28}px) * 0.88) !important;
                    --summary-spacing: calc((${data.customization?.summarySpacing || data.customization?.sectionSpacing || 28}px) * 0.86) !important;
                    --experience-spacing: calc((${data.customization?.experienceSpacing || data.customization?.sectionSpacing || 28}px) * 0.88) !important;
                    --projects-spacing: calc((${data.customization?.projectsSpacing || data.customization?.sectionSpacing || 28}px) * 0.88) !important;
                    --education-spacing: calc((${data.customization?.educationSpacing || data.customization?.sectionSpacing || 28}px) * 0.88) !important;
                    --skills-spacing: calc((${data.customization?.skillsSpacing || data.customization?.sectionSpacing || 28}px) * 0.84) !important;
                    --languages-spacing: calc((${data.customization?.languagesSpacing || data.customization?.sectionSpacing || 28}px) * 0.84) !important;
                    --header-spacing: calc((${data.customization?.headerSpacing || 30}px) * 0.85) !important;
                    --footer-spacing: calc((${data.customization?.footerSpacing || 20}px) * 0.85) !important;
                    --line-height: ${Math.max((data.customization?.lineHeight || 1.5) - 0.08, 1.3)} !important;
                }

                .resume-export-shell[data-export-density="compact"] #resume-content {
                    --base-font-size: calc(${data.customization?.fontSize || 14}px - 2px) !important;
                    --section-spacing: calc((${data.customization?.sectionSpacing || 28}px) * 0.75) !important;
                    --summary-spacing: calc((${data.customization?.summarySpacing || data.customization?.sectionSpacing || 28}px) * 0.72) !important;
                    --experience-spacing: calc((${data.customization?.experienceSpacing || data.customization?.sectionSpacing || 28}px) * 0.74) !important;
                    --projects-spacing: calc((${data.customization?.projectsSpacing || data.customization?.sectionSpacing || 28}px) * 0.74) !important;
                    --education-spacing: calc((${data.customization?.educationSpacing || data.customization?.sectionSpacing || 28}px) * 0.74) !important;
                    --skills-spacing: calc((${data.customization?.skillsSpacing || data.customization?.sectionSpacing || 28}px) * 0.7) !important;
                    --languages-spacing: calc((${data.customization?.languagesSpacing || data.customization?.sectionSpacing || 28}px) * 0.7) !important;
                    --header-spacing: calc((${data.customization?.headerSpacing || 30}px) * 0.72) !important;
                    --footer-spacing: calc((${data.customization?.footerSpacing || 20}px) * 0.72) !important;
                    --line-height: ${Math.max((data.customization?.lineHeight || 1.5) - 0.16, 1.22)} !important;
                    --letter-spacing: ${Math.max((data.customization?.letterSpacing || 0) - 0.1, -0.2)}px !important;
                }

                @media print {
                    @page {
                        size: A4;
                        margin: 8mm 7mm 8mm 7mm;
                    }
                    html,
                    body {
                        margin: 0;
                        padding: 0;
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .print-only {
                        display: block !important;
                        width: 100% !important;
                        height: auto;
                        min-height: auto;
                        background: white !important;
                    }
                    .resume-export-shell,
                    .resume-export-shell * {
                        box-sizing: border-box !important;
                    }
                    .resume-export-shell #resume-content {
                        width: 100% !important;
                        max-width: none !important;
                        min-height: auto !important;
                        height: auto !important;
                        margin: 0 auto !important;
                        box-shadow: none !important;
                        overflow: visible !important;
                        page-break-after: auto;
                    }
                    .resume-export-shell #resume-content > *:last-child {
                        margin-bottom: 0 !important;
                    }
                    .resume-export-shell a {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                    .resume-export-shell img,
                    .resume-export-shell svg {
                        max-width: 100% !important;
                    }
                    /* Smoother auto page breaking for long resumes */
                    #resume-content section, 
                    #resume-content .experience-item,
                    #resume-content .education-item,
                    #resume-content .project-item,
                    #resume-content header,
                    #resume-content article,
                    #resume-content li,
                    #resume-content h1,
                    #resume-content h2,
                    #resume-content h3,
                    #resume-content p,
                    #resume-content ul,
                    #resume-content ol,
                    #resume-content aside,
                    #resume-content main {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                    #resume-content h1,
                    #resume-content h2,
                    #resume-content h3 {
                        break-after: avoid;
                        page-break-after: avoid;
                    }
                    #resume-content p,
                    #resume-content li {
                        orphans: 3;
                        widows: 3;
                    }
                }
            `}</style>

            <style jsx global>{`
                .resume-input {
                    width: 100%;
                    padding: 1rem 1.75rem;
                    border-radius: 1.5rem;
                    border: 2px solid #e2e8f0;
                    background-color: #ffffff;
                    color: #0f172a;
                    font-size: 0.9375rem;
                    font-weight: 600;
                    outline: none;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
                }
                .dark .resume-input {
                    background-color: #0f172a;
                    border-color: #1e293b;
                    color: #f8fafc;
                }
                .resume-input:focus {
                    background-color: white;
                    border-color: #3b82f6;
                    box-shadow: 0 15px 30px -10px rgba(59, 130, 246, 0.2);
                    transform: translateY(-2px);
                }
                .dark .resume-input:focus {
                    background-color: #1e293b;
                    border-color: #3b82f6;
                    box-shadow: 0 15px 30px -10px rgba(59, 130, 246, 0.4);
                }
                .resume-input::placeholder {
                    color: #94a3b8;
                }
                .resume-input-small {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 2px solid #e2e8f0;
                    padding: 0.75rem 0;
                    outline: none;
                    transition: all 0.3s;
                    color: #0f172a;
                    font-weight: 700;
                }
                .dark .resume-input-small {
                    border-bottom-color: #1e293b;
                    color: #f8fafc;
                }
                .resume-input-small:focus {
                    border-bottom-color: #3b82f6;
                    padding-left: 0.75rem;
                }
                .resume-preview-wrapper {
                    width: 794px;
                    min-height: 1123px;
                    height: auto;
                    flex-shrink: 0;
                    background: white;
                    border-radius: 4px;
                }
                .custom-scrollbar-premium::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar-premium::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar-premium::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 20px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                }
                .dark .custom-scrollbar-premium::-webkit-scrollbar-thumb {
                    background: #475569;
                    background-clip: content-box;
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

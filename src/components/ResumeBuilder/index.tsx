'use client'
import React, { useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import { ResumeData, TemplateId } from '@/types/resume'
import { ModernTemplate, ElegantTemplate, MinimalTemplate, ProfessionalTemplate, CreativeTemplate, ExecutiveTemplate } from './Templates'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'react-hot-toast'

const initialData: ResumeData = {
    personalInfo: {
        fullName: 'Lorem Ipsum',
        email: 'lorem@example.com',
        phone: '+00 123456789',
        address: 'Lorem City, Ipsum Country',
        website: 'www.loremipsum.com',
        jobTitle: 'Software Developer',
        summary:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },

    education: [
        {
            school: 'Lorem University',
            degree: 'Bachelor of Computer Science',
            startDate: '2018',
            endDate: '2022',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.',
        },
    ],

    experience: [
        {
            company: 'Lorem Technologies',
            position: 'Frontend Developer',
            startDate: '2022',
            endDate: 'Present',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
        },
    ],

    skills: [
        'Lorem',
        'Ipsum',
        'Dolor',
        'Sit',
        'Amet',
        'Consectetur',
        'Adipiscing',
        'Elit'
    ],

    projects: [
        {
            name: 'Lorem Project',
            link: 'github.com/lorem/project',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
        },
    ],

    languages: ['English', 'Lorem'],
};
const ResumeBuilder = () => {
    const [data, setData] = useState<ResumeData>(initialData)
    const [activeTemplate, setActiveTemplate] = useState<TemplateId>('modern')
    const [activeTab, setActiveTab] = useState('personal')
    const [skillInput, setSkillInput] = useState('')
    const [langInput, setLangInput] = useState('')
    const resumeRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({ contentRef });

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
            default: return <ModernTemplate data={data} />
        }
    }

    return (
        <section className="min-h-screen bg-[#f1f5f9] dark:bg-darkmode py-6 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* TOOLBAR MENU BAR */}
                <div className="bg-white dark:bg-darklight rounded-2xl shadow-lg border border-border dark:border-dark_border p-3 mb-8 flex flex-wrap items-center justify-between gap-4 sticky top-24 z-30">
                    <div className="flex items-center gap-3 border-r border-border dark:border-dark_border pr-4 mr-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Icon icon="solar:document-bold-duotone" width="24" />
                        </div>
                        <div className="hidden sm:block">
                            <h2 className="text-sm font-black text-midnight_text dark:text-white leading-none">Resume Builder</h2>
                            <p className="text-[10px] text-grey dark:text-white/40 font-bold uppercase tracking-widest mt-1">Live Editor v2.0</p>
                        </div>
                    </div>

                    {/* Left Actions */}
                    <div className="flex items-center gap-2">
                        <button onClick={resetData} className="toolbar-btn text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                            <Icon icon="solar:restart-bold" />
                            <span className="hidden md:inline">Reset</span>
                        </button>
                        <div className="h-6 w-[1px] bg-border dark:border-dark_border mx-2"></div>
                        <div className="flex flex-wrap gap-1 bg-[#f8f9fa] dark:bg-black/20 p-1 rounded-xl">
                            {(['modern', 'elegant', 'minimal', 'professional', 'creative', 'executive'] as TemplateId[]).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setActiveTemplate(t)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all ${activeTemplate === t ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-grey hover:bg-grey/5'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handlePrint()}
                            className="bg-primary hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 transform active:scale-95 transition-all disabled:opacity-50 text-sm"
                        >
                            <Icon icon="solar:download-minimalistic-bold" width="18" />
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-10">
                    {/* Left Panel: Form */}
                    <div className="col-span-12 lg:col-span-5 space-y-6">
                        <div className="bg-white dark:bg-darklight rounded-3xl shadow-xl border border-border dark:border-dark_border overflow-hidden">
                            {/* Form Tabs */}
                            <div className="flex overflow-x-auto border-b border-border dark:border-dark_border scrollbar-hide">
                                {['personal', 'experience', 'education', 'skills', 'languages', 'projects'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-4 text-xs font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${activeTab === tab ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-grey hover:text-midnight_text'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="p-8 max-h-[700px] overflow-y-auto custom-scrollbar">
                                {/* Personal Info */}
                                {activeTab === 'personal' && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="text-xs font-bold text-grey uppercase mb-2 block">Full Name</label>
                                                <input name="fullName" value={data.personalInfo.fullName} onChange={handlePersonalInfoChange} className="resume-input" placeholder="e.g. Hari Mishra" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-xs font-bold text-grey uppercase mb-2 block">Job Title</label>
                                                <input name="jobTitle" value={data.personalInfo.jobTitle} onChange={handlePersonalInfoChange} className="resume-input" placeholder="e.g. Full Stack Developer" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-grey uppercase mb-2 block">Email</label>
                                                <input name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} className="resume-input" placeholder="email@example.com" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-grey uppercase mb-2 block">Phone</label>
                                                <input name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} className="resume-input" placeholder="+91 ..." />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-xs font-bold text-grey uppercase mb-2 block">Address</label>
                                                <input name="address" value={data.personalInfo.address} onChange={handlePersonalInfoChange} className="resume-input" placeholder="City, Country" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-xs font-bold text-grey uppercase mb-2 block">Website</label>
                                                <input name="website" value={data.personalInfo.website} onChange={handlePersonalInfoChange} className="resume-input" placeholder="portfolio.com" />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-xs font-bold text-grey uppercase mb-2 block">Professional Summary</label>
                                                <textarea name="summary" value={data.personalInfo.summary} onChange={handlePersonalInfoChange} rows={4} className="resume-input" placeholder="Briefly describe your career..." />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Experience */}
                                {activeTab === 'experience' && (
                                    <div className="space-y-8 animate-fadeIn">
                                        {data.experience.map((exp, i) => (
                                            <div key={i} className="p-6 bg-[#f8f9fa] dark:bg-black/20 rounded-2xl relative group">
                                                <button onClick={() => removeItem('experience', i)} className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"><Icon icon="solar:trash-bin-trash-bold" /></button>
                                                <div className="space-y-4">
                                                    <input value={exp.company} onChange={e => updateItem('experience', i, 'company', e.target.value)} className="resume-input-small" placeholder="Company Name" />
                                                    <input value={exp.position} onChange={e => updateItem('experience', i, 'position', e.target.value)} className="resume-input-small font-bold" placeholder="Position" />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <input value={exp.startDate} onChange={e => updateItem('experience', i, 'startDate', e.target.value)} className="resume-input-small" placeholder="Start Date" />
                                                        <input value={exp.endDate} onChange={e => updateItem('experience', i, 'endDate', e.target.value)} className="resume-input-small" placeholder="End Date" />
                                                    </div>
                                                    <textarea value={exp.description} onChange={e => updateItem('experience', i, 'description', e.target.value)} rows={3} className="resume-input-small" placeholder="Description of your roles..." />
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('experience')} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                                            <Icon icon="solar:add-circle-bold" /> Add Experience
                                        </button>
                                    </div>
                                )}

                                {/* Education */}
                                {activeTab === 'education' && (
                                    <div className="space-y-8 animate-fadeIn">
                                        {data.education.map((edu, i) => (
                                            <div key={i} className="p-6 bg-[#f8f9fa] dark:bg-black/20 rounded-2xl relative group">
                                                <button onClick={() => removeItem('education', i)} className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"><Icon icon="solar:trash-bin-trash-bold" /></button>
                                                <div className="space-y-4">
                                                    <input value={edu.school} onChange={e => updateItem('education', i, 'school', e.target.value)} className="resume-input-small" placeholder="School/University" />
                                                    <input value={edu.degree} onChange={e => updateItem('education', i, 'degree', e.target.value)} className="resume-input-small font-bold" placeholder="Degree/Diploma" />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <input value={edu.startDate} onChange={e => updateItem('education', i, 'startDate', e.target.value)} className="resume-input-small" placeholder="Start Date" />
                                                        <input value={edu.endDate} onChange={e => updateItem('education', i, 'endDate', e.target.value)} className="resume-input-small" placeholder="End Date" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => addItem('education')} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                                            <Icon icon="solar:add-circle-bold" /> Add Education
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

                    {/* Right Panel: Preview */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="sticky top-24">
                            <div className="bg-white dark:bg-darklight rounded-3xl shadow-2xl border border-border dark:border-dark_border p-2 overflow-hidden">
                                <div className="max-h-[85vh] overflow-y-auto overflow-x-auto p-4 bg-[#e2e8f0] dark:bg-darkmode custom-scrollbar rounded-2xl">
                                    <div className="flex justify-center min-w-max sm:min-w-0">
                                        <div className="resume-preview-wrapper scale-[0.4] sm:scale-[0.5] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9] origin-top transition-all duration-500 shadow-2xl">
                                            <div ref={resumeRef} className="bg-white">
                                                {renderTemplate()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Overlay */}
                            <div className="mt-6 flex items-center gap-4 bg-primary/10 p-4 rounded-2xl border border-primary/20">
                                <Icon icon="solar:info-square-bold" className="text-primary text-2xl shrink-0" />
                                <div className="text-sm font-medium text-midnight_text dark:text-white/80">
                                    <p><span className="font-bold text-primary">Live View:</span> Changes reflect instantly.</p>
                                    <p className="text-[11px] opacity-60">PDF quality is optimized for A4 printing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HIDDEN PRINTER NODE - Optimized for react-to-print */}
            <div className="print-only" ref={contentRef}>
                {renderTemplate()}
            </div>

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
                        height: 297mm;
                        background: white !important;
                    }
                }
            `}</style>

            <style jsx global>{`
                .resume-input {
                    width: 100%;
                    padding: 0.875rem 1.25rem;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    background-color: transparent;
                    color: inherit;
                    outline: none;
                    transition: all 0.2s;
                }
                .toolbar-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.75rem;
                    font-size: 0.75rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    transition: all 0.2s;
                }
                .resume-preview-wrapper {
                    width: 794px;
                    height: 1123px;
                    flex-shrink: 0;
                }
                .dark .resume-input {
                    border-color: #334155;
                }
                .resume-input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                }
                .resume-input-small {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 2px solid rgba(0,0,0,0.05);
                    padding: 0.5rem 0;
                    outline: none;
                    transition: all 0.2s;
                    color: inherit;
                }
                .dark .resume-input-small {
                    border-bottom-color: rgba(255,255,255,0.05);
                }
                .resume-input-small:focus {
                    border-bottom-color: var(--primary);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.1);
                    border-radius: 10px;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </section>
    )
}

export default ResumeBuilder

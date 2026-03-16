'use client'
import React from 'react'
import { ResumeData } from '@/types/resume'

interface TemplateProps {
    data: ResumeData
}

// 1. MODERN TEMPLATE
export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-black p-8 sm:p-10 h-auto w-[794px] mx-auto shadow-2xl origin-top transition-all duration-300">
            {/* Header */}
            <header className="border-b-4 border-primary pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-black">{data.personalInfo.fullName || 'Full Name'}</h1>
                    <p className="text-xl text-primary font-bold mt-1">{data.personalInfo.jobTitle || 'Your Job Title'}</p>
                </div>
                <div className="text-right text-sm font-medium text-grey">
                    <p>{data.personalInfo.email}</p>
                    <p>{data.personalInfo.phone}</p>
                    <p>{data.personalInfo.address}</p>
                    {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
                </div>
            </header>

            {/* Summary */}
            {data.personalInfo.summary && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-2 border-b border-grey/20 pb-1">Professional Summary</h2>
                    <p className="text-black text-[15px] leading-relaxed italic">{data.personalInfo.summary}</p>
                </section>
            )}

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                    {/* Experience */}
                    <section className="mb-6">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-3 border-b border-grey/20 pb-1">Experience</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-black text-lg">{exp.position}</h3>
                                        <span className="text-sm font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="font-bold text-black/70 mb-1">{exp.company}</p>
                                    <p className="text-[14px] text-black/80 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-3 border-b border-grey/20 pb-1">Projects</h2>
                            <div className="space-y-3">
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-black">{proj.name} {proj.link && <span className="font-normal text-xs text-primary underline ml-2">({proj.link})</span>}</h3>
                                        <p className="text-[14px] text-black/80">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4">
                    {/* Skills */}
                    <section className="mb-6">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-2 border-b border-grey/20 pb-1">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-black text-white text-[11px] font-bold rounded uppercase tracking-wider">{skill}</span>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section className="mb-6">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-2 border-b border-grey/20 pb-1">Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-black text-sm">{edu.degree}</h3>
                                    <p className="text-[12px] text-black/70">{edu.school}</p>
                                    <p className="text-[11px] font-bold text-primary italic">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Languages */}
                    {data.languages.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-4 border-b border-grey/20 pb-1">Languages</h2>
                            <div className="space-y-1">
                                {data.languages.map((lang, i) => (
                                    <p key={i} className="text-[14px] font-medium text-black">{lang}</p>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}

// 2. ELEGANT TEMPLATE (Sidebar)
export const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#f4f4f4] p-0 h-auto min-h-[1123px] w-[794px] mx-auto shadow-2xl flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-1/3 bg-[#2c3e50] text-white p-8">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold leading-tight uppercase tracking-widest border-b border-white/20 pb-4">{data.personalInfo.fullName}</h1>
                    <p className="mt-4 text-[#bdc3c7] font-medium tracking-widest">{data.personalInfo.jobTitle}</p>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-[#bdc3c7] mb-4">Contact</h2>
                        <div className="space-y-2 text-[13px] text-white/80">
                            <p className="flex items-center gap-2">{data.personalInfo.email}</p>
                            <p className="flex items-center gap-2">{data.personalInfo.phone}</p>
                            <p className="flex items-center gap-2">{data.personalInfo.address}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-[#bdc3c7] mb-4">Top Skills</h2>
                        <div className="space-y-2">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-[13px]">{skill}</span>
                                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-[#bdc3c7] mb-4">Education</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-[13px]">{edu.degree}</h3>
                                    <p className="text-[12px] opacity-70">{edu.school}</p>
                                    <p className="text-[11px] opacity-50 italic">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-2/3 bg-white p-8">
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest mb-2 flex items-center gap-3">
                        About Me
                        <div className="h-[2px] bg-[#2c3e50] flex-grow"></div>
                    </h2>
                    <p className="text-[13px] leading-relaxed text-[#34495e]">{data.personalInfo.summary}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest mb-4 flex items-center gap-3">
                        Professional Experience
                        <div className="h-[2px] bg-[#2c3e50] flex-grow"></div>
                    </h2>
                    <div className="space-y-5 relative before:absolute before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-[#2c3e50]/10 pl-6">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="relative before:absolute before:-left-[30px] before:top-2 before:w-2 before:h-2 before:bg-[#2c3e50] before:rounded-full">
                                <h3 className="font-black text-[#2c3e50] text-sm">{exp.position}</h3>
                                <div className="flex justify-between text-[12px] font-bold text-primary my-0.5">
                                    <span>{exp.company}</span>
                                    <span className="bg-[#2c3e50]/5 px-2 py-0.5 rounded text-[#2c3e50]">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="text-[13px] leading-relaxed text-[#34495e] whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest mb-4 flex items-center gap-3">
                        Projects
                        <div className="h-[2px] bg-[#2c3e50] flex-grow"></div>
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {data.projects.map((proj, i) => (
                            <div key={i} className="p-3 bg-[#f8f9fa] rounded-lg border border-slate-100">
                                <h3 className="font-bold text-[#2c3e50] text-[13px]">{proj.name}</h3>
                                <p className="text-[11px] opacity-70 mt-1 line-clamp-2">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

// 3. MINIMALIST TEMPLATE
export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-gray-800 p-12 sm:p-16 h-auto w-[794px] mx-auto shadow-2xl font-serif">
            <div className="text-center mb-16 px-16">
                <h1 className="text-5xl border-b border-black pb-4 mb-4 text-black lowercase tracking-tighter">{data.personalInfo.fullName}</h1>
                <div className="flex justify-center gap-4 text-xs font-serif italic text-gray-500">
                    <span>{data.personalInfo.email}</span>
                    <span>/</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>/</span>
                    <span>{data.personalInfo.address}</span>
                </div>
            </div>

            <section className="mb-12">
                <p className="text-center text-[15px] italic leading-relaxed text-gray-600 px-10">{data.personalInfo.summary}</p>
            </section>

            <div className="space-y-8">
                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-black border-l-4 border-black pl-3 mb-4">Experience</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-base font-bold text-black">{exp.company}</h3>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 lowercase">{exp.position}</p>
                                <p className="text-[13px] leading-relaxed text-gray-700 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-black border-l-4 border-black pl-3 mb-4">Education</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <h3 className="text-sm font-bold text-black">{edu.school}</h3>
                                <p className="text-xs italic text-gray-600 mb-0.5">{edu.degree}</p>
                                <p className="text-[10px] font-black uppercase text-gray-400">{edu.startDate} – {edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black border-l-4 border-black pl-3 mb-6">Expertise</h2>
                        <div className="text-[13px] leading-loose text-gray-700">
                            {data.skills.join(' • ')}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black border-l-4 border-black pl-3 mb-6">Languages</h2>
                        <div className="text-[13px] leading-loose text-gray-700">
                            {data.languages.join(', ')}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 4. PROFESSIONAL TEMPLATE (Traditional/Corporate)
export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-gray-900 p-8 sm:p-12 h-auto w-[794px] mx-auto shadow-2xl font-serif border-[12px] border-gray-100">
            <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{data.personalInfo.fullName}</h1>
                <div className="flex justify-center gap-4 text-sm font-medium">
                    <span>{data.personalInfo.email}</span>
                    <span>•</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>•</span>
                    <span>{data.personalInfo.address}</span>
                </div>
                {data.personalInfo.website && <p className="text-sm mt-1 underline italic">{data.personalInfo.website}</p>}
            </div>

            <section className="mb-8">
                <h2 className="text-base font-bold uppercase border-b border-gray-300 pb-1 mb-3">Professional Profile</h2>
                <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-base font-bold uppercase border-b border-gray-300 pb-1 mb-4">Professional Experience</h2>
                <div className="space-y-6">
                    {data.experience.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between font-bold text-sm">
                                <span>{exp.company}</span>
                                <span>{exp.startDate} – {exp.endDate}</span>
                            </div>
                            <div className="italic text-sm mb-2">{exp.position}</div>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                {exp.description.split('\n').map((line, idx) => (
                                    <li key={idx}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-base font-bold uppercase border-b border-gray-300 pb-1 mb-4">Academic Background</h2>
                <div className="space-y-4">
                    {data.education.map((edu, i) => (
                        <div key={i} className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-sm">{edu.school}</h3>
                                <p className="text-sm italic">{edu.degree}</p>
                            </div>
                            <span className="text-sm font-medium">{edu.startDate} – {edu.endDate}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-2 gap-10">
                <section>
                    <h2 className="text-base font-bold uppercase border-b border-gray-300 pb-1 mb-3">Key Competencies</h2>
                    <ul className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm list-disc pl-5">
                        {data.skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="text-base font-bold uppercase border-b border-gray-300 pb-1 mb-3">Languages</h2>
                    <p className="text-sm">{data.languages.join(', ')}</p>
                </section>
            </div>
        </div>
    )
}

// 5. CREATIVE TEMPLATE (Bold & Modern)
export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
    const firstName = data.personalInfo.fullName.split(' ')[0] || ''
    const lastName = data.personalInfo.fullName.split(' ')[1] || ''

    return (
        <div id="resume-content" className="bg-[#1a1a1a] text-white p-0 h-auto min-h-[1123px] w-[794px] mx-auto shadow-2xl flex flex-col font-sans">
            {/* Diagonal Header */}
            <div className="bg-primary p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10">
                    <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-2">{firstName}<br />{lastName}</h1>
                    <p className="text-xl font-bold bg-black text-white px-4 py-1 inline-block uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
                </div>
            </div>

            <div className="flex grow">
                {/* Left Column */}
                <div className="w-[35%] bg-[#222] p-10 space-y-12 border-r border-white/5">
                    <section>
                        <h2 className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-6">Contact</h2>
                        <div className="space-y-4 text-[11px] opacity-80 uppercase font-black">
                            <p className="border-b border-white/10 pb-2 truncate">{data.personalInfo.email}</p>
                            <p className="border-b border-white/10 pb-2">{data.personalInfo.phone}</p>
                            <p className="border-b border-white/10 pb-2 leading-relaxed">{data.personalInfo.address}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-6">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase font-bold tracking-wider">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-6">Languages</h2>
                        <div className="space-y-2">
                            {data.languages.map((lang, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{lang}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="w-[65%] bg-[#1a1a1a] p-12 space-y-12">
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-black uppercase italic tracking-widest text-primary">Experience</h2>
                            <div className="h-[1px] bg-white/10 grow"></div>
                        </div>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-primary">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-base font-bold text-white italic uppercase tracking-tighter">{exp.position}</h3>
                                        <span className="text-[9px] font-black opacity-40 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-[10px] text-primary uppercase font-black tracking-widest mb-2">{exp.company}</p>
                                    <p className="text-[13px] opacity-70 leading-relaxed font-light">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-black uppercase italic tracking-widest text-primary">Education</h2>
                            <div className="h-[1px] bg-white/10 grow"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-sm text-white uppercase">{edu.degree}</h3>
                                    <p className="text-[11px] text-primary font-black uppercase tracking-widest mt-1">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
// 6. EXECUTIVE TEMPLATE (Senior/Corporate)
export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-slate-800 p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl flex flex-col font-sans border border-slate-200">
            {/* Top Header Bar */}
            <div className="h-4 bg-slate-900 w-full"></div>

            <div className="p-12 pb-6 border-b border-slate-100 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{data.personalInfo.fullName}</h1>
                    <p className="text-xl font-medium text-slate-600 mt-1 uppercase tracking-[0.2em]">{data.personalInfo.jobTitle}</p>
                </div>
                <div className="text-right space-y-1">
                    <div className="flex items-center justify-end gap-2 text-sm text-slate-500 font-medium">
                        <span>{data.personalInfo.email}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-sm text-slate-500 font-medium">
                        <span>{data.personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-sm text-slate-500 font-medium">
                        <span>{data.personalInfo.address}</span>
                    </div>
                </div>
            </div>

            <div className="flex grow">
                {/* Main Side */}
                <div className="w-[70%] p-12 pr-10 border-r border-slate-50">
                    {data.personalInfo.summary && (
                        <section className="mb-10">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Profile</h2>
                            <p className="text-[14px] leading-relaxed text-slate-700">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    <section className="mb-10">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6 border-b border-slate-100 pb-2">Professional Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-extrabold text-slate-900 text-base">{exp.position}</h3>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-tighter">{exp.company}</p>
                                    <div className="text-[13.5px] text-slate-700 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-slate-100 italic">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6 border-b border-slate-100 pb-2">Select Projects</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {data.projects.map((proj, i) => (
                                    <div key={i} className="p-4 bg-slate-50 rounded border border-slate-100">
                                        <h3 className="font-bold text-slate-800 text-sm flex items-center justify-between">
                                            {proj.name}
                                            {proj.link && <span className="text-[10px] text-slate-400 font-normal">github.com/...</span>}
                                        </h3>
                                        <p className="text-[12.5px] text-slate-600 mt-2 leading-relaxed">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column Side */}
                <div className="w-[30%] bg-slate-50/50 p-10 py-12 space-y-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Expertise</h2>
                        <div className="space-y-3">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-[11px] font-bold text-slate-700 uppercase">{skill}</span>
                                    </div>
                                    <div className="h-1 bg-slate-200 w-full rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-900 w-[90%]"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Education</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-tight leading-tight">{edu.degree}</h3>
                                    <p className="text-[11px] text-slate-600 mt-1">{edu.school}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.languages.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Communication</h2>
                            <div className="space-y-2">
                                {data.languages.map((lang, i) => (
                                    <div key={i} className="text-[12px] font-bold text-slate-700 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                                        {lang}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}

// 7. TECH TEMPLATE (Developer Focused)
export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#0f172a] text-slate-300 p-12 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-mono">
            <header className="border-l-8 border-sky-500 pl-8 mb-12">
                <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-4">
                    <span className="text-sky-500">const</span> {data.personalInfo.fullName.replace(/\s+/g, '_')}
                </h1>
                <p className="text-xl text-sky-400 font-bold mb-4">{data.personalInfo.jobTitle}</p>
                <div className="flex flex-wrap gap-4 text-xs opacity-60">
                    <span>{data.personalInfo.email}</span>
                    <span>|</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>|</span>
                    <span>{data.personalInfo.address}</span>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                    <section className="mb-10 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h2 className="text-sky-500 font-bold mb-4 flex items-center gap-2">
                            <span className="text-slate-500">&gt;</span> ./professional_summary
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-300 italic">"{data.personalInfo.summary}"</p>
                    </section>
                </div>

                <div className="col-span-8">
                    <section className="mb-12">
                        <h2 className="text-sky-500 font-bold mb-6 border-b border-slate-700 pb-2">Experience[]</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between font-bold text-white mb-1">
                                        <h3>{exp.position} @ {exp.company}</h3>
                                        <span className="text-sky-500 text-xs">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-2 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sky-500 font-bold mb-6 border-b border-slate-700 pb-2">Projects.map()</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                                    <h3 className="text-white text-sm font-bold mb-1">{proj.name}</h3>
                                    <p className="text-[10px] text-slate-400 line-clamp-2">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-4">
                    <section className="mb-10">
                        <h2 className="text-sky-500 font-bold mb-4 border-b border-slate-700 pb-2">Skills.json</h2>
                        <div className="flex flex-wrap gap-2 text-[10px]">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded">"{skill}"</span>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-sky-500 font-bold mb-4 border-b border-slate-700 pb-2">Education.list()</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="text-white text-xs font-bold">{edu.degree}</h3>
                                    <p className="text-[10px] text-slate-400">{edu.school}</p>
                                    <p className="text-[9px] text-sky-500 italic mt-1">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 8. ACADEMIC TEMPLATE (Harvard/Traditional CV)
export const AcademicTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-gray-900 p-20 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-serif leading-relaxed">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold uppercase tracking-[0.15em] mb-4 border-b-2 border-gray-900 pb-4 inline-block px-12">{data.personalInfo.fullName}</h1>
                <div className="text-sm font-medium space-x-3 text-gray-600">
                    <span>{data.personalInfo.address}</span>
                    <span>•</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>•</span>
                    <span>{data.personalInfo.email}</span>
                </div>
            </div>

            <section className="mb-10">
                <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4 italic">Professional Summary</h2>
                <p className="text-[13px] text-gray-700 text-justify">{data.personalInfo.summary}</p>
            </section>

            <section className="mb-10">
                <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4 italic">Education</h2>
                <div className="space-y-6">
                    {data.education.map((edu, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline font-bold text-[14px]">
                                <h3>{edu.school.toUpperCase()}</h3>
                                <span className="font-medium text-gray-500">{edu.startDate} — {edu.endDate}</span>
                            </div>
                            <p className="text-[13px] italic text-gray-600">{edu.degree}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4 italic">Professional Experience</h2>
                <div className="space-y-8">
                    {data.experience.map((exp, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline font-bold text-[14px]">
                                <h3>{exp.company.toUpperCase()}</h3>
                                <span className="font-medium text-gray-500">{exp.startDate} — {exp.endDate}</span>
                            </div>
                            <p className="text-[13px] font-bold text-gray-700 mb-2 italic">{exp.position}</p>
                            <p className="text-[13px] text-gray-600 text-justify whitespace-pre-line leading-relaxed">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-2 gap-12">
                <section>
                    <h2 className="text-base font-bold uppercase border-b border-gray-300 pb-1 mb-4 italic">Key Expertise</h2>
                    <ul className="list-disc pl-5 text-[12px] text-gray-700 space-y-1">
                        {data.skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="text-base font-bold uppercase border-b border-gray-300 pb-1 mb-4 italic">Selected Projects</h2>
                    <div className="space-y-4">
                        {data.projects.map((proj, i) => (
                            <div key={i}>
                                <h3 className="font-bold text-[12px]">{proj.name}</h3>
                                <p className="text-[11px] text-gray-600 mt-0.5">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

// 9. SIDEBAR SPLIT TEMPLATE
export const SideSplitTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl flex font-sans border-8 border-primary/5">
            <aside className="w-[280px] bg-primary/5 p-8 border-r border-primary/10">
                <div className="mb-12">
                    <h1 className="text-3xl font-black text-primary leading-tight uppercase tracking-tighter">{data.personalInfo.fullName}</h1>
                    <p className="text-sm font-bold text-grey mt-2 uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
                </div>

                <div className="space-y-10">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-4">Contact</h2>
                        <div className="space-y-3 text-[12px] font-medium text-grey">
                            <p className="flex items-center gap-2 truncate">{data.personalInfo.email}</p>
                            <p>{data.personalInfo.phone}</p>
                            <p className="leading-relaxed">{data.personalInfo.address}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-white border border-primary/10 rounded-md text-[10px] font-bold text-primary">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-4">Education</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-black text-midnight_text text-[11px] uppercase tracking-tighter leading-snug">{edu.degree}</h3>
                                    <p className="text-[10px] text-grey mt-1">{edu.school}</p>
                                    <p className="text-[9px] font-black text-primary uppercase mt-1 italic">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>

            <main className="grow p-12 bg-white">
                <section className="mb-12">
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-4">
                        Experience
                        <div className="h-px bg-primary/10 grow"></div>
                    </h2>
                    <div className="space-y-10">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-primary/10">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary rounded-full"></div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-base font-black text-midnight_text uppercase tracking-tight">{exp.position}</h3>
                                    <span className="text-[10px] font-black text-grey uppercase bg-primary/5 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="text-xs font-bold text-primary mb-3 uppercase tracking-widest">{exp.company}</p>
                                <p className="text-[13px] leading-relaxed text-grey whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-4">
                        Key Projects
                        <div className="h-px bg-primary/10 grow"></div>
                    </h2>
                    <div className="grid grid-cols-1 gap-6">
                        {data.projects.map((proj, i) => (
                            <div key={i} className="group cursor-default">
                                <h3 className="font-black text-midnight_text text-sm uppercase tracking-tight group-hover:text-primary transition-colors">
                                    {proj.name}
                                    {proj.link && <span className="ml-2 text-[10px] font-medium text-grey italic underline">({proj.link})</span>}
                                </h3>
                                <p className="text-[12px] leading-relaxed text-grey mt-2 italic">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

// 10. GEOMETRIC TEMPLATE (Abstract/Modern)
export const GeometricTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#fdfcfb] text-[#2d3436] p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500 rounded-bl-[200px] -mr-20 -mt-20 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rose-500 rounded-tr-[150px] -ml-20 -mb-20 opacity-10"></div>

            <header className="p-16 pb-12 relative flex justify-between items-end">
                <div>
                    <h1 className="text-6xl font-black text-[#2d3436] leading-none tracking-tighter uppercase">{data.personalInfo.fullName.split(' ')[0]}<br/><span className="text-indigo-600 italic font-serif lowercase border-b-8 border-rose-400 leading-[0.8]">{data.personalInfo.fullName.split(' ')[1]}</span></h1>
                    <p className="text-lg font-bold text-grey mt-6 uppercase tracking-[0.3em]">{data.personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-[11px] font-black uppercase tracking-widest text-[#2d3436]/60 leading-relaxed border-l-4 border-rose-400 pl-6 h-fit">
                    <p>{data.personalInfo.email}</p>
                    <p>{data.personalInfo.phone}</p>
                    <p className="max-w-[150px] ml-auto">{data.personalInfo.address}</p>
                </div>
            </header>

            <div className="px-16 pb-16 relative">
                <section className="mb-16">
                    <div className="grid grid-cols-12 gap-8 items-center">
                        <div className="col-span-3">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-indigo-600 rotate-[-90deg] origin-center translate-x-12 translate-y-8">Mission</h2>
                        </div>
                        <div className="col-span-9 border-l border-[#2d3436]/10 pl-12 italic text-lg leading-relaxed font-light text-[#2d3436]/80">
                            {data.personalInfo.summary}
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-7">
                        <section className="mb-12">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-indigo-600 mb-8 border-b-2 border-indigo-100 pb-2">Experience</h2>
                            <div className="space-y-12">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-black text-[#2d3436] tracking-tighter leading-none">{exp.position}</h3>
                                            <span className="text-[10px] font-black bg-[#2d3436] text-white px-2 py-0.5 rounded italic">/{exp.startDate.slice(-2)} — /{exp.endDate.slice(-2)}</span>
                                        </div>
                                        <p className="text-sm font-bold text-rose-500 uppercase tracking-widest mb-4">{exp.company}</p>
                                        <p className="text-sm leading-relaxed text-[#2d3436]/70 font-medium whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="col-span-5 space-y-12">
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-indigo-600 mb-6 border-b-2 border-indigo-100 pb-2">Superpowers</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-white border-2 border-[#2d3436] text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_#f43f5e] group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default">{skill}</span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-indigo-600 mb-6 border-b-2 border-indigo-100 pb-2">Education</h2>
                            <div className="space-y-8">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-black text-sm uppercase leading-tight">{edu.degree}</h3>
                                        <p className="text-xs text-[#2d3436]/60 font-bold mt-1 italic">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 11. PASTEL TEMPLATE (Soft/Elegant)
export const PastelTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#fafafa] text-[#5d5a56] p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-serif">
            {/* Soft Header */}
            <div className="bg-[#e7eaf6] p-20 text-center pb-24 rounded-b-[80px] shadow-inner">
                <span className="text-[10px] uppercase tracking-[0.6em] text-blue-400 font-black mb-6 inline-block">Professional Curriculum Vitae</span>
                <h1 className="text-5xl font-extralight text-[#2d3436] tracking-tighter italic leading-none">{data.personalInfo.fullName}</h1>
                <div className="w-12 h-1 bg-rose-200 mx-auto my-8"></div>
                <p className="text-base font-medium opacity-60 uppercase tracking-[0.3em]">{data.personalInfo.jobTitle}</p>
            </div>

            <div className="max-w-4xl mx-auto px-16 -mt-12 bg-white rounded-3xl p-16 shadow-lg border border-[#eee]">
                <section className="mb-16 text-center">
                    <p className="text-lg leading-loose italic text-justify px-10 border-l-2 border-rose-100 pl-16">
                        "{data.personalInfo.summary}"
                    </p>
                </section>

                <div className="space-y-20">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.8em] text-blue-300 mb-12 text-center">Journey & Expertise</h2>
                        <div className="space-y-16">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-xl font-bold text-[#2d3436]">{exp.position}</h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">{exp.startDate} / {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm font-bold text-blue-300 opacity-60 uppercase tracking-widest mb-4 italic">{exp.company}</p>
                                    <p className="text-[14px] leading-relaxed opacity-80 text-[#5d5a56] whitespace-pre-line border-l border-[#eee] pl-8">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-2 gap-20">
                        <section>
                            <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-rose-300 mb-8 border-b border-[#f9f9f9] pb-4">Capabilities</h2>
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="text-[13px] italic border-b border-rose-100 pb-1 text-[#2d3436] font-medium">{skill}</span>
                                ))}
                            </div>
                        </section>
                        <section>
                            <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-rose-300 mb-8 border-b border-[#f9f9f9] pb-4">Education</h2>
                            <div className="space-y-8">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-[14px] leading-tight text-[#2d3436]">{edu.degree}</h3>
                                        <p className="text-[11px] opacity-60 mt-1 italic">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <section className="pt-10 border-t border-[#f5f5f5] flex justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-[#bbb]">
                        <span>{data.personalInfo.email}</span>
                        <span>•</span>
                        <span>{data.personalInfo.phone}</span>
                        <span>•</span>
                        <span>{data.personalInfo.address}</span>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 12. HIGH IMPACT TEMPLATE (Bold & Large)
export const HighImpactTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-[#1a1c1e] p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans">
            <header className="bg-[#1a1c1e] text-white p-16 pb-12">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.85]">{data.personalInfo.fullName.split(' ')[0]}<br/><span className="text-primary">{data.personalInfo.fullName.split(' ')[1]}</span></h1>
                        <p className="text-xl font-bold mt-8 flex items-center gap-4">
                            <span className="w-12 h-1 bg-primary"></span>
                            {data.personalInfo.jobTitle}
                        </p>
                    </div>
                    <div className="text-right space-y-2 text-sm opacity-60 font-medium">
                        <p>{data.personalInfo.email}</p>
                        <p>{data.personalInfo.phone}</p>
                        <p>{data.personalInfo.address}</p>
                    </div>
                </div>
            </header>

            <div className="p-16 pt-12 grid grid-cols-12 gap-16">
                <div className="col-span-12 mb-4">
                    <p className="text-2xl font-light leading-relaxed text-[#1a1c1e]/60 italic">
                        "{data.personalInfo.summary}"
                    </p>
                </div>

                <div className="col-span-8">
                    <section className="mb-12">
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">Work History</h2>
                        <div className="space-y-12">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-2xl font-black">{exp.position}</h3>
                                        <span className="text-xs font-bold opacity-30 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-lg font-bold text-primary mb-4">{exp.company}</p>
                                    <p className="text-base leading-relaxed text-[#1a1c1e]/70 font-medium whitespace-pre-line border-l-4 border-[#1a1c1e]/5 pl-8">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-4 space-y-16">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">Core Skills</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-sm font-black uppercase tracking-tight">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">Education</h2>
                        <div className="space-y-8">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="text-lg font-black leading-tight">{edu.degree}</h3>
                                    <p className="text-sm font-bold opacity-40 mt-1 italic">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 13. COMPACT TEMPLATE (Information Dense)
export const CompactTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-[#333] p-10 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans text-[11px]">
            <header className="flex justify-between items-center border-b-[3px] border-[#333] pb-4 mb-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-[#000]">{data.personalInfo.fullName}</h1>
                    <p className="text-sm font-bold text-[#000]/60 mt-1">{data.personalInfo.jobTitle}</p>
                </div>
                <div className="text-right space-y-0.5 font-bold">
                    <p>{data.personalInfo.email}</p>
                    <p>{data.personalInfo.phone}</p>
                    <p>{data.personalInfo.address}</p>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 mb-2">
                    <h2 className="font-black uppercase tracking-widest bg-[#333] text-white px-2 py-0.5 w-fit mb-3">Professional Profile</h2>
                    <p className="leading-relaxed font-medium text-justify">{data.personalInfo.summary}</p>
                </div>

                <div className="col-span-9">
                    <section className="mb-6">
                        <h2 className="font-black uppercase tracking-widest border-b-2 border-[#333] pb-0.5 mb-4">Professional Experience</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between font-black uppercase">
                                        <h3>{exp.position} | {exp.company}</h3>
                                        <span>{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="leading-snug text-[#333]/80 mt-1 whitespace-pre-line border-l border-[#333]/10 pl-4">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="font-black uppercase tracking-widest border-b-2 border-[#333] pb-0.5 mb-4">Selected Key Projects</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="p-2 border border-[#333]/10 rounded">
                                    <h3 className="font-black uppercase mb-1">{proj.name}</h3>
                                    <p className="text-[10px] text-[#333]/70">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-3 space-y-6">
                    <section>
                        <h2 className="font-black uppercase tracking-widest border-b-2 border-[#333] pb-0.5 mb-3">Core Expertise</h2>
                        <div className="flex flex-wrap gap-1">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-[#333]/5 font-black uppercase border border-[#333]/10">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="font-black uppercase tracking-widest border-b-2 border-[#333] pb-0.5 mb-3">Academic Base</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-black leading-tight uppercase">{edu.degree}</h3>
                                    <p className="text-[#333]/60 font-bold mt-0.5 italic">{edu.school}</p>
                                    <p className="opacity-40">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 14. FUNCTIONAL TEMPLATE (Skills First)
export const FunctionalTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-[#2c3e50] p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans">
            <div className="border-[15px] border-[#2c3e50] p-10 h-full">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-black uppercase tracking-[0.2em]">{data.personalInfo.fullName}</h1>
                    <p className="text-xl font-bold text-[#e67e22] mt-4 uppercase tracking-[0.4em]">{data.personalInfo.jobTitle}</p>
                    <div className="flex justify-center gap-6 mt-8 font-bold text-sm">
                        <span>{data.personalInfo.email}</span>
                        <span>|</span>
                        <span>{data.personalInfo.phone}</span>
                    </div>
                </header>

                <section className="mb-12">
                    <h2 className="text-lg font-black uppercase tracking-[0.3em] bg-[#2c3e50] text-white px-6 py-2 w-fit mx-auto mb-8">Expertise & Skills</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {data.skills.map((skill, i) => (
                            <div key={i} className="flex items-center gap-3 border-b-2 border-[#2c3e50]/10 pb-2">
                                <div className="w-2 h-2 bg-[#e67e22] rotate-45"></div>
                                <span className="font-black uppercase text-xs">{skill}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-lg font-black uppercase tracking-[0.3em] bg-[#2c3e50] text-white px-6 py-2 w-fit mx-auto mb-8">Professional Journey</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="text-center">
                                <h3 className="text-xl font-black italic">{exp.position}</h3>
                                <p className="font-bold text-[#e67e22] mt-1">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] border-b-4 border-[#e67e22] pb-1 mb-6">Education</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-black text-sm uppercase">{edu.degree}</h3>
                                    <p className="font-bold opacity-60 italic">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] border-b-4 border-[#e67e22] pb-1 mb-6">Projects</h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, i) => (
                                <div key={i}>
                                    <h3 className="font-black text-sm uppercase">{proj.name}</h3>
                                    <p className="text-xs italic opacity-70">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 15. CHRONOLOGICAL TEMPLATE (Experience First)
export const ChronoTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#fffcf9] text-[#2d3436] p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-serif">
            <div className="border-l-[20px] border-[#2d3436] pl-16">
                <header className="mb-16">
                    <h1 className="text-6xl font-black tracking-tighter text-[#2d3436]">{data.personalInfo.fullName}</h1>
                    <p className="text-2xl font-medium italic text-[#d63031] mt-2">{data.personalInfo.jobTitle}</p>
                    <div className="flex flex-col mt-6 font-bold text-sm opacity-60">
                        <span>{data.personalInfo.email}</span>
                        <span>{data.personalInfo.phone}</span>
                        <span>{data.personalInfo.address}</span>
                    </div>
                </header>

                <div className="space-y-16">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#d63031] mb-8">Career History</h2>
                        <div className="space-y-12">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="grid grid-cols-12 gap-8">
                                    <div className="col-span-3 text-right">
                                        <span className="font-black text-sm uppercase opacity-40">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="col-span-9">
                                        <h3 className="text-2xl font-black leading-none">{exp.position}</h3>
                                        <p className="text-lg font-bold italic mt-2 text-[#2d3436]/60">{exp.company}</p>
                                        <p className="text-base leading-relaxed mt-4 text-[#2d3436]/80 whitespace-pre-line border-t border-[#eee] pt-4">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#d63031] mb-8">Academic Status</h2>
                        <div className="space-y-8">
                            {data.education.map((edu, i) => (
                                <div key={i} className="grid grid-cols-12 gap-8">
                                    <div className="col-span-3 text-right text-sm font-black opacity-30">{edu.startDate} — {edu.endDate}</div>
                                    <div className="col-span-9 font-black text-xl italic uppercase tracking-tight">{edu.degree} from {edu.school}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 16. HYBRID TEMPLATE (Modern Balanced)
export const HybridTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-[#444] p-12 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans">
            <header className="flex items-center gap-10 mb-16 px-6">
                <div className="w-32 h-32 bg-primary rounded-full flex-shrink-0 flex items-center justify-center text-white text-5xl font-black">
                    {data.personalInfo.fullName[0]}
                </div>
                <div>
                    <h1 className="text-5xl font-black uppercase tracking-tight text-midnight_text">{data.personalInfo.fullName}</h1>
                    <p className="text-xl font-bold text-primary mt-2">{data.personalInfo.jobTitle}</p>
                    <div className="flex gap-4 mt-4 text-xs font-bold text-grey">
                        <span>{data.personalInfo.email}</span>
                        <span>•</span>
                        <span>{data.personalInfo.phone}</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-12 px-6">
                <div className="col-span-4 space-y-12">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-grey mb-6 border-b-2 border-primary/20 pb-2">Skills Grid</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase rounded-lg border border-primary/10">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-grey mb-6 border-b-2 border-primary/20 pb-2">Academic</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-black text-midnight_text text-sm uppercase tracking-tight">{edu.degree}</h3>
                                    <p className="text-xs font-bold text-primary mt-1 italic">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-8">
                    <section className="mb-12">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-grey mb-8 border-b-2 border-primary/20 pb-2">Experience Matrix</h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-black text-midnight_text">{exp.position}</h3>
                                        <span className="text-[10px] font-black text-primary uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm font-black text-grey uppercase tracking-widest mb-4 italic">{exp.company}</p>
                                    <p className="text-sm leading-relaxed text-grey/80 whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-grey mb-8 border-b-2 border-primary/20 pb-2">Top Projects</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                    <h3 className="font-black text-midnight_text text-sm uppercase">{proj.name}</h3>
                                    <p className="text-[11px] text-grey/60 mt-1 line-clamp-2 italic">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 17. RETRO TEMPLATE (Typewriter/Classic)
export const RetroTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#fffef0] text-[#222] p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-mono border-2 border-[#ddd]">
            <header className="text-center mb-12 border-b-2 border-[#222] pb-8">
                <h1 className="text-4xl font-bold uppercase underline decoration-double">{data.personalInfo.fullName}</h1>
                <p className="text-xl mt-4 italic">[ {data.personalInfo.jobTitle} ]</p>
                <div className="mt-6 space-y-1 text-sm bg-[#fafafa] p-4 inline-block border border-[#eee]">
                    <p>EMAIL: {data.personalInfo.email}</p>
                    <p>PHONE: {data.personalInfo.phone}</p>
                    <p>LOC: {data.personalInfo.address}</p>
                </div>
            </header>

            <div className="space-y-12">
                <section>
                    <h2 className="text-lg font-bold border-b border-[#222] mb-6"># PROFESSIONAL_SUMMARY</h2>
                    <p className="leading-relaxed text-sm whitespace-pre-line">{data.personalInfo.summary}</p>
                </section>

                <section>
                    <h2 className="text-lg font-bold border-b border-[#222] mb-6"># WORK_EXPERIENCE</h2>
                    <div className="space-y-10">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between font-bold">
                                    <span>&gt; {exp.position}</span>
                                    <span>[{exp.startDate} - {exp.endDate}]</span>
                                </div>
                                <p className="font-bold underline mt-1">{exp.company}</p>
                                <p className="mt-4 text-sm leading-relaxed border-l-2 border-[#ddd] pl-6 italic">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-lg font-bold border-b border-[#222] mb-6"># CAPABILITIES</h2>
                        <ul className="list-square pl-6 space-y-1 text-sm font-bold">
                            {data.skills.map((skill, i) => (
                                <li key={i}>* {skill}</li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-lg font-bold border-b border-[#222] mb-6"># ACADEMICS</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-bold text-sm">-- {edu.degree}</p>
                                    <p className="text-xs opacity-60 ml-6">{edu.school} / {edu.startDate}-{edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 18. GLASSY TEMPLATE (Modern Blur)
export const GlassyTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans overflow-hidden">
            <div className="p-16 h-full relative">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full -mr-40 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full -ml-40 -mb-20"></div>

                <header className="relative z-10 backdrop-blur-xl bg-white/40 border border-white/60 p-12 rounded-[40px] shadow-xl mb-12 border-b-4 border-b-primary/30">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black text-midnight_text tracking-tighter">{data.personalInfo.fullName}</h1>
                            <p className="text-xl font-bold bg-primary text-white px-4 py-1 rounded-full w-fit shadow-lg shadow-primary/20">{data.personalInfo.jobTitle}</p>
                        </div>
                        <div className="text-right text-sm font-bold text-grey">
                            <p>{data.personalInfo.email}</p>
                            <p>{data.personalInfo.phone}</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-10 relative z-10">
                    <div className="col-span-8 space-y-12">
                        <section className="backdrop-blur-md bg-white/30 border border-white/40 p-8 rounded-[30px] shadow-sm">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-4">
                                Career Narrative
                                <div className="h-px bg-primary/20 grow"></div>
                            </h2>
                            <div className="space-y-10">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full after:absolute after:left-[2px] after:top-6 after:w-[2px] after:h-[calc(100%-24px)] after:bg-primary/10">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-black text-midnight_text leading-tight">{exp.position}</h3>
                                            <span className="text-[10px] font-black bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/80">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <p className="text-xs font-bold text-primary mb-3 uppercase tracking-widest">{exp.company}</p>
                                        <p className="text-[13px] leading-relaxed text-grey whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="col-span-4 space-y-10">
                        <section className="backdrop-blur-md bg-primary/5 border border-primary/10 p-8 rounded-[30px]">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/60 border border-white/80 text-[10px] font-black uppercase rounded-xl shadow-sm">{skill}</span>
                                ))}
                            </div>
                        </section>

                        <section className="backdrop-blur-md bg-white/30 border border-white/40 p-8 rounded-[30px]">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Academic</h2>
                            <div className="space-y-6">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-black text-midnight_text text-sm leading-tight">{edu.degree}</h3>
                                        <p className="text-[11px] text-primary font-bold mt-1 italic">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 19. DARK TEMPLATE (Midnight Pro)
export const DarkTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#0b0c10] text-[#c5c6c7] p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans border-t-[10px] border-primary">
            <header className="flex justify-between items-start mb-20">
                <div>
                    <h1 className="text-6xl font-black uppercase tracking-tighter text-white leading-none">{data.personalInfo.fullName}</h1>
                    <div className="flex items-center gap-4 mt-6">
                        <div className="h-0.5 w-12 bg-primary"></div>
                        <p className="text-2xl font-bold tracking-widest text-primary/80 uppercase">{data.personalInfo.jobTitle}</p>
                    </div>
                </div>
                <div className="text-right space-y-2 text-sm font-bold opacity-60">
                    <p>{data.personalInfo.email}</p>
                    <p>{data.personalInfo.phone}</p>
                    <p className="max-w-[200px] leading-relaxed">{data.personalInfo.address}</p>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-16">
                <div className="col-span-8">
                    <section className="mb-16">
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-primary mb-8 border-b border-white/5 pb-4">Professional Narrative</h2>
                        <p className="text-lg leading-relaxed font-light text-white/70 italic">
                            "{data.personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-primary mb-8 border-b border-white/5 pb-4">Experience Record</h2>
                        <div className="space-y-12">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors">{exp.position}</h3>
                                        <span className="text-xs font-black text-primary/40 uppercase bg-white/5 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm font-black text-primary uppercase tracking-widest mb-4">{exp.company}</p>
                                    <p className="text-base leading-relaxed opacity-60 font-light whitespace-pre-line border-l border-white/10 pl-8 group-hover:border-primary transition-colors">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-4 space-y-16">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-primary mb-8 border-b border-white/5 pb-4">Tech Arsenal</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-black uppercase tracking-tighter text-white hover:border-primary hover:text-primary transition-all rounded-md">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.6em] text-primary mb-8 border-b border-white/5 pb-4">Education</h2>
                        <div className="space-y-8">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="text-lg font-black text-white leading-tight">{edu.degree}</h3>
                                    <p className="text-sm font-bold text-primary/60 mt-1 uppercase tracking-tight">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 20. INFOGRAPHIC TEMPLATE (Visual Pro)
export const InfographicTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#f0f2f5] p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans overflow-hidden">
            <div className="flex h-full">
                {/* Visual Sidebar */}
                <div className="w-[80px] bg-[#1e293b] flex flex-col items-center py-12 gap-12 text-white/20">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl">HM</div>
                    <div className="h-full w-[2px] bg-white/5 rounded-full relative">
                        <div className="absolute top-1/4 -left-1 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_#f43f5e]"></div>
                        <div className="absolute top-2/4 -left-1 w-3 h-3 bg-blue-400 rounded-full"></div>
                        <div className="absolute top-3/4 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                </div>

                <div className="flex-grow">
                    <header className="bg-white p-12 pb-10 border-b border-[#eee] flex justify-between items-center">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black text-[#1e293b] tracking-tighter uppercase">{data.personalInfo.fullName}</h1>
                            <p className="text-lg font-bold text-primary italic">{data.personalInfo.jobTitle}</p>
                        </div>
                        <div className="bg-[#1e293b] text-white p-6 rounded-3xl shadow-xl space-y-1 text-sm font-bold text-center">
                            <p>{data.personalInfo.email}</p>
                            <p>{data.personalInfo.phone}</p>
                        </div>
                    </header>

                    <div className="p-12 space-y-12 bg-white">
                        <section>
                            <h2 className="text-2xl font-black text-[#1e293b] mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm">01</span>
                                Experience Baseline
                            </h2>
                            <div className="space-y-10">
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="relative pl-12">
                                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full border-4 border-primary/20 bg-white flex items-center justify-center text-[10px] font-black text-primary">#{i+1}</div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-black text-[#1e293b]">{exp.position}</h3>
                                            <span className="text-[11px] font-black opacity-30 uppercase">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <p className="text-sm font-bold text-primary mb-4 uppercase tracking-widest">{exp.company}</p>
                                        <p className="text-sm leading-relaxed text-[#64748b] bg-[#f8fafc] p-6 rounded-3xl border border-[#f1f5f9]">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid grid-cols-2 gap-12">
                            <section>
                                <h2 className="text-xl font-black text-[#1e293b] mb-8 flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-500 flex items-center justify-center text-sm">02</span>
                                    Skill Set
                                </h2>
                                <div className="space-y-4">
                                    {data.skills.map((skill, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-[11px] font-black text-[#64748b] uppercase">{skill}</span>
                                                <span className="text-[10px] font-bold text-primary">ADVANCED</span>
                                            </div>
                                            <div className="h-2 bg-[#f1f5f9] w-full rounded-full overflow-hidden">
                                                <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_8px_#f43f5e]"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-[#1e293b] mb-8 flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-600 flex items-center justify-center text-sm">03</span>
                                    Career Base
                                </h2>
                                <div className="space-y-6">
                                    {data.education.map((edu, i) => (
                                        <div key={i} className="p-4 bg-[#f8fafc] rounded-2xl border border-[#f1f5f9]">
                                            <h3 className="font-black text-[#1e293b] text-sm uppercase leading-tight">{edu.degree}</h3>
                                            <p className="text-xs text-primary font-bold mt-1">{edu.school}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 21. STARTUP TEMPLATE (Modern & Clean)
export const StartupTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-slate-800 p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans">
            <header className="mb-12 flex justify-between items-start border-b-4 border-emerald-400 pb-8">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">{data.personalInfo.fullName}</h1>
                    <p className="text-xl font-bold text-emerald-600 mt-2">{data.personalInfo.jobTitle}</p>
                </div>
                <div className="text-right space-y-1 font-bold text-xs">
                    <p className="bg-slate-900 text-white px-3 py-1 rounded inline-block">{data.personalInfo.email}</p>
                    <p className="block">{data.personalInfo.phone}</p>
                    <p className="block opacity-60 italic">{data.personalInfo.website}</p>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-12">
                    <section className="mb-8">
                        <p className="text-lg leading-relaxed text-slate-600 font-medium">
                            {data.personalInfo.summary}
                        </p>
                    </section>
                </div>

                <div className="col-span-8">
                    <section className="mb-12">
                        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-600 mb-6">Experience Map</h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-8 border-l-2 border-slate-100">
                                    <div className="absolute -left-[5px] top-0 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"></div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-black text-slate-900 leading-none">{exp.position}</h3>
                                        <span className="text-[10px] font-black bg-slate-50 px-2 py-1 rounded border border-slate-200 uppercase">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm font-bold text-emerald-600 mb-4">{exp.company}</p>
                                    <p className="text-sm leading-relaxed text-slate-500 whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-4 space-y-12">
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-600 mb-6">Core Toolkit</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase border border-emerald-100 rounded-lg">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-600 mb-6">Education</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-black text-slate-900 text-sm leading-tight">{edu.degree}</h3>
                                    <p className="text-xs text-slate-500 font-bold mt-1">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 22. MINIMALIST PRO (Ultra Clean)
export const MinimalistProTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-black p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-light leading-relaxed">
            <header className="mb-20 text-center">
                <h1 className="text-4xl tracking-[0.2em] font-light uppercase border-b border-black pb-4 inline-block px-10">{data.personalInfo.fullName}</h1>
                <p className="text-sm tracking-[0.4em] font-medium mt-6 uppercase opacity-50">{data.personalInfo.jobTitle}</p>
                <div className="flex justify-center gap-8 mt-10 text-[10px] tracking-widest uppercase">
                    <span>{data.personalInfo.email}</span>
                    <span>/</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>/</span>
                    <span>{data.personalInfo.address}</span>
                </div>
            </header>

            <div className="max-w-2xl mx-auto space-y-16">
                <section>
                    <p className="text-base text-center italic opacity-60">
                        {data.personalInfo.summary}
                    </p>
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-10 text-center border-b border-gray-100 pb-2">Experience</h2>
                    <div className="space-y-12">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-lg font-bold uppercase tracking-tight">{exp.position}</h3>
                                    <span className="text-[10px] opacity-40 uppercase font-black">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="text-xs font-black tracking-widest uppercase mb-4 opacity-70">{exp.company}</p>
                                <p className="text-sm text-gray-600 text-justify leading-loose">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-20">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-8 border-b border-gray-100 pb-2">Expertise</h2>
                        <div className="space-y-2">
                            {data.skills.map((skill, i) => (
                                <p key={i} className="text-sm font-medium uppercase tracking-widest opacity-60">{skill}</p>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-8 border-b border-gray-100 pb-2">Education</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="text-sm font-bold uppercase tracking-tight">{edu.degree}</p>
                                    <p className="text-[10px] mt-1 italic opacity-50">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 23. GRADIENT TEMPLATE (Vibrant)
export const GradientTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#f8fafc] p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-sans overflow-hidden">
            <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-16 pb-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-10 rotate-45 -mr-40 -mt-20"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">{data.personalInfo.fullName}</h1>
                    <p className="text-2xl font-bold opacity-80">{data.personalInfo.jobTitle}</p>
                    <div className="mt-8 flex gap-6 text-sm font-bold opacity-60">
                        <span>{data.personalInfo.email}</span>
                        <span>•</span>
                        <span>{data.personalInfo.phone}</span>
                    </div>
                </div>
            </header>

            <div className="px-16 -mt-10 relative z-10">
                <div className="bg-white rounded-3xl p-12 shadow-2xl space-y-16">
                    <section className="text-center">
                        <p className="text-xl font-medium leading-relaxed text-slate-500 italic">
                            "{data.personalInfo.summary}"
                        </p>
                    </section>

                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-8">
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-600 mb-10">Experience Journey</h2>
                                <div className="space-y-12">
                                    {data.experience.map((exp, i) => (
                                        <div key={i} className="group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none">{exp.position}</h3>
                                                <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                            <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4 italic">{exp.company}</p>
                                            <p className="text-sm leading-relaxed text-slate-500">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="col-span-4 space-y-12">
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-600 mb-8 px-2 border-l-4 border-indigo-600">Core Matrix</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, i) => (
                                        <span key={i} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 text-[10px] font-black uppercase rounded-xl border border-indigo-100 shadow-sm">{skill}</span>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-600 mb-8 px-2 border-l-4 border-indigo-600">Academic Base</h2>
                                <div className="space-y-6">
                                    {data.education.map((edu, i) => (
                                        <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <h3 className="font-black text-slate-800 text-sm leading-tight">{edu.degree}</h3>
                                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{edu.school}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 24. BOARD TEMPLATE (Executive Boardroom)
export const BoardTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#f4f1ea] text-[#2c3e50] p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-serif">
            <header className="border-[8px] border-[#2c3e50] p-12 text-center mb-16 relative">
                <div className="bg-[#f4f1ea] px-8 absolute -top-5 left-1/2 -translate-x-1/2 text-sm font-black uppercase tracking-[0.5em]">Executive Officer</div>
                <h1 className="text-5xl font-black uppercase tracking-tight mb-4">{data.personalInfo.fullName}</h1>
                <p className="text-xl font-bold italic border-t border-b border-[#2c3e50]/20 py-2 inline-block px-12">{data.personalInfo.jobTitle}</p>
                <div className="mt-8 flex justify-center gap-10 text-xs font-bold font-sans">
                    <span>{data.personalInfo.email}</span>
                    <span>|</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>|</span>
                    <span>{data.personalInfo.address}</span>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-16">
                <div className="col-span-12">
                    <section className="mb-12 border-l-4 border-[#2c3e50] pl-10">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#2c3e50]/40 mb-6 font-sans">Corporate Narrative</h2>
                        <p className="text-xl leading-relaxed font-medium italic text-justify text-[#2c3e50]">
                            {data.personalInfo.summary}
                        </p>
                    </section>
                </div>

                <div className="col-span-8">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#2c3e50]/40 mb-8 font-sans">Strategic Milestones</h2>
                        <div className="space-y-12">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-2xl font-black uppercase leading-none">{exp.position}</h3>
                                        <span className="font-black text-sm text-[#2c3e50]/40 font-sans tracking-tight">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-lg font-bold italic mb-6 text-[#2c3e50]/60">{exp.company}</p>
                                    <div className="space-y-2 text-sm font-medium leading-relaxed font-sans text-justify">
                                        {exp.description.split('\n').map((line, idx) => (
                                            <p key={idx}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-4 space-y-16">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#2c3e50]/40 mb-8 font-sans">Domain Proficiency</h2>
                        <div className="grid grid-cols-1 gap-4 font-sans">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-[#2c3e50]/10 pb-2">
                                    <span className="text-[11px] font-black uppercase">{skill}</span>
                                    <div className="w-1.5 h-1.5 bg-[#2c3e50] rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#2c3e50]/40 mb-8 font-sans">Academic Base</h2>
                        <div className="space-y-8">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-black text-lg leading-tight italic">{edu.degree}</h3>
                                    <p className="text-xs font-bold mt-2 opacity-60 uppercase font-sans tracking-widest">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// 25. JOURNAL TEMPLATE (Creative/Designer)
export const JournalTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-[#fafafa] text-[#333] p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-serif">
            <header className="mb-20 grid grid-cols-12 gap-10 items-end">
                <div className="col-span-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-rose-400 mb-6 block font-sans">Creatives Journal Vol. 01</span>
                    <h1 className="text-7xl font-light italic leading-[0.85] tracking-tighter">{data.personalInfo.fullName.split(' ')[0]}<br/><span className="text-8xl font-black not-italic -mt-4 block">{data.personalInfo.fullName.split(' ')[1]}</span></h1>
                </div>
                <div className="col-span-4 text-sm font-medium italic opacity-60 flex flex-col gap-1 border-l border-rose-200 pl-8 pb-2">
                    <p>{data.personalInfo.email}</p>
                    <p>{data.personalInfo.phone}</p>
                    <p className="mt-4 not-italic font-black text-rose-400 uppercase tracking-widest text-[10px]">{data.personalInfo.jobTitle}</p>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-16">
                <div className="col-span-5">
                    <section className="sticky top-20">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-rose-400 mb-8 font-sans">Capabilities Matrix</h2>
                        <div className="flex flex-wrap gap-4">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="text-2xl font-light italic text-[#333] hover:text-rose-400 transition-colors cursor-default">.{skill.toLowerCase()}</span>
                            ))}
                        </div>

                        <div className="mt-20">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-rose-400 mb-8 font-sans">Academic Foundation</h2>
                            <div className="space-y-8">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-lg leading-tight">{edu.degree}</h3>
                                        <p className="text-[11px] font-black opacity-40 uppercase tracking-widest mt-2 font-sans">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="col-span-7">
                    <section className="mb-20">
                        <p className="text-2xl font-light leading-relaxed italic border-b-2 border-rose-100 pb-12">
                            "{data.personalInfo.summary}"
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-rose-400 mb-12 font-sans">Exhibition of Experience</h2>
                        <div className="space-y-20">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-12 top-2 text-[10px] font-black opacity-10 font-sans rotate-[-90deg]">EXP_{i+1}</div>
                                    <h3 className="text-3xl font-black tracking-tighter mb-2">{exp.position}</h3>
                                    <div className="flex justify-between items-baseline mb-6 border-b border-rose-50/50 pb-2">
                                        <p className="text-sm font-black italic text-rose-400">{exp.company}</p>
                                        <span className="text-[10px] font-black opacity-20 font-sans">{exp.startDate} / {exp.endDate}</span>
                                    </div>
                                    <p className="text-sm leading-relaxed opacity-60 text-justify font-sans px-4">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

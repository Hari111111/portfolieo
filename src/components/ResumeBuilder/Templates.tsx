'use client'
import React from 'react'
import { ResumeData } from '@/types/resume'

interface TemplateProps {
    data: ResumeData
}

// 1. MODERN TEMPLATE
export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div id="resume-content" className="bg-white text-black p-10 min-h-[1123px] w-[794px] mx-auto shadow-2xl origin-top transition-all duration-300">
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
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-3 border-b border-grey/20 pb-1">Professional Summary</h2>
                    <p className="text-black text-[15px] leading-relaxed italic">{data.personalInfo.summary}</p>
                </section>
            )}

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8">
                    {/* Experience */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-5 border-b border-grey/20 pb-1">Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-black text-lg">{exp.position}</h3>
                                        <span className="text-sm font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="font-bold text-black/70 mb-2">{exp.company}</p>
                                    <p className="text-[14px] text-black/80 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-5 border-b border-grey/20 pb-1">Projects</h2>
                            <div className="space-y-4">
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
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-4 border-b border-grey/20 pb-1">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-black text-white text-[12px] font-bold rounded uppercase tracking-wider">{skill}</span>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-4 border-b border-grey/20 pb-1">Education</h2>
                        <div className="space-y-4">
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
        <div id="resume-content" className="bg-[#f4f4f4] p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl flex overflow-hidden">
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
            <main className="w-2/3 bg-white p-10">
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-[#2c3e50] uppercase tracking-widest mb-4 flex items-center gap-3">
                        About Me
                        <div className="h-[2px] bg-[#2c3e50] flex-grow"></div>
                    </h2>
                    <p className="text-[14px] leading-relaxed text-[#34495e]">{data.personalInfo.summary}</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-bold text-[#2c3e50] uppercase tracking-widest mb-6 flex items-center gap-3">
                        Professional Experience
                        <div className="h-[2px] bg-[#2c3e50] flex-grow"></div>
                    </h2>
                    <div className="space-y-8 relative before:absolute before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-[#2c3e50]/10 pl-6">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="relative before:absolute before:-left-[30px] before:top-2 before:w-2 before:h-2 before:bg-[#2c3e50] before:rounded-full">
                                <h3 className="font-black text-[#2c3e50]">{exp.position}</h3>
                                <div className="flex justify-between text-[13px] font-bold text-primary my-1">
                                    <span>{exp.company}</span>
                                    <span className="bg-[#2c3e50]/5 px-2 py-0.5 rounded text-[#2c3e50]">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="text-[14px] leading-relaxed text-[#34495e] whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#2c3e50] uppercase tracking-widest mb-6 flex items-center gap-3">
                        Projects
                        <div className="h-[2px] bg-[#2c3e50] flex-grow"></div>
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {data.projects.map((proj, i) => (
                            <div key={i} className="p-4 bg-[#f8f9fa] rounded-lg">
                                <h3 className="font-bold text-[#2c3e50] text-[14px]">{proj.name}</h3>
                                <p className="text-[12px] opacity-70 mt-1 line-clamp-3">{proj.description}</p>
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
        <div id="resume-content" className="bg-white text-gray-800 p-16 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-serif">
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

            <div className="space-y-12">
                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black border-l-4 border-black pl-3 mb-6">Experience</h2>
                    <div className="space-y-10">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-black">{exp.company}</h3>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 lowercase">{exp.position}</p>
                                <p className="text-[14px] leading-relaxed text-gray-700 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black border-l-4 border-black pl-3 mb-6">Education</h2>
                    <div className="grid grid-cols-2 gap-8">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <h3 className="text-base font-bold text-black">{edu.school}</h3>
                                <p className="text-sm italic text-gray-600 mb-1">{edu.degree}</p>
                                <p className="text-[11px] font-black uppercase text-gray-400">{edu.startDate} – {edu.endDate}</p>
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
        <div id="resume-content" className="bg-white text-gray-900 p-12 min-h-[1123px] w-[794px] mx-auto shadow-2xl font-serif border-[12px] border-gray-100">
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
        <div id="resume-content" className="bg-[#1a1a1a] text-white p-0 min-h-[1123px] w-[794px] mx-auto shadow-2xl flex flex-col font-sans">
             {/* Diagonal Header */}
             <div className="bg-primary p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10">
                    <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-2">{firstName}<br/>{lastName}</h1>
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

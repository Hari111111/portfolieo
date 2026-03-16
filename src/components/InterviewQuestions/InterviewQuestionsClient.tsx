"use client";

import React, { useEffect, useState } from 'react';
import HeroSub from '@/components/SharedComponent/HeroSub';
import { getQuestions } from '@/app/api/users/question.services';
import { Icon } from '@iconify/react';

const categories = [
    { name: 'All', icon: 'solar:layers-bold-duotone' },
    { name: 'Frontend', icon: 'solar:monitor-bold-duotone' },
    { name: 'Backend', icon: 'solar:database-bold-duotone' },
    { name: 'Database', icon: 'solar:server-square-bold-duotone' },
    { name: 'DevOps', icon: 'solar:cloud-bold-duotone' },
    { name: 'Programming', icon: 'solar:code-circle-bold-duotone' },
    { name: 'General', icon: 'solar:question-square-bold-duotone' }
];

export default function InterviewQuestionsClient() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeType, setActiveType] = useState('All');
    const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, [activeCategory]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const cat = activeCategory === 'All' ? '' : activeCategory;
            const res = await getQuestions(cat);
            setQuestions(res.data.data || res.data || []);
        } catch (err) {
            console.error("Failed to fetch questions", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleReveal = (id: string) => {
        const newRevealed = new Set(revealedIds);
        if (newRevealed.has(id)) {
            newRevealed.delete(id);
        } else {
            newRevealed.add(id);
        }
        setRevealedIds(newRevealed);
    };

    const breadcrumbLinks = [
        { href: '/', text: 'Home' },
        { href: '/interview-questions', text: 'Interview Q&A' },
    ];

    return (
        <div className="dark:bg-[#0b0c10] min-h-screen">
            <HeroSub
                title="Interview Questions"
                description="Comprehensive list of technical interview questions categorized for your preparation. Master your next interview!"
                breadcrumbLinks={breadcrumbLinks}
            />

            <section className="py-24 bg-[#f4f7fe] selection:bg-primary/10 min-h-screen">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* ADVANCED FLOATING CONTROL HUB */}
                    <div className="relative z-30 mb-20 animate-fadeIn">
                        <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border-2 border-white p-5 shadow-2xl shadow-blue-900/10 flex flex-col xl:flex-row items-center gap-6">
                            {/* Search Engine UI */}
                            <div className="w-full xl:w-[450px] relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-focus-within:bg-primary group-focus-within:text-white transition-all duration-500">
                                    <Icon icon="solar:magnifer-bold-duotone" width="24" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search technical concepts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50/50 border border-slate-100 py-5.5 pl-22 pr-8 rounded-[2rem] font-black text-sm outline-none focus:bg-white focus:border-primary/40 focus:ring-[6px] focus:ring-primary/5 transition-all text-slate-800 placeholder:text-slate-400"
                                />
                            </div>

                            <div className="hidden xl:block w-px h-12 bg-slate-200/60"></div>

                            {/* Dynamic Category Engine */}
                            <div className="w-full xl:flex-1 overflow-x-auto no-scrollbar flex items-center gap-4 py-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`flex items-center gap-3.5 px-8 py-4.5 rounded-[1.75rem] text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 relative group/cat ${activeCategory === cat.name
                                            ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/30 scale-105'
                                            : 'bg-white/50 text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-100'
                                            }`}
                                    >
                                        <Icon icon={cat.icon} className={`text-xl ${activeCategory === cat.name ? 'text-primary' : 'text-slate-400'}`} />
                                        {cat.name}
                                        {activeCategory === cat.name && (
                                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary rounded-full shadow-lg shadow-primary/50" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SUB-FILTERS: MCQ vs THEORY */}
                        <div className="flex flex-wrap items-center gap-5 mt-10 px-8">
                            <div className="flex items-center gap-3 px-6 py-3 bg-white/40 rounded-2xl border border-white shadow-sm">
                                <Icon icon="solar:filter-bold-duotone" className="text-primary" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Type Matrix:</span>
                            </div>
                            {[
                                { name: 'All', icon: 'solar:list-bold-duotone', label: 'Global View' },
                                { name: 'MCQ', icon: 'solar:check-square-bold-duotone', label: 'Multiple Choice' },
                                { name: 'Theory', icon: 'solar:document-text-bold-duotone', label: 'Conceptual Q&A' }
                            ].map((type) => (
                                <button
                                    key={type.name}
                                    onClick={() => setActiveType(type.name)}
                                    className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${activeType === type.name
                                            ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30'
                                            : 'bg-white border-white text-slate-400 hover:border-primary/20 hover:text-primary shadow-sm'
                                        }`}
                                >
                                    <Icon icon={type.icon} className="text-lg" />
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-48">
                            <div className="relative">
                                <div className="w-28 h-28 border-[8px] border-primary/5 border-t-primary rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-primary">
                                    <Icon icon="solar:star-bold-duotone" width="40" className="animate-pulse" />
                                </div>
                            </div>
                            <h3 className="mt-10 text-xl font-black uppercase tracking-[0.3em] text-slate-900">Loading Technical Assets</h3>
                            <div className="flex gap-2 mt-4">
                                <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></span>
                                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></span>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-12">
                            {questions.filter(q => {
                                const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
                                const matchesType = activeType === 'All' ||
                                    (activeType === 'MCQ' && q.type === 'MCQ') ||
                                    (activeType === 'Theory' && q.type !== 'MCQ');
                                return matchesSearch && matchesType;
                            }).length > 0 ? (
                                questions
                                    .filter(q => {
                                        const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
                                        const matchesType = activeType === 'All' ||
                                            (activeType === 'MCQ' && q.type === 'MCQ') ||
                                            (activeType === 'Theory' && q.type !== 'MCQ');
                                        return matchesSearch && matchesType;
                                    })
                                    .sort((a, b) => {
                                        const pA = a.priority || 0;
                                        const pB = b.priority || 0;
                                        if (pA !== pB) return pA - pB;
                                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                                    })
                                    .map((q, idx) => (
                                        <div
                                            key={q._id}
                                            className="bg-white/70 backdrop-blur-md rounded-[4rem] border-2 border-white shadow-2xl shadow-blue-900/5 hover:shadow-primary/10 transition-all duration-700 group/card relative overflow-hidden"
                                            data-aos="fade-up"
                                            data-aos-delay={idx * 50}
                                        >
                                            {/* Advanced Aesthetics */}
                                            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px] group-hover/card:bg-primary/10 transition-all duration-1000"></div>

                                            <div className="p-12 md:p-16 relative z-10">
                                                <div className="flex flex-wrap items-center justify-between gap-8 mb-12">
                                                    <div className="flex flex-wrap items-center gap-4">
                                                        <div className="flex items-center gap-3 px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-xl shadow-slate-900/20">
                                                            <Icon icon="solar:hashtag-bold-duotone" className="text-primary text-base" />
                                                            {q.category}
                                                        </div>
                                                        <div className="flex items-center gap-3 px-6 py-2.5 bg-white border-2 border-slate-50 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-sm">
                                                            <Icon icon="solar:code-bold-duotone" className="text-primary text-base" />
                                                            {q.language}
                                                        </div>
                                                    </div>

                                                    <div className={`flex items-center gap-4 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-inner border-2 ${q.difficulty === 'Easy' ? 'bg-emerald-50 border-emerald-100/50 text-emerald-600' :
                                                        q.difficulty === 'Medium' ? 'bg-amber-50 border-amber-100/50 text-amber-600' :
                                                            'bg-rose-50 border-rose-100/50 text-rose-600'
                                                        }`}>
                                                        <span className={`w-3 h-3 rounded-full shadow-lg ${q.difficulty === 'Easy' ? 'bg-emerald-500 shadow-emerald-500/50' :
                                                            q.difficulty === 'Medium' ? 'bg-amber-500 shadow-amber-500/50' :
                                                                'bg-rose-500 shadow-rose-500/50'
                                                            } animate-pulse`}></span>
                                                        {q.difficulty}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col lg:flex-row gap-12">
                                                    <div className="hidden lg:flex flex-col items-center">
                                                        <div className="w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2.5rem] flex items-center justify-center font-black text-3xl shadow-2xl shadow-slate-900/30 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-700">
                                                            Q
                                                        </div>
                                                        <div className="w-1 h-full bg-slate-100 rounded-full mt-8 group-hover/card:bg-primary/20 transition-all duration-1000"></div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <h3 className="text-2xl md:text-[2.75rem] font-black text-slate-900 mb-12 leading-[1.2] group-hover/card:text-primary transition-all duration-500 tracking-tight">
                                                            {q.question}
                                                        </h3>

                                                        {q.type === 'MCQ' && q.options && q.options.length > 0 && (
                                                            <div className="grid md:grid-cols-2 gap-6 mb-16">
                                                                {q.options.map((opt: string, i: number) => (
                                                                    <div
                                                                        key={i}
                                                                        className="flex items-center gap-6 p-8 bg-slate-50/50 rounded-[2.5rem] border-2 border-slate-100 hover:border-primary/40 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group/opt cursor-default"
                                                                    >
                                                                        <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl text-primary font-black shadow-md border border-slate-50 group-hover/opt:bg-primary group-hover/opt:text-white transition-all duration-500 uppercase text-xl">
                                                                            {String.fromCharCode(65 + i)}
                                                                        </div>
                                                                        <span className="text-slate-700 font-black text-xl">{opt}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <div className="flex flex-wrap items-center justify-between gap-8 pt-10 border-t-2 border-slate-50">
                                                            <button
                                                                onClick={() => toggleReveal(q._id)}
                                                                className={`flex items-center gap-5 px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-700 active:scale-95 ${revealedIds.has(q._id)
                                                                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/30'
                                                                    : 'bg-primary text-white shadow-3xl shadow-primary/30 hover:shadow-primary/50'
                                                                    }`}
                                                            >
                                                                <Icon
                                                                    icon={revealedIds.has(q._id) ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"}
                                                                    className="text-3xl"
                                                                />
                                                                {revealedIds.has(q._id) ? 'Conceal Assets' : 'Access Solution'}
                                                            </button>

                                                            <div className="flex items-center gap-6">
                                                                <button className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-50 text-slate-300 hover:text-primary hover:border-primary/30 flex items-center justify-center transition-all duration-500 shadow-sm"><Icon icon="solar:share-bold-duotone" width="26" /></button>
                                                                <button className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-50 text-slate-300 hover:text-primary hover:border-primary/30 flex items-center justify-center transition-all duration-500 shadow-sm"><Icon icon="solar:bookmark-bold-duotone" width="26" /></button>
                                                            </div>
                                                        </div>

                                                        {revealedIds.has(q._id) && (
                                                            <div className="mt-14 p-12 md:p-16 bg-slate-900 rounded-[4rem] border-2 border-white shadow-3xl animate-fadeIn relative overflow-hidden group/ans">
                                                                <div className="absolute top-0 right-0 p-16 opacity-5 rotate-12 group-hover/ans:rotate-0 transition-all duration-1000">
                                                                    <Icon icon="solar:check-read-bold-duotone" width="180" />
                                                                </div>
                                                                <h4 className="flex items-center gap-5 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-12">
                                                                    <div className="w-12 h-12 rounded-[1.25rem] bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
                                                                        <Icon icon="solar:verified-check-bold" className="text-2xl" />
                                                                    </div>
                                                                    Verified Technical Documentation
                                                                </h4>
                                                                <div
                                                                    className="text-slate-300 leading-[2.2] whitespace-pre-line text-xl qna-content prose prose-invert max-w-none prose-p:font-bold prose-strong:text-white prose-strong:font-black"
                                                                    dangerouslySetInnerHTML={{ __html: q.answer }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="text-center py-48 bg-white/40 backdrop-blur-xl rounded-[4rem] border-2 border-dashed border-slate-200 shadow-inner group/empty animate-fadeIn">
                                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-900/10 group-hover/empty:scale-110 transition-transform duration-500">
                                        <Icon icon="solar:document-add-bold-duotone" width="64" className="text-slate-300 group-hover/empty:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Zero Matches Found</h3>
                                    <p className="text-slate-500 font-medium mt-4 max-w-md mx-auto text-lg">We couldn't find any questions matching your search. Try adjusting your filters or clearing your search query.</p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveType('All'); }}
                                        className="mt-12 px-12 py-5 bg-slate-900 text-white font-black rounded-[2rem] uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-slate-900/20 hover:bg-primary transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

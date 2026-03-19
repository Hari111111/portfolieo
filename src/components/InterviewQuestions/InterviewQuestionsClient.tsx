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
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, [activeCategory]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const cat = activeCategory === 'All' ? '' : activeCategory;
            const res: any = await getQuestions(cat);
            console.log('Fetched res:', res);

            // Safer data extraction
            const fetchedQuestions = Array.isArray(res) ? res : (res.data || res.data?.data || []);
            console.log('Final questions:', fetchedQuestions);
            setQuestions(fetchedQuestions);

            // Automatically select first question if none selected or if switching filters
            if (fetchedQuestions.length > 0) {
                const currentStillExists = fetchedQuestions.some((q: any) => q._id === selectedQuestionId);
                if (!selectedQuestionId || !currentStillExists) {
                    setSelectedQuestionId(fetchedQuestions[0]._id);
                }
            } else {
                setSelectedQuestionId(null);
            }
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

    const handleOptionSelect = (questionId: string, option: string) => {
        if (selectedAnswers[questionId]) return; // Stop if already answered
        setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const isCorrect = (option: string, answer: string) => {
        const cleanAnswer = answer.replace(/<[^>]*>/g, '').trim().toLowerCase();
        return option.trim().toLowerCase() === cleanAnswer;
    };

    const breadcrumbLinks = [
        { href: '/', text: 'Home' },
        { href: '/interview-questions', text: 'Interview Q&A' },
    ];

    const selectedQuestion = questions.find(q => q._id === selectedQuestionId);
    console.log('Rendering Questions Layout - Count:', questions.length, 'Selected:', selectedQuestionId);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-500 mt-10 md:mt-0">
            {/* <HeroSub
                title="Interview Questions"
                description="Comprehensive list of technical interview questions categorized for your preparation. Master your next interview!"
                breadcrumbLinks={breadcrumbLinks}
            /> */}

            <section className="py-10 md:py-32 selection:bg-primary/10">
                <div className="container mx-auto max-w-[1800px] px-4 md:px-8">

                    <div className="relative z-30 mb-8 md:mb-12 animate-fadeIn">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/50 dark:border-slate-800 p-3 md:p-6 shadow-2xl shadow-blue-900/5 flex flex-col xl:flex-row items-center gap-4 md:gap-6">
                            {/* Search Engine UI */}
                            <div className="w-full xl:w-[400px] relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-focus-within:bg-primary group-focus-within:text-white transition-all duration-500">
                                    <Icon icon="solar:magnifer-bold-duotone" width="18" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search concepts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 py-3.5 md:py-4.5 pl-16 md:pl-20 pr-6 rounded-2xl md:rounded-[1.75rem] font-bold text-xs md:text-sm outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary/40 transition-all text-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="hidden xl:block w-px h-10 bg-slate-200/60 dark:bg-slate-700/60"></div>

                            {/* Dynamic Category Engine */}
                            <div className="w-full xl:flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 md:gap-3 py-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] whitespace-nowrap transition-all duration-500 relative group/cat ${activeCategory === cat.name
                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                                            : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        <Icon icon={cat.icon} className={`text-base md:text-lg ${activeCategory === cat.name ? 'text-white' : 'text-slate-400'}`} />
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SUB-FILTERS: MCQ vs THEORY */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-6 md:mt-8 px-2 md:px-6">
                            {[
                                { name: 'All', icon: 'solar:list-bold-duotone', label: 'All Questions' },
                                { name: 'MCQ', icon: 'solar:check-square-bold-duotone', label: 'MCQs' },
                                { name: 'Theory', icon: 'solar:document-text-bold-duotone', label: 'Theory' }
                            ].map((type) => (
                                <button
                                    key={type.name}
                                    onClick={() => setActiveType(type.name)}
                                    className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${activeType === type.name
                                        ? 'bg-slate-900 dark:bg-primary border-slate-900 dark:border-primary text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary/30'
                                        }`}
                                >
                                    <Icon icon={type.icon} className="text-sm md:text-base" />
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 md:py-48">
                            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <h3 className="mt-6 md:mt-8 text-xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">Loading Questions</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
                            {/* LEFT SIDEBAR: QUESTION LIST */}
                            <div className="col-span-12 lg:col-span-4 xl:col-span-4 space-y-4 lg:sticky lg:top-28">
                                <div className="bg-white dark:bg-slate-900/80 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/50 dark:border-slate-800 overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none flex flex-col h-[50vh] md:h-[75vh]">
                                    <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Questions</h4>
                                                <span className="text-[8px] md:text-[9px] font-bold text-slate-500 mt-0.5 lg:hidden">Select to view solution</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] md:text-[10px] font-black rounded-full">
                                                    {questions.filter(q => {
                                                        const matchesSearch = q.question?.toLowerCase().includes(searchQuery.toLowerCase());
                                                        const matchesType = activeType === 'All' || (activeType === 'MCQ' && q.type === 'MCQ') || (activeType === 'Theory' && q.type !== 'MCQ');
                                                        return matchesSearch && matchesType;
                                                    }).length} Matches
                                                </span>
                                                {selectedQuestionId && (
                                                    <button 
                                                        onClick={() => document.getElementById('question-detail')?.scrollIntoView({ behavior: 'smooth' })}
                                                        className="lg:hidden p-1.5 bg-slate-900 dark:bg-primary text-white rounded-lg animate-pulse"
                                                    >
                                                        <Icon icon="solar:round-alt-arrow-down-bold" width="16" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto custom-scrollbar-premium p-3 md:p-4 space-y-2 md:space-y-3">
                                        {questions.filter(q => {
                                            const matchesSearch = q.question?.toLowerCase().includes(searchQuery.toLowerCase());
                                            const matchesType = activeType === 'All' || (activeType === 'MCQ' && q.type === 'MCQ') || (activeType === 'Theory' && q.type !== 'MCQ');
                                            return matchesSearch && matchesType;
                                        }).map((q, idx) => (
                                            <button
                                                key={q._id}
                                                onClick={() => {
                                                    setSelectedQuestionId(q._id);
                                                    if (window.innerWidth < 1024) {
                                                        setTimeout(() => {
                                                            document.getElementById('question-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                        }, 100);
                                                    }
                                                }}
                                                className={`w-full text-left p-4 md:p-5 rounded-2xl md:rounded-[1.75rem] transition-all duration-300 group relative overflow-hidden ${selectedQuestionId === q._id
                                                    ? 'bg-slate-950 dark:bg-primary text-white shadow-2xl shadow-primary/20'
                                                    : 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center font-black text-[10px] md:text-xs shrink-0 ${selectedQuestionId === q._id ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                                        {idx + 1}
                                                    </div>
                                                    <p className="text-xs md:text-sm font-bold leading-relaxed line-clamp-2">{q.question}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT CONTENT: QUESTION DETAIL & ANSWER */}
                            <div id="question-detail" className="col-span-12 lg:col-span-8 xl:col-span-8">
                                <div className="bg-white dark:bg-slate-900/80 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white/50 dark:border-slate-800 overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none min-h-[50vh] md:min-h-[75vh]">
                                    {selectedQuestion ? (
                                        <div className="p-6 md:p-16 animate-fadeIn">
                                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-10">
                                                {/* Category Badges */}
                                                {(Array.isArray(selectedQuestion.category) ? selectedQuestion.category : [selectedQuestion.category]).map((cat: string, index: number) => (
                                                    <span key={`cat-${index}`} className="px-4 md:px-6 py-1.5 md:py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-200 dark:border-slate-700">
                                                        {cat}
                                                    </span>
                                                ))}

                                                {/* Language Badges */}
                                                {(Array.isArray(selectedQuestion.language) ? selectedQuestion.language : [selectedQuestion.language]).map((lang: string, index: number) => (
                                                    <span key={`lang-${index}`} className="px-4 md:px-6 py-1.5 md:py-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                                                        {lang}
                                                    </span>
                                                ))}

                                                {/* Difficulty Badge */}
                                                <span className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border ${selectedQuestion.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                    selectedQuestion.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                                    }`}>
                                                    {selectedQuestion.difficulty}
                                                </span>
                                            </div>

                                            <h2 className="text-2xl md:text-[3rem] font-black text-slate-900 dark:text-white leading-[1.3] md:leading-[1.2] mb-8 md:mb-12 tracking-tight">
                                                {selectedQuestion.question}
                                            </h2>

                                            {selectedQuestion.type === 'MCQ' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
                                                    {selectedQuestion.options?.map((opt: string, i: number) => {
                                                        const isSelected = selectedAnswers[selectedQuestion._id] === opt;
                                                        const correct = isCorrect(opt, selectedQuestion.answer);
                                                        const hasAnswered = !!selectedAnswers[selectedQuestion._id];

                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleOptionSelect(selectedQuestion._id, opt)}
                                                                className={`flex items-center gap-4 md:gap-5 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 text-left transition-all duration-300 ${hasAnswered
                                                                    ? correct
                                                                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-400'
                                                                        : isSelected
                                                                            ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-400'
                                                                            : 'bg-slate-50 dark:bg-slate-800 opacity-40 border-slate-200 dark:border-slate-700'
                                                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary/50'
                                                                    }`}
                                                            >
                                                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black shrink-0 text-sm ${hasAnswered && correct ? 'bg-emerald-500 text-white' :
                                                                    hasAnswered && isSelected ? 'bg-rose-500 text-white' :
                                                                        'bg-slate-100 dark:bg-slate-700 text-slate-400'
                                                                    }`}>
                                                                    {String.fromCharCode(65 + i)}
                                                                </div>
                                                                <span className="font-bold text-xs md:text-base">{opt}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-slate-100 dark:border-slate-800 text-center md:text-left">
                                                <button
                                                    onClick={() => toggleReveal(selectedQuestion._id)}
                                                    className={`group relative overflow-hidden px-10 md:px-14 py-4 md:py-7 rounded-2xl md:rounded-[2.25rem] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] transition-all duration-500 ${revealedIds.has(selectedQuestion._id)
                                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                                        : 'bg-primary text-white shadow-3xl shadow-primary/30'
                                                        }`}
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                                        <Icon icon={revealedIds.has(selectedQuestion._id) ? "solar:eye-closed-bold" : "solar:eye-bold"} width="20" className="md:scale-[1.2]" />
                                                        {revealedIds.has(selectedQuestion._id) ? 'Conceal Solution' : 'Reveal Solution'}
                                                    </span>
                                                </button>

                                                {revealedIds.has(selectedQuestion._id) && (
                                                    <div className="mt-8 md:mt-12 p-6 md:p-14 bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] md:rounded-[3rem] border border-slate-100 dark:border-slate-700/50 animate-fadeIn overflow-hidden text-left">
                                                        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary">
                                                                <Icon icon="solar:verified-check-bold" width="18" />
                                                            </div>
                                                            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-400">Technical Solution</h4>
                                                        </div>
                                                        <div
                                                            className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-lg qna-content prose dark:prose-invert max-w-none"
                                                            dangerouslySetInnerHTML={{ __html: selectedQuestion.answer }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[75vh] p-8 md:p-12 text-center opacity-30">
                                            <Icon icon="solar:ghost-bold-duotone" width="60" className="mb-4 md:mb-6" />
                                            <h3 className="text-base md:text-xl font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Select a question</h3>
                                            <p className="mt-3 md:mt-4 text-xs md:text-sm font-bold">Pick a concept from the list to explore.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
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
                @keyframes bounce-subtle {
                    0%, 100% { transform: translate(-50%, -50%) translateX(0); }
                    50% { transform: translate(-50%, -50%) translateX(5px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 1.5s infinite ease-in-out;
                }
                .qna-content {
                    word-break: break-word;
                    overflow-wrap: break-word;
                }
                .qna-content p {
                    margin-bottom: 1.5rem;
                }
                .dark .qna-content strong {
                    color: #f8fafc;
                }
                .qna-content strong {
                    color: #0f172a;
                    font-weight: 900;
                }
                .qna-content code {
                    background: #f1f5f9;
                    padding: 0.2rem 0.5rem;
                    border-radius: 0.5rem;
                    font-size: 0.9em;
                    color: #2563eb;
                    word-break: break-all;
                    white-space: pre-wrap;
                }
                .dark .qna-content code {
                    background: #1e293b;
                    color: #60a5fa;
                }
                .qna-content ul, .qna-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .qna-content li {
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </div>
    );
}

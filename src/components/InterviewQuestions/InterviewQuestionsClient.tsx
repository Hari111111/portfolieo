"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getQuestions } from '@/app/api/users/question.services';
import { Icon } from '@iconify/react';

const debounce = (fn: Function, delay: number) => {
    let timeoutId: any;
    const debouncedFn = (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
    debouncedFn.cancel = () => {
        if (timeoutId) clearTimeout(timeoutId);
    };
    return debouncedFn as ((...args: any[]) => void) & { cancel: () => void };
};

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
    const [fetchingMore, setFetchingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeType, setActiveType] = useState('All');
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchData = async (pageNum: number, isInitial: boolean = false) => {
        if (isInitial) setLoading(true);
        else setFetchingMore(true);

        try {
            const cat = activeCategory === 'All' ? '' : activeCategory;
            const res: any = await getQuestions(cat, pageNum, 10, searchQuery);
            console.log('Fetched res:', res);

            const fetchedQuestions = Array.isArray(res) ? res : (res.data || res.data?.data || []);
            const total = res.total || res.data?.total || 0;
            setTotalQuestions(total);

            if (pageNum === 1) {
                setQuestions(fetchedQuestions);
                // Automatically select first question if none selected OR if it's a fresh load
                if (fetchedQuestions.length > 0) {
                    setSelectedQuestionId(fetchedQuestions[0]._id);
                } else {
                    setSelectedQuestionId(null);
                }
            } else {
                setQuestions(prev => [...prev, ...fetchedQuestions]);
            }

            setHasMore(pageNum * 10 < total);
        } catch (err) {
            console.error("Failed to fetch questions", err);
        } finally {
            setLoading(false);
            setFetchingMore(false);
        }
    };

    // Debounced search
    const debouncedFetch = useCallback(
        debounce(() => {
            setPage(1);
            fetchData(1, true);
        }, 500),
        [activeCategory, searchQuery]
    );

    useEffect(() => {
        if (searchQuery) {
            debouncedFetch();
        } else {
            setPage(1);
            fetchData(1, true);
        }
        return () => debouncedFetch.cancel();
    }, [activeCategory, searchQuery]);

    const lastQuestionRef = useCallback((node: any) => {
        if (loading || fetchingMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => {
                    const nextPage = prevPage + 1;
                    fetchData(nextPage);
                    return nextPage;
                });
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, fetchingMore, hasMore]);

    const handleOptionSelect = (questionId: string, option: string) => {
        if (selectedAnswers[questionId]) return; // Stop if already answered
        setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const isCorrect = (option: string, answer: string) => {
        const cleanAnswer = answer.replace(/<[^>]*>/g, '').trim().toLowerCase();
        return option.trim().toLowerCase() === cleanAnswer;
    };

    const selectedQuestion = questions.find(q => q._id === selectedQuestionId);
    console.log('Rendering Questions Layout - Count:', questions.length, 'Selected:', selectedQuestionId);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(47,115,242,0.14),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.10),_transparent_26%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_40%,_#f8fafc_100%)] text-slate-900 transition-colors duration-500 mt-10 md:mt-0 dark:bg-[radial-gradient(circle_at_top_left,_rgba(47,115,242,0.16),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.10),_transparent_22%),linear-gradient(180deg,_#020617_0%,_#0b1120_50%,_#020617_100%)] dark:text-slate-100">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),transparent)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.4),transparent)]" />
            <section className="py-10 md:py-32 selection:bg-primary/10">
                <div className="container relative z-10 mx-auto max-w-[1800px] px-4 md:px-8">
                    <div className="mb-8 md:mb-12">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/75 dark:shadow-[0_30px_80px_-35px_rgba(0,0,0,0.7)] md:rounded-[2.75rem] md:p-8">
                            <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
                            <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
                            <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-primary/10 via-sky-400/5 to-transparent md:block" />
                            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
                                <div className="max-w-3xl">
                                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-slate-900/60 md:text-[11px]">
                                        <Icon icon="solar:clipboard-list-bold-duotone" width="16" />
                                        Interview Preparation Hub
                                    </span>
                                    <h1 className="max-w-4xl text-[2rem] font-black tracking-[-0.04em] text-slate-950 dark:text-white md:text-[3.35rem] md:leading-[1.02]">
                                        Crack interviews with a sharper, cleaner practice workspace.
                                    </h1>
                                    <p className="mt-4 max-w-2xl text-[13px] leading-7 text-slate-600 dark:text-slate-300 md:text-[15px]">
                                        Browse curated questions, filter by domain, practice MCQs, and read answers in a focused split-screen layout built for faster revision.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {[
                                            { icon: 'solar:layers-bold-duotone', label: 'Topic wise filtering' },
                                            { icon: 'solar:check-square-bold-duotone', label: 'MCQ + theory practice' },
                                            { icon: 'solar:notes-bold-duotone', label: 'Direct answer view' }
                                        ].map((feature) => (
                                            <div
                                                key={feature.label}
                                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-2 text-[11px] font-semibold text-slate-600 shadow-sm dark:border-slate-700/80 dark:bg-slate-800/70 dark:text-slate-300"
                                            >
                                                <Icon icon={feature.icon} className="text-primary" width="16" />
                                                {feature.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                                    {[
                                        { label: 'Topics', value: categories.length - 1 },
                                        { label: 'Questions', value: totalQuestions || questions.length },
                                        { label: 'View', value: activeType }
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className="rounded-[1.75rem] border border-white/80 bg-white/80 px-4 py-4 text-center shadow-[0_18px_40px_-28px_rgba(37,99,235,0.45)] dark:border-slate-700/70 dark:bg-slate-800/75 dark:shadow-none"
                                        >
                                            <div className="text-xl font-black tracking-tight text-slate-950 dark:text-white md:text-[1.7rem]">
                                                {item.value}
                                            </div>
                                            <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                                                {item.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-30 mb-8 md:mb-12 animate-fadeIn">
                        <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/70 dark:border-white/10 p-3 md:p-5 shadow-[0_25px_60px_-30px_rgba(37,99,235,0.35)] flex flex-col xl:flex-row items-center gap-4 md:gap-5">
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
                                    className="w-full bg-slate-100/70 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700 py-3 md:py-4 pl-16 md:pl-20 pr-6 rounded-2xl md:rounded-[1.5rem] font-semibold text-[11px] md:text-[13px] outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary/40 transition-all text-slate-800 dark:text-white shadow-inner"
                                />
                            </div>

                            <div className="hidden xl:block w-px h-10 bg-slate-200/60 dark:bg-slate-700/60"></div>

                            {/* Dynamic Category Engine */}
                            <div className="w-full xl:flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 md:gap-3 py-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] whitespace-nowrap transition-all duration-500 relative group/cat ${activeCategory === cat.name
                                            ? 'bg-slate-950 text-white shadow-xl shadow-primary/20 dark:bg-primary'
                                            : 'bg-white/85 dark:bg-slate-800/85 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
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
                                    className={`flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.16em] transition-all duration-300 border ${activeType === type.name
                                        ? 'bg-slate-950 dark:bg-primary border-slate-950 dark:border-primary text-white shadow-lg'
                                        : 'bg-white/85 dark:bg-slate-800/85 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary/30'
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
                                <div className="bg-white/80 dark:bg-slate-900/75 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.25rem] border border-white/70 dark:border-white/10 overflow-hidden shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] flex flex-col h-[54vh] md:h-[78vh]">
                                    <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(248,250,252,0.65))] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.75),rgba(15,23,42,0.45))]">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Questions</h4>
                                                <span className="text-[9px] md:text-[10px] font-semibold text-slate-500 mt-1 lg:hidden">Select a card to open the answer view</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 rounded-full border border-primary/15 bg-primary/10 text-primary text-[9px] md:text-[10px] font-black">
                                                    {totalQuestions} Matches
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
                                            const matchesType = activeType === 'All' || (activeType === 'MCQ' && q.type === 'MCQ') || (activeType === 'Theory' && q.type !== 'MCQ');
                                            return matchesType;
                                        }).map((q, idx) => {
                                            const isLast = questions.length === idx + 1;
                                            return (
                                                <button
                                                    key={q._id}
                                                    ref={isLast ? lastQuestionRef : null}
                                                    onClick={() => {
                                                        setSelectedQuestionId(q._id);
                                                        if (window.innerWidth < 1024) {
                                                            setTimeout(() => {
                                                                document.getElementById('question-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                            }, 100);
                                                        }
                                                    }}
                                                    className={`w-full text-left p-4 rounded-2xl md:rounded-[1.5rem] transition-all duration-300 group relative overflow-hidden border ${selectedQuestionId === q._id
                                                        ? 'border-transparent bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_42%,#2563eb_100%)] text-white shadow-[0_24px_50px_-28px_rgba(37,99,235,0.8)] dark:bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_100%)]'
                                                        : 'border-slate-200/70 bg-white/75 text-slate-600 hover:-translate-y-0.5 hover:bg-white dark:border-slate-700/70 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:bg-slate-800'
                                                        }`}
                                                >
                                                    <div className={`absolute inset-y-0 left-0 w-1.5 rounded-r-full ${selectedQuestionId === q._id ? 'bg-white/70' : 'bg-transparent group-hover:bg-primary/30'}`} />
                                                    <div className="flex items-start gap-4">
                                                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center font-black text-[10px] md:text-xs shrink-0 ${selectedQuestionId === q._id ? 'bg-white/18 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'}`}>
                                                            {idx + 1}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <span className={`rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] ${selectedQuestionId === q._id ? 'bg-white/15 text-white/90' : 'bg-slate-100 text-slate-500 dark:bg-slate-700/80 dark:text-slate-300'}`}>
                                                                    {q.type === 'MCQ' ? 'MCQ' : 'Theory'}
                                                                </span>
                                                                {q.difficulty && (
                                                                    <span className={`rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] ${selectedQuestionId === q._id ? 'bg-white/10 text-white/80' : 'bg-primary/10 text-primary'}`}>
                                                                        {q.difficulty}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="mt-3 text-[11px] md:text-[13px] font-semibold leading-6 line-clamp-2">{q.question}</p>
                                                        </div>
                                                    </div>
                                                </button>
                                            )
                                        })}
                                        {fetchingMore && (
                                            <div className="flex justify-center py-4">
                                                <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT CONTENT: QUESTION DETAIL & ANSWER */}
                            <div id="question-detail" className="col-span-12 lg:col-span-8 xl:col-span-8">
                                <div className="bg-white/82 dark:bg-slate-900/76 backdrop-blur-3xl rounded-[2.25rem] md:rounded-[3rem] border border-white/70 dark:border-white/10 overflow-hidden shadow-[0_35px_80px_-40px_rgba(15,23,42,0.45)] min-h-[54vh] md:min-h-[78vh]">
                                    {selectedQuestion ? (
                                        <div className="p-6 md:p-10 animate-fadeIn">
                                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(239,246,255,0.85))] p-5 shadow-[0_24px_60px_-36px_rgba(37,99,235,0.45)] dark:border-slate-700/70 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.9))] md:rounded-[2.5rem] md:p-8">
                                                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
                                                <div className="relative z-10 flex flex-wrap items-center gap-3 md:gap-4 mb-5 md:mb-8">
                                                {/* Category Badges */}
                                                {(Array.isArray(selectedQuestion.category) ? selectedQuestion.category : [selectedQuestion.category]).map((cat: string, index: number) => (
                                                    <span key={`cat-${index}`} className="px-4 md:px-5 py-1.5 md:py-2 bg-white/85 dark:bg-slate-800/80 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                                                        {cat}
                                                    </span>
                                                ))}

                                                {/* Language Badges */}
                                                {(Array.isArray(selectedQuestion.language) ? selectedQuestion.language : [selectedQuestion.language]).map((lang: string, index: number) => (
                                                    <span key={`lang-${index}`} className="px-4 md:px-5 py-1.5 md:py-2 bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.16em] dark:text-blue-300">
                                                        {lang}
                                                    </span>
                                                ))}

                                                {/* Difficulty Badge */}
                                                <span className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.16em] border ${selectedQuestion.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-300' :
                                                    selectedQuestion.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                                    }`}>
                                                    {selectedQuestion.difficulty}
                                                </span>
                                                </div>

                                                <div className="relative z-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_190px] lg:items-end">
                                                    <div>
                                                        <h2 className="max-w-4xl text-[1.45rem] font-black text-slate-950 dark:text-white leading-[1.4] md:text-[2.35rem] md:leading-[1.18] tracking-tight">
                                                            {selectedQuestion.question}
                                                        </h2>
                                                        <p className="mt-4 max-w-2xl text-[12px] leading-6 text-slate-500 dark:text-slate-400 md:text-[14px]">
                                                            Read the question, attempt your own answer first, then compare with the solution below.
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3 rounded-[1.5rem] border border-slate-200/70 bg-white/70 p-3 dark:border-slate-700/70 dark:bg-slate-900/50 lg:grid-cols-1">
                                                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center dark:bg-slate-800/80">
                                                            <div className="text-lg font-black text-slate-950 dark:text-white">
                                                                {selectedQuestion.type === 'MCQ' ? 'MCQ' : 'Theory'}
                                                            </div>
                                                            <div className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                                                                Format
                                                            </div>
                                                        </div>
                                                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center dark:bg-slate-800/80">
                                                            <div className="text-lg font-black text-slate-950 dark:text-white">
                                                                {(Array.isArray(selectedQuestion.language) ? selectedQuestion.language : [selectedQuestion.language]).filter(Boolean).length || 1}
                                                            </div>
                                                            <div className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                                                                Tags
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedQuestion.type === 'MCQ' && (
                                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-12">
                                                    {selectedQuestion.options?.map((opt: string, i: number) => {
                                                        const isSelected = selectedAnswers[selectedQuestion._id] === opt;
                                                        const correct = isCorrect(opt, selectedQuestion.answer);
                                                        const hasAnswered = !!selectedAnswers[selectedQuestion._id];

                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleOptionSelect(selectedQuestion._id, opt)}
                                                                className={`flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-[1.5rem] md:rounded-[1.75rem] border text-left transition-all duration-300 shadow-sm ${hasAnswered
                                                                    ? correct
                                                                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-400'
                                                                        : isSelected
                                                                            ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-400'
                                                                            : 'bg-slate-50 dark:bg-slate-800 opacity-40 border-slate-200 dark:border-slate-700'
                                                                    : 'bg-white/85 dark:bg-slate-800/90 border-slate-200/80 dark:border-slate-700 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-28px_rgba(37,99,235,0.45)]'
                                                                    }`}
                                                            >
                                                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black shrink-0 text-sm ${hasAnswered && correct ? 'bg-emerald-500 text-white' :
                                                                    hasAnswered && isSelected ? 'bg-rose-500 text-white' :
                                                                        'bg-slate-100 dark:bg-slate-700 text-slate-400'
                                                                    }`}>
                                                                    {String.fromCharCode(65 + i)}
                                                                </div>
                                                                <span className="font-semibold text-[12px] md:text-[15px] leading-6">{opt}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            <div className="mt-10 md:mt-14 text-left">
                                                <div className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(14,165,233,0.04))] px-4 py-4 dark:border-slate-700/70 dark:bg-[linear-gradient(135deg,rgba(37,99,235,0.14),rgba(14,165,233,0.08))] md:rounded-[2rem] md:px-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-900/70 flex items-center justify-center text-primary shadow-sm">
                                                            <Icon icon="solar:document-text-bold-duotone" width="18" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                                                                Answer
                                                            </h4>
                                                            <p className="mt-1 text-[11px] md:text-[12px] text-slate-500 dark:text-slate-400">
                                                                Solution is shown directly for the selected question.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 md:mt-8 p-5 md:p-10 bg-white/80 dark:bg-slate-800/40 rounded-[1.75rem] md:rounded-[2.5rem] border border-white/70 dark:border-slate-700/50 animate-fadeIn overflow-hidden text-left shadow-[0_24px_60px_-34px_rgba(15,23,42,0.3)]">
                                                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary">
                                                            <Icon icon="solar:verified-check-bold" width="18" />
                                                        </div>
                                                        <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.32em] text-slate-400">Technical Solution</h4>
                                                    </div>
                                                    <div
                                                        className="text-slate-700 dark:text-slate-300 leading-7 text-[13px] md:text-[15px] qna-content prose dark:prose-invert max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: selectedQuestion.answer }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center min-h-[54vh] md:min-h-[78vh] p-8 md:p-12 text-center opacity-40">
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

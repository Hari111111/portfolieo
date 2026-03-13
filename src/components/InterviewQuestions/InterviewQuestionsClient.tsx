"use client";

import React, { useEffect, useState } from 'react';
import HeroSub from '@/components/SharedComponent/HeroSub';
import { getQuestions } from '@/app/api/users/question.services';
import { Icon } from '@iconify/react';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Programming', 'General'];

export default function InterviewQuestionsClient() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

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

            <section className="py-20">
                <div className="container mx-auto max-w-6xl px-4">
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16" data-aos="fade-up">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                                    activeCategory === cat
                                        ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                                        : 'bg-white dark:bg-darklight text-grey dark:text-white/60 hover:text-primary border border-border dark:border-dark_border'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid gap-8">
                            {questions.length > 0 ? (
                                questions.map((q, idx) => (
                                    <div
                                        key={q._id}
                                        className="bg-white dark:bg-darklight rounded-2xl border border-border dark:border-dark_border overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                                        data-aos="fade-up"
                                        data-aos-delay={idx * 50}
                                    >
                                        <div className="p-6 md:p-8">
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">
                                                    {q.category}
                                                </span>
                                                <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-lg uppercase tracking-wider">
                                                    {q.language}
                                                </span>
                                                <span className="px-3 py-1 bg-grey/5 text-grey dark:text-white/40 text-xs font-bold rounded-lg uppercase tracking-wider">
                                                    {q.type}
                                                </span>
                                                <span className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider ${
                                                    q.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                                                    q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-red-100 text-red-600'
                                                }`}>
                                                    {q.difficulty}
                                                </span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold text-midnight_text dark:text-white mb-6 leading-relaxed">
                                                <span className="text-primary mr-3">Q.</span>
                                                {q.question}
                                            </h3>

                                            {q.type === 'MCQ' && q.options && q.options.length > 0 && (
                                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                                    {q.options.map((opt: string, i: number) => (
                                                        <div 
                                                            key={i} 
                                                            className="flex items-center gap-3 p-4 bg-grey/5 dark:bg-black/20 rounded-xl border border-border dark:border-dark_border"
                                                        >
                                                            <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-darklight rounded-lg text-primary font-bold shadow-sm">
                                                                {String.fromCharCode(65 + i)}
                                                            </div>
                                                            <span className="text-grey dark:text-white/80">{opt}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="border-t border-border dark:border-dark_border pt-6 mt-4 flex items-center justify-between">
                                                <button
                                                    onClick={() => toggleReveal(q._id)}
                                                    className="flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all group/btn"
                                                >
                                                    {revealedIds.has(q._id) ? 'Hide Answer' : 'Show Answer'}
                                                    <Icon 
                                                        icon={revealedIds.has(q._id) ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} 
                                                        className="text-xl"
                                                    />
                                                </button>
                                            </div>

                                            {revealedIds.has(q._id) && (
                                                <div className="mt-6 p-6 md:p-8 bg-primary/[0.03] dark:bg-primary/[0.05] rounded-2xl border border-primary/10 animate-fadeIn">
                                                    <h4 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm mb-4">
                                                        <Icon icon="solar:check-circle-bold" />
                                                        Answer
                                                    </h4>
                                                    <div 
                                                        className="text-grey dark:text-white/80 leading-loose whitespace-pre-line text-lg qna-content"
                                                        dangerouslySetInnerHTML={{ __html: q.answer }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white dark:bg-darklight rounded-3xl border border-dashed border-border dark:border-dark_border">
                                    <Icon icon="solar:document-add-bold-duotone" width="64" className="mx-auto mb-4 opacity-20" />
                                    <h3 className="text-2xl font-bold dark:text-white">No questions found</h3>
                                    <p className="text-grey dark:text-white/50">Try selecting a different category or check back later.</p>
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

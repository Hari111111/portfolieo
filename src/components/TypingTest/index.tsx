"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  FiClock, 
  FiType, 
  FiRotateCcw, 
  FiZap, 
  FiTarget, 
  FiActivity, 
  FiAward, 
  FiWifi 
} from "react-icons/fi";

const WORD_BANK = [
  "the", "be", "to", "of", "and", "in", "that", "have", "it", "for",
  "not", "on", "with", "he", "as", "you", "do", "at", "this", "but",
  "his", "by", "from", "they", "we", "say", "her", "she", "or", "an",
  "will", "my", "one", "all", "would", "there", "their", "what", "so",
  "up", "out", "if", "about", "who", "get", "which", "go", "me", "when",
  "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them",
  "see", "other", "than", "then", "now", "look", "only", "come", "its",
  "over", "think", "also", "back", "after", "use", "two", "how", "our",
  "work", "first", "well", "way", "even", "new", "want", "because", "any",
  "these", "give", "day", "most", "us", "great", "between", "need", "large",
  "often", "hand", "high", "place", "hold", "point", "world", "still",
  "found", "answer", "school", "grow", "study", "learn", "plant", "cover",
  "food", "sun", "four", "between", "state", "keep", "never", "start",
  "city", "earth", "eyes", "light", "thought", "head", "under", "story",
  "saw", "left", "don't", "few", "while", "along", "might", "close",
  "something", "seem", "next", "hard", "open", "example", "begin", "life",
  "always", "those", "both", "paper", "together", "got", "group", "often",
  "run", "important", "until", "children", "side", "feet", "car", "mile",
  "night", "walk", "white", "sea", "began", "grow", "took", "river", "four",
  "carry", "state", "once", "book", "hear", "stop", "without", "second",
  "later", "miss", "idea", "enough", "eat", "face", "watch", "far", "indian",
  "real", "almost", "let", "above", "girl", "sometimes", "mountain",
  "cut", "young", "talk", "soon", "list", "song", "being", "leave",
  "family", "body", "music", "color", "stand", "sun", "questions", "fish",
  "area", "mark", "horse", "birds", "problem", "complete", "room", "knew",
  "since", "ever", "piece", "told", "usually", "didn't", "friends", "easy",
  "heard", "order", "red", "door", "sure", "become", "top", "ship",
  "across", "today", "during", "short", "better", "best", "however",
  "low", "hours", "black", "products", "happened", "whole", "measure",
  "remember", "early", "waves", "reached", "listen", "wind", "rock",
  "space", "covered", "fast", "several", "hold", "himself", "toward",
  "five", "step", "morning", "passed", "vowel", "true", "hundred",
  "against", "pattern", "numeral", "table", "north", "slowly", "money",
  "map", "farm", "pulled", "draw", "voice", "power", "town", "fine",
  "drive", "sang", "plan", "figure", "star", "box", "noun", "field",
  "rest", "able", "pound", "done", "beauty", "drive", "stood", "contain",
  "front", "teach", "week", "final", "gave", "green", "oh", "quick",
  "develop", "ocean", "warm", "free", "minute", "strong", "special",
  "behind", "clear", "tail", "produce", "fact", "street", "inch", "lot",
  "nothing", "course", "stay", "weight", "force", "blue", "object",
  "decide", "surface", "deep", "moon", "island", "foot", "age", "copy",
  "rule", "among", "noun", "power", "cannot", "able", "six", "size",
  "dark", "ball", "material", "special", "heavy", "fine", "pair", "circle",
  "include", "built", "can't", "matter", "square", "syllables", "perhaps",
  "bill", "felt", "suddenly", "test", "direction", "center", "farmers",
  "ready", "anything", "divided", "general", "energy", "subject", "europe",
  "moon", "region", "return", "believe", "dance", "members", "picked",
  "simple", "cells", "paint", "mind", "love", "cause", "rain", "exercise",
  "eggs", "train", "blue", "wish", "drop", "developed", "window", "difference",
  "distance", "heart", "site", "sum", "summer", "wall", "forest", "probably",
  "legs", "sat", "main", "winter", "wide", "written", "length", "reason",
  "kept", "interest", "arms", "brother", "race", "present", "beautiful",
  "store", "job", "edge", "past", "sign", "record", "finished", "discovered",
  "wild", "happy", "beside", "gone", "sky", "glass", "million", "west",
  "lay", "weather", "root", "instruments", "meet", "third", "months",
  "paragraph", "raised", "represent", "soft", "whether", "clothes",
  "flowers", "shall", "teacher", "held", "describe", "drive", "cross",
  "speak", "solve", "appear", "metal", "son", "either", "ice", "sleep",
  "village", "factors", "result", "jumped", "snow", "ride", "care", "floor",
  "hill", "pushed", "baby", "buy", "century", "outside", "everything",
  "tall", "already", "instead", "phrase", "soil", "bed", "copy", "free",
  "hope", "spring", "case", "laughed", "nation", "quite", "type", "themselves",
  "temperature", "bright", "lead", "everyone", "method", "section",
  "lake", "consonant", "within", "dictionary", "hair", "age", "amount",
  "scale", "pounds", "although", "per", "broken", "moment", "tiny", "possible",
  "gold", "milk", "quiet", "natural", "lot", "stone", "act", "build", "middle",
  "speed", "count", "consonant", "someone", "sail", "rolled", "bear",
  "wonder", "smiled", "angle", "fraction", "africa", "killed", "melody",
  "bottom", "trip", "hole", "poor", "let's", "fight", "surprise", "french",
  "died", "beat", "exactly", "remain", "dress", "iron", "couldn't", "fingers",
  "row", "least", "catch", "climbed", "wrote", "shouted", "continued",
  "itself", "else", "plains", "gas", "england", "burning", "design",
  "joined", "foot", "law", "ears", "glass", "ye", "king", "town",
];

const QUOTES = [
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
  "In the middle of every difficulty lies opportunity. Those who dare to imagine the impossible are the ones who break all human limitations.",
  "Success is not final, failure is not fatal. It is the courage to continue that counts in the end.",
  "Life is what happens when you are busy making other plans. So embrace every moment and live fully and completely.",
  "The future belongs to those who believe in the beauty of their dreams and work tirelessly to achieve them.",
  "It does not matter how slowly you go as long as you do not stop. Progress is progress no matter how small.",
  "Be yourself; everyone else is already taken. Authenticity is your greatest asset and most powerful tool.",
  "Two roads diverged in a wood and I took the one less traveled by, and that has made all the difference.",
  "Whether you think you can or you think you cannot, you are right. Your mindset determines your destiny.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall and moving forward.",
];

function generateWords(count: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]);
  }
  return result;
}

function randomQuote(): string {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

type CharStatus = "correct" | "incorrect" | "extra" | "pending";
type TestMode = "time" | "words" | "quote";
type TimeDuration = 60 | 120 | 180 | 300;
type WordCount = 10 | 25 | 50 | 100;

interface CharData {
  char: string;
  status: CharStatus;
}

interface WordData {
  chars: CharData[];
  typed: string;
}

interface TestResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  duration: number;
}

function useTypingTest(mode: TestMode, timeDuration: TimeDuration, wordCount: WordCount) {
  const [words, setWords] = useState<WordData[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(timeDuration);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const buildWords = useCallback((): WordData[] => {
    let raw: string[] = [];
    if (mode === "time") raw = generateWords(250);
    else if (mode === "words") raw = generateWords(wordCount);
    else raw = randomQuote().split(" ");

    return raw.map((w) => ({
      chars: w.split("").map((c) => ({ char: c, status: "pending" as CharStatus })),
      typed: "",
    }));
  }, [mode, wordCount]);

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setWords(buildWords());
    setCurrentWordIdx(0);
    setCurrentInput("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(timeDuration);
    setElapsed(0);
    setResult(null);
    startTimeRef.current = 0;
  }, [buildWords, timeDuration]);

  useEffect(() => { reset(); }, [reset]);

  useEffect(() => {
    if (!started || finished) return;
    timerRef.current = setInterval(() => {
      if (mode === "time") {
        setTimeLeft((t) => {
          if (t <= 1) { endTest(); return 0; }
          return t - 1;
        });
      } else {
        setElapsed((e) => e + 1);
      }
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, finished, mode]);

  const endTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFinished(true);
    const durationSec = mode === "time" ? timeDuration : (Date.now() - startTimeRef.current) / 1000;
    const mins = Math.max(durationSec / 60, 1/60);

    setWords((prev) => {
      let correctChars = 0;
      let incorrectChars = 0;
      prev.forEach((w, wi) => {
        if (wi >= (mode === "time" ? prev.length : currentWordIdx + 1)) return;
        w.chars.forEach((c) => {
          if (c.status === "correct") correctChars++;
          if (c.status === "incorrect") incorrectChars++;
        });
      });
      const wpm = Math.round(correctChars / 5 / mins);
      const rawWpm = Math.round((correctChars + incorrectChars) / 5 / mins);
      const accuracy = correctChars + incorrectChars === 0 ? 100 : Math.round((correctChars / (correctChars + incorrectChars)) * 100);
      setResult({ wpm, rawWpm, accuracy, correctChars, incorrectChars, duration: Math.round(durationSec) });
      return prev;
    });
  }, [mode, timeDuration, currentWordIdx]);

  const handleInput = useCallback((val: string) => {
    if (finished) return;
    if (!started) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }

    if (val.endsWith(" ")) {
      const typed = val.trimEnd();
      setWords((prev) => {
        const updated = [...prev];
        const w = { ...updated[currentWordIdx] };
        w.typed = typed;
        w.chars = w.chars.map((c, i) => ({
          char: c.char,
          status: i < typed.length
            ? (typed[i] === c.char ? "correct" : "incorrect")
            : "pending",
        }));
        if (typed.length > w.chars.length) {
          const extra = typed.slice(w.chars.length).split("").map((ch) => ({
            char: ch,
            status: "extra" as CharStatus,
          }));
          w.chars = [...w.chars, ...extra];
        }
        updated[currentWordIdx] = w;
        return updated;
      });

      const nextIdx = currentWordIdx + 1;
      if ((mode === "words" || mode === "quote") && nextIdx >= words.length) {
        setCurrentInput("");
        setCurrentWordIdx(nextIdx);
        endTest();
        return;
      }
      setCurrentWordIdx(nextIdx);
      setCurrentInput("");
      return;
    }

    if (val === "" && currentInput === "") {
      if (currentWordIdx > 0) {
        const prevIdx = currentWordIdx - 1;
        setCurrentWordIdx(prevIdx);
        setWords((prev) => {
          const updated = [...prev];
          const w = { ...updated[prevIdx] };
          w.chars = w.chars.slice(0, w.typed.length);
          w.chars = w.typed.split("").map((ch, i) => {
            const original_char = updated[prevIdx].chars[i]?.char ?? ch;
            return {
              char: original_char,
              status: (ch === original_char ? "correct" : "incorrect") as CharStatus,
            };
          });
          updated[prevIdx] = w;
          return updated;
        });
        const prevTyped = words[prevIdx]?.typed ?? "";
        setCurrentInput(prevTyped);
        return;
      }
      return;
    }

    setCurrentInput(val);
    setWords((prev) => {
      const updated = [...prev];
      const w = { ...updated[currentWordIdx] };
      const baseLen = w.chars.filter((c) => c.status !== "extra").length;
      const newChars = w.chars.slice(0, Math.max(baseLen, val.length));
      w.chars = newChars.map((c, i) => {
        if (i >= val.length) return { char: c.char, status: "pending" as CharStatus };
        if (i < baseLen) return { char: c.char, status: (val[i] === c.char ? "correct" : "incorrect") as CharStatus };
        return { char: val[i], status: "extra" as CharStatus };
      });
      if (val.length > baseLen) {
        const extra = val.slice(baseLen).split("").map((ch) => ({ char: ch, status: "extra" as CharStatus }));
        w.chars = [...newChars.slice(0, baseLen), ...extra];
      }
      updated[currentWordIdx] = w;
      return updated;
    });
  }, [currentInput, currentWordIdx, finished, mode, started, words, endTest]);

  return { words, currentWordIdx, currentInput, handleInput, started, finished, timeLeft, elapsed, result, reset };
}

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color?: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-1 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="flex items-center gap-4 px-5 py-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-110 ${
          color === 'emerald' 
            ? 'bg-emerald-500/20 text-emerald-400 shadow-emerald-500/20' 
            : 'bg-blue-500/20 text-blue-400 shadow-blue-500/20'
        }`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{label}</p>
          <p className="text-2xl font-black tracking-tighter text-white">{value}</p>
        </div>
      </div>
      {/* Decorative gradient line */}
      <div className={`absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full ${color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
    </div>
  );
}

function ResultScreen({ result, onRestart }: { result: TestResult; onRestart: () => void }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-900/50 p-8 shadow-2xl md:p-12">
        {/* Animated Background Blobs internally */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500 shadow-2xl shadow-emerald-500/40">
            <FiAward className="text-5xl text-white" />
          </div>

          <h2 className="mb-2 text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">Performance Audit</h2>
          <p className="mb-10 text-xs font-bold uppercase tracking-[0.4em] text-white/30">Session metrics officially recorded</p>

          <div className="mb-10 grid grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/5 bg-white/5 p-8 transition-colors hover:border-emerald-500/30">
              <p className="text-5xl font-black tracking-tighter text-emerald-400 md:text-7xl">{result.wpm}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/20">Words Per Minute</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-white/5 p-8 transition-colors hover:border-blue-500/30">
              <p className="text-5xl font-black tracking-tighter text-blue-400 md:text-7xl">{result.accuracy}%</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/20">Precision Rate</p>
            </div>
          </div>

          <div className="mb-10 flex justify-center gap-8 border-y border-white/5 py-8">
            <div className="text-center">
              <p className="text-lg font-bold text-white">{result.correctChars}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Correct</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-lg font-bold text-red-500">{result.incorrectChars}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Errors</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-lg font-bold text-blue-400">{result.duration}s</p>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Time</p>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="group relative w-full overflow-hidden rounded-2xl bg-white p-5 text-sm font-black uppercase tracking-[0.4em] text-black transition-all hover:scale-[1.02] active:scale-95"
          >
            <span className="relative z-10">Run New Protocol</span>
            <div className="absolute inset-0 -translate-x-full bg-emerald-500 transition-transform duration-500 group-hover:translate-x-0 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TypingTest() {
  const [mode, setMode] = useState<TestMode>("time");
  const [timeDuration, setTimeDuration] = useState<TimeDuration>(60);
  const [wordCount, setWordCount] = useState<WordCount>(25);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);

  const {
    words, currentWordIdx, currentInput, handleInput,
    started, finished, timeLeft, elapsed, result, reset,
  } = useTypingTest(mode, timeDuration, wordCount);

  useEffect(() => { inputRef.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => { if (!finished) inputRef.current?.focus({ preventScroll: true }); }, [finished, words]);
  
  // Removed the scrollIntoView logic that was causing the page to jump/center on the active word.
  // This prevents the "page is gone down" issue reported by the user.

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") { 
      e.preventDefault(); 
      reset(); 
    }
  };

  const progress = mode === "time"
    ? ((timeDuration - timeLeft) / timeDuration) * 100
    : mode === "words"
    ? (currentWordIdx / wordCount) * 100
    : (currentWordIdx / words.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const displayTime = formatTime(mode === "time" ? timeLeft : elapsed);

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden bg-[#020202] text-white font-sans selection:bg-blue-500/30" 
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      {/* Premium Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20 lg:px-12">
        
        {/* Header HUD */}
        <header className="mb-12 flex flex-col items-start justify-between gap-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-3xl md:flex-row md:items-center md:p-10">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 rotate-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-600 shadow-2xl shadow-blue-500/20 transition-transform hover:rotate-0">
               <FiZap className="text-3xl text-white" />
            </div>
            <div>
               <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white md:text-4xl">
                 Zen <span className="text-emerald-500">Typer</span>
               </h1>
               <div className="flex items-center gap-2 mt-1">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Neural Engine Online</p>
               </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
             <div className="flex rounded-2xl border border-white/5 bg-black/40 p-1.5 shadow-inner">
               {(["time", "words", "quote"] as TestMode[]).map((m) => (
                 <button
                   key={m}
                   type="button"
                   className={`rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                     mode === m ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white hover:bg-white/5'
                   }`}
                   onClick={(e) => { e.stopPropagation(); setMode(m); reset(); }}
                 >
                   {m}
                 </button>
               ))}
             </div>

             <div className="flex gap-2">
                {mode === "time" && [60, 120, 180, 300].map((t) => (
                  <button 
                    key={t} 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setTimeDuration(t as TimeDuration); reset(); }} 
                    className={`rounded-xl border px-5 py-2.5 text-[10px] font-black transition-all ${
                      timeDuration === t ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-white/30 hover:border-white/20'
                    }`}
                  >
                    {t/60}m
                  </button>
                ))}
                {mode === "words" && [25, 50, 100].map((w) => (
                  <button 
                    key={w} 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setWordCount(w as WordCount); reset(); }} 
                    className={`rounded-xl border px-5 py-2.5 text-[10px] font-black transition-all ${
                      wordCount === w ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-white/30 hover:border-white/20'
                    }`}
                  >
                    {w}
                  </button>
                ))}
             </div>

             <button 
               onClick={(e) => { e.stopPropagation(); reset(); }}
               type="button"
               className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-white transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-90"
             >
                <FiRotateCcw className="text-xl" />
             </button>
          </div>
        </header>

        {/* HUD Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
            <StatCard label="Time" value={displayTime} icon={<FiClock />} color="blue" />
            <StatCard label="Current WPM" value={Math.round((words.slice(0, currentWordIdx).reduce((a, w) => a + w.chars.filter((c) => c.status === "correct").length, 0) / 5) / Math.max((mode === "time" ? timeDuration - timeLeft : elapsed) / 60, 1/60))} icon={<FiZap />} color="emerald" />
            <StatCard label="Accuracy" value={(() => {
              let correct = 0, total = 0;
              words.slice(0, currentWordIdx).forEach((w) => w.chars.forEach((c) => { if (c.status === "correct" || c.status === "incorrect") { if (c.status === "correct") correct++; total++; } }));
              return total === 0 ? "100%" : `${Math.round((correct / total) * 100)}%`;
            })()} icon={<FiTarget />} color="blue" />
            <StatCard label="Progress" value={`${currentWordIdx}/${words.length}`} icon={<FiWifi />} color="emerald" />
        </div>

        {/* Progress Bar */}
        <div className="mb-12 h-1 overflow-hidden rounded-full bg-white/5">
           <div 
             className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
             style={{ width: `${Math.min(progress, 100)}%` }} 
           />
        </div>

        {/* Typing Canvas */}
        <div className="relative mb-20 min-h-[400px] overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] p-10 backdrop-blur-3xl transition-all hover:bg-white/[0.03] md:p-20">
           {/* Invisible input layer */}
           <input
             ref={inputRef}
             className="absolute top-0 left-0 h-1 w-1 opacity-0 pointer-events-none"
             type="text"
             value={currentInput}
             onChange={(e) => handleInput(e.target.value)}
             onKeyDown={handleKeyDown}
             autoComplete="off"
             spellCheck={false}
             disabled={finished}
             aria-label="Quantum Input"
           />
           
           <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-8" ref={wordsContainerRef}>
              {words.map((word, wi) => {
                const isActive = wi === currentWordIdx;
                return (
                  <span 
                    key={wi} 
                    ref={isActive ? activeWordRef : undefined} 
                    className={`relative flex items-center transition-all duration-500 ${
                      isActive ? 'scale-110' : 'opacity-20 blur-[0.5px]'
                    }`}
                  >
                    {word.chars.map((c, ci) => {
                      const isCursor = isActive && ci === currentInput.length;
                      return (
                        <span 
                          key={ci} 
                          className={`text-2xl font-black md:text-4xl lg:text-5xl relative transition-all duration-200 ${
                            c.status === 'correct' ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 
                            c.status === 'incorrect' ? 'text-red-500 underline decoration-red-500 decoration-4 underline-offset-8' : 
                            c.status === 'extra' ? 'text-blue-400' : 'text-zinc-500'
                          }`}
                        >
                           {isCursor && <span className="absolute -left-1 top-[10%] h-[80%] w-1 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_#3b82f6]"></span>}
                           {c.char}
                        </span>
                      );
                    })}
                    {isActive && currentInput.length >= word.chars.length && (
                      <span className="text-2xl font-black md:text-4xl relative">
                         <span className="absolute -left-1 top-[10%] h-[80%] w-1 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_#3b82f6]"></span>
                         &nbsp;
                      </span>
                    )}
                  </span>
                );
              })}
           </div>
        </div>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 gap-12 border-t border-white/5 pt-20 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-8">
            <h2 className="text-5xl font-black uppercase tracking-tighter italic text-white md:text-7xl leading-none">
              The <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent underline decoration-emerald-500/30">Science</span> of Speed.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-zinc-500">
              Master the art of high-velocity data entry with our aerospace-grade typing infrastructure. 
              Real-time biomechanics analysis and sub-1ms latency processing.
            </p>
            <div className="flex gap-4">
               <div className="rounded-2xl bg-white/5 px-6 py-4 border border-white/5">
                  <p className="text-3xl font-black tracking-tighter text-white">4K</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Render Fidelity</p>
               </div>
               <div className="rounded-2xl bg-white/5 px-6 py-4 border border-white/5">
                  <p className="text-3xl font-black tracking-tighter text-white">Sub-1ms</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Input Response</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { title: "Flow Engine", icon: <FiActivity />, color: "emerald", desc: "Adaptive algorithms that sync with your neurological rhythm." },
              { title: "Dynamic Haptics", icon: <FiZap />, color: "blue", desc: "Digital feedback loop for instantaneous confirmation." },
              { title: "Neural Score", icon: <FiAward />, color: "emerald", desc: "Calculated with deep telemetry for absolute ranking accuracy." }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all hover:bg-white/[0.05] hover:border-white/10">
                 <div className="relative z-10 flex items-center gap-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 shadow-xl shadow-black/40">
                       {item.icon}
                    </div>
                    <div>
                       <h3 className="text-xl font-bold uppercase tracking-tight text-white italic">{item.title}</h3>
                       <p className="mt-1 text-sm font-bold text-zinc-500">{item.desc}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {finished && result && (
        <ResultScreen result={result} onRestart={reset} />
      )}

      <footer className="border-t border-white/5 bg-black/60 py-16 backdrop-blur-xl">
         <div className="container mx-auto px-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-[1em] text-white/20">Zen-Typer Protocol • Advanced Performance Division • 2026</p>
         </div>
      </footer>
    </div>
  );
}

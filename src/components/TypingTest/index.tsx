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
    <div className={`flex items-center gap-3 md:gap-4 bg-white/5 border border-white/10 px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl backdrop-blur-md shadow-xl transition-all hover:scale-105 ${color === 'emerald' ? 'hover:border-emerald-500/50' : 'hover:border-blue-500/50'}`}>
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl shadow-lg ${color === 'emerald' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'}`}>
        {icon}
      </div>
      <div>
        <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-0.5">{label}</div>
        <div className="text-xl md:text-2xl font-black text-white leading-none">{value}</div>
      </div>
    </div>
  );
}

function ResultScreen({ result, onRestart }: { result: TestResult; onRestart: () => void }) {
  return (
    <div className="fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl z-[1000] flex items-center justify-center p-4 md:p-6 animate-in fade-in zoom-in duration-300">
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 w-full max-w-2xl text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>
        
        <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-10 shadow-2xl shadow-emerald-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
          <FiAward className="text-3xl md:text-5xl text-white" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4 italic">Analysis Complete</h2>
        <p className="text-white/40 font-bold uppercase tracking-widest text-[8px] md:text-xs mb-8 md:mb-12">Neural link verified • Biometric data recorded</p>

        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] flex flex-col items-center gap-1 md:gap-2">
            <span className="text-4xl md:text-6xl font-black text-emerald-500 tracking-tighter">{result.wpm}</span>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Total WPM</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] flex flex-col items-center gap-1 md:gap-2">
            <span className="text-4xl md:text-6xl font-black text-blue-500 tracking-tighter">{result.accuracy}%</span>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Accuracy</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
           <div className="bg-white/5 py-3 md:py-4 rounded-xl md:rounded-2xl flex flex-col">
              <span className="text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-widest">Correct</span>
              <span className="text-base md:text-lg font-black text-emerald-400">{result.correctChars}</span>
           </div>
           <div className="bg-white/5 py-3 md:py-4 rounded-xl md:rounded-2xl flex flex-col">
              <span className="text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-widest">Errors</span>
              <span className="text-base md:text-lg font-black text-red-500">{result.incorrectChars}</span>
           </div>
           <div className="bg-white/5 py-3 md:py-4 rounded-xl md:rounded-2xl flex flex-col">
              <span className="text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-widest">Time</span>
              <span className="text-base md:text-lg font-black text-blue-400">{result.duration}s</span>
           </div>
        </div>

        <button 
          onClick={onRestart}
          className="w-full py-4 md:py-6 bg-[#10b981] text-white rounded-[1.5rem] md:rounded-[2rem] text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.5em] hover:bg-emerald-400 transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/20 active:scale-95"
        >
          Initiate New Sequence
        </button>
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

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { if (!finished) inputRef.current?.focus(); }, [finished, words]);
  useEffect(() => { activeWordRef.current?.scrollIntoView({ block: "center", behavior: "smooth" }); }, [currentWordIdx]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") { e.preventDefault(); reset(); }
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
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-emerald-500/30 overflow-x-hidden mt-10 md:mt-0" onClick={() => inputRef.current?.focus()}>
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[150px] rounded-full animate-pulse"></div>
      </div>

      <main className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-6 md:py-10 max-w-7xl mx-auto">
        
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6 md:gap-8 bg-white/5 backdrop-blur-2xl border border-white/10 p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] mb-8 md:mb-12 shadow-2xl">
           <div className="flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl shadow-2xl shadow-emerald-500/20 rotate-6">
                 <FiZap className="text-white" />
              </div>
              <div>
                 <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase leading-none italic text-white leading-tight">Quantum <span className="text-emerald-500">Typing</span> Engine</h1>
                 <p className="text-white/20 text-[7px] md:text-[9px] font-black tracking-[0.4em] uppercase mt-1">Neural Speed Test Protocol</p>
              </div>
           </div>

           <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <div className="flex bg-black/40 p-1 rounded-xl md:rounded-2xl border border-white/10 shadow-inner overflow-x-auto no-scrollbar max-w-full">
                {(["time", "words", "quote"] as TestMode[]).map((m) => (
                  <button
                    key={m}
                    className={`px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all whitespace-nowrap ${mode === m ? 'bg-emerald-500 text-white shadow-lg' : 'text-white/30 hover:text-white'}`}
                    onClick={() => { setMode(m); reset(); }}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                 {mode === "time" && [60, 120, 180, 300].map((t) => (
                   <button key={t} onClick={() => { setTimeDuration(t as TimeDuration); reset(); }} className={`px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black border transition-all ${timeDuration === t ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-white/30 hover:border-white/40'}`}>
                     {t/60}M
                   </button>
                 ))}
                 {mode === "words" && [25, 50, 100].map((w) => (
                   <button key={w} onClick={() => { setWordCount(w as WordCount); reset(); }} className={`px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black border transition-all ${wordCount === w ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-white/30 hover:border-white/40'}`}>
                     {w}
                   </button>
                 ))}
              </div>

              <button 
                onClick={reset}
                className="w-10 h-10 md:w-14 md:h-14 bg-red-500 hover:bg-red-600 rounded-xl md:rounded-2xl flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-90 shadow-lg shadow-red-500/20"
                title="RESTART SYSTEM (TAB)"
              >
                 <FiRotateCcw />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            <StatCard label="Time Remaining" value={displayTime} icon={<FiClock />} color="blue" />
            <StatCard label="WPM Flow" value={Math.round((words.slice(0, currentWordIdx).reduce((a, w) => a + w.chars.filter((c) => c.status === "correct").length, 0) / 5) / Math.max((mode === "time" ? timeDuration - timeLeft : elapsed) / 60, 1/60))} icon={<FiZap />} color="emerald" />
            <StatCard label="Accuracy" value={(() => {
              let correct = 0, total = 0;
              words.slice(0, currentWordIdx).forEach((w) => w.chars.forEach((c) => { if (c.status === "correct" || c.status === "incorrect") { if (c.status === "correct") correct++; total++; } }));
              return total === 0 ? "100%" : `${Math.round((correct / total) * 100)}%`;
            })()} icon={<FiTarget />} color="blue" />
            <StatCard label="Neural Load" value={`${currentWordIdx}/${words.length}`} icon={<FiWifi />} color="emerald" />
        </div>

        <div className="w-full h-1 bg-white/5 rounded-full mb-8 md:mb-12 overflow-hidden">
           <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-500 shadow-[0_0_15px_#10b981]" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>

        <div className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[4rem] p-6 md:p-12 lg:p-20 shadow-2xl min-h-[300px] md:min-h-[450px] flex flex-col justify-center overflow-hidden">
           <div className="absolute top-0 right-0 p-6 md:p-12 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
              <FiType className="text-[150px] md:text-[300px]" />
           </div>

           <div className="flex flex-wrap gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-6 relative z-20" ref={wordsContainerRef}>
              {words.map((word, wi) => {
                const isActive = wi === currentWordIdx;
                return (
                  <span key={wi} ref={isActive ? activeWordRef : undefined} className={`relative flex items-center transition-all duration-300 ${isActive ? 'bg-emerald-500/10 px-3 md:px-4 py-1 md:py-2 rounded-xl md:rounded-2xl scale-110 shadow-2xl shadow-emerald-500/20' : 'opacity-40'}`}>
                    {word.chars.map((c, ci) => {
                      const isCursor = isActive && ci === currentInput.length;
                      return (
                        <span key={ci} className={`text-lg md:text-2xl lg:text-3xl font-black relative transition-colors duration-200 ${c.status === 'correct' ? 'text-emerald-400' : c.status === 'incorrect' ? 'text-red-500 underline underline-offset-4 md:underline-offset-8' : c.status === 'extra' ? 'text-blue-400' : 'text-white'}`}>
                           {isCursor && <span className="absolute -left-0.5 md:-left-1 top-[10%] w-[2px] md:w-[3px] h-[80%] bg-emerald-500 animate-pulse rounded-full shadow-[0_0_10px_#10b981]"></span>}
                           {c.char}
                        </span>
                      );
                    })}
                    {isActive && currentInput.length >= word.chars.length && (
                      <span className="text-lg md:text-2xl lg:text-3xl font-black relative">
                         <span className="absolute -left-0.5 md:-left-1 top-[10%] w-[2px] md:w-[3px] h-[80%] bg-emerald-500 animate-pulse rounded-full shadow-[0_0_10px_#10b981]"></span>
                         &nbsp;
                      </span>
                    )}
                  </span>
                );
              })}
           </div>

           <input
             ref={inputRef}
             className="absolute inset-0 opacity-0 cursor-default"
             type="text"
             value={currentInput}
             onChange={(e) => handleInput(e.target.value)}
             onKeyDown={handleKeyDown}
             autoComplete="off"
             spellCheck={false}
             disabled={finished}
             aria-label="Quantum Input"
           />
        </div>

        <div className="mt-8 md:mt-12 flex flex-col items-center gap-4 md:gap-6">
           <div className="flex gap-6 md:gap-10">
              <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] md:tracking-[0.3em] text-center md:text-left">
                 <kbd className="bg-white/10 px-2 md:px-3 py-1 rounded-lg border border-white/10 text-white/40">TAB</kbd> RESET
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] md:tracking-[0.3em] text-center md:text-left">
                 <kbd className="bg-white/10 px-2 md:px-3 py-1 rounded-lg border border-white/10 text-white/40">SPACE</kbd> NEXT
              </div>
           </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-32 pt-12 md:pt-20 border-t border-white/5">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter max-w-xl leading-none italic uppercase">
              The <span className="text-[#10b981]">Next Generation</span> of Mastery.
            </h2>
            <div className="p-8 md:p-12 bg-white shadow-2xl rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 text-black">
               <h4 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight uppercase">Scientific Analytics</h4>
               <p className="text-gray-500 leading-relaxed text-base md:text-lg mb-8 md:mb-10 font-medium">
                  Measure your speed with professional accuracy. Zero Latency engine provides an immersive high-fidelity experience.
               </p>
               <div className="grid grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-2 md:space-y-3">
                     <div className="text-emerald-500 font-black text-3xl md:text-5xl tracking-tighter">HD 4K</div>
                     <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">High Fidelity</div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                     <div className="text-blue-600 font-black text-3xl md:text-5xl tracking-tighter">AES</div>
                     <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Secure Processing</div>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 justify-center">
            {[
              { title: "Dynamic Flow", icon: <FiActivity />, color: "emerald", desc: "Engine adapts to your typing rhythm for maximum productivity." },
              { title: "Quantum Feedback", icon: <FiZap />, color: "blue", desc: "Sub-1ms visual response time loop." },
              { title: "Certification", icon: <FiAward />, color: "emerald", desc: "Standardized WPM scoring recognized by elite teams." }
            ].map((item, i) => (
              <div key={i} className={`group bg-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 hover:border-emerald-500/30 transition-all duration-500 shadow-xl`}>
                 <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 flex items-center gap-4 md:gap-6">
                    <span className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-500 shadow-lg group-hover:bg-emerald-500 group-hover:text-white transition-all">{item.icon}</span>
                    <span className="uppercase tracking-tighter italic">{item.title}</span>
                 </h3>
                 <p className="text-white/30 leading-relaxed font-bold text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {finished && result && (
        <ResultScreen result={result} onRestart={reset} />
      )}

      <footer className="p-12 md:p-16 text-center border-t border-white/5 bg-black mt-12 md:mt-20">
         <p className="text-[8px] md:text-[10px] font-black text-emerald-500/30 uppercase tracking-[0.5em] md:tracking-[1em]">Engineered for Absolute Performance • 2026</p>
      </footer>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────
//  Word bank
// ─────────────────────────────────────────
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
  "nothing", "course", "stay", "wheel", "full", "force", "blue", "object",
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

// ─────────────────────────────────────────
//  Quotes for quote mode
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
//  Types
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
//  Hook: useTypingTest
// ─────────────────────────────────────────
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

  // Build word list
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

  // Timer
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, finished, mode]);

  const endTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFinished(true);
    const durationSec = mode === "time" ? timeDuration : (Date.now() - startTimeRef.current) / 1000;
    const mins = durationSec / 60;

    setWords((prev) => {
      let correctChars = 0;
      let incorrectChars = 0;
      let correctWords = 0;
      prev.forEach((w, wi) => {
        if (wi >= (mode === "time" ? prev.length : currentWordIdx + 1)) return;
        w.chars.forEach((c) => {
          if (c.status === "correct") correctChars++;
          if (c.status === "incorrect") incorrectChars++;
        });
        const allCorrect = w.chars.every((c) => c.status === "correct") && w.typed === w.chars.map((c) => c.char).join("");
        if (allCorrect) correctWords++;
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

    // Space → advance word
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
        // Extra chars
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

    // Backspace on empty → go back
    if (val === "" && currentInput === "") {
      if (currentWordIdx > 0) {
        const prevIdx = currentWordIdx - 1;
        setCurrentWordIdx(prevIdx);
        setWords((prev) => {
          const updated = [...prev];
          const w = { ...updated[prevIdx] };
          // restore original chars, remove extras
          const original = updated[prevIdx].typed;
          w.chars = w.chars.slice(0, w.typed.length);
          // revert to original
          const sourceChars = (mode === "quote"
            ? randomQuote().split(" ")[prevIdx]
            : WORD_BANK[0]).split(""); // not used
          // just roll back to typed
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
    // Live update current word chars
    setWords((prev) => {
      const updated = [...prev];
      const w = { ...updated[currentWordIdx] };
      const baseLen = w.chars.filter((c) => c.status !== "extra").length;
      // If typed shorter than word
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

// ─────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="typing-stat-card">
      <span className="typing-stat-label">{label}</span>
      <span className="typing-stat-value">{value}</span>
      {sub && <span className="typing-stat-sub">{sub}</span>}
    </div>
  );
}

function ResultScreen({ result, onRestart }: { result: TestResult; onRestart: () => void }) {
  return (
    <div className="typing-result-overlay">
      <div className="typing-result-box">
        <h2 className="typing-result-title">Test Complete!</h2>
        <div className="typing-result-grid">
          <div className="typing-result-main">
            <span className="typing-result-wpm">{result.wpm}</span>
            <span className="typing-result-wpm-label">WPM</span>
          </div>
          <div className="typing-result-main">
            <span className="typing-result-wpm" style={{ color: "var(--typing-accent-2)" }}>{result.accuracy}%</span>
            <span className="typing-result-wpm-label">Accuracy</span>
          </div>
        </div>
        <div className="typing-result-details">
          <div className="typing-result-detail">
            <span>Raw WPM</span><span>{result.rawWpm}</span>
          </div>
          <div className="typing-result-detail">
            <span>Correct</span><span style={{ color: "var(--typing-correct)" }}>{result.correctChars}</span>
          </div>
          <div className="typing-result-detail">
            <span>Errors</span><span style={{ color: "var(--typing-incorrect)" }}>{result.incorrectChars}</span>
          </div>
          <div className="typing-result-detail">
            <span>Duration</span><span>{result.duration}s</span>
          </div>
        </div>
        <button className="typing-restart-btn" onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────
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

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Re-focus on reset
  useEffect(() => {
    if (!finished) inputRef.current?.focus();
  }, [finished, words]);

  // Scroll active word into view
  useEffect(() => {
    activeWordRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [currentWordIdx]);

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
    <div className="typing-root" onClick={() => inputRef.current?.focus()}>
      {/* Styles */}
      <style>{`
        :root {
          --typing-bg: #1a1a2e;
          --typing-surface: #16213e;
          --typing-card: #0f3460;
          --typing-accent: #e94560;
          --typing-accent-2: #533483;
          --typing-text: #cdd6f4;
          --typing-muted: #6c7086;
          --typing-correct: #a6e3a1;
          --typing-incorrect: #f38ba8;
          --typing-extra: #fab387;
          --typing-cursor: #e94560;
          --typing-active-bg: rgba(233,69,96,0.08);
          --typing-border: rgba(255,255,255,0.07);
        }

        .typing-root {
          min-height: 100vh;
          background: var(--typing-bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1.5rem 4rem;
          font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
          cursor: text;
        }

        .typing-hero {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .typing-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(233,69,96,0.15);
          border: 1px solid rgba(233,69,96,0.3);
          border-radius: 99px;
          padding: 0.35rem 1rem;
          font-size: 0.75rem;
          color: var(--typing-accent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .typing-hero h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, #fff 0%, var(--typing-accent) 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }

        .typing-hero p {
          color: var(--typing-muted);
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        /* Controls */
        .typing-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .typing-mode-group {
          display: flex;
          background: var(--typing-surface);
          border: 1px solid var(--typing-border);
          border-radius: 12px;
          overflow: hidden;
        }

        .typing-mode-btn {
          padding: 0.55rem 1.25rem;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          background: transparent;
          border: none;
          color: var(--typing-muted);
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .typing-mode-btn:hover { color: var(--typing-text); }
        .typing-mode-btn.active {
          background: var(--typing-accent);
          color: white;
        }

        .typing-divider {
          width: 1px;
          height: 2rem;
          background: var(--typing-border);
        }

        .typing-opt-btn {
          padding: 0.55rem 0.9rem;
          font-size: 0.82rem;
          font-weight: 600;
          background: var(--typing-surface);
          border: 1px solid var(--typing-border);
          border-radius: 10px;
          color: var(--typing-muted);
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .typing-opt-btn:hover { color: var(--typing-text); border-color: rgba(255,255,255,0.2); }
        .typing-opt-btn.active {
          color: var(--typing-accent);
          border-color: var(--typing-accent);
          background: rgba(233,69,96,0.1);
        }

        /* Stats bar */
        .typing-stats-bar {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .typing-timer {
          font-size: 3rem;
          font-weight: 700;
          color: var(--typing-accent);
          min-width: 5ch;
          text-align: center;
          line-height: 1;
          transition: color 0.3s;
        }
        .typing-timer.warning { color: #f38ba8; animation: timerPulse 0.5s ease infinite alternate; }
        @keyframes timerPulse { from { opacity: 1; } to { opacity: 0.5; } }

        .typing-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
        }
        .typing-stat-label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--typing-muted); }
        .typing-stat-value { font-size: 1.4rem; font-weight: 700; color: var(--typing-text); }
        .typing-stat-sub { font-size: 0.65rem; color: var(--typing-muted); }

        /* Progress bar */
        .typing-progress-track {
          width: 100%;
          max-width: 800px;
          height: 3px;
          background: var(--typing-surface);
          border-radius: 99px;
          margin-bottom: 1rem;
          overflow: hidden;
        }
        .typing-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--typing-accent), var(--typing-accent-2));
          border-radius: 99px;
          transition: width 0.3s ease;
        }

        /* Word display */
        .typing-words-wrapper {
          width: 100%;
          max-width: 800px;
          position: relative;
        }

        .typing-words-container {
          background: var(--typing-surface);
          border: 1px solid var(--typing-border);
          border-radius: 16px;
          padding: 2rem;
          height: 260px;
          overflow: hidden;
          position: relative;
          cursor: text;
        }

        .typing-words-inner {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 0.8rem;
          align-content: flex-start;
        }

        .typing-word {
          display: inline-flex;
          position: relative;
          padding: 2px 0;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .typing-word.active { background: var(--typing-active-bg); }
        .typing-word.active::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--typing-accent);
          border-radius: 99px;
        }

        .typing-char {
          font-size: 1.3rem;
          line-height: 1.6;
          color: var(--typing-muted);
          position: relative;
          transition: color 0.08s;
        }
        .typing-char.correct { color: var(--typing-correct); }
        .typing-char.incorrect { color: var(--typing-incorrect); text-decoration: underline; text-decoration-color: var(--typing-incorrect); }
        .typing-char.extra { color: var(--typing-extra); }

        /* Cursor */
        .typing-char.cursor::before {
          content: '';
          position: absolute;
          left: -2px;
          top: 10%;
          height: 80%;
          width: 2px;
          background: var(--typing-cursor);
          border-radius: 99px;
          animation: blink 0.8s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        /* Fade edges */
        .typing-words-container::before,
        .typing-words-container::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 40px;
          pointer-events: none;
          z-index: 1;
        }
        .typing-words-container::before { top: 0; background: linear-gradient(180deg, var(--typing-surface), transparent); }
        .typing-words-container::after { bottom: 0; background: linear-gradient(0deg, var(--typing-surface), transparent); }

        /* Hidden input */
        .typing-hidden-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          top: 0; left: 0;
          width: 1px; height: 1px;
        }

        /* Restart hint */
        .typing-hint {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.78rem;
          color: var(--typing-muted);
          font-family: 'Inter', sans-serif;
        }
        .typing-hint kbd {
          display: inline-block;
          padding: 0.15rem 0.4rem;
          background: var(--typing-surface);
          border: 1px solid var(--typing-border);
          border-radius: 4px;
          font-size: 0.72rem;
        }

        /* Result overlay */
        .typing-result-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26, 26, 46, 0.9);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

        .typing-result-box {
          background: var(--typing-surface);
          border: 1px solid var(--typing-border);
          border-radius: 24px;
          padding: 2.5rem;
          width: min(480px, 90vw);
          text-align: center;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .typing-result-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--typing-text);
          margin: 0 0 1.5rem;
          font-family: 'Inter', sans-serif;
        }

        .typing-result-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .typing-result-main {
          background: var(--typing-bg);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .typing-result-wpm {
          font-size: 3rem;
          font-weight: 800;
          color: var(--typing-accent);
          line-height: 1;
        }
        .typing-result-wpm-label {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--typing-muted);
          font-family: 'Inter', sans-serif;
        }

        .typing-result-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
        }

        .typing-result-detail {
          background: var(--typing-bg);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          font-family: 'Inter', sans-serif;
        }
        .typing-result-detail span:first-child { color: var(--typing-muted); }
        .typing-result-detail span:last-child { color: var(--typing-text); font-weight: 600; }

        .typing-restart-btn {
          width: 100%;
          padding: 0.9rem;
          background: var(--typing-accent);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.03em;
        }
        .typing-restart-btn:hover {
          background: #c73652;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(233,69,96,0.4);
        }

        /* Leaderboard / Tips */
        .typing-tips {
          width: 100%;
          max-width: 800px;
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .typing-tip-card {
          background: var(--typing-surface);
          border: 1px solid var(--typing-border);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          font-family: 'Inter', sans-serif;
        }

        .typing-tip-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .typing-tip-card h3 {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--typing-text);
          margin: 0 0 0.3rem;
        }
        .typing-tip-card p {
          font-size: 0.78rem;
          color: var(--typing-muted);
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .typing-words-container { padding: 1.25rem; height: 180px; }
          .typing-char { font-size: 1.1rem; }
          .typing-result-grid { grid-template-columns: 1fr; }
          .typing-result-details { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div className="typing-hero">
        <div className="typing-hero-badge">⌨️ Speed Test</div>
        <h1>Typing Speed Test</h1>
        <p>Measure your WPM, track accuracy, and improve your typing skills.</p>
      </div>

      {/* Mode Controls */}
      <div className="typing-controls">
        <div className="typing-mode-group">
          {(["time", "words", "quote"] as TestMode[]).map((m) => (
            <button
              key={m}
              className={`typing-mode-btn${mode === m ? " active" : ""}`}
              onClick={() => { setMode(m); reset(); }}
            >
              {m === "time" ? "⏱ Time" : m === "words" ? "📝 Words" : "💬 Quote"}
            </button>
          ))}
        </div>

        <div className="typing-divider" />

        {mode === "time" && (
          <>
            {([60, 120, 180, 300] as TimeDuration[]).map((t) => (
              <button
                key={t}
                className={`typing-opt-btn${timeDuration === t ? " active" : ""}`}
                onClick={() => { setTimeDuration(t); reset(); }}
              >{t / 60}m</button>
            ))}
          </>
        )}

        {mode === "words" && (
          <>
            {([10, 25, 50, 100] as WordCount[]).map((w) => (
              <button
                key={w}
                className={`typing-opt-btn${wordCount === w ? " active" : ""}`}
                onClick={() => { setWordCount(w); reset(); }}
              >{w}</button>
            ))}
          </>
        )}

        {mode === "quote" && (
          <button className="typing-opt-btn" onClick={reset}>New Quote</button>
        )}

        <div className="typing-divider" />
        <button className="typing-opt-btn" onClick={reset} title="Restart (Tab)">↺ Restart</button>
      </div>

      {/* Stats Bar */}
      <div className="typing-stats-bar">
        <div className={`typing-timer${mode === "time" && timeLeft <= 5 && started ? " warning" : ""}`}>
          {displayTime}
        </div>
        {started && (
          <>
            <StatCard label="WPM" value={Math.round(
              (words.slice(0, currentWordIdx).reduce((a, w) =>
                a + w.chars.filter((c) => c.status === "correct").length, 0) / 5) /
              Math.max((mode === "time" ? timeDuration - timeLeft : elapsed) / 60, 1/60)
            )} />
            <StatCard label="Accuracy" value={(() => {
              let correct = 0, total = 0;
              words.slice(0, currentWordIdx).forEach((w) =>
                w.chars.forEach((c) => {
                  if (c.status === "correct" || c.status === "incorrect") {
                    if (c.status === "correct") correct++;
                    total++;
                  }
                })
              );
              return total === 0 ? "100%" : `${Math.round((correct / total) * 100)}%`;
            })()} />
            <StatCard label="Words" value={`${currentWordIdx}/${words.length}`} />
          </>
        )}
      </div>

      {/* Progress */}
      <div className="typing-progress-track" style={{ width: "100%", maxWidth: 800 }}>
        <div className="typing-progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>

      {/* Word Display */}
      <div className="typing-words-wrapper">
        <div className="typing-words-container" onClick={() => inputRef.current?.focus()}>
          {/* Tracks scroll to active word */}
          <div className="typing-words-inner" ref={wordsContainerRef}>
            {words.map((word, wi) => {
              const isActive = wi === currentWordIdx;
              const isDone = wi < currentWordIdx;
              let typedLen = isActive ? currentInput.length : word.typed.length;

              // Determine cursor position character index
              let cursorIdx = isActive ? currentInput.length : (isDone ? -1 : -1);

              return (
                <span
                  key={wi}
                  ref={isActive ? activeWordRef : undefined}
                  className={`typing-word${isActive ? " active" : ""}`}
                >
                  {word.chars.map((c, ci) => {
                    const isCursor = isActive && ci === cursorIdx;
                    return (
                      <span
                        key={ci}
                        className={[
                          "typing-char",
                          c.status !== "pending" ? c.status : "",
                          isCursor ? "cursor" : "",
                        ].filter(Boolean).join(" ")}
                      >
                        {c.char}
                      </span>
                    );
                  })}
                  {/* Cursor at end of word if beyond all chars */}
                  {isActive && cursorIdx >= word.chars.length && (
                    <span className="typing-char cursor"> </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Hidden real input */}
        <input
          ref={inputRef}
          className="typing-hidden-input"
          type="text"
          value={currentInput}
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={finished}
          aria-label="Typing input"
        />
      </div>

      {/* Hint */}
      <p className="typing-hint">
        Press <kbd>Tab</kbd> to restart &nbsp;·&nbsp; <kbd>Space</kbd> to advance word
      </p>

      {/* Results */}
      {finished && result && (
        <ResultScreen result={result} onRestart={reset} />
      )}

      {/* Tips */}
      <div className="typing-tips">
        {[
          { icon: "🎯", title: "Focus on Accuracy", desc: "Accuracy is more important than speed. Errors slow you down." },
          { icon: "🧘", title: "Stay Relaxed", desc: "Keep your fingers relaxed and hover naturally over home row keys." },
          { icon: "👀", title: "Look Ahead", desc: "Read 2–3 words ahead of where you're typing to maintain rhythm." },
          { icon: "⚡", title: "Practice Daily", desc: "Even 10 minutes a day of focused practice improves speed significantly." },
        ].map((tip, i) => (
          <div key={i} className="typing-tip-card">
            <span className="typing-tip-icon">{tip.icon}</span>
            <div>
              <h3>{tip.title}</h3>
              <p>{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

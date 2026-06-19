// TypeRacerGame.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useWindowKey } from "./useWindowKey";
import Timer from "./timer";
import Bg from "../assets/background.jpg";

const PHRASES = [
  "The quick brown fox jumps over the lazy dog.",
  "React hooks let you use state and other features without writing a class.",
  "Clean code always looks like it was written by someone who cares.",
  "Programs must be written for people to read, and only incidentally for machines to execute.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
];

function getRandomPhrase() {
  return PHRASES[Math.floor(Math.random() * PHRASES.length)];
}

function calcWPM(startMs, charCount) {
  const minutes = (Date.now() - startMs) / 60_000;
  return Math.round(charCount / 5 / minutes);
}

export default function TypeRacerGame() {
  const [phrase, setPhrase] = useState(getRandomPhrase);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [phrase]);

  useEffect(() => {
    if (status === "playing" && input === phrase) {
      setWpm(calcWPM(startTimeRef.current, phrase.length));
      setStatus("finished");
    }
  }, [input, phrase, status]);

  const reset = useCallback(() => {
    setPhrase(getRandomPhrase());
    setInput("");
    setStatus("idle");
    setWpm(0);
    startTimeRef.current = null;
  }, []);

  useWindowKey("Escape", reset);

  const handleChange = (e) => {
    const value = e.target.value;
    if (status === "idle") {
      startTimeRef.current = Date.now();
      setStatus("playing");
    }
    if (status !== "finished") setInput(value);
  };

  const charStatuses = phrase.split("").map((char, i) => {
    if (i >= input.length) return "pending";
    return input[i] === char ? "correct" : "wrong";
  });

  const progress =
    status === "finished"
      ? 100
      : Math.round((input.length / phrase.length) * 100);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 font-mono"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* ── Outer column ── */}
      <div className="w-full max-w-4xl flex flex-col gap-4">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800">
          Type<span className="text-[#6a9a0f]">Racers</span>
        </h1>

        {/* ── Two-column on md+, stacked on mobile ── */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch">

          {/* ── Game card ── */}
          <div
            className="flex-1 rounded-2xl p-5 sm:p-8 shadow-xl ring-1 ring-black/5 flex flex-col"
            style={{  }}
          >
            {/* Target phrase */}
            <div
              aria-label="Target phrase"
              className="text-base sm:text-lg leading-relaxed tracking-wide mb-6 select-none"
            >
              {charStatuses.map((s, i) => (
                <span
                  key={i}
                  className={
                    s === "correct"
                      ? "text-[#5a8a0a]"
                      : s === "wrong"
                        ? "text-red-500 bg-red-100 rounded"
                        : "text-zinc-400"
                  }
                >
                  {phrase[i]}
                </span>
              ))}
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              disabled={status === "finished"}
              placeholder={status === "idle" ? "Start typing…" : ""}
              spellCheck={false}
              autoComplete="off"
              className={`
                w-full bg-transparent border-b-2 pb-1 text-base sm:text-lg outline-none
                text-zinc-800 placeholder-zinc-400 caret-[#6a9a0f]
                transition-colors duration-150
                ${status === "finished"
                  ? "border-[#6a9a0f]"
                  : "border-zinc-300 focus:border-[#6a9a0f]"}
              `}
            />

            {/* Status bar */}
            <div className="mt-6 flex items-center justify-between min-h-[2.5rem]">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === "idle"
                      ? "bg-zinc-300"
                      : status === "playing"
                        ? "bg-[#6a9a0f] animate-pulse"
                        : "bg-[#6a9a0f]"
                  }`}
                />
                <span className="text-xs text-zinc-500 tracking-widest uppercase">
                  {status}
                </span>
              </div>
              <span className="text-xs text-zinc-400 tracking-wider">
                {status === "idle" ? "esc to reset" : `${progress}%`}
              </span>
            </div>

            {/* Controls */}
            <div className="mt-auto pt-6 flex flex-wrap gap-3">
              <button
                onClick={reset}
                className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors
                           px-4 py-2 rounded-lg ring-1 ring-zinc-300 hover:ring-zinc-400
                           tracking-widest uppercase"
              >
                ↺ reset
              </button>
              {status === "finished" && (
                <button
                  onClick={reset}
                  className="text-xs text-white bg-[#6a9a0f] hover:bg-[#5a8a0a]
                             transition-colors px-4 py-2 rounded-lg
                             tracking-widest uppercase font-semibold"
                >
                  next phrase →
                </button>
              )}
            </div>
          </div>

          {/* ── Timer panel ──
               On mobile: full width row of two stat boxes side by side
               On md+: fixed 208px sidebar                              ── */}
          <div className="w-full md:w-52 md:shrink-0">
            <Timer status={status} wpm={wpm} input={input} phrase={phrase} />
          </div>

        </div>
      </div>
    </div>
  );
}
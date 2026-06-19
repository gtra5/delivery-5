import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const hooks = [
  {
    label: "useState",
    summary: "reactive state values",
    detail: <>Manages <code>input</code>, <code>status</code>, <code>wpm</code>, and <code>phrase</code> all values that trigger a re-render when they change. Any setter call schedules React to diff and repaint.</>,
  },
  {
    label: "useEffect",
    summary: "side effect after render",
    detail: <>Runs the game-over check after every input change. Lives outside the render path so it never blocks painting  fires once React is done updating the DOM.</>,
  },
  {
    label: "useRef (DOM)",
    summary: "direct DOM access",
    detail: <><code>inputRef</code> holds the text input element so we can call <code>.focus()</code> imperatively without lifting state or triggering any re-render.</>,
  },
  {
    label: "useRef (value)",
    summary: "mutable, render-invisible",
    detail: <><code>startTimeRef</code> stores the start timestamp. Mutating <code>.current</code> never schedules a re-render perfect for values React doesn't need to track.</>,
  },
  {
    label: "useWindowKey",
    summary: "custom hook",
    detail: <>Attaches a <code>keydown</code> listener to <code>window</code>. Pressing Escape resets the game. Cleaned up automatically on unmount.</>,
  },
];

export function HooksAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <div className="w-full bg-black">
      {/* header */}
      <div className="flex items-center justify-between px-8 py-7 border-b border-zinc-900">
        <span className="font-mono text-[11px] tracking-widest text-zinc-600 uppercase">
          React hooks
        </span>
        <span className="font-mono text-[11px] text-zinc-700">
          0{hooks.length} hooks
        </span>
      </div>

      {/* rows */}
      {hooks.map(({ label, summary, detail }, i) => {
        const isOpen = open === label;
        return (
          <div key={label} className="border-b border-zinc-900 last:border-none">
            <button
              className="flex w-full items-center gap-0 px-8 min-h-[64px] text-left hover:bg-zinc-950 transition-colors"
              onClick={() => setOpen(isOpen ? null : label)}
            >
              <span className="w-12 shrink-0 font-mono text-[11px] text-zinc-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="w-44 shrink-0 font-mono text-[13px] font-medium text-white">
                {label}
              </span>
              <span className="flex-1 text-[13px] text-zinc-600">
                {summary}
              </span>
              <span className="w-8 flex justify-end text-zinc-600">
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>

            {isOpen && (
              <p className="pb-6 pl-20 pr-8 text-[13px] text-zinc-500 leading-[1.75] max-w-2xl">
                {detail}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
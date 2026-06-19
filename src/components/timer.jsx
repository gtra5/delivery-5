// timer.jsx
import { useEffect, useRef } from "react";
import HeroBg from "../assets/rm222-mind-25.jpg"
export default function Timer({ status, wpm, input, phrase }) {
  const canvasRef = useRef(null);

  const accuracy =
    input.length === 0
      ? 100
      : Math.round(
          (input.split("").filter((ch, i) => ch === phrase[i]).length /
            input.length) *
            100
        );

  const elapsed = useRef(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const displayRef = useRef({ mm: "0", ss: "00" });

  useEffect(() => {
    if (status === "playing") {
      startRef.current = Date.now() - elapsed.current;
      timerRef.current = setInterval(() => {
        elapsed.current = Date.now() - startRef.current;
        const totalSec = Math.floor(elapsed.current / 1000);
        displayRef.current = {
          mm: String(Math.floor(totalSec / 60)),
          ss: String(totalSec % 60).padStart(2, "0"),
        };
        drawCanvas();
      }, 100);
    } else {
      clearInterval(timerRef.current);
      if (status === "idle") {
        elapsed.current = 0;
        displayRef.current = { mm: "0", ss: "00" };
      }
    }
    return () => clearInterval(timerRef.current);
  }, [status]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const r = W / 2 - 6;
    ctx.clearRect(0, 0, W, H);

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#e4e4e7";
    ctx.lineWidth = 5;
    ctx.stroke();

    const pct = accuracy / 100;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
    ctx.strokeStyle = "#6a9a0f";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  useEffect(() => {
    drawCanvas();
  }, [accuracy]);

  const { mm, ss } = displayRef.current;

  return (
    <div
      className="w-full h-full rounded-2xl font-mono select-none ring-1 ring-black/5
                 flex flex-col md:flex-col"
      style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(12px)",
         backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
       }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-zinc-100 text-[11px] tracking-widest">
        <span className="text-zinc-400 uppercase">
          Best{" "}
          <span className="text-[#6a9a0f] font-bold ml-1">
            {wpm > 0 ? wpm : 0}
          </span>{" "}
          <span className="text-zinc-400">wpm</span>
        </span>
        <span className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              status === "playing" ? "bg-[#6a9a0f]" : "bg-zinc-300"
            }`}
          />
          <span className="text-base font-bold tracking-tight text-zinc-800">
            {mm}:{ss}
          </span>
        </span>
      </div>

      {/* ── Stats row — side by side on mobile, stacked on md+ ── */}
      <div className="flex flex-row md:flex-col">

        {/* Speed */}
        <div className="flex-1 px-4 sm:px-5 pt-5 pb-3 border-r border-zinc-100 md:border-r-0 md:border-b">
          <p className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-1">
            Speed
          </p>
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 leading-none">
            {status === "finished" ? wpm : 0}
          </p>
          <p className="text-[11px] text-zinc-400 mt-2 tracking-widest">wpm</p>
        </div>

        {/* Accuracy */}
        <div className="flex-1 px-4 sm:px-5 pt-5 pb-3">
          <p className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-1">
            Accuracy
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-none">
            {accuracy}
            <span className="text-xl text-zinc-400">%</span>
          </p>
        </div>

      </div>

      {/* ── Ring gauges ── */}
      <div className="flex items-center justify-around px-4 sm:px-5 pt-2 pb-5 mt-auto">

        {/* WPM ring */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full flex flex-col items-center justify-center ring-[3px] ring-zinc-200">
            <span className="text-base font-bold text-zinc-900 leading-none">
              {status === "finished" ? wpm : 0}
            </span>
            <span className="text-[9px] tracking-widest text-zinc-400 uppercase mt-0.5">
              wpm
            </span>
          </div>
        </div>

        {/* Accuracy ring */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative w-14 h-14 sm:w-[72px] sm:h-[72px]">
            <canvas ref={canvasRef} width={72} height={72} className="w-full h-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm font-bold text-zinc-900 leading-none">
                {accuracy}%
              </span>
              <span className="text-[9px] tracking-widest text-zinc-400 uppercase mt-0.5">
                acc
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
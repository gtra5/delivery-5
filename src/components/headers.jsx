// header.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Practice", href: "#" },
  { label: "Leaderboard", href: "#" },
  { label: "About", href: "#" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="w-full font-mono"
      style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* ── Logo ── */}
          <a href="#" className="text-xl sm:text-2xl font-bold text-zinc-800 tracking-tight">
            Type<span className="text-[#6a9a0f]">Racers</span>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-zinc-500 hover:text-zinc-800 hover:bg-black/5
                           tracking-widest uppercase px-4 py-2 rounded-lg transition-colors"
              >
                {label}
              </a>
            ))}

            {/* CTA */}
            <a
              href="#"
              className="ml-2 text-xs text-white bg-[#6a9a0f] hover:bg-[#5a8a0a]
                         transition-colors px-4 py-2 rounded-lg tracking-widest uppercase font-semibold"
            >
              Play now
            </a>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg
                       text-zinc-600 hover:text-zinc-900 hover:bg-black/5 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-zinc-100"
          style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}
        >
          <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-xs text-zinc-500 hover:text-zinc-800 hover:bg-black/5
                           tracking-widest uppercase px-4 py-3 rounded-lg transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="mt-1 text-xs text-white bg-[#6a9a0f] hover:bg-[#5a8a0a]
                         transition-colors px-4 py-3 rounded-lg tracking-widest uppercase
                         font-semibold text-center"
            >
              Play now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
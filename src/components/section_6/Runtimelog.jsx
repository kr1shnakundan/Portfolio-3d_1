// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // ─── Data ────────────────────────────────────────────────────────────────────
// const PROCESSES = [
//   {
//     pid: "4201",
//     name: "algorithms & data-structures",
//     lang: "C++",
//     progress: 94,
//     status: "DONE",
//     note: "Leetcode 300+  ·  Trees, DP, Graphs",
//     statusColor: "text-emerald-400",
//     barColor: "bg-emerald-400",
//   },
//   {
//     pid: "4202",
//     name: "full-stack web development",
//     lang: "JS / TS",
//     progress: 88,
//     status: "DONE",
//     note: "React · Node · PostgreSQL · REST & GraphQL",
//     statusColor: "text-emerald-400",
//     barColor: "bg-emerald-400",
//   },
//   {
//     pid: "4203",
//     name: "systems programming",
//     lang: "C / Rust",
//     progress: 72,
//     status: "RUNNING",
//     note: "OS internals · memory management · concurrency",
//     statusColor: "text-amber-400",
//     barColor: "bg-amber-400",
//   },
//   {
//     pid: "4204",
//     name: "machine learning",
//     lang: "Python",
//     progress: 61,
//     status: "RUNNING",
//     note: "PyTorch · regression · CNNs · transformers",
//     statusColor: "text-amber-400",
//     barColor: "bg-amber-400",
//   },
//   {
//     pid: "4205",
//     name: "distributed systems",
//     lang: "Go",
//     progress: 28,
//     status: "QUEUED",
//     note: "Raft consensus · k8s · microservices",
//     statusColor: "text-zinc-500",
//     barColor: "bg-zinc-500",
//   },
// ];

// const BOOT_LINES = [
//   "$ whoami          →  kundan_dev",
//   "$ uptime          →  21 yrs, CS undergrad",
//   "$ uname -r        →  React · GSAP · Tailwind",
//   "$ cat /etc/motto  →  \"ship first, optimise second\"",
// ];

// // ─── Sub-components ──────────────────────────────────────────────────────────

// function BootLine({ text, index }) {
//   const ref = useRef(null);
//   return (
//     <p
//       ref={ref}
//       className="boot-line font-mono text-xs md:text-sm text-emerald-600 opacity-0 translate-x-[-12px] leading-6"
//     >
//       {text}
//     </p>
//   );
// }

// function ProcessRow({ proc, index }) {
//   const rowRef = useRef(null);
//   const barRef = useRef(null);

//   return (
//     <div
//       ref={rowRef}
//       className="process-row opacity-0 translate-x-[-20px] border-b border-zinc-800 py-4 md:py-5"
//     >
//       {/* Top line: PID · name · lang · status */}
//       <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
//         <span className="font-mono text-[11px] text-zinc-600 select-none">
//           [{proc.pid}]
//         </span>
//         <span className="font-mono text-sm md:text-base font-semibold text-zinc-100 tracking-tight">
//           {proc.name}
//         </span>
//         <span className="font-mono text-[11px] text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded">
//           {proc.lang}
//         </span>
//         <span
//           className={`ml-auto font-mono text-xs font-bold tracking-widest ${proc.statusColor}`}
//         >
//           [{proc.status}]
//         </span>
//       </div>

//       {/* Progress bar */}
//       <div className="relative h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-2">
//         <div
//           ref={barRef}
//           className={`bar h-full rounded-full ${proc.barColor}`}
//           style={{ width: "0%" }}
//         />
//       </div>

//       {/* Bottom line: note + percentage */}
//       <div className="flex justify-between items-center">
//         <span className="font-mono text-[11px] md:text-xs text-zinc-500">
//           {proc.note}
//         </span>
//         <span className={`font-mono text-xs font-bold ${proc.statusColor}`}>
//           {proc.progress}%
//         </span>
//       </div>
//     </div>
//   );
// }

// // ─── Main Section ─────────────────────────────────────────────────────────────
// export default function RuntimeLog() {
//   const sectionRef = useRef(null);
//   const cursorRef = useRef(null);
//   const promptRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const ctx = gsap.context(() => {
//       // ── Blinking cursor (always running) ─────────────────────────────────
//       gsap.to(cursorRef.current, {
//         opacity: 0,
//         repeat: -1,
//         yoyo: true,
//         duration: 0.55,
//         ease: "steps(1)",
//       });

//       // ── ScrollTrigger master timeline ────────────────────────────────────
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top 65%",
//           once: true,
//         },
//       });

//       // 1. Prompt line types in
//       tl.fromTo(
//         promptRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 0.3 }
//       );

//       // 2. Boot lines stagger in
//       tl.fromTo(
//         ".boot-line",
//         { opacity: 0, x: -12 },
//         {
//           opacity: 1,
//           x: 0,
//           stagger: 0.12,
//           duration: 0.4,
//           ease: "power2.out",
//         },
//         "+=0.1"
//       );

//       // 3. Process rows slide in
//       tl.fromTo(
//         ".process-row",
//         { opacity: 0, x: -20 },
//         {
//           opacity: 1,
//           x: 0,
//           stagger: 0.14,
//           duration: 0.45,
//           ease: "power3.out",
//         },
//         "+=0.15"
//       );

//       // 4. Progress bars fill
//       const bars = section.querySelectorAll(".bar");
//       bars.forEach((bar, i) => {
//         const targetW = PROCESSES[i].progress + "%";
//         tl.to(
//           bar,
//           {
//             width: targetW,
//             duration: 0.8,
//             ease: "power2.inOut",
//           },
//           // offset so each bar starts just after its row appears
//           `-=${0.14 * (bars.length - 1 - i) + 0.3}`
//         );
//       });
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full bg-[#0c0c0e] py-20 md:py-28 px-5 md:px-12 lg:px-24 border-t border-zinc-800"
//     >
//       <div className="max-w-3xl mx-auto">

//         {/* ── Terminal chrome ── */}
//         <div className="flex items-center gap-2 mb-6 select-none">
//           <span className="w-3 h-3 rounded-full bg-red-500/80" />
//           <span className="w-3 h-3 rounded-full bg-amber-400/80" />
//           <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
//           <span className="ml-3 font-mono text-xs text-zinc-600">
//             runtime.log — bash
//           </span>
//         </div>

//         {/* ── Terminal window ── */}
//         <div className="rounded-xl border border-zinc-800 bg-[#0f0f12] p-6 md:p-8 shadow-2xl shadow-black/60">

//           {/* Prompt */}
//           <p
//             ref={promptRef}
//             className="font-mono text-sm text-zinc-400 mb-4 opacity-0"
//           >
//             <span className="text-emerald-400">kundan@dev</span>
//             <span className="text-zinc-600">:</span>
//             <span className="text-sky-400">~/portfolio</span>
//             <span className="text-zinc-400"> $ </span>
//             <span className="text-zinc-100">cat RUNTIME.LOG</span>
//             <span
//               ref={cursorRef}
//               className="inline-block w-2 h-4 bg-zinc-100 ml-0.5 align-middle"
//             />
//           </p>

//           {/* Boot info lines */}
//           <div className="mb-6 pl-2 border-l-2 border-zinc-800 space-y-0.5">
//             {BOOT_LINES.map((line, i) => (
//               <BootLine key={i} text={line} index={i} />
//             ))}
//           </div>

//           {/* Divider */}
//           <div className="font-mono text-xs text-zinc-700 mb-2 select-none">
//             ── PROCESS TABLE ─────────────────────────────────────────────
//           </div>

//           {/* Column headers */}
//           <div className="flex font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-1 px-0">
//             <span className="w-14">PID</span>
//             <span className="flex-1">PROCESS</span>
//             <span className="w-20 text-right">STATUS</span>
//           </div>

//           {/* Process rows */}
//           <div>
//             {PROCESSES.map((proc, i) => (
//               <ProcessRow key={proc.pid} proc={proc} index={i} />
//             ))}
//           </div>

//           {/* Footer prompt */}
//           <p className="font-mono text-xs text-zinc-700 mt-6 select-none">
//             5 processes loaded · 2 running · 1 queued · exit code 0
//           </p>
//         </div>

//         {/* ── Section label outside terminal ── */}
//         <div className="mt-10 flex items-center gap-4">
//           <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
//             Skills & growth
//           </span>
//           <div className="flex-1 h-px bg-zinc-800" />
//         </div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Two rows of skills — row 2 scrolls opposite direction ──────────────────
const ROW_1 = [
  "React", "Node.js", "TypeScript", "PostgreSQL",
  "C++", "Python", "Redis", "Docker",
  "React", "Node.js", "TypeScript", "PostgreSQL",
  "C++", "Python", "Redis", "Docker",
];

const ROW_2 = [
  "Next.js", "GraphQL", "Tailwind", "Linux",
  "Git", "REST APIs", "MongoDB", "AWS",
  "Next.js", "GraphQL", "Tailwind", "Linux",
  "Git", "REST APIs", "MongoDB", "AWS",
];

// ── A single fact line ──────────────────────────────────────────────────────
const LINES = [
  { label: "currently", value: "building side projects & hunting for internships" },
  { label: "studying",  value: "computer science — 3rd year" },
  { label: "obsessed with", value: "clean code, fast UIs, and how the web actually works" },
  { label: "also into",  value: "open source, late-night debugging, and bad coffee" },
];

function MarqueeRow({ items, direction = 1, speed = 40 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const totalW = track.scrollWidth / 2; // duplicated list, so half is one set

    gsap.set(track, { x: direction === 1 ? 0 : -totalW });

    const tween = gsap.to(track, {
      x: direction === 1 ? -totalW : 0,
      duration: totalW / speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const val = parseFloat(x);
          if (direction === 1) return ((val % totalW) - totalW) % -totalW;
          return ((val % totalW) + totalW) % totalW;
        }),
      },
    });

    // Slow down / speed up on scroll proximity
    ScrollTrigger.create({
      trigger: track.closest("section"),
      start: "top 80%",
      end: "bottom 20%",
      onUpdate: (self) => {
        const v = 1 + self.getVelocity() * 0.0004 * direction;
        gsap.to(tween, { timeScale: Math.max(0.3, Math.min(v, 4)), duration: 0.4 });
      },
    });

    return () => tween.kill();
  }, [direction, speed]);

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-3 w-max py-1">
        {items.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-mono text-sm md:text-base px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 bg-zinc-900 select-none"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WhatImInto() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // heading word split reveal
      gsap.fromTo(
        ".reveal-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // fact lines
      gsap.fromTo(
        ".fact-line",
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".facts-block",
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#111113] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* ── Heading ── */}
        <div className="overflow-hidden mb-14">
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight flex flex-wrap gap-x-4">
            {"what i work with.".split(" ").map((word, i) => (
              <span
                key={i}
                className="reveal-word inline-block opacity-0"
                style={{ willChange: "transform" }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* ── Marquee rows ── */}
        <div className="flex flex-col gap-3 mb-20">
          <MarqueeRow items={ROW_1} direction={1}  speed={38} />
          <MarqueeRow items={ROW_2} direction={-1} speed={32} />
        </div>

        {/* ── Thin divider ── */}
        <div className="h-px bg-zinc-800 mb-14" />

        {/* ── Fact lines ── */}
        <div className="facts-block grid grid-cols-1 md:grid-cols-2 gap-5">
          {LINES.map((l, i) => (
            <div key={i} className="fact-line flex flex-col gap-1 opacity-0">
              <span className="text-xs uppercase tracking-widest text-zinc-600 font-mono">
                {l.label}
              </span>
              <span className="text-base md:text-lg text-zinc-200 font-medium leading-snug">
                {l.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
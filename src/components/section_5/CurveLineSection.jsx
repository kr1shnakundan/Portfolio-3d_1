import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contentVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function CurveSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    const pathLength = path.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Draw the path when 30% of section is visible (top 70% of viewport)
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-violet-950 via-[#160a29] to-black flex items-center justify-end overflow-hidden"
    >
      {/*
        SVG fills the whole section.
        viewBox="0 0 100 100" with preserveAspectRatio="none" means every
        coordinate is a percentage of the section's actual pixel size —
        so the path is always fully visible regardless of screen dimensions.
      */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#7c3aed" />
            <stop offset="55%"  stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/*
          Path breakdown (all coords are % of section width/height):
          • Enters at top-left (7, 0)
          • Wide S-curve sweeps left then right as it falls — creates the
            thick snake / squiggle character seen in the reference image
          • At ~75% height it loops back on itself (the "M scribble" curl)
          • Exits bottom-left and sweeps right to bottom-right (100, 96)
        */}
        <path
          ref={pathRef}
          d="
            M 7,0
            C 14,5   -4,13   8,24
            C 17,31   1,39   10,49
            C 17,56   -2,62   8,70
            C 15,75   34,71   37,78
            C 41,85   18,89   16,95
            C 36,99   62,98   100,96
          "
          fill="none"
          stroke="url(#curveGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Faint highlight layer behind the stroke for the hand-drawn depth effect */}
        <path
          d="
            M 7,0
            C 14,5   -4,13   8,24
            C 17,31   1,39   10,49
            C 17,56   -2,62   8,70
            C 15,75   34,71   37,78
            C 41,85   18,89   16,95
            C 36,99   62,98   100,96
          "
          fill="none"
          stroke="#ffffff0d"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── Ambient glow accents to fill the empty space around the copy ── */}
      <div className="absolute top-24 right-[28%] w-72 h-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "5s" }} />
      <div className="absolute bottom-32 right-16 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "6s" }} />

      {/* ── Large heading — top-left, same as reference ── */}
      <h2 className="absolute top-6 left-0 text-[clamp(3rem,10vw,7rem)] font-black text-white leading-none tracking-tight z-10 select-none pl-10">
        WHAT I DO?
      </h2>

      {/* ── Right-side body content ── */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 flex flex-col items-start text-left px-10 max-w-xl mr-12 gap-6"
      >
        <motion.p variants={itemVariants} className="text-2xl md:text-3xl font-semibold text-white leading-snug">
          From first sketch to final deploy — I write clean, dependable code and back it with motion that feels intentional.
        </motion.p>

        <motion.p variants={itemVariants} className="text-base text-purple-200/80 leading-relaxed max-w-md">
          No fluff, no shortcuts. Just fast, well-built products that ship on time.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
          {["Full-Stack Dev", "UI/UX Engineering", "Performance"].map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.08, borderColor: "rgba(139,92,246,0.7)" }}
              className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-violet-950/50 border border-violet-500/30 text-violet-200"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-2">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 14px 34px -10px rgba(124,58,237,0.7)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-violet-600 to-violet-800 text-white text-base font-semibold shadow-lg shadow-violet-950/40"
          >
            View My Work
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group flex items-center gap-2 px-6 py-3 rounded-full border-2 border-violet-400 text-white text-base font-semibold hover:bg-violet-600 hover:border-violet-600 transition-colors duration-200"
          >
            How I Got Here
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

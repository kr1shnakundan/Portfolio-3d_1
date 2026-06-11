// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function CurveSection() {
//   const sectionRef = useRef(null);
//   const pathRef = useRef(null);
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const path = pathRef.current;
//     const section = sectionRef.current;

//     // Get the total length of the SVG path
//     const pathLength = path.getTotalLength();

//     // Set up dash array / offset so the path is fully hidden initially
//     gsap.set(path, {
//       strokeDasharray: pathLength,
//       strokeDashoffset: pathLength,
//     });

//     // Animate the path draw on scroll
//     const drawTween = gsap.to(path, {
//       strokeDashoffset: 0,
//       duration: 2,
//       ease: "power2.inOut",
//       scrollTrigger: {
//         trigger: section,
//         start: "top 70%", // fires when 30% of section is visible
//         end: "top 20%",
//         scrub: false,      // play once, not scrubbed
//         once: true,
//       },
//     });

//     // Fade in the centre content slightly after the path starts
//     gsap.fromTo(
//       contentRef.current,
//       { opacity: 0, y: 36 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: "power3.out",
//         delay: 0.5,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 70%",
//           once: true,
//         },
//       }
//     );

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full min-h-screen bg-[#0b0d11] flex items-center justify-center overflow-hidden"
//     >
//       {/* ── SVG curve: top-left → bottom-left → bottom-right ── */}
//       <svg
//         className="absolute inset-0 w-full h-full pointer-events-none"
//         viewBox="0 0 1000 700"
//         preserveAspectRatio="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           {/* Gradient along the stroke */}
//           <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%"   stopColor="#7c3aed" />   {/* violet */}
//             <stop offset="50%"  stopColor="#2563eb" />   {/* blue   */}
//             <stop offset="100%" stopColor="#06b6d4" />   {/* cyan   */}
//           </linearGradient>

//           {/* Soft glow filter */}
//           <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
//             <feGaussianBlur stdDeviation="6" result="blur" />
//             <feMerge>
//               <feMergeNode in="blur" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>

//         {/*
//           Path logic — matches the reference screenshot:
//             1. Enters from top-left, wide sweeping curve inward and back
//             2. Drops down the left side with a big looping clockwise curl/squiggle
//                in the bottom-left quadrant (the "M" scribble shape in the ref)
//             3. Exits the loop and sweeps right along the bottom to bottom-right
//         */}
//         <path
//           ref={pathRef}
//           d={`
//             M 80,0
//             C 120,60  -60,160  80,260
//             C 160,320  20,380  60,440
//             C 90,480  -20,510  30,560
//             C 60,590  150,540  180,580
//             C 220,630  80,670  60,700
//             C 120,720  260,710  340,720
//             C 500,735  700,728  980,710
//           `}
//           fill="none"
//           stroke="url(#curveGrad)"
//           strokeWidth="18"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           filter="url(#glow)"
//         />

//         {/* Ghost underlay for depth */}
//         <path
//           d={`
//             M 80,0
//             C 120,60  -60,160  80,260
//             C 160,320  20,380  60,440
//             C 90,480  -20,510  30,560
//             C 60,590  150,540  180,580
//             C 220,630  80,670  60,700
//             C 120,720  260,710  340,720
//             C 500,735  700,728  980,710
//           `}
//           fill="none"
//           stroke="#ffffff06"
//           strokeWidth="22"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>

//       {/* ── Ambient radial glow in background ── */}
//       <div
//         aria-hidden
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background:
//             "radial-gradient(ellipse 60% 55% at 50% 52%, #1e1b4b55 0%, transparent 70%)",
//         }}
//       />

//       {/* ── Centre content ── */}
//       <div
//         ref={contentRef}
//         className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl gap-6 opacity-0"
//       >
//         {/* Eyebrow */}
//         <span className="text-xs uppercase tracking-[0.25em] text-violet-400 font-mono">
//           Full-Stack Developer
//         </span>

//         {/* Headline */}
//         <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
//           Crafting digital{" "}
//           <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
//             experiences
//           </span>{" "}
//           that move.
//         </h2>

//         {/* Subtext */}
//         <p className="text-base md:text-lg text-white/50 max-w-md">
//           Precision-built interfaces with motion that feels intentional —
//           not decorative.
//         </p>

//         {/* CTA row */}
//         <div className="flex flex-wrap gap-4 justify-center mt-2">
//           <button className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-900/40">
//             View Projects
//           </button>
//           <button className="px-7 py-3 rounded-full border border-white/15 text-white/70 text-sm font-semibold hover:border-white/40 hover:text-white active:scale-95 transition-all duration-200">
//             Get in touch
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurveSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;

    const pathLength = path.getTotalLength();

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

    // Fade in content shortly after the path starts drawing
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white flex items-center justify-end overflow-hidden"
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
            <stop offset="0%"  stopColor="#9ca3af" />
            <stop offset="60%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#9ca3af" />
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

        {/* Faint shadow layer behind the stroke for the hand-drawn depth effect */}
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
          stroke="#00000009"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── Large heading — top-left, same as reference ── */}
      <h2 className="absolute top-6 left-0 text-[clamp(3rem,10vw,7rem)] font-black text-black leading-none tracking-tight z-10 select-none px-4">
        WHAT I DO?
      </h2>

      {/* ── Right-side body content ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-start text-left px-10 max-w-xl mr-12 gap-5 opacity-0"
      >
        <p className="text-lg text-gray-800 leading-relaxed">
          I'm a{" "}
          <strong className="font-bold text-black">developer</strong>{" "}
           :)
        </p>

        <p className="text-lg text-gray-800 leading-relaxed">
          y Make it{" "}
          <button className="inline-block px-4 py-1.5 bg-orange-500 text-white text-base font-semibold rounded-md hover:bg-orange-600 active:scale-95 transition-all duration-150">
            ship.
          </button>
        </p>

        <div className="mt-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black text-black text-base font-semibold hover:bg-black hover:text-white active:scale-95 transition-all duration-200">
            <span className="w-2 h-2 rounded-full bg-current inline-block" />
            How I Got Here 👇
          </button>
        </div>
      </div>
    </section>
  );
}
// // // import { useEffect, useRef } from "react";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import "./section_3.css";

// // // // Register the plugin so GSAP knows how to track the scrollbar
// // // gsap.registerPlugin(ScrollTrigger);

// // // const DividerIcon = () => (
// // //   <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 mx-8">
// // //     <path d="M12 2L2 22h20L12 2z" />
// // //   </svg>
// // // );

// // // const TechArsenal = () => {
// // //   const sectionRef = useRef(null);
// // //   const row1Ref = useRef(null);
// // //   const row2Ref = useRef(null);
// // //   const row3Ref = useRef(null);

// // //   const headingRef = useRef(null);

// // //   useEffect(() => {
// // //     gsap.to(row1Ref.current, {
// // //       xPercent: -20,
// // //       ease: "none",
// // //       scrollTrigger: {
// // //         trigger: sectionRef.current,
// // //         start: "top bottom",
// // //         end: "bottom top",   
// // //         scrub: 1,            
// // //       },
// // //     });

  
// // //     gsap.to(row2Ref.current, {
// // //       xPercent: 20, 
// // //       ease: "none",
// // //       scrollTrigger: {
// // //         trigger: sectionRef.current,
// // //         start: "top bottom",
// // //         end: "bottom top",
// // //         scrub: 1,
// // //       },
// // //     });

    
// // //     gsap.to(row3Ref.current, {
// // //       xPercent: -30, 
// // //       ease: "none",
// // //       scrollTrigger: {
// // //         trigger: sectionRef.current,
// // //         start: "top bottom",
// // //         end: "bottom top",
// // //         scrub: 1,
// // //       },
// // //     });

// // //     // Animate the variable font width via a CSS variable that maps to the
// // //     // font's 'wdth' axis. This is more reliable than animating `font-stretch`.
// // //     // gsap.to(".tech-text", {
// // //     //   "--wdth": 150,
// // //     //   letterSpacing: "0.1em",
// // //     //   ease: "none",
// // //     //   scrollTrigger: {
// // //     //     trigger: sectionRef.current,
// // //     //     start: "top bottom",
// // //     //     end: "bottom top",
// // //     //     scrub: 1,
// // //     //   },
// // //     // });

// // //     // gsap.to(".tech-text", {
// // //     //   fontVariationSettings: '"wdth" 150',
// // //     //   ease:"none",
// // //     //   scrollTrigger: {
// // //     //     trigger: sectionRef.current,
// // //     //     scrub: true
// // //     //   }
// // //     // });

// // //     // gsap.to(".tech-text", {
// // //     //   scaleX: 0.5,
// // //     //   ease: "none",
// // //     //   scrollTrigger: {
// // //     //     trigger: sectionRef.current,
// // //     //     start: "top bottom",
// // //     //     end: "bottom top",
// // //     //     scrub: 1,        // smooth follow — increase for more lag
// // //     //   }
// // //     // });

// // //     // const techElement = document.querySelectorAll('.tech-text');

// // //     // const state = { weight: 100 };
 
// // //     // gsap.to(state, {
// // //     //   weight: 900,
// // //     //   ease: "none",
// // //     //   scrollTrigger: {
// // //     //     trigger: sectionRef.current,
// // //     //     start: "top top",
// // //     //     end: "bottom bottom",
// // //     //     scrub: 1.2,
// // //     //     onUpdate: () => {
// // //     //       const w = Math.round(state.weight);
// // //     //       techElement.style.fontVariationSettings = `'wght' ${w}`;
          
// // //     //     }
// // //     //   }
// // //     // });

// // //     const chars = headingRef.current.querySelectorAll(".char");

// // //     gsap.set(chars, {
// // //       y: 100,
// // //       opacity: 0
// // //     });

// // //     gsap.to(chars, {
// // //       y: 0,
// // //       opacity: 1,
// // //       stagger: 0.05,
// // //       ease: "power3.out",
// // //       scrollTrigger: {
// // //         trigger: headingRef.current,
// // //         start: "top 80%",
// // //         end: "bottom 40%",
// // //         scrub: 1
// // //       }
// // //     });

// // //     const tl = gsap.timeline({
// // //       scrollTrigger: {
// // //         trigger: headingRef.current,
// // //         start: "top 80%",
// // //         end: "bottom 20%",
// // //         scrub: true
// // //       }
// // //     });

// // //     tl.fromTo(
// // //       chars,
// // //       {
// // //         y: 120,
// // //         opacity: 0
// // //       },
// // //       {
// // //         y: 0,
// // //         opacity: 1,
// // //         stagger: 0.05,
// // //         ease: "power3.out"
// // //       }
// // //     );

// // //     tl.to(chars, {
// // //       y: 120,
// // //       opacity: 0,
// // //       stagger: {
// // //         each: 0.05,
// // //         from: "end"
// // //       },
// // //       ease: "power3.in"
// // //     });
// // //   }, []);


// // //   return (
// // //     <section 
// // //       ref={sectionRef} 
// // //       className="py-24 bg-white text-black overflow-hidden flex flex-col gap-6"
// // //     >
// // //       {/* ROW 1 */}
// // //       <div 
// // //         ref={row1Ref} 
// // //         className="flex items-center whitespace-nowrap text-6xl md:text-8xl font-black uppercase tracking-tighter w-[150vw] -ml-[10vw]"
// // //       >
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>FULL STACK</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>REACT</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>NODE.JS</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>MERN</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>FULL STACK</span>
// // //       </div>

// // //       <div 
// // //         ref={row2Ref} 
// // //         className="flex items-center whitespace-nowrap text-6xl md:text-8xl font-black uppercase tracking-tighter w-[150vw] -ml-[30vw]"
// // //       >
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>SHOPIFY OS 2.0</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>LIQUID LOGIC</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>CUSTOM THEMES</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>SHOPIFY OS 2.0</span>
// // //       </div>

// // //       {/* ROW 3 */}
// // //       <div 
// // //         ref={row3Ref} 
// // //         className=" flex items-center whitespace-nowrap  font-black uppercase tracking-tighter w-[150vw] -ml-[5vw]"
// // //       >
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>DEVOPS</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>SERVERLESS</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>CLOUDFLARE</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>MONGODB</span> <DividerIcon />
// // //         <span className="tech-text" style={{ fontStretch: "100%" }}>DEVOPS</span>
// // //       </div>

// // //       {/* The Static Title Below */}
// // //       <div className="mt-12 px-8">
// // //         {/* <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Technology Arsenal</h2>
// // //         <p className="mt-4 text-gray-500 text-xl max-w-2xl">
// // //           Tools I've picked up, broken, and learned to trust over time.
// // //         </p> */}
// // //         <div className="mt-12 px-8">
// // //           <h2
// // //             ref={headingRef}
// // //             className="
// // //               text-6xl
// // //               md:text-8xl
// // //               font-black
// // //               tracking-tight
// // //               overflow-hidden
// // //               leading-none
// // //             "
// // //           >
// // //             {"Technology Arsenal".split("").map((char, index) => (
// // //               <span
// // //                 key={index}
// // //                 className="char inline-block"
// // //               >
// // //                 {char === " " ? "\u00A0" : char}
// // //               </span>
// // //             ))}
// // //           </h2>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default TechArsenal;


// // import { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import "./section_3.css";

// // gsap.registerPlugin(ScrollTrigger);

// // const DividerIcon = () => (
// //   <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 mx-8">
// //     <path d="M12 2L2 22h20L12 2z" />
// //   </svg>
// // );

// // const TechWord = ({ children }) => (
// //   <span className="tech-word-wrapper">
// //     {/* Ghost: bold always, invisible — locks layout width */}
// //     <span className="tech-ghost" aria-hidden="true">{children}</span>
// //     {/* Visible: GSAP drives font-variation-settings wght 100 → 900 */}
// //     <span className="tech-visible">{children}</span>
// //   </span>
// // );

// // const TechArsenal = () => {
// //   const sectionRef = useRef(null);
// //   const row1Ref    = useRef(null);
// //   const row2Ref    = useRef(null);
// //   const row3Ref    = useRef(null);
// //   const headingRef = useRef(null);

// //   useEffect(() => {
// //     const section = sectionRef.current;

// //     // ── Row scroll animations ──────────────────────────────────────────────
// //     gsap.to(row1Ref.current, {
// //       xPercent: -20,
// //       ease: "none",
// //       scrollTrigger: {
// //         trigger: section,
// //         start: "top bottom",
// //         end: "bottom top",
// //         scrub: 1,
// //       },
// //     });

// //     gsap.to(row2Ref.current, {
// //       xPercent: 20,
// //       ease: "none",
// //       scrollTrigger: {
// //         trigger: section,
// //         start: "top bottom",
// //         end: "bottom top",
// //         scrub: 1,
// //       },
// //     });

// //     gsap.to(row3Ref.current, {
// //       xPercent: -30,
// //       ease: "none",
// //       scrollTrigger: {
// //         trigger: section,
// //         start: "top bottom",
// //         end: "bottom top",
// //         scrub: 1,
// //       },
// //     });

// //     // ── Font-weight animation ──────────────────────────────────────────────
// //     // We animate a plain JS object and manually write fontVariationSettings.
// //     // This bypasses any CSS specificity conflict with Tailwind font-weight.
// //     const techVisible = section.querySelectorAll(".tech-visible");

// //     const state = { w: 100 };

// //     gsap.to(state, {
// //       w: 900,
// //       ease: "none",
// //       scrollTrigger: {
// //         trigger: section,
// //         start: "top bottom",
// //         end: "bottom top",
// //         scrub: 1.2,
// //         onUpdate: () => {
// //           const rounded = Math.round(state.w);
// //           techVisible.forEach((el) => {
// //             // Use setProperty on style so it has highest specificity,
// //             // overriding any CSS class rules.
// //             el.style.setProperty("font-variation-settings", `'wght' ${rounded}`);
// //             el.style.setProperty("font-weight", "100"); // keep browser from interfering
// //           });
// //         },
// //       },
// //     });

// //     // ── Heading char animation ─────────────────────────────────────────────
// //     const chars = headingRef.current.querySelectorAll(".char");

// //     const tl = gsap.timeline({
// //       scrollTrigger: {
// //         trigger: headingRef.current,
// //         start: "top 80%",
// //         end: "bottom 20%",
// //         scrub: true,
// //       },
// //     });

// //     tl.fromTo(
// //       chars,
// //       { y: 120, opacity: 0 },
// //       { y: 0, opacity: 1, stagger: 0.05, ease: "power3.out" }
// //     );

// //     tl.to(chars, {
// //       y: 120,
// //       opacity: 0,
// //       stagger: { each: 0.05, from: "end" },
// //       ease: "power3.in",
// //     });

// //     return () => ScrollTrigger.getAll().forEach((t) => t.kill());
// //   }, []);

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className="py-24 bg-white text-black overflow-hidden flex flex-col gap-6"
// //     >
// //       {/* ROW 1 — no font-black / font-weight Tailwind classes on rows! */}
// //       <div
// //         ref={row1Ref}
// //         className="flex items-center whitespace-nowrap text-6xl md:text-8xl uppercase tracking-tighter w-[150vw] -ml-[10vw]"
// //       >
// //         <TechWord>FULL STACK</TechWord> <DividerIcon />
// //         <TechWord>REACT</TechWord>      <DividerIcon />
// //         <TechWord>NODE.JS</TechWord>    <DividerIcon />
// //         <TechWord>MERN</TechWord>       <DividerIcon />
// //         <TechWord>FULL STACK</TechWord>
// //       </div>

// //       {/* ROW 2 */}
// //       <div
// //         ref={row2Ref}
// //         className="flex items-center whitespace-nowrap text-6xl md:text-8xl uppercase tracking-tighter w-[150vw] -ml-[30vw]"
// //       >
// //         <TechWord>SHOPIFY OS 2.0</TechWord> <DividerIcon />
// //         <TechWord>LIQUID LOGIC</TechWord>   <DividerIcon />
// //         <TechWord>CUSTOM THEMES</TechWord>  <DividerIcon />
// //         <TechWord>SHOPIFY OS 2.0</TechWord>
// //       </div>

// //       {/* ROW 3 */}
// //       <div
// //         ref={row3Ref}
// //         className="flex items-center whitespace-nowrap text-6xl md:text-8xl uppercase tracking-tighter w-[150vw] -ml-[5vw]"
// //       >
// //         <TechWord>DEVOPS</TechWord>     <DividerIcon />
// //         <TechWord>SERVERLESS</TechWord> <DividerIcon />
// //         <TechWord>CLOUDFLARE</TechWord> <DividerIcon />
// //         <TechWord>MONGODB</TechWord>    <DividerIcon />
// //         <TechWord>DEVOPS</TechWord>
// //       </div>

// //       {/* Static Title */}
// //       <div className="mt-12 px-8">
// //         <div className="mt-12 px-8">
// //           <h2
// //             ref={headingRef}
// //             className="text-6xl md:text-8xl font-black tracking-tight overflow-hidden leading-none"
// //           >
// //             {"Technology Arsenal".split("").map((char, index) => (
// //               <span key={index} className="char inline-block">
// //                 {char === " " ? "\u00A0" : char}
// //               </span>
// //             ))}
// //           </h2>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default TechArsenal;

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./section_3.css";

// gsap.registerPlugin(ScrollTrigger);

// const DividerIcon = () => (
//   <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 mx-8">
//     <path d="M12 2L2 22h20L12 2z" />
//   </svg>
// );

// /**
//  * SvgWord — mirrors exactly what scroll-fontweight-noshift.html does for
//  * "Web Development": an SVG <text> with a fixed textLength so the bounding
//  * box never changes, while GSAP drives fontVariationSettings wght 100→900.
//  *
//  * Props:
//  *   children   — the label string
//  *   textLength — how wide the SVG viewport is (tune per word)
//  *   fontSize   — font-size inside the SVG (default 72)
//  */
// const SvgWord = ({ children, textLength = 400, fontSize = 72 }) => {
//   const height = fontSize * 1.4;
//   return (
//     <svg
//       viewBox={`0 0 ${textLength} ${height}`}
//       height={height}
//       style={{ display: "inline-block", overflow: "visible", flexShrink: 0 }}
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <text
//         className="tech-text"
//         x={textLength / 2}
//         y={height / 2}
//         textAnchor="middle"
//         dominantBaseline="middle"
//         fontSize={fontSize}
//         // textLength={textLength - 8}   /* small padding so glyphs don't clip */
//         // lengthAdjust="spacingAndGlyphs"
//         fill="currentColor"
//         style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 100" }}
//       >
//         {children}
//       </text>
//     </svg>
//   );
// };

// const TechArsenal = () => {
//   const sectionRef = useRef(null);
//   const row1Ref    = useRef(null);
//   const row2Ref    = useRef(null);
//   const row3Ref    = useRef(null);
//   const headingRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;

//     // ── Row horizontal scroll animations ──────────────────────────────────
//     gsap.to(row1Ref.current, {
//       xPercent: -20,
//       ease: "none",
//       scrollTrigger: {
//         trigger: section,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: 1,
//       },
//     });

//     gsap.to(row2Ref.current, {
//       xPercent: 20,
//       ease: "none",
//       scrollTrigger: {
//         trigger: section,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: 1,
//       },
//     });

//     gsap.to(row3Ref.current, {
//       xPercent: -30,
//       ease: "none",
//       scrollTrigger: {
//         trigger: section,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: 1,
//       },
//     });

//     // ── Font-weight animation — exact same pattern as scroll-fontweight-noshift.html
//     // Query all SVG <text class="tech-text"> elements inside the section.
//     const techTexts = section.querySelectorAll(".tech-text");

//     const state = { weight: 100 };

//     gsap.to(state, {
//       weight: 900,
//       ease: "none",
//       scrollTrigger: {
//         trigger: section,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: 1.2,
//         onUpdate: () => {
//           const w = Math.round(state.weight);
//           // Identical to: svgText.style.fontVariationSettings = `'wght' ${w}`;
//           techTexts.forEach((el) => {
//             el.style.fontVariationSettings = `'wght' ${w}`;
//           });
//         },
//       },
//     });

//     // ── Heading char animation ─────────────────────────────────────────────
//     const chars = headingRef.current.querySelectorAll(".char");

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: headingRef.current,
//         start: "top 80%",
//         end: "bottom 20%",
//         scrub: true,
//       },
//     });

//     tl.fromTo(
//       chars,
//       { y: 120, opacity: 0 },
//       { y: 0, opacity: 1, stagger: 0.05, ease: "power3.out" }
//     );

//     tl.to(chars, {
//       y: 120,
//       opacity: 0,
//       stagger: { each: 0.05, from: "end" },
//       ease: "power3.in",
//     });

//     return () => ScrollTrigger.getAll().forEach((t) => t.kill());
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="py-24 bg-white text-black overflow-hidden flex flex-col gap-6"
//     >
//       {/* ROW 1 — textLength values tuned per word at font-size 72 */}
//       <div
//         ref={row1Ref}
//         className="flex items-center whitespace-nowrap w-[150vw] -ml-[10vw]"
//       >
//         <SvgWord textLength={380} fontSize={72}>FULL STACK</SvgWord> <DividerIcon />
//         <SvgWord textLength={200} fontSize={72}>REACT</SvgWord>      <DividerIcon />
//         <SvgWord textLength={260} fontSize={72}>NODE.JS</SvgWord>    <DividerIcon />
//         <SvgWord textLength={160} fontSize={72}>MERN</SvgWord>       <DividerIcon />
//         <SvgWord textLength={380} fontSize={72}>FULL STACK</SvgWord>
//       </div>

//       {/* ROW 2 */}
//       <div
//         ref={row2Ref}
//         className="flex items-center whitespace-nowrap w-[150vw] -ml-[30vw]"
//       >
//         <SvgWord textLength={540} fontSize={72}>SHOPIFY OS 2.0</SvgWord> <DividerIcon />
//         <SvgWord textLength={460} fontSize={72}>LIQUID LOGIC</SvgWord>   <DividerIcon />
//         <SvgWord textLength={500} fontSize={72}>CUSTOM THEMES</SvgWord>  <DividerIcon />
//         <SvgWord textLength={540} fontSize={72}>SHOPIFY OS 2.0</SvgWord>
//       </div>

//       {/* ROW 3 */}
//       <div
//         ref={row3Ref}
//         className="flex items-center whitespace-nowrap w-[150vw] -ml-[5vw]"
//       >
//         <SvgWord textLength={220} fontSize={72}>DEVOPS</SvgWord>     <DividerIcon />
//         <SvgWord textLength={360} fontSize={72}>SERVERLESS</SvgWord> <DividerIcon />
//         <SvgWord textLength={380} fontSize={72}>CLOUDFLARE</SvgWord> <DividerIcon />
//         <SvgWord textLength={300} fontSize={72}>MONGODB</SvgWord>    <DividerIcon />
//         <SvgWord textLength={220} fontSize={72}>DEVOPS</SvgWord>
//       </div>

//       {/* Static Title */}
//       <div className="mt-12 px-8">
//         <div className="mt-12 px-8">
//           <h2
//             ref={headingRef}
//             className="text-6xl md:text-8xl font-black tracking-tight overflow-hidden leading-none"
//           >
//             {"Technology Arsenal".split("").map((char, index) => (
//               <span key={index} className="char inline-block">
//                 {char === " " ? "\u00A0" : char}
//               </span>
//             ))}
//           </h2>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TechArsenal;



import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./section_3.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * LiveWave — a canvas-based continuously flowing sine wave.
 * Sits in the same space as a removed SvgWord.
 * scrollProgress (0→1) speeds up / morphs the wave as user scrolls.
 */
const LiveWave = ({ width = 320, height = 100, color = "currentColor", id }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const progRef   = useRef(0); // scroll progress 0→1

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const W      = canvas.width  = width;
    const H      = canvas.height = height;

    // Resolve "currentColor" → actual computed colour
    const computedColor = getComputedStyle(canvas).color || "#000";

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const progress = progRef.current;          // 0 → 1
      const speed    = 0.03 + progress * 0.07;   // faster when scrolled
      const amp      = (H * 0.18) + progress * (H * 0.22); // grows taller
      const freq     = 2 + progress * 2;          // more waves when scrolled

      // Draw 3 overlapping sine layers for richness
      const layers = [
        { amp: amp,        phaseOffset: 0,    alpha: 1,    lw: 2.2 },
        { amp: amp * 0.55, phaseOffset: 1.2,  alpha: 0.4,  lw: 1.4 },
        { amp: amp * 0.3,  phaseOffset: 2.4,  alpha: 0.2,  lw: 1   },
      ];

      layers.forEach(({ amp: a, phaseOffset, alpha, lw }) => {
        ctx.beginPath();
        ctx.lineWidth   = lw;
        ctx.strokeStyle = computedColor;
        ctx.globalAlpha = alpha;

        for (let x = 0; x <= W; x++) {
          const y = H / 2 + a * Math.sin((x / W) * Math.PI * 2 * freq + t + phaseOffset);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      t += speed;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height]);

  // expose progRef so parent can update scroll progress
  useEffect(() => {
    if (id) window[`__wave_${id}`] = (p) => { progRef.current = p; };
    return () => { if (id) delete window[`__wave_${id}`]; };
  }, [id]);

  return (
    <canvas
      ref={canvasRef}
      className="live-wave"
      style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle" }}
    />
  );
};

const SvgWord = ({ children, textLength = 400, fontSize = 72 }) => {
  const height = fontSize * 1.4;
  return (
    <svg
      viewBox={`0 0 ${textLength} ${height}`}
      height={height}
      style={{ display: "inline-block", overflow: "visible", flexShrink: 0 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        className="tech-text"
        x={textLength / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        textLength={textLength - 8}
        lengthAdjust="spacingAndGlyphs"
        fill="currentColor"
        style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 100" }}
      >
        {children}
      </text>
    </svg>
  );
};

// Thin line separator between items
const Sep = () => (
  <span style={{ display: "inline-block", width: 2, height: 60, background: "currentColor", opacity: 0.2, flexShrink: 0, margin: "0 28px", verticalAlign: "middle" }} />
);

const TechArsenal = () => {
  const sectionRef = useRef(null);
  const row1Ref    = useRef(null);
  const row2Ref    = useRef(null);
  const row3Ref    = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // ── Row scroll animations ──────────────────────────────────────────────
    gsap.to(row1Ref.current, {
      xPercent: -20, ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    gsap.to(row2Ref.current, {
      xPercent: 20, ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    gsap.to(row3Ref.current, {
      xPercent: -30, ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
    });

    // ── Font-weight animation ──────────────────────────────────────────────
    const techTexts = section.querySelectorAll(".tech-text");
    const state = { weight: 100 };

    gsap.to(state, {
      weight: 900,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: () => {
          const w = Math.round(state.weight);
          techTexts.forEach((el) => {
            el.style.fontVariationSettings = `'wght' ${w}`;
          });
        },
      },
    });

    // ── Drive all LiveWave canvases with scroll progress ───────────────────
    // Each wave exposes a setter via window.__wave_<id>
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        ["w1a","w1b","w2a","w2b","w3a","w3b"].forEach((id) => {
          if (window[`__wave_${id}`]) window[`__wave_${id}`](self.progress);
        });
      },
    });

    // ── Heading char animation ─────────────────────────────────────────────
    const chars = headingRef.current.querySelectorAll(".char");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: headingRef.current, start: "top 80%", end: "bottom 20%", scrub: true },
    });
    tl.fromTo(chars, { y: 120, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, ease: "power3.out" });
    tl.to(chars, { y: 120, opacity: 0, stagger: { each: 0.05, from: "end" }, ease: "power3.in" });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white text-black overflow-hidden flex flex-col gap-6"
    >
      {/* ROW 1 — removed REACT and MERN, replaced with LiveWave */}
      <div ref={row1Ref} className="flex items-center whitespace-nowrap w-[150vw] -ml-[10vw]" style={{ gap: 0 }}>
        <SvgWord textLength={380} fontSize={72}>FULL STACK</SvgWord><Sep />
        <LiveWave width={280} height={100} id="w1a" /><Sep />
        <SvgWord textLength={260} fontSize={72}>NODE.JS</SvgWord><Sep />
        <LiveWave width={280} height={100} id="w1b" /><Sep />
        <SvgWord textLength={380} fontSize={72}>FULL STACK</SvgWord>
      </div>

      {/* ROW 2 — removed LIQUID LOGIC and second SHOPIFY OS 2.0 */}
      <div ref={row2Ref} className="flex items-center whitespace-nowrap w-[150vw] -ml-[30vw]" style={{ gap: 0 }}>
        <SvgWord textLength={540} fontSize={72}>SHOPIFY OS 2.0</SvgWord><Sep />
        <LiveWave width={340} height={100} id="w2a" /><Sep />
        <SvgWord textLength={500} fontSize={72}>CUSTOM THEMES</SvgWord><Sep />
        <LiveWave width={340} height={100} id="w2b" />
      </div>

      {/* ROW 3 — removed CLOUDFLARE and second DEVOPS */}
      <div ref={row3Ref} className="flex items-center whitespace-nowrap w-[150vw] -ml-[5vw]" style={{ gap: 0 }}>
        <SvgWord textLength={220} fontSize={72}>DEVOPS</SvgWord><Sep />
        <SvgWord textLength={360} fontSize={72}>SERVERLESS</SvgWord><Sep />
        <LiveWave width={300} height={100} id="w3a" /><Sep />
        <SvgWord textLength={300} fontSize={72}>MONGODB</SvgWord><Sep />
        <LiveWave width={300} height={100} id="w3b" />
      </div>

      {/* Static Title */}
      <div className="mt-12 px-8">
        <div className="mt-12 px-8">
          <h2
            ref={headingRef}
            className="text-6xl md:text-8xl font-black tracking-tight overflow-hidden leading-none"
          >
            {"Technology Arsenal".split("").map((char, index) => (
              <span key={index} className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default TechArsenal;
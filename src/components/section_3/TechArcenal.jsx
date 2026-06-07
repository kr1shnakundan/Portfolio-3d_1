import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./section_3.css";

gsap.registerPlugin(ScrollTrigger);

const DividerIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className="text-green-600 mx-8">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

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
        fill="currentColor"
        style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 100" }}
      >
        {children}
      </text>
    </svg>
  );
};

const TechArsenal = () => {
  const sectionRef = useRef(null);
  const row1Ref    = useRef(null);
  const row2Ref    = useRef(null);
  const row3Ref    = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

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

    const techTexts = section.querySelectorAll(".tech-text");

    const updateWeights = () => {
      const vw         = window.innerWidth;
      const viewCenter = vw / 2;
      const maxDist    = vw / 2;

      techTexts.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.left + rect.width / 2;
        const dist = Math.abs(elCenter - viewCenter);
        const ratio = Math.min(dist / maxDist, 1);
        const weight = Math.round(700 - ratio * 600);
        el.style.fontVariationSettings = `'wght' ${weight}`;
      });
    };

    // Run on every scroll tick while section is in view
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: updateWeights,
      onEnter: updateWeights,
      onLeave: updateWeights,
      onEnterBack: updateWeights,
      onLeaveBack: updateWeights,
    });

    // Run once immediately in case section already visible
    updateWeights();

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
      {/* ROW 1 */}
      <div ref={row1Ref} className="flex items-center whitespace-nowrap w-[150vw] -ml-[10vw]">
        <SvgWord textLength={380} fontSize={72}>FULL STACK</SvgWord> <DividerIcon />
        <SvgWord textLength={200} fontSize={72}>REACT</SvgWord>      <DividerIcon />
        <SvgWord textLength={260} fontSize={72}>NODE.JS</SvgWord>    <DividerIcon />
        <SvgWord textLength={160} fontSize={72}>MERN</SvgWord>       <DividerIcon />
        <SvgWord textLength={380} fontSize={72}>FULL STACK</SvgWord>
      </div>

      {/* ROW 2 */}
      <div ref={row2Ref} className="flex items-center whitespace-nowrap w-[150vw] -ml-[30vw]">
        <SvgWord textLength={540} fontSize={72}>SHOPIFY OS 2.0</SvgWord> <DividerIcon />
        <SvgWord textLength={460} fontSize={72}>LIQUID LOGIC</SvgWord>   <DividerIcon />
        <SvgWord textLength={500} fontSize={72}>CUSTOM THEMES</SvgWord>  <DividerIcon />
        <SvgWord textLength={540} fontSize={72}>SHOPIFY OS 2.0</SvgWord>
      </div>

      {/* ROW 3 */}
      <div ref={row3Ref} className="flex items-center whitespace-nowrap w-[150vw] -ml-[5vw]">
        <SvgWord textLength={220} fontSize={72}>DEVOPS</SvgWord>     <DividerIcon />
        <SvgWord textLength={360} fontSize={72}>SERVERLESS</SvgWord> <DividerIcon />
        <SvgWord textLength={380} fontSize={72}>CLOUDFLARE</SvgWord> <DividerIcon />
        <SvgWord textLength={300} fontSize={72}>MONGODB</SvgWord>    <DividerIcon />
        <SvgWord textLength={220} fontSize={72}>DEVOPS</SvgWord>
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
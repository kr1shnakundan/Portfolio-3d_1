import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin so GSAP knows how to track the scrollbar
gsap.registerPlugin(ScrollTrigger);

const DividerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 mx-8">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

const TechArsenal = () => {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  const headingRef = useRef(null);

  useEffect(() => {
    gsap.to(row1Ref.current, {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",   
        scrub: 1,            
      },
    });

  
    gsap.to(row2Ref.current, {
      xPercent: 20, 
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    
    gsap.to(row3Ref.current, {
      xPercent: -30, 
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    const chars = headingRef.current.querySelectorAll(".char");

    gsap.set(chars, {
      y: 100,
      opacity: 0
    });

    gsap.to(chars, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "bottom 40%",
        scrub: 1
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    });

    tl.fromTo(
      chars,
      {
        y: 120,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "power3.out"
      }
    );

    tl.to(chars, {
      y: 120,
      opacity: 0,
      stagger: {
        each: 0.05,
        from: "end"
      },
      ease: "power3.in"
    });
  }, []);


  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-white text-black overflow-hidden flex flex-col gap-6"
    >
      {/* ROW 1 */}
      <div 
        ref={row1Ref} 
        className="flex items-center whitespace-nowrap text-6xl md:text-8xl font-black uppercase tracking-tighter w-[150vw] -ml-[10vw]"
      >
        <span>FULL STACK</span> <DividerIcon />
        <span>REACT</span> <DividerIcon />
        <span>NODE.JS</span> <DividerIcon />
        <span>MERN</span> <DividerIcon />
        <span>FULL STACK</span>
      </div>

      <div 
        ref={row2Ref} 
        className="flex items-center whitespace-nowrap text-6xl md:text-8xl font-black uppercase tracking-tighter w-[150vw] -ml-[30vw]"
      >
        <span>SHOPIFY OS 2.0</span> <DividerIcon />
        <span>LIQUID LOGIC</span> <DividerIcon />
        <span>CUSTOM THEMES</span> <DividerIcon />
        <span>SHOPIFY OS 2.0</span>
      </div>

      {/* ROW 3 */}
      <div 
        ref={row3Ref} 
        className="flex items-center whitespace-nowrap text-6xl md:text-8xl font-black uppercase tracking-tighter w-[150vw] -ml-[5vw]"
      >
        <span>FRAMER</span> <DividerIcon />
        <span>SERVERLESS</span> <DividerIcon />
        <span>SEO</span> <DividerIcon />
        <span>MONGODB</span> <DividerIcon />
        <span>CRO</span>
      </div>

      {/* The Static Title Below */}
      <div className="mt-12 px-8">
        {/* <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Technology Arsenal</h2>
        <p className="mt-4 text-gray-500 text-xl max-w-2xl">
          Tools I've picked up, broken, and learned to trust over time.
        </p> */}
        <div className="mt-12 px-8">
          <h2
            ref={headingRef}
            className="
              text-6xl
              md:text-8xl
              font-black
              tracking-tight
              overflow-hidden
              leading-none
            "
          >
            {"Transform with us".split("").map((char, index) => (
              <span
                key={index}
                className="char inline-block"
              >
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
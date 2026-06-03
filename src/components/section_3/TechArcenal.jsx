import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin so GSAP knows how to track the scrollbar
gsap.registerPlugin(ScrollTrigger);

// A simple reusable geometric shape to act as the separators (declare outside component to avoid
// creating components during render)
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

  useEffect(() => {
    // 1. Move Row 1 to the Left
    gsap.to(row1Ref.current, {
      xPercent: -20, // Moves 20% of its own width to the left
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Starts when the top of the section hits the bottom of the screen
        end: "bottom top",   // Ends when the bottom of the section hits the top of the screen
        scrub: 1,            // The magic property: ties the animation to the scrollbar with a 1-second smoothing delay
      },
    });

    // 2. Move Row 2 to the Right (Opposite direction)
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

    // 3. Move Row 3 to the Left (Slightly faster for depth)
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

      {/* ROW 2 (Starts further left so it has room to move right) */}
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
        <span>DEVOPS</span> <DividerIcon />
        <span>SERVERLESS</span> <DividerIcon />
        <span>CLOUDFLARE</span> <DividerIcon />
        <span>MONGODB</span> <DividerIcon />
        <span>DEVOPS</span>
      </div>

      {/* The Static Title Below */}
      <div className="mt-12 px-8">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Technology Arsenal</h2>
        <p className="mt-4 text-gray-500 text-xl max-w-2xl">
          Tools I've picked up, broken, and learned to trust over time.
        </p>
      </div>
    </section>
  );
};

export default TechArsenal;
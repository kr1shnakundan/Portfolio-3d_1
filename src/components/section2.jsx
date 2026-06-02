

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./style.css"
import { MagneticParallax } from "./scroll_hover_effect/MagneticParallax";

const AnimatedText = ({ text }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { margin: "-20%" });

  // Framer Motion variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  };

  const child = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.h4
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="md:text-[2rem] text-[1.3rem] leading-[1.5] text-black"
    >
      {text.split(" ").map((word, index) => (
        <span className="span-line" key={index}>
          <motion.span variants={child} style={{ display: "inline-block" }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h4>
  );
};

// --- 3. MAIN SECTION COMPONENT ---
export default function AboutMeHome() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const introText = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";

  return (
    <section 
      className="min-h-[70vh] flex  items-center justify-center bg-white px-[5%]"
    >
      <div style={{ maxWidth: "1200px", display: "flex", gap: "4rem" }}
      className="max-w-[1200px] flex flex-col md:flex-row gap-16 py-10"
      >
        
        {/* Left Column: Animated Text */}
        <div 
        className="flex-1 px-2 md:px-16"
        >
          <AnimatedText text={introText} />
        </div>

        {/* Right Column: Subtext and Magnetic Button */}
        <div
        className="flex flex-col gap-7 md:max-w-[20vw] "
        >
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="md:text-[1.2rem] text-[#383636]"
          >
            The combination of my passion for design, code & interaction positions me in a unique place in the web design world.
          </motion.p>

          <div className="mx-auto">
            <MagneticParallax offset={isMobile ? 50 : 150}>
              {/* Style this to look like your specific rounded button */}
              <motion.a 
                href="/about" 
                className="inline-flex items-center justify-center w-[120px]
                h-[120px] rounded-full bg-[#111] text-white no-underline font-medium
                border border-[#111]"
                whileHover={{ 
                backgroundColor: "#D4C3B3", // Premium Champagne/Beige tone
                color: "#111", 
                border: "1px solid #D4C3B3" 
                
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? "100px" : "140px",
                height: isMobile ? "100px" : "140px",
                borderRadius: "50%",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "1rem"
              }}
              >
                About me
              </motion.a>
            </MagneticParallax>
          </div>
          
        </div>
      </div>
    </section>
  );
}
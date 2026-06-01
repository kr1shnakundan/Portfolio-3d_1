

import { useRef } from "react";
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
      style={{ fontSize: "2rem", lineHeight: "1.5" ,color: "#000" }}
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
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "20vw" }}>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ fontSize: "1.2rem", color: "#383636" }}
          >
            The combination of my passion for design, code & interaction positions me in a unique place in the web design world.
          </motion.p>

          <div className="mx-auto">
            <MagneticParallax offset={150}>
              {/* Style this to look like your specific rounded button */}
              <a 
                href="/about" 
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "500"
                }}
              >
                About me
              </a>
            </MagneticParallax>
          </div>
          
        </div>
      </div>
    </section>
  );
}
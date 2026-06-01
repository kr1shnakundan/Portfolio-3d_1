// import { useRef, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// export const MagneticParallax = ({ children, offset = 150 }) => {
//   // Refs for our two independent animation layers
//   const parallaxRef = useRef(null);
//   const magneticRef = useRef(null);
  
//   // State for the magnetic cursor pull
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   // --- 1. PARALLAX LOGIC ---
//   const { scrollYProgress } = useScroll({
//     target: parallaxRef,
//     // "start end" = top of element hits bottom of viewport
//     // "end start" = bottom of element hits top of viewport
//     offset: ["start end", "end start"],
//   });

//   // Map scroll progress (0 to 1) to a vertical pixel shift.
//   // Scrolling DOWN makes progress approach 1, driving 'y' toward -offset (moving UP).
//   // Scrolling UP makes progress approach 0, driving 'y' toward +offset (moving DOWN).
//   const parallaxY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

//   // --- 2. MAGNETIC LOGIC ---
//   const handleMouse = (e) => {
//     const { clientX, clientY } = e;
    
//     // getBoundingClientRect automatically accounts for the parallax shift
//     // because it reads the final rendered pixel position on the screen!
//     const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
    
//     const middleX = clientX - (left + width / 2);
//     const middleY = clientY - (top + height / 2);
    
//     // The multiplier (0.3) dampens the strength of the magnetic pull
//     setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
//   };

//   const reset = () => {
//     setPosition({ x: 0, y: 0 });
//   };

//   return (
//     // Outer Wrapper: Handles Scroll Parallax
//     <motion.div ref={parallaxRef} style={{ y: parallaxY, display: "inline-block" }}>
        
//       {/* Inner Wrapper: Handles Magnetic Hover */}
//       <motion.div
//         ref={magneticRef}
//         onMouseMove={handleMouse}
//         onMouseLeave={reset}
//         animate={{ x: position.x, y: position.y }}
//         transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
//         style={{ display: "inline-block", cursor: "pointer" }}
//       >
//         {children}
//       </motion.div>

//     </motion.div>
//   );
// };


import  { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const MagneticParallax = ({ children, offset = 150 }) => {
  const parallaxRef = useRef(null);
  const magneticRef = useRef(null);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoverable, setIsHoverable] = useState(true);
  
  // NEW: Track if the mouse is currently over the element
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e) => setIsHoverable(e.matches);
    handler({ matches: mediaQuery.matches });
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  const handleMouse = (e) => {
    if (!isHoverable) return;
    
    setIsHovering(true); // Mouse is active

    const { clientX, clientY } = e;
    const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    if (!isHoverable) return;
    setPosition({ x: 0, y: 0 });
    setIsHovering(false); // Mouse left, trigger the bounce
  };

  return (
    <motion.div ref={parallaxRef} style={{ y: parallaxY, display: "inline-block" }}>
      <motion.div
        ref={magneticRef}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        // NEW: Swap the transition physics based on hover state
        transition={
          isHovering
            ? { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } // Snappy follow
            : { type: "spring", stiffness: 50, damping: 4, mass: 1 }     // Slow, wobbly bounce
        }
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
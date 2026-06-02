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
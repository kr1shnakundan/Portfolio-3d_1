import { motion } from 'framer-motion';

const OrchestratedHover = () => {
  
  // 1. Variant for the FIRST Div (The "K")
  const firstDivVariants = {
    initial: { opacity: 0, x: -100, rotateY: 0 },
    
    // The 'animate' state acts as both your page-load animation AND your un-hover state
    animate: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0, 
      transition: {
        opacity: { duration: 1.2, delay: 0.3 }, // Page load delay
        x: { type: "spring", stiffness: 100, damping: 20, delay: 0.3 }, // Page load delay
        rotateY: { type: "spring", stiffness: 150, delay: 0.3 } // THE TRICK: Waits 0.3s before rotating back on un-hover!
      }
    },
    
    hover: { 
      rotateY: 360, 
      transition: { type: "spring", stiffness: 150, delay: 0 } // Rotates IMMEDIATELY when parent is hovered
    }
  };

  // 2. Variant for the SECOND Div 
  const secondDivVariants = {
    initial: { opacity: 0, x: -100, rotateX: 0 },
    
    animate: { 
      opacity: 1, 
      x: 0, 
      rotateX: 0, 
      transition: {
        opacity: { duration: 1.2, delay: 0.5 }, 
        x: { type: "spring", stiffness: 100, damping: 20, delay: 0.5 }, 
        rotateX: { type: "spring", stiffness: 150, delay: 0 } // THE TRICK: Rotates back IMMEDIATELY on un-hover!
      }
    },
    
    hover: { 
      rotateX: 360, 
      transition: { type: "spring", stiffness: 150, delay: 0.3 } // Waits 0.3s for the "K" to finish rotating first
    }
  };

  return (
    /* 3. The Parent Wrapper 
      By declaring initial, animate, and whileHover on the parent, 
      it automatically broadcasts these state changes to any child variants.
    */
    <motion.div 
      initial="initial" 
      animate="animate" 
      whileHover="hover"
      style={{ perspective: '1000px' }} // Perspective applied to the parent
      className="inline-flex gap-4 p-4 rounded-lg cursor-pointer"
    >
      
      {/* First Div ("K") listens to the parent and fires first */}
      <motion.div 
        variants={firstDivVariants}
        className="py-2 px-4 flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-100 text-purple-600 font-bold text-xl rounded-md origin-center"
      >
        K
      </motion.div>

      {/* Second Div listens to the parent and fires second */}
      <motion.div 
        variants={secondDivVariants}
        className="py-2 px-4 flex items-center justify-center bg-purple-600 text-white font-bold text-xl rounded-md origin-center"
      >
        Developer
      </motion.div>

    </motion.div>
  );
};

export default OrchestratedHover;
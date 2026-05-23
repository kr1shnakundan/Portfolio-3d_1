import { motion } from "framer-motion"
import Spline from "@splinetool/react-spline"

const HeroSection = () => {
  return (
    <section
    className="h-screen bg-gradient-to-r from-violet-900 to-black w-full flex 
    items-center justify-start lg:px-24 px-10 relative overflow-hidden"
    >
        {/* Right Side (Spline Container) */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
            <Spline 
              scene="https://prod.spline.design/NGpytUcP6lHSAGwu/scene.splinecode" 
              className="w-full h-full object-cover"
            />
        </div>
        {/* left section */}
        <div className="z-20 max-w-3xl pointer-events-none select-none ">
            <motion.h1 
            initial={{opacity:0 , y:50}}
            animate={{opacity:1 , y:0}}
            transition={{
                type:"spring",
                stiffness:40,
                damping:25,
                delay:1.3,
                duration:1.5

            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 ">
                Building Fast <br/>
                {/* here rotation is not applicable */}
                <motion.span
                initial={{opacity:0 , y:50 }}
                animate={{opacity:1 , y:0 }}
                transition={{
                    type:"spring",
                    stiffness:40,
                    damping:25,
                    delay:1.8,
                    duration:1.5,
                }} 
                className=" inline-block bg-gradient-to-r from-cyan-700 to-cyan-100 bg-clip-text text-transparent origin-left">
                    Reliable Results
                </motion.span>
            </motion.h1>
            <motion.p
            initial={{opacity:0 , y:50}}
            animate={{opacity:1 , y:0}}
            transition={{
                type:"spring",
                stiffness:40,
                damping:25,
                delay:2.0,
                duration:1.5,
            }} 
            className="text-xl md:text-1xl lg:text-2xl text-purple-200 max-w-2xl"
            >
                I deliver robust , production-ready website and web apps with speed and precision.
                Every code is backed by the clean code, clear communication and commitment to getting
                it done on time , every time.
            </motion.p>
        </div>
        
    </section>
  )
}

export default HeroSection
import {motion} from "framer-motion"
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter  } from "react-icons/fa";
import { FiMenu , FiX } from "react-icons/fi";
const Header = () => {
  const [isOpen , setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen)
  return (
    <header className="absolute w-full z-50 transition-all duration-300 ">
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20' >
           
           {/* logo/name */}
           <motion.div 
           initial={{opacity:0 , x:-100}}
           animate={{opacity:1 , x:0}}
           transition={{
            type:"spring",
            stiffness:100,
            damping:20,
            delay:0.3,
            duration:1.2
           }}
           className='flex items-center gap-2'
           >
                <div className='py-2 px-4 flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-100  text-purple-600 font-bold text-xl mr-3 rounded-md'>
                    K
                </div>
                <span className='text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent'>
                    Krisha Kundan
                </span>
           </motion.div>

           {/* Desktop navigation */}
           <nav className="lg:flex hidden space-x-8">
                {["Home","About","Projects","Experience","Contact"].map((item ,index)=>(
                  <motion.a
                  key={item}
                  initial={{opacity:0 , y:-20}}
                  animate={{opacity:1 , y:0}}
                  transition={{
                    type:"spring",
                    stiffness:100,
                    damping:20,
                    delay:0.7 + index*0.2
                  }}
                  className="relative text-gray-800 dark:text-gray-200 hover:violet-600
                   dark:hover:text-violet-400 font-medium transition-color duration-300 group "
                  href="#"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full 
                       bg-violet-600 transition-all delay-300 
                    "></span>
                  </motion.a>
                ))} 
           </nav>

           {/* social icons - desktop */}
           <motion.div
          //  initial={{opacity:0 , x:50}}
          //  animate={{opacity:1 , x : 0 }}
          //  transition={{
          //   type:"spring",
          //   stiffness:100,
          //   damping:20,
          //   delay:0.3,
          //   duration:1.3
          //  }}

           className='hidden md:flex items-center space-x-4'>
                <motion.a 
                initial={{opacity:0 , scale:0.5}}
                animate={{opacity:1 , scale:1}}
                transition={{
                  delay:1.3 ,
                  duration: 0.8
                }}
                className="text-gray-800 dark:text-gray-200 hover:text-violet-600
                dark:hover:text-violet-400 transition-color duration-300" href="#">
                    <FaGithub className="w-5 h-5"/>
                </motion.a>
                <motion.a 
                initial={{opacity:0 , scale:0.5}}
                animate={{opacity:1 , scale:1}}
                transition={{
                  delay:1.3,
                  duration:0.8
                }}
                className="text-gray-800 dark:text-gray-200 hover:text-violet-600
                dark:hover:text-violet-400 transition-color duration-300" href="#">
                    <FaLinkedin className="w-5 h-5"/>
                </motion.a>
                <motion.a 
                initial={{opacity:0 , scale:0.5}}
                animate={{opacity:1 , scale:1}}
                transition={{
                  delay:1.3,
                  duration:0.8
                }}
                className="text-gray-800 dark:text-gray-200 hover:text-violet-600
                dark:hover:text-violet-400 transition-color duration-300" href="#">
                    <FaTwitter className="w-5 h-5"/>
                </motion.a>

                {/* Hire me button */}
                <motion.button 
                initial={{opacity:0 , scale:0.8}}
                animate={{opacity:1 , scale:1}}
                transition={{
                  type:"spring",
                  stiffness:100,
                  damping:100,
                  delay:1.6 , 
                  duration:0.8
                }}
                className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-t from-gray-400 to-gray-100 
                 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white
                dark:hover:text-violet-400 transition-all duration-300 ">
                  Hire Me
                </motion.button>
           </motion.div>

          {/* mobile-menu button */}
          <div className="md:hidden flex items-center">
           <motion.button
           whileTap={{scale:0.7}}
           onClick={toggleMenu}
           className="text-gray-300"
           >
             {isOpen ? <FiX className="w-6 h-6"/> : <FiMenu className="w-6 h-6"/>}
           </motion.button>
          </div>
        </div>

        {/* mobile-menu */}
        <motion.div 
        initial={{opacity:0 , height:0}}
        animate={{opacity: isOpen ? 1 : 0 ,
          height : isOpen ? "auto" : 0
        }}
        transition={{duration:0.5}}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5">
            <nav className="flex flex-col space-y-3">
              {["Home","About","Projects","Experience","Contact"].map((item , index )=>(
                <motion.a 
                onClick={()=>{
                  toggleMenu()
                }} 
                key={item}
                initial={{opacity:0 , y:-50}}
                animate={{opacity:1 , y:0}} 
                transition={{
                  type:"spring",
                  stiffness:100,
                  damping:20,
                  delay:0.7 + index * 0.2,
                  
                }}
                className="text-gray-300 font-medium py-2"href={"#"}>
                  {item}
                </motion.a>
              ))}
            </nav>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-5">
                <a href="#">
                  <FaGithub className="h-5 w-5 text-gray-300"/>
                </a>
                <a href="#">
                  <FaLinkedin className="h-5 w-5 text-gray-300"/>
                </a>
                <a href="#">
                  <FaTwitter className="h-5 w-5 text-gray-300"/>
                </a>
              </div>
              <button 
              onClick={()=>{
                toggleMenu()
              }}
              className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r 
              from-violet-600 to-violet-400 font-bold">
                Contact Me
              </button>
            </div>
        </motion.div>
    </header>
  )
}

export default Header
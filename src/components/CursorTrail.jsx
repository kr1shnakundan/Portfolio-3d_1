import gsap from "gsap";
import { useEffect, useRef } from "react"

const CursorTrail = () => {
  const particlesRef = useRef([]);
  const currentIndex = useRef(0);

  useEffect(()=>{
    const handleMouseMove = (e) =>{
      const particle = particlesRef.current[currentIndex.current]
      currentIndex.current = (currentIndex.current + 1)%particlesRef.current.length;

      gsap.killTweensOf(particle);

      gsap.set(particle , {
        x: e.clientX,
        y: e.clientY,
        scale:0,
        opacity:1,
      })

      gsap.to(particle,{
        x:`+=${gsap.utils.random(-120,120)}`,
        y: `+=${gsap.utils.random(-120,120)}`,
        rotation: gsap.utils.random(-180 , 180),
        scale: gsap.utils.random(0.5, 1.5),
        opacity: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: 'power2.out',
      });
    }

    window.addEventListener('mousemove',handleMouseMove)

    return()=> window.removeEventListener('mousemove',handleMouseMove)
  },[]);
  return (
    <div
    style={
      {
        position:`fixed`,
        top:0,
        left:0,
        width:'100vw',
        height: '100vh', 
        pointerEvents: 'none', 
        zIndex: 9999,
        overflow: 'hidden'

      }
    }
    >
      {[...Array(20)].map((_,i)=>(
        <div
        key={i}
        ref={(el)=>(particlesRef.current[i] = el)}
        style={{
          position: 'absolute',
          top: '-20px', 
          left: '-20px',
          width: '30px',
          height: '30px',
          opacity: 0,
          background: 'linear-gradient(45deg, #2e2c2e, #f7f7f7)', 
          borderRadius: '8px'
        }}
        />
      ))}
    </div>
  )
}

export default CursorTrail;
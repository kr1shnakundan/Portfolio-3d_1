import { Curve } from 'three'
import CursorTrail from './components/CursorTrail'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutMeHome from './components/section2'
import TechArsenal from './components/section_3/TechArcenal'
import PhysicsTechStack from './components/section_4/PhysicsTechStack'
import SectionGsap from './components/section_4/sectionGsap'
import CurveSection from './components/section_5/CurveLineSection'
import TestSec from './components/section_5/testSec'



export default function App() {
  return (
    <>
      {/* <LiquidBackground/> */}
      {/* <div> */}
        <Header />
        <HeroSection/>
        <CursorTrail/>
        <CustomCursor/>
        <AboutMeHome/>
        <TechArsenal/>
        <SectionGsap/>
        <PhysicsTechStack/>
        <CurveSection/>
        <TestSec/>
      {/* </div> */}
    </>
  )
}
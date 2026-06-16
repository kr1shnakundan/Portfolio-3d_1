import CursorTrail from './components/CursorTrail'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutMeHome from './components/section2'
import TechArsenal from './components/section_3/TechArcenal'
import PhysicsTechStack from './components/section_4/PhysicsTechStack'
import StackingCards from './components/section_4/sectionGsap'
import CurveSection from './components/section_5/CurveLineSection'
import RuntimeLog from './components/section_6/Runtimelog'



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
        <StackingCards/>
        <PhysicsTechStack/>
        <CurveSection/>
        <RuntimeLog/>
      {/* </div> */}
    </>
  )
}
import CursorTrail from './components/CursorTrail'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import OrchestratedHover from './components/temporaryCheck'
// import LiquidBackground from './components/LiquidBackground'

export default function App() {
  return (
    <>
      {/* <LiquidBackground/> */}
      {/* <div> */}
        <Header />
        <HeroSection/>
        <CursorTrail/>
        <CustomCursor/>
        <OrchestratedHover/>
      {/* </div> */}
    </>
  )
}
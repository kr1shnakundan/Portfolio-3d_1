import CursorTrail from './components/CursorTrail'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutMeHome from './components/section2'


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
      {/* </div> */}
    </>
  )
}

import Footer from "../../Home/Footer"
import Navbar from "../../Home/Navbar"
import InfoCards from "./InfoCards"
import OfferRide from "./OfferRide"
import RideHomeHero from "./RideHomeHero"
import RidesSection from "./RidesSection"
import SafetySection from "./safetySection"


const RideHome = () => {
  
  return (
    <>
    <Navbar/>
    <RideHomeHero/>
    <InfoCards/>
    <SafetySection/>
    <OfferRide/>
    <RidesSection/>
    <Footer/>
    </>
  )
}

export default RideHome
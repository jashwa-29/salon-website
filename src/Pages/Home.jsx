import React from 'react'
import Header from '../Components/CommonComponents/Navbar'
import Hero from '../Components/HomeComponents/Hero'
import Services from '../Components/HomeComponents/Services'
// import About from '../Components/HomeComponents/About'
import Team from '../Components/HomeComponents/Team'
import Booking from '../Components/HomeComponents/Booking'
import AboutSection from '../Components/HomeComponents/AboutSection'
import ServicesSection from '../Components/HomeComponents/ServicesSection'
import Testimonials from '../Components/HomeComponents/Testimonials'
import CombosSection from '../Components/HomeComponents/CombosSection'


const Home = () => {
  return (
    <div>
      <Hero/>
       <AboutSection/>
       <ServicesSection/>
        <CombosSection/>
       <Testimonials/>
              




    </div>
  )
}

export default Home
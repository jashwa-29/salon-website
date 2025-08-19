import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image with Improved Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://i.pinimg.com/1200x/4f/3b/95/4f3b95239e05468cf7486864d0623ef5.jpg" 
          alt="Luxury Salon" 
          className="w-full h-full object-cover"
        />
        {/* Improved overlay with better opacity control */}
        <div className="absolute inset-0 bg-black/70"></div>
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4">
            Experience <span className="text-white">Luxury</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-8">
            Where beauty meets perfection. Our expert stylists create looks that enhance your natural beauty.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
          
              <a href='#combos' className="bg-gold hover:bg-gold-dark text-black font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105">
                Our Combos
              </a>
     
    
              <a href='#services' className="border-2 border-gold hover:bg-gold hover:bg-opacity-10 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105">
                Our Services
              </a>
      
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gold mt-2 rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
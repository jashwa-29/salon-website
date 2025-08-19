import { motion } from "framer-motion";
import { Scissors, Gem, Sparkles, HeartHandshake, Award, Users, Calendar, MapPin } from "lucide-react";
import Testimonials from "../Components/HomeComponents/Testimonials";

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-black text-gray-100">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1286&q=80')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="mb-6">
            <div className="inline-flex items-center">
              <div className="w-12 h-px bg-amber-400/60 mr-4" />
              <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">About Us</span>
              <div className="w-12 h-px bg-amber-400/60 ml-4" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6"
          >
            <span className="text-white">The Art of </span>
            <span className="text-amber-300">Timeless Beauty</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg sm:text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
          >
            Where luxury meets innovation in beauty. Our legacy of excellence spans over a decade, crafting personalized experiences that transcend trends.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeIn} className="order-2 lg:order-1">
              <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="order-1 lg:order-2 space-y-8">
              <div>
                <div className="w-16 h-px bg-amber-400/60 mb-4" />
                <h2 className="text-3xl sm:text-4xl font-light mb-6">
                  <span className="text-white">Our </span>
                  <span className="text-amber-300">Heritage</span>
                </h2>
              </div>
              
              <p className="text-gray-300/90 text-lg leading-relaxed">
                Founded in 2010 by master stylist Elena Rodriguez, our salon began as a single-chair boutique in downtown Paris. What started as a passion project quickly blossomed into an internationally recognized beauty destination.
              </p>
              
              <p className="text-gray-300/90 text-lg leading-relaxed">
                Today, with locations in three countries, we maintain that intimate, personalized approach while offering world-class services. Our team of 50+ professionals continues Elena's vision of combining technical mastery with artistic expression.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {[
                  { icon: <Award className="w-6 h-6" />, value: "15+", label: "Awards" },
                  { icon: <Users className="w-6 h-6" />, value: "50+", label: "Experts" },
                  { icon: <Calendar className="w-6 h-6" />, value: "13", label: "Years" },
                  { icon: <MapPin className="w-6 h-6" />, value: "3", label: "Countries" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className="p-4 rounded-lg bg-gray-900/50 border border-gray-800/50 text-center"
                  >
                    <div className="text-amber-400 flex justify-center mb-2">{item.icon}</div>
                    <div className="text-2xl font-medium text-amber-300">{item.value}</div>
                    <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-10 bg-gradient-to-b from-black to-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <div className="inline-flex items-center">
                <div className="w-12 h-px bg-amber-400/60 mr-4" />
                <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">Our Essence</span>
                <div className="w-12 h-px bg-amber-400/60 ml-4" />
              </div>
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-light mb-6"
            >
              <span className="text-white">The </span>
              <span className="text-amber-300">Lumiére Philosophy</span>
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-gray-300/90 text-lg leading-relaxed"
            >
              We believe true beauty emerges when science, art, and personal connection intersect. Our approach combines meticulous technique with intuitive creativity.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Mastery",
                description: "Continuous education in cutting-edge techniques and technologies",
                icon: <Scissors className="w-8 h-8" />
              },
              {
                title: "Artistic Vision",
                description: "Treating each client as a unique canvas for creative expression",
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                title: "Sustainable Luxury",
                description: "Ethically sourced products that deliver exceptional results",
                icon: <Gem className="w-8 h-8" />
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="p-8 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 hover:border-amber-400/30 transition-all duration-500"
              >
                <div className="text-amber-400 mb-6">{item.icon}</div>
                <h3 className="text-xl font-medium text-amber-300 mb-3">{item.title}</h3>
                <p className="text-gray-400/90">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <div className="inline-flex items-center">
                <div className="w-12 h-px bg-amber-400/60 mr-4" />
                <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">Meet The Artists</span>
                <div className="w-12 h-px bg-amber-400/60 ml-4" />
              </div>
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-light mb-6"
            >
              <span className="text-white">Our </span>
              <span className="text-amber-300">Master Stylists</span>
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-gray-300/90 text-lg leading-relaxed"
            >
              Each member of our team brings unique expertise and creative vision to craft your perfect look.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Elena Rodriguez",
                role: "Founder & Creative Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80",
                specialty: "Editorial Styling"
              },
              {
                name: "Marcus Chen",
                role: "Master Colorist",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
                specialty: "Balayage Specialist"
              },
              {
                name: "Sophie Laurent",
                role: "Cutting Specialist",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80",
                specialty: "Precision Cutting"
              },
              {
                name: "David Park",
                role: "Texture Expert",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
                specialty: "Curly Hair Specialist"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="group overflow-hidden rounded-xl"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-medium">{member.name}</h3>
                    <p className="text-amber-300 text-sm mb-2">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.specialty}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       
        <Testimonials/>
    </div>
  );
};

export default AboutPage;
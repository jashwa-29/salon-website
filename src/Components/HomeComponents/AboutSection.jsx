import { motion } from "framer-motion";
import { Scissors, Gem, Sparkles, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };


  const navigate = useNavigate();

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

  const features = [
    {
      icon: <Scissors className="w-5 h-5" />,
      title: "Master Stylists",
      description: "Award-winning professionals with decade-long expertise"
    },
    {
      icon: <Gem className="w-5 h-5" />,
      title: "Luxury Products",
      description: "Premium, sustainable brands for exceptional results"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Bespoke Services",
      description: "Tailored treatments for your unique beauty"
    },
    {
      icon: <HeartHandshake className="w-5 h-5" />,
      title: "Client-Centric",
      description: "Your satisfaction is our ultimate priority"
    }
  ];

  return (
    <section className="bg-black py-16 px-6 sm:px-8 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column - Image */}
          <motion.div 
            variants={fadeIn}
            className="relative h-[380px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden"
          >
            {/* Image placeholder - replace with your actual image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80')] bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-1000" />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Years badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute bottom-6 right-6 bg-amber-500/90 backdrop-blur-sm text-black px-5 py-3 rounded-lg shadow-lg z-10 border border-amber-300/30"
            >
              <div className="text-center">
                <span className="block text-2xl font-bold">15+</span>
                <span className="block text-xs font-medium tracking-wider">YEARS OF EXCELLENCE</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={fadeIn} className="space-y-8">
            {/* Elegant About Us heading */}
           <motion.div 
  variants={fadeIn}
  className="flex items-center "
>
  <div className="w-8 h-px bg-amber-400/60 flex-shrink-0"></div>
  <p className="text-amber-400/90 font-medium text-sm uppercase tracking-[0.3em] px-4">
    About Us
  </p>
  <div className="w-8 h-px bg-amber-400/60 flex-shrink-0"></div>
</motion.div>
            
            {/* Main heading */}
            <motion.h2 
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-[2.7rem] leading-tight font-light"
            >
              <span className="text-white">Crafting </span>
              <span className="text-amber-300">Timeless </span>
              <span className="text-white">Beauty</span>
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              variants={fadeIn}
              className="text-gray-300/90 text-base sm:text-lg leading-relaxed max-w-[600px]"
            >
              At our prestigious salon, we blend artistry with precision to create transformative beauty experiences. 
              Established in 2008, we've perfected the balance between contemporary trends and classic elegance.
            </motion.p>
            
            {/* Features grid */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-black to-gray-900/80 border border-gray-800/50 hover:border-amber-400/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/20 group-hover:bg-amber-400/20 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-300/90 mb-1">{feature.title}</h3>
                      <p className="text-gray-400/80 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA button */}
            <motion.div 
              variants={fadeIn}
              className="pt-4"
            >
              <button className="relative px-8 py-3 bg-transparent text-amber-300 font-medium rounded-full overflow-hidden group" onClick={() => navigate('/about')}>
                <span className="absolute inset-0 border border-amber-400/40 rounded-full group-hover:border-amber-400/60 transition-all duration-300"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2 text-sm tracking-wide">
                  Discover Our Story
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
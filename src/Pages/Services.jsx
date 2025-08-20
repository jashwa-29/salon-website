import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Scissors, Sparkles, Zap, Gem, ArrowRight, Phone, Diamond, Zap as LightningBolt } from 'lucide-react';
import ComboBookingModal from '../Components/CommonComponents/ComboBookingModal';
import ServiceBookingModal from '../Components/CommonComponents/ServiceBookingModal';

const ServicesPage = () => {
  const [activeGender, setActiveGender] = useState('female');
  const [servicesData, setServicesData] = useState({
    female: { services: [], packages: [] },
    male: { services: [], packages: [] }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

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

  const cardHover = {
    initial: { 
      y: 0,
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(217, 119, 6, 0.25)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const iconHover = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: 10 }
  };

  // Modal handlers
  const handleOpenComboModal = (combo) => {
    setSelectedCombo(combo);
    setIsComboModalOpen(true);
  };

  const handleCloseComboModal = () => {
    setIsComboModalOpen(false);
    setSelectedCombo(null);
  };

  const handleOpenServiceModal = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
    setSelectedService(null);
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch services
        const servicesResponse = await axios.get('https://salon-backend-3l2q.onrender.com/api/services');
        const services = servicesResponse.data;
        
        // Fetch combos (packages)
        const combosResponse = await axios.get('https://salon-backend-3l2q.onrender.com/api/combos');
        const combos = combosResponse.data;
        
        // Organize data by gender
        const organizedData = {
          female: { services: [], packages: [] },
          male: { services: [], packages: [] }
        };
        
        // Process services
        services.forEach(service => {
          if (service.isActive) {
            const formattedService = {
              _id: service._id,
              name: service.name,
              price: service.price,
              formattedPrice: `₹${service.price}`,
              duration: service.duration,
              formattedDuration: `${service.duration} min`,
              description: service.description,
              category: service.category,
              gender: service.gender
            };
            
            if (service.gender === 'female') {
              organizedData.female.services.push(formattedService);
            } else if (service.gender === 'male') {
              organizedData.male.services.push(formattedService);
            } else {
              // If no gender specified, add to both
              organizedData.female.services.push(formattedService);
              organizedData.male.services.push(formattedService);
            }
          }
        });
        
        // Process combos
        combos.forEach(combo => {
          if (combo.isActive) {
            const serviceNames = combo.services.map(item => item.service.name);
            const formattedCombo = {
              _id: combo._id,
              name: combo.name,
              services: combo.services,
              serviceNames: serviceNames,
              price: combo.totalPrice,
              formattedPrice: `₹${combo.totalPrice}`,
              duration: combo.totalDuration,
              formattedDuration: `${combo.totalDuration} min`,
              savings: combo.discount,
              formattedSavings: `${combo.discount}% off`,
              description: combo.description,
              gender: combo.gender
            };
            
            if (combo.gender === 'female') {
              organizedData.female.packages.push(formattedCombo);
            } else if (combo.gender === 'male') {
              organizedData.male.packages.push(formattedCombo);
            } else {
              // If no gender specified, add to both
              organizedData.female.packages.push(formattedCombo);
              organizedData.male.packages.push(formattedCombo);
            }
          }
        });
        
        setServicesData(organizedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load services. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Get the appropriate icon based on gender
  const getGenderIcon = () => {
    return activeGender === 'female' ? (
      <Diamond className="w-5 h-5 text-gold" />
    ) : (
      <LightningBolt className="w-5 h-5 text-gold" />
    );
  };

  if (loading) {
    return (
      <div className="bg-black text-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-300">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gold hover:bg-amber-600 text-black font-medium rounded-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-gray-100 min-h-screen">
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
              <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">Our Services</span>
              <div className="w-12 h-px bg-amber-400/60 ml-4" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6"
          >
            <span className="text-white">The Art of </span>
            <span className="text-gold">Timeless Beauty</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg sm:text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
          >
            Where luxury meets innovation in beauty. Our legacy of excellence spans over a decade, crafting personalized experiences that transcend trends.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Gender Tabs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex justify-center mb-16"
          >
            <div className="inline-flex bg-gray-900/50 rounded-full p-1 border border-gray-800 backdrop-blur-sm">
              <button 
                onClick={() => setActiveGender('female')}
                className={`px-8 py-3 rounded-full flex items-center transition-all ${
                  activeGender === 'female' 
                    ? 'bg-gold text-black font-medium shadow-lg shadow-gold/20' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Diamond className="w-5 h-5 mr-2" />
                Women's Services
              </button>
              <button 
                onClick={() => setActiveGender('male')}
                className={`px-8 py-3 rounded-full flex items-center transition-all ml-1 ${
                  activeGender === 'male' 
                    ? 'bg-gold text-black font-medium shadow-lg shadow-gold/20' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <LightningBolt className="w-5 h-5 mr-2" />
                Men's Services
              </button>
            </div>
          </motion.div>

          {/* Individual Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-12 text-center">
              <span className="text-white">Premium </span>
              <span className="text-gold">Services</span>
            </h2>
            
            {servicesData[activeGender].services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No services available for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {servicesData[activeGender].services.map((service) => (
                  <motion.div
                    key={service._id}
                    initial="initial"
                    whileHover="hover"
                    variants={cardHover}
                    className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800 transition-all group"
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/30 to-black/80" />
                    </div>
                    
                    <div className="relative p-8 h-full flex flex-col min-h-[320px]">
                      <div className="flex items-center mb-6">
                        <motion.div 
                          variants={iconHover}
                          className="bg-gold/10 p-3 rounded-xl mr-4"
                        >
                          {getGenderIcon()}
                        </motion.div>
                        <h3 className="text-xl font-medium text-white">{service.name}</h3>
                      </div>
                      
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-gold font-medium text-lg">{service.formattedPrice}</span>
                        <span className="text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-full">
                          {service.formattedDuration}
                        </span>
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <p className="text-gray-400 text-sm mb-6">
                          {service.description}
                        </p>
                        
                        <div className="mt-auto">
                          <motion.button 
                            onClick={() => handleOpenServiceModal(service)}
                            whileHover={{ 
                              backgroundColor: 'rgba(217, 119, 6, 0.2)',
                              transition: { duration: 0.3 }
                            }}
                            className="w-full py-3 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg text-sm transition-all flex items-center justify-center group"
                          >
                            <span>Book Now</span>
                            <motion.div
                              initial={{ x: -5, opacity: 0 }}
                              whileHover={{ x: 5, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="ml-2"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.div>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -inset-1 bg-gradient-to-r from-gold/10 to-transparent blur-sm" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Experience Packages */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-light mb-12 text-center">
              <span className="text-white">Curated </span>
              <span className="text-gold">Experience Packages</span>
            </h2>
            
            {servicesData[activeGender].packages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No packages available for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {servicesData[activeGender].packages.map((pkg) => (
                  <motion.div
                    key={pkg._id}
                    initial="initial"
                    whileHover="hover"
                    variants={cardHover}
                    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-gray-900/80 border border-gray-800 group"
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/30 to-black/80" />
                    </div>
                    
                    <div className="relative p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-medium text-gold">{pkg.name}</h3>
                          <p className="text-gray-400 mt-2">{pkg.description}</p>
                        </div>
                        <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm whitespace-nowrap">
                          Save {pkg.formattedSavings}
                        </span>
                      </div>
                      
                      <div className="mb-8">
                        <h4 className="text-gray-300 font-medium mb-3">Includes:</h4>
                        <ul className="space-y-3">
                          {pkg.serviceNames.map((service, i) => (
                            <li key={i} className="flex items-center">
                              <motion.div 
                                whileHover={{ rotate: 15 }}
                                className="bg-gold/10 p-1 rounded-full mr-3"
                              >
                                {getGenderIcon()}
                              </motion.div>
                              <span className="text-gray-300">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-800/50">
                        <div className="mb-4 sm:mb-0">
                          <span className="text-gold font-medium text-xl">{pkg.formattedPrice}</span>
                          <span className="text-gray-500 text-sm ml-2">({pkg.formattedDuration})</span>
                        </div>
                        <div className="flex space-x-3">
                          <motion.button
                            onClick={() => handleOpenComboModal(pkg)}
                            whileHover={{ 
                              scale: 1.03,
                              boxShadow: "0 0 20px rgba(217, 119, 6, 0.5)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-2 bg-gold hover:bg-amber-600 text-black font-medium rounded-lg transition-all text-sm shadow-md shadow-gold/20"
                          >
                            Book Now
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -inset-1 bg-gradient-to-r from-gold/10 to-transparent blur-sm" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Booking Modals */}
      <ComboBookingModal
        isOpen={isComboModalOpen}
        onClose={handleCloseComboModal}
        combo={selectedCombo}
      />

      <ServiceBookingModal
        isOpen={isServiceModalOpen}
        onClose={handleCloseServiceModal}
        item={selectedService}
      />
    </div>
  );
};

export default ServicesPage;
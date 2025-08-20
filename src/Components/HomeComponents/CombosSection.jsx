import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Zap, ArrowRight, Phone } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ComboBookingModal from '../CommonComponents/ComboBookingModal'; // Adjust the path as needed

const CombosSection = () => {
  const [activeGender, setActiveGender] = useState('female');
  const [combos, setCombos] = useState({ female: [], male: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const response = await axios.get('https://salon-backend-3l2q.onrender.com/api/combos');
        
        // Transform the API data into our desired format
        const transformedData = {
          female: response.data.filter(combo => combo.gender === 'female'),
          male: response.data.filter(combo => combo.gender === 'male')
        };
        
        setCombos(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCombos();
  }, []);

  const handleBookNow = (combo) => {
    setSelectedCombo(combo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCombo(null);
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

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${mins} mins` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  const formatSavings = (discount) => {
    return `${discount}% off`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gold">Loading combos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-black" id='combos'>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center mb-4">
              <div className="w-12 h-px bg-amber-400/60 mr-4" />
              <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">Premium Packages</span>
              <div className="w-12 h-px bg-amber-400/60 ml-4" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light">
              <span className="text-white">Curated </span>
              <span className="text-gold">Combinations</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Experience our most popular services combined for exceptional value and results
            </p>
          </motion.div>

          {/* Gender Tabs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-gray-900/50 rounded-full p-1 border border-gray-800">
              <button 
                onClick={() => setActiveGender('female')}
                className={`px-6 py-2 rounded-full flex items-center transition-colors ${
                  activeGender === 'female' 
                    ? 'bg-gold text-black font-medium' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                For Her
              </button>
              <button 
                onClick={() => setActiveGender('male')}
                className={`px-6 py-2 rounded-full flex items-center transition-colors ml-1 ${
                  activeGender === 'male' 
                    ? 'bg-gold text-black font-medium' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4 mr-2" />
                For Him
              </button>
            </div>
          </motion.div>

          {/* Combos Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {combos[activeGender].map((combo) => (
              <motion.div
                key={combo._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-black to-gray-900/80 border border-gray-800/50 rounded-xl p-8 hover:border-amber-400/30 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-medium text-gold">{combo.name}</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm">
                    Save {formatSavings(combo.discount)}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{combo.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {combo.services.map((serviceItem, index) => (
                    <li key={index} className="flex items-center">
                      <Scissors className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">
                        {serviceItem.service.name} (${serviceItem.service.price})
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-800/50 pt-6">
                  <div className="mb-4 sm:mb-0">
                    <span className="text-amber-400 font-medium text-lg">₹{combo.totalPrice}</span>
                    <span className="text-gray-500 text-sm ml-2">({formatDuration(combo.totalDuration)})</span>
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBookNow(combo)}
                      className="px-6 py-2 bg-gold hover:bg-amber-600 text-black font-medium rounded-full transition-colors text-sm"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <h3 className="text-2xl font-light text-white mb-6">
              Explore our <span className="text-gold">complete Combo menu</span>
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/services')}
                className="px-8 py-3 bg-gold hover:bg-amber-600 text-black font-medium rounded-full transition-colors flex items-center justify-center mx-auto sm:mx-0"
              >
                View All Combos
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <ComboBookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        combo={selectedCombo}
      />
    </>
  );
};

export default CombosSection;
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Scissors, Sparkles, Gem, Zap, ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import ServiceBookingModal from "../CommonComponents/ServiceBookingModal";

const ServicesSection = () => {
  const [activeGender, setActiveGender] = useState('female');
  const [services, setServices] = useState({ female: [], male: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();


    const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // ... existing code ...

  const handleBookNow = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://salon-backend-3l2q.onrender.com/api/services');
        
        // Transform the API data into our desired format
        const transformedData = {
          female: response.data.filter(service => service.gender === 'female'),
          male: response.data.filter(service => service.gender === 'male')
        };
        
        setServices(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (category) => {
    switch (category) {
      case 'hair':
        return <Scissors className="w-6 h-6" />;
      case 'color':
        return <Sparkles className="w-6 h-6" />;
      case 'facial':
      case 'treatment':
        return <Gem className="w-6 h-6" />;
      case 'beard':
        return <Zap className="w-6 h-6" />;
      default:
        return <Scissors className="w-6 h-6" />;
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${mins} mins` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };



  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gold">Loading services...</p>
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
    <section className="py-20 bg-black" id="services">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-4">
             <div className="w-12 h-px bg-amber-400/60 mr-4" />
            <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">Our Services</span>
            <div className="w-12 h-px bg-amber-400/60 ml-4" />
          </div>
          <h2 className="text-3xl md:text-4xl font-light">
            <span className="text-white">Tailored </span>
            <span className="text-gold">Experiences</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Curated services designed for your unique needs and style
          </p>
        </div>

        {/* Gender Tabs */}
        <div className="flex justify-center mb-12">
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
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services[activeGender].map((service) => (
            <motion.div
              key={service._id}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-black to-gray-900/80 border border-gray-800/50 rounded-xl p-6 hover:border-gold/30 transition-all h-full flex flex-col"
            >
              <div className="text-gold mb-4">{getServiceIcon(service.category)}</div>
              <h3 className="text-xl font-medium text-gold mb-2">{service.name}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gold font-medium">₹{service.price}</span>
                  <span className="text-sm text-gray-500">{formatDuration(service.duration)}</span>
                </div>
              <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBookNow(service)}
              className="w-full py-2.5 bg-gold hover:bg-gold text-black font-medium rounded-lg transition-colors text-sm"
            >
              Book Appointment
            </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-light text-white mb-6">
            Explore our <span className="text-gold">complete service menu</span>
          </h3>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
                 onClick={() => navigate('/services')}
            className="px-8 py-3 bg-transparent border border-gold/40 hover:border-gold/80 text-gold hover:text-white rounded-full transition-all flex items-center justify-center mx-auto"
          >
            View All Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </div>


         <ServiceBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      
        item={selectedService}
      />
    </section>
  );
};

export default ServicesSection;
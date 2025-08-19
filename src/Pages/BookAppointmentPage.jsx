import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Clock, Scissors, Gem, Sparkles, ChevronRight, Check } from 'lucide-react';

const BookAppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    services: [],
    combo: null,
    appointmentDate: '',
    timeSlot: '',
    notes: ''
  });

  // Get service/combo ID from URL params
  const params = new URLSearchParams(location.search);
  const serviceId = params.get('service');
  const comboId = params.get('combo');

  useEffect(() => {
    // Set initial form data based on URL params
    if (serviceId) {
      setFormData(prev => ({
        ...prev,
        services: [serviceId],
        combo: null
      }));
    } else if (comboId) {
      setFormData(prev => ({
        ...prev,
        services: [],
        combo: comboId
      }));
    }

    // Fetch available time slots (mock data - replace with actual API call)
    const fetchSlots = async () => {
      try {
        // This would be replaced with your actual API call
        const mockSlots = [
          '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
          '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
        ];
        setAvailableSlots(mockSlots);
      } catch (err) {
        console.error('Error fetching slots:', err);
      }
    };

    fetchSlots();
  }, [serviceId, comboId]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      appointmentDate: date
    }));
  };

  const handleTimeSlotSelect = (slot) => {
    setFormData(prev => ({
      ...prev,
      timeSlot: slot
    }));
  };

  const handleNotesChange = (e) => {
    setFormData(prev => ({
      ...prev,
      notes: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (!formData.appointmentDate || !formData.timeSlot) {
      setError('Please select a date and time slot');
      return;
    }

    if ((!formData.services || formData.services.length === 0) && !formData.combo) {
      setError('Please select a service or combo');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/appointments',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      console.error('Booking error:', err.response?.data);
      setError(err.response?.data?.msg || 'Failed to book appointment');
      setLoading(false);
    }
  };

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
    <section className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
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
              <div className="w-12 h-px bg-gold/60 mr-4" />
              <span className="text-gold/90 text-sm uppercase tracking-[0.3em]">Book Now</span>
              <div className="w-12 h-px bg-gold/60 ml-4" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-4xl sm:text-5xl font-light leading-tight mb-6"
          >
            <span className="text-white">Schedule Your </span>
            <span className="text-amber-300">Appointment</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 p-8"
          >
            {success ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-medium text-gold mb-2">Appointment Booked!</h2>
                <p className="text-gray-400 mb-6">Your appointment has been successfully scheduled.</p>
                <p className="text-sm text-gray-500">You'll be redirected to your profile shortly...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h2 className="text-xl font-medium text-gold mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Select Date & Time</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Appointment Date</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-gray-800/50 border border-gray-700 focus:border-gold/50 rounded-lg py-3 px-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0"
                        value={selectedDate}
                        onChange={handleDateChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Time Slot</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableSlots.map((slot) => (
                          <motion.button
                            key={slot}
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                              formData.timeSlot === slot
                                ? 'bg-gold text-black font-medium'
                                : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-amber-400/30'
                            }`}
                            onClick={() => handleTimeSlotSelect(slot)}
                          >
                            {slot}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-medium text-gold mb-6 flex items-center gap-2">
                    {comboId ? (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Selected Combo</span>
                      </>
                    ) : (
                      <>
                        <Scissors className="w-5 h-5" />
                        <span>Selected Service</span>
                      </>
                    )}
                  </h2>
                  
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gold/10 rounded-lg text-gold">
                          {comboId ? <Sparkles className="w-5 h-5" /> : <Scissors className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gold">
                            {comboId ? 'Premium Combo Package' : 'Custom Hair Service'}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {comboId ? 'Multiple services at discounted price' : 'Personalized service experience'}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-medium text-gold mb-6 flex items-center gap-2">
                    <Gem className="w-5 h-5" />
                    <span>Additional Notes</span>
                  </h2>
                  
                  <textarea
                    placeholder="Any special requests or notes for your stylist..."
                    className="w-full bg-gray-800/50 border border-gray-700 focus:border-gold/50 rounded-lg py-3 px-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0 min-h-[120px]"
                    value={formData.notes}
                    onChange={handleNotesChange}
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-3 bg-red-900/30 text-red-300 rounded-lg text-sm border border-red-800/50 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    loading 
                      ? 'bg-amber-600/70 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/20'
                  } text-gray-900 flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Confirm Appointment'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default BookAppointmentPage;
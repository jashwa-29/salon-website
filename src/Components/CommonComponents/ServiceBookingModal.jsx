import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Scissors, Check, Sparkles } from 'lucide-react';
import axios from 'axios';

const ServiceBookingModal = ({ isOpen, onClose, item }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    services: [],
    appointmentDate: '',
    timeSlot: '',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormData({
        services: [item._id],
        appointmentDate: '',
        timeSlot: '',
        notes: ''
      });
      setSuccess(false);
      setError(null);

      // Fetch available time slots (mock data - replace with actual API call)
      const mockSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
      ];
      setAvailableSlots(mockSlots);
    }
  }, [isOpen, item]);

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
    
    if (!formData.appointmentDate || !formData.timeSlot) {
      setError('Please select a date and time slot');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://salon-backend-3l2q.onrender.com/api/appointments',
        formData,
        {
          headers: {
            "x-auth-token": `${token}`
          }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Booking error:', err.response?.data);
      setError(err.response?.data?.msg || 'Failed to book appointment');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-medium text-gold mb-2">Appointment Booked!</h2>
              <p className="text-gray-400 mb-6">Your service has been successfully scheduled.</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gold hover:bg-amber-600 text-black font-medium rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="text-xl font-medium text-gold mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5" />
                  <span>Book Service</span>
                </h2>
                
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/10 rounded-lg text-gold">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gold">{item.name}</h3>
                      <p className="text-sm text-gray-400">
                        ₹{item.price} • {item.duration} mins
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Select Date & Time</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Appointment Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-gray-800/50 border border-gray-700 focus:border-gold/50 rounded-lg py-2 px-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0"
                      value={selectedDate}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Time Slot</label>
                    <div className="grid grid-cols-2 gap-2">
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

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Special Requests</span>
                </h3>
                
                <textarea
                  placeholder="Any special requests or notes for your stylist..."
                  className="w-full bg-gray-800/50 border border-gray-700 focus:border-gold/50 rounded-lg py-2 px-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0 min-h-[100px]"
                  value={formData.notes}
                  onChange={handleNotesChange}
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg text-sm border border-red-800/50 flex items-center gap-2"
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
                  'Book Service'
                )}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceBookingModal;
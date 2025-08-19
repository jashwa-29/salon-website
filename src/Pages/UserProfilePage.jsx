import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Clock, Scissors, Gem, Sparkles, LogOut, Mail, Phone, ChevronRight, Edit } from 'lucide-react';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
          navigate('/login');
          return;
        }
        setUser(storedUser);

        // Fetch appointments
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/appointments/my', {
          headers: {
            'x-auth-token': `${token}`
          }
        });
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
       window.location.reload();
    navigate('/login');

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return timeString.replace(/:00$/, ''); // Remove :00 if it's at the top of the hour
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-500';
      case 'confirmed':
        return 'bg-green-500/10 text-green-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500';
      case 'rescheduled':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const now = new Date();
    const appDate = new Date(app.appointmentDate);
    
    if (activeTab === 'upcoming') {
      return appDate >= now || app.status.toLowerCase() === 'confirmed' || app.status.toLowerCase() === 'pending';
    } else {
      return appDate < now || app.status.toLowerCase() === 'completed' || app.status.toLowerCase() === 'cancelled';
    }
  });

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gold text-lg font-light">Loading your profile...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 inline-block">
            <p className="text-red-400 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1286&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="mb-6">
            <div className="inline-flex items-center">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500/60 mr-4" />
              <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">Your Profile</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500/60 ml-4" />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-5xl sm:text-6xl font-light leading-tight mb-6"
          >
            <span className="text-white">Welcome Back, </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">{user?.name}</span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-gray-300 max-w-2xl mx-auto text-lg">
            Here's your appointment history and profile details
          </motion.p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* User Profile Card */}
            <motion.div 
              variants={fadeIn}
              className="w-full lg:w-1/3"
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 p-8 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                      <User className="w-14 h-14 text-gray-900" />
                    </div>
                  
                  </div>
                  <h2 className="text-2xl font-medium text-white mb-1">{user?.name}</h2>
                
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-amber-400/30 transition-colors">
                    <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                      <p className="text-gray-200">{user?.email}</p>
                    </div>
                  </div>

                 

                  <div className="pt-6 mt-4 border-t border-gray-700/50">
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-700 hover:border-amber-500/50 text-amber-400 hover:text-white font-medium transition-all flex items-center justify-center gap-3"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Stats Card */}
              <motion.div 
                variants={cardVariants}
                className="mt-6 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Your Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <p className="text-gray-400 text-sm">Total Appointments</p>
                    <p className="text-2xl font-light text-white">{appointments.length}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-2xl font-light text-white">
                      {appointments.filter(a => a.status.toLowerCase() === 'completed').length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Appointments Section */}
            <motion.div 
              variants={fadeIn}
              className="w-full lg:w-2/3"
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
                <div className="p-8 pb-0">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-medium text-white flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      Your Appointments
                    </h2>
                    <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm font-medium">
                      {appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'}
                    </span>
                  </div>
                  
                  {/* Tabs */}
                  <div className="flex border-b border-gray-700/50 mb-6">
                    <button
                      onClick={() => setActiveTab('upcoming')}
                      className={`px-4 py-2 font-medium text-sm relative ${activeTab === 'upcoming' ? 'text-amber-400' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                      Upcoming
                      {activeTab === 'upcoming' && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('past')}
                      className={`px-4 py-2 font-medium text-sm relative ${activeTab === 'past' ? 'text-amber-400' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                      Past
                      {activeTab === 'past' && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  {filteredAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-gray-800/50 rounded-xl p-8 border border-dashed border-gray-700/50 max-w-md mx-auto">
                        <Sparkles className="w-10 h-10 text-amber-400/50 mx-auto mb-4" />
                        <h3 className="text-xl font-light text-white mb-2">
                          {activeTab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          {activeTab === 'upcoming' 
                            ? 'Book a new appointment to get started' 
                            : 'Your completed appointments will appear here'}
                        </p>
                        <button 
                          onClick={() => navigate('/services')}
                          className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium transition-all"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence>
                        {filteredAppointments.map((appointment) => (
                          <motion.div
                            key={appointment._id}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={cardVariants}
                            whileHover={{ y: -4 }}
                            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-amber-400/30 transition-all"
                          >
                            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-xl font-medium text-white mb-1 flex items-center gap-2">
                                  <Scissors className="w-5 h-5 text-amber-400" />
                                  {appointment.combo?.name || 
                                   (appointment.services?.length > 0 ? appointment.services[0].name : 'Custom Service')}
                                </h3>
                                {appointment.notes && (
                                  <p className="text-gray-400 text-sm italic mt-1">"{appointment.notes}"</p>
                                )}
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3">
                                <Calendar className="w-5 h-5 text-amber-400" />
                                <div>
                                  <p className="text-xs text-gray-400">Date</p>
                                  <p className="text-gray-200">{formatDate(appointment.appointmentDate)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3">
                                <Clock className="w-5 h-5 text-amber-400" />
                                <div>
                                  <p className="text-xs text-gray-400">Time</p>
                                  <p className="text-gray-200">{formatTime(appointment.timeSlot)}</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Gem className="w-4 h-4 text-amber-400" />
                                <span className="text-amber-400 font-medium">
                                 ₹{appointment.combo?.totalPrice?.toFixed(2) || 
                                     (appointment.services?.reduce((sum, service) => sum + service.price, 0)?.toFixed(2) || '0.00')}
                                </span>
                              </div>
                             
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default UserProfilePage;
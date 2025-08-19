import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail, User, Phone, Eye, EyeOff } from 'lucide-react';
import { motion } from "framer-motion";
import { Gem, Sparkles, Calendar } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    }

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) return;

    setLoading(true);

    try {
      const url = isLogin 
        ? 'http://localhost:5000/api/auth/login' 
        : 'http://localhost:5000/api/auth/register';

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(url, payload);

      // Save token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {

        navigate('/user');
                window.location.reload();

      }

    } catch (err) {
      console.error('Auth error:', err.response?.data);
      setLoading(false);
      
      if (err.response?.data?.field) {
        // Field-specific error from backend
        setErrors(prev => ({
          ...prev,
          [err.response.data.field]: err.response.data.message
        }));
      } else {
        // General error
        setApiError(err.response?.data?.message || 'An error occurred. Please try again.');
      }
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

  const formVariants = {
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

  return (
    <section className="relative">
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
              <div className="w-12 h-px bg-gold/60 mr-4" />
              <span className="text-gold/90 text-sm uppercase tracking-[0.3em]">About Us</span>
              <div className="w-12 h-px bg-gold/60 ml-4" />
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

      {/* Auth Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Form Column */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={formVariants}
              className="w-full max-w-md"
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
                {/* Tabs */}
                <div className="flex">
                  <button
                    className={`flex-1 py-5 font-medium text-center transition-all duration-300 ${
                      isLogin 
                        ? 'text-amber-300 bg-gray-800/50 border-b-2 border-amber-300' 
                        : 'text-gray-400 hover:text-amber-200'
                    }`}
                    onClick={() => setIsLogin(true)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Sign In</span>
                    </div>
                  </button>
                  <button
                    className={`flex-1 py-5 font-medium text-center transition-all duration-300 ${
                      !isLogin 
                        ? 'text-amber-300 bg-gray-800/50 border-b-2 border-amber-300' 
                        : 'text-gray-400 hover:text-amber-200'
                    }`}
                    onClick={() => setIsLogin(false)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Register</span>
                    </div>
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 text-center"
                  >
                    <h2 className="text-2xl font-bold text-amber-100 mb-2">
                      {isLogin ? 'Welcome Back' : 'Create Your Account'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {isLogin ? 'Sign in to access your appointments' : 'Join our beauty community today'}
                    </p>
                  </motion.div>

                  {apiError && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-3 bg-red-900/30 text-red-300 rounded-lg text-sm border border-red-800/50 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {apiError}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <div className={`relative flex items-center rounded-lg border ${
                          errors.name ? 'border-red-500/70' : 'border-gray-700 focus-within:border-gold/50'
                        } bg-gray-800/50 transition-colors duration-300`}>
                          <div className="pl-3 text-gray-500">
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="w-full bg-transparent py-3 px-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </motion.div>
                    )}

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: isLogin ? 0.2 : 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                      <div className={`relative flex items-center rounded-lg border ${
                        errors.email ? 'border-red-500/70' : 'border-gray-700 focus-within:border-gold/50'
                      } bg-gray-800/50 transition-colors duration-300`}>
                        <div className="pl-3 text-gray-500">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          className="w-full bg-transparent py-3 px-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </motion.div>

                    {!isLogin && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                        <div className={`relative flex items-center rounded-lg border ${
                          errors.phone ? 'border-red-500/70' : 'border-gray-700 focus-within:border-gold/50'
                        } bg-gray-800/50 transition-colors duration-300`}>
                          <div className="pl-3 text-gray-500">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (123) 456-7890"
                            className="w-full bg-transparent py-3 px-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.phone}
                          </p>
                        )}
                      </motion.div>
                    )}

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: isLogin ? 0.3 : 0.6 }}
                    >
                      <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                      <div className={`relative flex items-center rounded-lg border ${
                        errors.password ? 'border-red-500/70' : 'border-gray-700 focus-within:border-gold/50'
                      } bg-gray-800/50 transition-colors duration-300`}>
                        <div className="pl-3 text-gray-500">
                          <Lock className="w-5 h-5" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder={isLogin ? "Enter your password" : "Create a password"}
                          className="w-full bg-transparent py-3 px-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="pr-3 text-gray-500 hover:text-amber-300 transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.password}
                        </p>
                      )}
                      {!isLogin && (
                        <p className="mt-1 text-xs text-gray-500">
                          Use at least 6 characters with a mix of letters and numbers
                        </p>
                      )}
                    </motion.div>

                  

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: isLogin ? 0.5 : 0.7 }}
                      className="pt-2"
                    >
                      <button
                        type="submit"
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
                          <>
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                    </motion.div>
                  </form>

                  {isLogin ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-6 text-center text-sm text-gray-400"
                    >
                      Don't have an account?{' '}
                      <button 
                        onClick={() => setIsLogin(false)}
                        className="text-gold hover:text-amber-300 font-medium transition-colors"
                      >
                        Register here
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mt-6 text-center text-sm text-gray-400"
                    >
                      Already have an account?{' '}
                      <button 
                        onClick={() => setIsLogin(true)}
                        className="text-gold hover:text-amber-300 font-medium transition-colors"
                      >
                        Sign in
                      </button>
                    </motion.div>
                  )}

               
                </div>
              </div>
            </motion.div>

            {/* Benefits Column - Only shown on larger screens */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:block w-full max-w-md"
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                <h3 className="text-2xl font-bold text-amber-100 mb-6">
                  {isLogin ? 'Your Beauty Journey Awaits' : 'Join Our Beauty Community'}
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gold/10 rounded-full text-gold">
                      <Gem className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-100">Exclusive Offers</h4>
                      <p className="text-sm text-gray-400 mt-1">Members receive special discounts and early access to new services.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gold/10 rounded-full text-gold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-100">Easy Booking</h4>
                      <p className="text-sm text-gray-400 mt-1">Manage all your appointments in one place with our intuitive system.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gold/10 rounded-full text-gold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-100">Personalized Experience</h4>
                      <p className="text-sm text-gray-400 mt-1">Get tailored recommendations based on your preferences and history.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <img
                          key={i}
                          src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`}
                          className="w-8 h-8 rounded-full border-2 border-gray-800"
                          alt="Happy customer"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">
                        <span className="text-gold font-medium">1,200+</span> satisfied clients this month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AuthPage;
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import logo from '../../assets/lUXUZ LOGO 1.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  // Function to check if a nav item is the current page
  const isActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black py-2 shadow-xl' : 'bg-transparent py-4'}`}>
        <div className="container max-w-7xl mx-auto ">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link to="/" className="group">
                <img src={logo} alt="" className='w-36'/>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`relative ${isActivePage(item.path) ? 'text-gold' : (isScrolled ? 'text-white hover:text-gold-300' : 'text-white hover:text-gold')} font-body font-medium text-lg group transition-colors duration-300`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 ${isActivePage(item.path) ? 'w-full' : 'w-0'} h-0.5 bg-gold group-hover:w-full transition-all duration-300`}></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:flex items-center space-x-4"
            >
              {isLoggedIn ? (
                <Link
                  to="/user"
                  className={`flex items-center ${isActivePage('/user') ? 'bg-gold text-black' : (isScrolled ? 'bg-gold hover:bg-gold-600 text-black' : 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-black')} font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-gold/30`}
                >
                  <User className="mr-2" size={18} />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={`${isActivePage('/login') ? 'bg-gold text-black' : (isScrolled ? 'bg-gold hover:bg-gold-600 text-black' : 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-black')} font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-gold/30`}
                >
                  Login
                </Link>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gold focus:outline-none"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 bg-black backdrop-blur-sm md:hidden"
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-12">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <h1 className="text-3xl font-sans font-bold text-gold">LUXUZ</h1>
                <p className="text-xs text-gold-300 font-body tracking-widest mt-1">PREMIUM SALON</p>
              </Link>
              <button
                className="text-gold focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col space-y-8 flex-grow">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl ${isActivePage(item.path) ? 'text-gold' : 'text-gold-100'} hover:text-gold font-body font-medium py-2 border-b border-gold-800 transition-colors duration-300`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col space-y-4 mt-8">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/user"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-center w-full text-center py-3 ${isActivePage('/user') ? 'bg-gold/20 text-gold border-gold' : 'text-gold border-gold'} font-body font-medium border rounded-lg hover:bg-gold/10 transition-colors duration-300`}
                  >
                    <User className="mr-2" size={18} />
                    Profile
                  </Link>
                  <Link
                    to="/booking"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-3 bg-gold hover:bg-gold-600 text-black font-bold rounded-lg transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full text-center py-3 ${isActivePage('/login') ? 'bg-gold/20 text-gold border-gold' : 'text-gold border-gold'} font-body font-medium border rounded-lg hover:bg-gold/10 transition-colors duration-300`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/booking"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-3 bg-gold hover:bg-gold-600 text-black font-bold rounded-lg transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
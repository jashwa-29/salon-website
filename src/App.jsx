import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../src/Components/CommonComponents/Navbar';
import Footer from '../src/Components/CommonComponents/Footer';
import Home from './Pages/Home';
import Services from './Pages/Services';
import Login from './Pages/Login';
import About from './Pages/About';
import Contact from './Pages/Contact';
import UserProfilePage from './Pages/UserProfilePage';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-dark-900 text-gold-100">
        <ScrollToTop />
        <Navbar />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />  
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserProfilePage />} />
          </Routes>
        </AnimatePresence>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
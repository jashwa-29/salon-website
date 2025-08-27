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

  useEffect(() => {
    // Check user data in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.date) {
        const savedDate = new Date(parsedUser.date);
        const currentDate = new Date();

        // Difference in milliseconds
        const diffTime = currentDate - savedDate;
        // Convert to days
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays > 7) {
          // Exceeded 7 days, clear localStorage
          localStorage.clear();
          console.log("LocalStorage cleared: User session expired.");
        }
      }
    }
  }, []);

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

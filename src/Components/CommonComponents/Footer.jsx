import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Salon Info */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-8 h-px bg-amber-400/60 mr-3"></div>
              <h3 className="text-xl font-light text-white">Lumiére</h3>
            </div>
            <p className="mb-6 text-gray-400/90">
              Where luxury meets exceptional beauty care. Transforming your look with precision and artistry since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-lg font-medium text-amber-300 mb-6 flex items-center">
              <div className="w-6 h-px bg-amber-400/60 mr-3"></div>
              Explore
            </h3>
            <ul className="space-y-3">
              <li><a href="services" className="hover:text-amber-300 transition-colors">Services</a></li>
              <li><a href="about" className="hover:text-amber-300 transition-colors">About Us</a></li>
                            <li><a href="contact" className="hover:text-amber-300 transition-colors">Contact Us</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-lg font-medium text-amber-300 mb-6 flex items-center">
              <div className="w-6 h-px bg-amber-400/60 mr-3"></div>
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-amber-400/80 mr-3 mt-0.5 flex-shrink-0" />
                <span>123 Luxury Avenue, Beauty District, Paris</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-amber-400/80 mr-3 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-amber-400/80 mr-3 flex-shrink-0" />
                <span>hello@lumieresalon.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
          >
            <h3 className="text-lg font-medium text-amber-300 mb-6 flex items-center">
              <div className="w-6 h-px bg-amber-400/60 mr-3"></div>
              Hours
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-400">Mon - Fri</span>
                <span>9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span>10:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-amber-300/80">By Appointment</span>
              </li>
            </ul>
            <div className="mt-6 flex items-center text-sm text-amber-300/80">
              <Clock className="w-4 h-4 mr-2" />
              <span>By appointment after hours</span>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/50 my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} Lumiére Salon. All rights reserved.
          </motion.p>
          
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            <a href="#" className="text-gray-500 hover:text-amber-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-amber-300 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-amber-300 text-sm transition-colors">Careers</a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
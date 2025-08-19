import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const ContactPage = () => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
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

  const cardHover = {
    initial: { 
      y: 0,
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(217, 119, 6, 0.25)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6 text-gold" />,
      title: "By Phone",
      description: "Speak directly with our concierge",
      details: "(555) 123-4567",
      action: "Call Now",
      href: "tel:+15551234567"
    },
    {
      icon: <Mail className="w-6 h-6 text-gold" />,
      title: "By Email",
      description: "For inquiries and appointments",
      details: "info@luxesalon.com",
      action: "Email Us",
      href: "mailto:info@luxesalon.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-gold" />,
      title: "In Person",
      description: "Visit our luxury salon",
      details: "123 Beauty Avenue, Beverly Hills, CA 90210",
      action: "Get Directions",
      href: "https://maps.google.com"
    },
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      title: "Hours",
      description: "Our salon opening times",
      details: (
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Mon-Fri</span>
            <span className="text-gold">9:00 AM - 8:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span className="text-gold">10:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span className="text-gold">11:00 AM - 5:00 PM</span>
          </div>
        </div>
      ),
      action: null
    }
  ];

  const socialMedia = [
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", href: "#" },
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", href: "#" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", href: "#" }
  ];

  return (
    <div className="bg-black text-gray-100 min-h-screen">
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
                    <div className="w-12 h-px bg-amber-400/60 mr-4" />
                    <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">Contact Us</span>
                    <div className="w-12 h-px bg-amber-400/60 ml-4" />
                  </div>
                </motion.div>
                
                <motion.h1 
                  variants={fadeIn}
                  className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6"
                >
                  <span className="text-white">Reach Out in </span>
                  <span className="text-amber-300">Style </span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-lg sm:text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
                >
                            Connect with us through your preferred method. Our team is ready to elevate your beauty experience.
                </motion.p>
              </motion.div>
            </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-12 text-center">
              <span className="text-white">How to </span>
              <span className="text-gold">Contact Us</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  whileHover="hover"
                  variants={cardHover}
                  className="p-8 rounded-xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800"
                >
                  <div className="flex flex-col h-full">
                    <div className="bg-gold/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                      {method.icon}
                    </div>
                    
                    <h3 className="text-xl font-medium text-white mb-2">{method.title}</h3>
                    <p className="text-gray-400 mb-4">{method.description}</p>
                    
                    <div className="mb-6 text-gold">
                      {method.details}
                    </div>
                    
                    {method.action && (
                      <div className="mt-auto">
                        <a
                          href={method.href}
                          className="inline-flex items-center text-gold hover:text-amber-500 transition-colors group"
                        >
                          <span>{method.action}</span>
                          <span className="ml-2 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              <span className="text-white">Follow Us on </span>
              <span className="text-gold">Social Media</span>
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Stay updated with our latest styles, promotions, and beauty tips.
            </p>
            
            <div className="flex justify-center space-x-6">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -4 }}
                  className="bg-gray-900/50 hover:bg-gray-800/70 border border-gray-800 rounded-full p-4 transition-all group"
                >
                  <span className="sr-only">{social.name}</span>
                  <span className="text-gray-300 group-hover:text-gold transition-colors">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-8 md:mb-0 md:mr-8">
                  <div className="bg-gold/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  
                  <h3 className="text-2xl font-medium text-white mb-4">Our Salon Location</h3>
                  <address className="text-gray-300 not-italic mb-6">
                    123 Beauty Avenue<br />
                    Beverly Hills, CA 90210
                  </address>
                  
                  <a
                    href="https://maps.google.com"
                    className="inline-flex items-center text-gold hover:text-amber-500 transition-colors group"
                  >
                    <span>Get Directions</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
                
                {/* Map placeholder - replace with actual map component */}
                <div className="w-full md:w-1/2 h-64 md:h-80 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="w-10 h-10 text-gold mx-auto mb-4" />
                    <p className="text-gray-300">Luxe Beauty Salon Location</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

  
    </div>
  );
};

export default ContactPage;
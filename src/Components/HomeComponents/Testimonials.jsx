import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "The Royal Balayage transformed my hair completely. I've never received so many compliments! The attention to detail is unmatched.",
      name: "Sarah Mitchell",
      role: "VIP Client since 2018",
      stars: 5
    },
    {
      id: 2,
      quote: "Elena is a true artist! She understood exactly what I wanted and delivered beyond my expectations. The salon atmosphere is so luxurious.",
      name: "James Wilson",
      role: "New Client",
      stars: 5
    },
    {
      id: 3,
      quote: "Best haircut of my life. The precision and care they put into every detail makes this place worth every penny. I won't go anywhere else now.",
      name: "Olivia Chen",
      role: "Regular Client",
      stars: 4
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
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

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-4">
            <div className="w-12 h-px bg-amber-400/60 mr-4" />
            <span className="text-amber-400/90 text-sm uppercase tracking-[0.3em]">Client Stories</span>
            <div className="w-12 h-px bg-amber-400/60 ml-4" />
          </div>
          <h2 className="text-3xl md:text-4xl font-light">
            <span className="text-white">Voices of </span>
            <span className="text-gold">Delight</span>
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative"
        >
          {/* Carousel Navigation */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 text-gold hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 text-gold hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl">
            <div className="flex items-center mb-6">
              {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-gray-300 italic text-lg mb-6">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/20 mr-4 flex items-center justify-center">
                <span className="text-gold font-medium text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium">{testimonials[currentIndex].name}</h4>
                <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-amber-400' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
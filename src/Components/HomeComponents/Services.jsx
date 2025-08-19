const Services = () => {
  const services = [
    {
      title: "Hair Mastery",
      description: "Precision cuts, vibrant coloring, and transformative treatments",
      icon: "✂️",
      price: "$60+"
    },
    {
      title: "Glam Makeup",
      description: "From natural beauty to red carpet ready",
      icon: "💄",
      price: "$85+"
    },
    {
      title: "Nail Artistry",
      description: "Luxurious manicures & pedicures with premium products",
      icon: "💅",
      price: "$45+"
    },
    {
      title: "Skin Revival",
      description: "Rejuvenating facials and advanced skincare treatments",
      icon: "✨",
      price: "$75+"
    }
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-gold">Signature Services</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Indulge in our exclusive treatments designed to enhance your natural beauty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-800 hover:border-gold"
            >
              <div className="p-8 text-center">
                <div className="text-5xl mb-4 text-gold">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <span className="text-gold font-medium text-lg">{service.price}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
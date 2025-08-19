import React from 'react'

const Team = () => {
  const teamMembers = [
    {
      name: "Sophia Laurent",
      role: "Master Stylist",
      bio: "Specializes in precision cutting and balayage",
      image: "/images/stylist1.jpg"
    },
    {
      name: "Marcus Chen",
      role: "Color Director",
      bio: "Vivid colors and transformative treatments",
      image: "/images/stylist2.jpg"
    },
    {
      name: "Isabella Rossi",
      role: "Makeup Artist",
      bio: "Bridal and editorial makeup specialist",
      image: "/images/stylist3.jpg"
    },
    {
      name: "David Park",
      role: "Spa Director",
      bio: "Advanced skincare treatments",
      image: "/images/stylist4.jpg"
    }
  ];

  return (
    <section id="team" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our <span className="text-gold">Experts</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our talented team brings passion and expertise to every service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              <div className="relative overflow-hidden rounded-xl h-80">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-gold mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity">
                +
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team
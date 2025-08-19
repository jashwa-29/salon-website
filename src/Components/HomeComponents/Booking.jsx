import React from 'react'

const Booking = () => {
  return (
    <section id="booking" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gold p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-black mb-4">Book Your Transformation</h3>
              <p className="text-black mb-6">
                Ready to experience luxury beauty care? Schedule your appointment today.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black text-gold flex items-center justify-center">1</div>
                  <span className="text-black">Select your service</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black text-gold flex items-center justify-center">2</div>
                  <span className="text-black">Choose date & time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black text-gold flex items-center justify-center">3</div>
                  <span className="text-black">Confirm your booking</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-12">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Service</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold">
                    <option>Select a service</option>
                    <option>Hair Styling</option>
                    <option>Makeup Artistry</option>
                    <option>Nail Care</option>
                    <option>Spa Treatment</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Time</label>
                    <input 
                      type="time" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gold text-black font-bold py-3 px-6 rounded-lg hover:bg-gold-dark transition"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking
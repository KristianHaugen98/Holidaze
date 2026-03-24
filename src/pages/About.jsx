import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/images/about us hero.jpg"
          alt="Beautiful landscape over unique homes, people and boats"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Beyond Just a Stay
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            We connect curious travelers with unique homes and unforgettable
            experiences.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Our Story</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Holidaze was born from a simple idea: travel should be personal,
            local, and inspiring. Tired of sterile hotel rooms, we set out to
            build a platform where homeowners could share their unique spaces
            with the world.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Today, we are a global community of hosts and guests, driven by the
            belief that where you stay is just as important as where you go.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
          <img
            src="/src/assets/images/interior design.jpg"
            alt="Interior of a home"
          />
        </div>
      </section>

      {/* Core Values  */}
      <section className="bg-gray-800 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Holidaze?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="p-8 bg-gray-900 border border-gray-700 rounded-2xl hover:border-blue-500 transition-colors">
              <div className="text-blue-500 text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">Verified Venues</h3>
              <p className="text-gray-400">
                Every property on our platform is hand-picked and verified for
                quality.
              </p>
            </div>
            {/* Value 2 */}
            <div className="p-8 bg-gray-900 border border-gray-700 rounded-2xl hover:border-blue-500 transition-colors">
              <div className="text-blue-500 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Safe Booking</h3>
              <p className="text-gray-400">
                Your payments and data are protected by industry-leading
                security.
              </p>
            </div>
            {/* Value 3 */}
            <div className="p-8 bg-gray-900 border border-gray-700 rounded-2xl hover:border-blue-500 transition-colors">
              <div className="text-blue-500 text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-400">
                Our team is here to help you, no matter where in the world you
                are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspire to take action */}
      <section className="py-20 text-center px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready for your next adventure?
          </h2>
          <p className="mb-8 text-blue-100">
            Browse thousands of unique places to stay around the globe.
          </p>
          <Link
            to="/"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

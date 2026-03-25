import React, { useState } from "react";

// Contact page component with a contact form and contact information
const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  // Handle input changes and form submission
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ fullName: "", phoneNumber: "", email: "", message: "" });
  };
  // Render the contact page with a form and contact information
  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions about a venue or need help with your booking? Our
            team is here to help you 24/7.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Contact Info & Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">
              Contact Information
            </h2>

            {/* Info Cards - Matching the "Value Cards" style from About page */}
            <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl flex items-center space-x-4">
              <div className="text-3xl">📧</div>
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold">
                  Email us
                </p>
                <p className="text-lg">support@holidaze.com</p>
              </div>
            </div>

            <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl flex items-center space-x-4">
              <div className="text-3xl">📞</div>
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold">
                  Call us
                </p>
                <p className="text-lg">+47 123 45 678</p>
              </div>
            </div>

            <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl flex items-center space-x-4">
              <div className="text-3xl">📍</div>
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold">
                  Visit our office
                </p>
                <p className="text-lg">Bredalsmarken 15, 5006 Bergen, Norway</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+47 --- -- ---"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

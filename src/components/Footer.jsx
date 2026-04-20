import { MapPin, Mail, Phone, Home } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand/Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-500 font-black text-2xl">
              <Home size={28} />
              <span>Holidaze</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Find your next dream destination. We offer unique accommodations
              across the globe for adventure-seeking travelers.
            </p>
          </div>

          {/* Contactinformation */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-blue-500" />
                <span>Bredalsmarken 15, 5006 Bergen, Norway</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-blue-500" />
                <span>support@holidaze.no</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-blue-500" />
                <span>+47 123 45 678</span>
              </li>
            </ul>
          </div>

          {/* Promise */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider">
              Our Promise
            </h3>
            <p className="text-gray-400 italic">
              "We guarantee a safe and easy booking experience, no matter where
              your journey takes you."
            </p>
            <div className="pt-2">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase">
                Certified Travel Partner
              </span>
            </div>
          </div>
        </div>

        {/* Bottomline  */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Holidaze Project. Made with passion for travel.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

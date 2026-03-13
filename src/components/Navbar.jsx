import React, { useState, useEffect } from "react"; // useState এবং useEffect এখানে থাকতে হবে
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react"; 

function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [siteLogo, setSiteLogo] = useState(null);

  // আপনার সঠিক ব্যাকএন্ড লিঙ্কটি এখানে দিন
  const API_BASE = "https://mybackendv1.vercel.app/api"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [navRes, contentRes] = await Promise.all([
          axios.get(`${API_BASE}/nav`),
          axios.get(`${API_BASE}/content`)
        ]);
        
        setNavItems(navRes.data);
        
        // লোগো খুঁজে বের করা
        const logoData = contentRes.data.find(item => item.category === 'logo');
        if (logoData) setSiteLogo(logoData.image);
      } catch (err) {
        console.error("ডাটা লোড করতে সমস্যা:", err);
      }
    };
    fetchData();
  }, []);

  const activeStyle = ({ isActive }) =>
    `font-medium transition-all ${isActive ? "text-emerald-700 font-bold border-b-2 border-emerald-600 pb-1" : "text-gray-700 hover:text-emerald-600"}`;

  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <Link to="/" className="flex items-center gap-3">
            <img
              src={siteLogo || "https://via.placeholder.com/150"} 
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover border border-emerald-500 shadow-sm"
            />
            <div className="font-bold text-lg text-emerald-900">
               {lang === 'bn' ? 'নাসের রহমান এমপি' : 'Nasir Rahman MP'}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems && navItems
              .filter(item => item.lang === lang)
              .map((item) => (
                item.link.startsWith('#') ? (
                  <a key={item._id} href={item.link} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                    {item.name}
                  </a>
                ) : (
                  <NavLink key={item._id} to={item.link} className={activeStyle}>
                    {item.name}
                  </NavLink>
                )
            ))}

            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-colors"
            >
              {lang === 'bn' ? 'ENGLISH' : 'বাংলা'}
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-800 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
          {navItems
            .filter(item => item.lang === lang)
            .map((item) => (
              <a 
                key={item._id} 
                href={item.link} 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t mt-2">
                <button 
                  onClick={() => {setLang(lang === 'bn' ? 'en' : 'bn'); setIsOpen(false);}}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold"
                >
                  {lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
                </button>
            </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
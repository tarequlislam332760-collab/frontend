import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react"; 

function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [siteLogo, setSiteLogo] = useState(null);

  // আপনার সঠিক ব্যাকএন্ড লিঙ্ক
  const API_BASE = "https://backend-phi-eight-82.vercel.app/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [navRes, contentRes] = await Promise.all([
          axios.get(`${API_BASE}/nav`),
          axios.get(`${API_BASE}/content`)
        ]);
        
        // ১. মেনু সেট করা (ল্যাঙ্গুয়েজ অনুযায়ী ফিল্টার করা হবে UI তে)
        setNavItems(navRes.data);
        
        // ২. অ্যাডমিন প্যানেল থেকে লোগো খুঁজে বের করা
        const logoData = contentRes.data.find(item => item.category === 'logo');
        if (logoData) setSiteLogo(logoData.image);
      } catch (err) {
        console.error("ডাটা লোড করতে সমস্যা:", err);
      }
    };
    fetchData();
  }, []);

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-emerald-700 font-bold border-b-2 border-emerald-600 pb-1 transition-all"
      : "text-gray-700 hover:text-emerald-600 font-medium transition-colors";

  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            {/* ডাইনামিক লোগো: যদি ডাটাবেজে না থাকে তবে ডিফল্ট লোগো দেখাবে */}
            <img
              src={siteLogo || "https://via.placeholder.com/150"} 
              alt="Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-emerald-500 group-hover:scale-105 transition-transform shadow-sm"
            />
            <div className="font-bold text-lg md:text-xl text-emerald-900 leading-tight">
               {lang === 'bn' ? 'নাসের রহমান এমপি' : 'Nasir Rahman MP'}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems
              .filter(item => item.lang === lang) // শুধু সিলেক্ট করা ভাষার মেনু দেখাবে
              .map((item) => (
              <NavLink key={item._id} to={item.link} className={activeStyle}>
                {item.name}
              </NavLink>
            ))}

            {/* Language Toggle Button */}
            <div className="flex items-center ml-4">
              <button
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="relative flex items-center bg-gray-100 p-1 rounded-full w-[100px] h-10 border border-gray-200 shadow-inner overflow-hidden"
              >
                <div className={`absolute h-8 w-[46px] bg-emerald-600 rounded-full shadow-lg transition-all duration-500 ${lang === 'bn' ? 'translate-x-0' : 'translate-x-[45px]'}`} />
                <span className={`relative z-10 flex-1 text-[11px] font-black transition-colors duration-300 ${lang === 'bn' ? 'text-white' : 'text-gray-400'}`}>বাংলা</span>
                <span className={`relative z-10 flex-1 text-[11px] font-black transition-colors duration-300 ${lang === 'en' ? 'text-white' : 'text-gray-400'}`}>ENG</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-800 p-1">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems
              .filter(item => item.lang === lang)
              .map((item) => (
              <NavLink 
                key={item._id} 
                to={item.link} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl"
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-2">
               <button 
                onClick={() => {setLang(lang === 'bn' ? 'en' : 'bn'); setIsOpen(false);}}
                className="w-full bg-emerald-50 text-emerald-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
               >
                 <Globe size={18}/> {lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
               </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// মোবাইল আইকন ইম্পোর্ট করার জন্য লুসিড রিঅ্যাক্ট থেকে Globe আনা হয়েছে (ঐচ্ছিক)
const Globe = ({size}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;

export default Navbar;
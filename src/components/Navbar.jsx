import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react"; 

function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [siteLogo, setSiteLogo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [navRes, contentRes] = await Promise.all([
          axios.get('https://mybackendv1.vercel.app/api/nav'),
          axios.get('https://mybackendv1.vercel.app/api/content')
        ]);
        
        // ১. মেনু সেট করা
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
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-emerald-500 group-hover:scale-105 transition-transform"
            />
            <div className="font-bold text-lg md:text-xl text-emerald-900 leading-tight">
               {lang === 'bn' ? 'নাসের রহমান এমপি' : 'Nasir Rahman MP'}
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <NavLink key={item._id} to={item.link} className={activeStyle}>
                {lang === 'bn' ? item.name : (item.nameEn || item.name)} 
              </NavLink>
            ))}

            <div className="flex items-center">
              <button
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="relative flex items-center bg-gray-100 p-1 rounded-full w-[100px] h-10 border border-gray-200 shadow-inner"
              >
                <div className={`absolute h-8 w-[46px] bg-emerald-600 rounded-full shadow-lg transition-all duration-500 ${lang === 'bn' ? 'left-1' : 'left-[49px]'}`} />
                <span className={`relative z-10 flex-1 text-[11px] font-black ${lang === 'bn' ? 'text-white' : 'text-gray-400'}`}>বাংলা</span>
                <span className={`relative z-10 flex-1 text-[11px] font-black ${lang === 'en' ? 'text-white' : 'text-gray-400'}`}>ENG</span>
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-800 p-1">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* মোবাইল ড্রপডাউন কোড আগের মতোই থাকবে... */}
    </nav>
  );
}
export default Navbar;
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import logo from "../assets/img2.jpg";

function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-emerald-700 font-bold border-b-2 border-emerald-600 pb-1 transition-all"
      : "text-gray-700 hover:text-emerald-600 font-medium transition-colors";

  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* লোগো সেকশন */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="এমপি নাসের রহমান"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-emerald-500 group-hover:scale-105 transition-transform"
            />
            <div className="font-bold text-lg md:text-xl text-emerald-900 leading-tight">
               {lang === 'bn' ? 'নাসের রহমান এমপি' : 'Nasir Rahman MP'}
            </div>
          </Link>

          {/* ডেস্কটপ মেনু */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavLink to="/" className={activeStyle}>{lang === 'bn' ? 'হোম' : 'Home'}</NavLink>
            <NavLink to="/about" className={activeStyle}>{lang === 'bn' ? 'পরিচিতি' : 'About'}</NavLink>
            <NavLink to="/projects" className={activeStyle}>{lang === 'bn' ? 'প্রকল্প' : 'Projects'}</NavLink>
            <NavLink to="/blog" className={activeStyle}>{lang === 'bn' ? 'ব্লগ' : 'Blog'}</NavLink>
            <NavLink to="/complaint" className={activeStyle}>{lang === 'bn' ? 'অভিযোগ' : 'Complaint'}</NavLink>

            {/* 🔥 প্রিমিয়াম গোল স্লাইডিং ল্যাঙ্গুয়েজ সুইচ */}
            <div className="flex items-center">
              <button
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="relative flex items-center bg-gray-100 p-1 rounded-full w-[100px] h-10 border border-gray-200 transition-all hover:border-emerald-200 shadow-inner"
              >
                {/* স্লাইডিং ব্যাকগ্রাউন্ড পিল */}
                <div 
                  className={`absolute h-8 w-[46px] bg-emerald-600 rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
                    lang === 'bn' ? 'left-1' : 'left-[49px]'
                  }`}
                />
                
                {/* বাংলা টেক্সট */}
                <span className={`relative z-10 flex-1 text-[11px] font-black transition-colors duration-300 ${
                  lang === 'bn' ? 'text-white' : 'text-gray-400'
                }`}>
                  বাংলা
                </span>
                
                {/* EN টেক্সট */}
                <span className={`relative z-10 flex-1 text-[11px] font-black transition-colors duration-300 ${
                  lang === 'en' ? 'text-white' : 'text-gray-400'
                }`}>
                  ENG
                </span>
              </button>
            </div>
            
            {/* কন্টাক্ট বাটন */}
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive 
                ? "bg-emerald-900 text-white px-6 py-2.5 rounded-full font-bold shadow-inner scale-95 transition-all" 
                : "bg-emerald-600 text-white px-6 py-2.5 rounded-full hover:bg-emerald-700 transition-all font-bold shadow-lg shadow-emerald-600/30"
              }
            >
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </NavLink>
          </div>

          {/* মোবাইল মেনু বাটন */}
          <div className="md:hidden flex items-center gap-4">
             {/* মোবাইল ল্যাঙ্গুয়েজ টগল (ছোট ভার্সন) */}
             <button
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="relative flex items-center bg-gray-100 p-0.5 rounded-full w-14 h-7 border border-gray-200"
              >
                <div className={`absolute h-5 w-6 bg-emerald-600 rounded-full transition-all duration-300 ${lang === 'bn' ? 'left-0.5' : 'left-[30px]'}`} />
                <span className={`relative z-10 flex-1 text-[8px] font-bold ${lang === 'bn' ? 'text-white' : 'text-gray-500'}`}>বাং</span>
                <span className={`relative z-10 flex-1 text-[8px] font-bold ${lang === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
              </button>

            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-800 p-1">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু ড্রপডাউন */}
      <div className={`md:hidden bg-white/95 backdrop-blur-xl overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-screen border-t border-gray-100' : 'max-h-0'}`}>
        <div className="px-6 py-8 space-y-6 flex flex-col">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={activeStyle}>{lang === 'bn' ? 'হোম' : 'Home'}</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={activeStyle}>{lang === 'bn' ? 'পরিচিতি' : 'About'}</NavLink>
          <NavLink to="/projects" onClick={() => setIsOpen(false)} className={activeStyle}>{lang === 'bn' ? 'প্রকল্প' : 'Projects'}</NavLink>
          <NavLink to="/blog" onClick={() => setIsOpen(false)} className={activeStyle}>{lang === 'bn' ? 'ব্লগ' : 'Blog'}</NavLink>
          <NavLink to="/complaint" onClick={() => setIsOpen(false)} className={activeStyle}>{lang === 'bn' ? 'অভিযোগ' : 'Complaint'}</NavLink>
          <NavLink 
            to="/contact" 
            onClick={() => setIsOpen(false)} 
            className="bg-emerald-600 text-white px-4 py-4 rounded-2xl text-center font-black shadow-xl"
          >
            {lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
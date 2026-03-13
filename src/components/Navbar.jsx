import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react"; 

function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState(null);
  const API_BASE = "https://mybackendv1.vercel.app/api"; 

  useEffect(() => {
    axios.get(`${API_BASE}/content`)
      .then(res => {
        const logoData = res.data.find(item => item.category === 'logo');
        if (logoData) setSiteLogo(logoData.image);
      })
      .catch(err => console.error("Logo load error:", err));
  }, []);

  // মেনু আইটেমগুলো ম্যানুয়ালি এখানে দিচ্ছি যাতে স্মুদ স্ক্রল কাজ করে
  const navItems = [
    { id: "home", bn: "হোম", en: "Home" },
    { id: "about", bn: "পরিচিতি", en: "About" },
    { id: "projects", bn: "প্রজেক্ট", en: "Project" },
    { id: "blog", bn: "ব্লগ", en: "Blog" },
    { id: "contact", bn: "যোগাযোগ", en: "Contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <a href="#home" className="flex items-center gap-3">
            <img src={siteLogo || "https://via.placeholder.com/150"} alt="Logo" className="w-10 h-10 rounded-full object-cover border border-emerald-500 shadow-sm" />
            <div className="font-bold text-lg text-emerald-900">
               {lang === 'bn' ? 'নাসের রহমান এমপি' : 'Nasir Rahman MP'}
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-all relative group"
              >
                {lang === 'bn' ? item.bn : item.en}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
              </a>
            ))}

            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-colors"
            >
              {lang === 'bn' ? 'ENGLISH' : 'বাংলা'}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-800 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
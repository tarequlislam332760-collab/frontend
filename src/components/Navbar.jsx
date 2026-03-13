import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react"; 
import { NavLink, Link } from "react-router-dom"; // NavLink ইমপোর্ট করা হয়েছে

function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState(null);
  const [dynamicNavItems, setDynamicNavItems] = useState([]); 
  const API_BASE = "https://mybackendv1.vercel.app/api"; 

  const staticNavItems = [
    { id: "about", bn: "পরিচিতি", en: "About", link: "/about" },
    { id: "projects", bn: "প্রজেক্ট", en: "Project", link: "/projects" },
    { id: "blog", bn: "ব্লগ", en: "Blog", link: "/blog" },
    { id: "contact", bn: "যোগাযোগ", en: "Contact", link: "/contact" },
    { id: "complaint", bn: "অভিযোগ", en: "Complaint", link: "/complaint" }, // কমপ্লেইন যোগ করা হলো
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, navRes] = await Promise.all([
          axios.get(`${API_BASE}/content`),
          axios.get(`${API_BASE}/nav`)
        ]);
        const logoData = contentRes.data.find(item => item.category === 'logo');
        if (logoData) setSiteLogo(logoData.image);
        setDynamicNavItems(navRes.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, []);

  // Active লিঙ্ক এর স্টাইল ফাংশন
  const activeStyle = ({ isActive }) => 
    `font-medium transition-all px-1 py-1 ${
      isActive 
      ? "text-emerald-600 border-b-2 border-emerald-600" 
      : "text-gray-700 hover:text-emerald-600"
    }`;

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <Link to="/" className="flex items-center gap-3">
            <img src={siteLogo || "https://via.placeholder.com/150"} alt="Logo" className="w-10 h-10 rounded-full object-cover border border-emerald-500 shadow-sm" />
            <div className="font-bold text-lg text-emerald-900">
               {lang === 'bn' ? 'নাসের রহমান এমপি' : 'Nasir Rahman MP'}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            
            <NavLink to="/" end className={activeStyle}>
               {lang === 'bn' ? 'হোম' : 'Home'}
            </NavLink>

            {/* স্ট্যাটিক মেনুসমূহ */}
            {staticNavItems.map((item) => (
              <NavLink key={item.id} to={item.link} className={activeStyle}>
                {lang === 'bn' ? item.bn : item.en}
              </NavLink>
            ))}

            {/* ডাইনামিক মেনুসমূহ */}
            {dynamicNavItems
              .filter(item => item.lang === lang) 
              .map((item) => (
                <NavLink key={item._id} to={item.link} className={activeStyle}>
                  {item.name}
                </NavLink>
              ))}

            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-700 border border-emerald-100 ml-4"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg">
           <NavLink to="/" end onClick={() => setIsOpen(false)} className="block text-gray-700 font-medium active:text-emerald-600">হোম / Home</NavLink>
           
           {staticNavItems.map((item) => (
              <NavLink key={item.id} to={item.link} onClick={() => setIsOpen(false)} className="block text-gray-700 font-medium">
                {lang === 'bn' ? item.bn : item.en}
              </NavLink>
           ))}

           {dynamicNavItems
              .filter(item => item.lang === lang)
              .map((item) => (
                <NavLink key={item._id} to={item.link} onClick={() => setIsOpen(false)} className="block text-gray-700 font-medium text-emerald-600">
                  {item.name}
                </NavLink>
           ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react"; 
import { Link } from "react-router-dom"; // যদি আলাদা পেজে যেতে চান

function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState(null);
  const [dynamicNavItems, setDynamicNavItems] = useState([]); // ডাটাবেজ থেকে আসা মেনু
  const API_BASE = "https://mybackendv1.vercel.app/api"; 

  useEffect(() => {
    // লোগো এবং মেনু একসাথে আনা
    const fetchData = async () => {
      try {
        const [contentRes, navRes] = await Promise.all([
          axios.get(`${API_BASE}/content`),
          axios.get(`${API_BASE}/nav`)
        ]);

        // লোগো সেট করা
        const logoData = contentRes.data.find(item => item.category === 'logo');
        if (logoData) setSiteLogo(logoData.image);

        // মেনু সেট করা (অ্যাডমিন প্যানেল থেকে আসা ডাটা)
        setDynamicNavItems(navRes.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <a href="/" className="flex items-center gap-3">
            <img src={siteLogo || "https://via.placeholder.com/150"} alt="Logo" className="w-10 h-10 rounded-full object-cover border border-emerald-500 shadow-sm" />
            <div className="font-bold text-lg text-emerald-900">
               {lang === 'bn' ? 'নাসের রহমান এমপি' : 'Nasir Rahman MP'}
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            
            {/* হোম লিঙ্ক ডিফল্টভাবে থাকছে */}
            <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium transition-all">
               {lang === 'bn' ? 'হোম' : 'Home'}
            </a>

            {/* অ্যাডমিন প্যানেল থেকে আসা মেনুগুলো এখানে লুপ হবে */}
            {dynamicNavItems
              .filter(item => item.lang === lang) // ভাষা অনুযায়ী ফিল্টার
              .map((item) => (
                item.link.startsWith('#') ? (
                  <a key={item._id} href={item.link} className="text-gray-700 hover:text-emerald-600 font-medium transition-all relative group">
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link key={item._id} to={item.link} className="text-gray-700 hover:text-emerald-600 font-medium transition-all">
                    {item.name}
                  </Link>
                )
            ))}

            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-colors"
            >
              {lang === 'bn' ? 'ENGLISH' : 'বাংলা'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-800 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg">
           {dynamicNavItems
              .filter(item => item.lang === lang)
              .map((item) => (
                <a 
                  key={item._id} 
                  href={item.link} 
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 font-medium hover:text-emerald-600"
                >
                  {item.name}
                </a>
           ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
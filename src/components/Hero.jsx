import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone } from 'lucide-react';

const Hero = ({ lang = 'bn', data }) => {
  return (
    <div className="relative bg-gradient-to-br from-[#064e3b] to-[#0d9488] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-3/5 space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            {data?.title || (lang === 'bn' ? "এমপি নাসের রহমান" : "MP Naser Rahman")}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-xl">
            {data?.description || (lang === 'bn' ? "আপনার সেবায় নিয়োজিত থেকে এলাকার উন্নয়ন নিশ্চিত করাই আমাদের অঙ্গীকার।" : "Dedicated to serving you and ensuring the development of our community.")}
          </p>
          <div className="flex gap-4">
            <Link to="/complaint" className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold inline-flex items-center gap-3 shadow-lg hover:bg-emerald-50 transition-all">
              <Megaphone size={22}/> {lang === 'bn' ? "অভিযোগ দিন" : "Complaint"}
            </Link>
          </div>
        </div>
        <div className="md:w-2/5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={data?.image || "https://via.placeholder.com/600x600"} 
              alt="Hero" 
              className="relative rounded-2xl shadow-2xl border-4 border-white/10 w-full h-[500px] object-cover" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
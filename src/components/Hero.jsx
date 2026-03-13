import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, ArrowRight } from 'lucide-react';
import defaultPhoto from '../assets/img2.jpg'; 

const Hero = ({ lang = 'bn', data }) => {
  const content = {
    title: data?.title || (lang === 'bn' ? "এমপি নাসের রহমান" : "MP Naser Rahman"),
    desc: data?.description || (lang === 'bn' ? "আপনার সেবায় নিয়োজিত" : "At Your Service"),
    img: data?.image || defaultPhoto,
    btn: lang === 'bn' ? "অভিযোগ দিন" : "Complaint"
  };

  return (
    <div className="bg-gradient-to-br from-[#064e3b] to-[#0d9488] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-3/5 space-y-6">
          <h1 className="text-5xl font-bold">{content.title}</h1>
          <p className="text-xl opacity-90">{content.desc}</p>
          <Link to="/complaint" className="bg-white text-emerald-900 px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2">
            <Megaphone size={18}/> {content.btn}
          </Link>
        </div>
        <div className="md:w-2/5 mt-10 md:mt-0">
          <img src={content.img} alt="Hero" className="rounded-2xl shadow-2xl border-4 border-white/20" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, ArrowRight } from 'lucide-react';
import defaultPhoto from '../assets/img2.jpg'; // ব্যাকআপ ছবি

const Hero = ({ lang = 'bn', data }) => {
  // ডাটাবেজ থেকে ডাটা আসলে তা ব্যবহার করবে, না থাকলে ডিফল্ট ডাটা ব্যবহার করবে
  const content = {
    badge: data?.badge || (lang === 'bn' ? "স্মার্ট বাংলাদেশ ২০৪১" : "Smart Bangladesh 2041"),
    titleMain: data?.title || (lang === 'bn' ? "এমপি নাসের রহমান" : "MP Naser Rahman"),
    titleSub: lang === 'bn' ? "আপনার সেবায় নিয়োজিত" : "At Your Service",
    desc: data?.description || (lang === 'bn' 
      ? "জনগণের প্রতিটি সমস্যা সমাধান এবং এলাকার টেকসই উন্নয়নের লক্ষ্যে আমাদের এই ডিজিটাল প্ল্যাটফর্ম।" 
      : "This digital platform aims to solve every problem of the people and achieve sustainable development."),
    btnText: lang === 'bn' ? "অভিযোগ জমা দিন" : "Submit Complaint",
    // ডাটাবেজে যদি ইমেজ থাকে তবে সেটা দেখাবে, নয়তো আপনার লোকাল ছবি
    heroImg: data?.image || defaultPhoto 
  };

  return (
    <div className="relative min-h-[85vh] bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#0d9488] overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col md:flex-row items-center relative z-10">
        
        {/* Left Content */}
        <div className="md:w-3/5 text-white space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-teal-100 uppercase">
              {content.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.15]">
            {content.titleMain} <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-emerald-200">
              {content.titleSub}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-emerald-50 text-opacity-80 max-w-xl leading-relaxed">
            {content.desc}
          </p>

          <div className="flex flex-wrap gap-5 pt-4">
            <Link 
              to="/complaint" 
              className="group bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-teal-50 transition-all shadow-xl hover:-translate-y-1"
            >
              <Megaphone className="w-5 h-5 text-teal-600" />
              {content.btnText}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-2/5 mt-16 md:mt-0 relative group">
          <div className="relative z-20 w-full max-w-md mx-auto aspect-square overflow-hidden rounded-[2.5rem] border-4 border-white/20 shadow-2xl bg-[#064e3b]">
            <img 
              src={content.heroImg} 
              alt={content.titleMain}
              className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700 ease-in-out"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x800?text=Leader+Image";
              }}
            />
          </div>
          <div className="absolute -inset-4 border-2 border-dashed border-teal-400/30 rounded-[3rem] animate-[spin_30s_linear_infinite]"></div>
        </div>
      </div>

      {/* SVG Curve at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] fill-[#f8fafc]">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C165.71,85.66,58.47,115.3,0,95.8V120H1200V95.8C1141.53,115.3,1041.13,110,985.66,92.83Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
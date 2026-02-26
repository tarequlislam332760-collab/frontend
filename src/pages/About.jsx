import React from 'react';
import { Award, BookOpen, Target, Users } from 'lucide-react';
import myImage from '../assets/img2.jpg'; 

const About = ({ lang = 'bn' }) => {
  // ১. সকল টেক্সট ডাটা
  const translations = {
    bn: {
      badge: "জননেতার পরিচিতি",
      heroTitle: "জনগণের সেবায় উৎসর্গীকৃত",
      name: "নাসের রহমান এমপি",
      description: "মৌলভীবাজারের গণমানুষের নেতা নাসের রহমান দীর্ঘ দিন ধরে এলাকার উন্নয়নে নিরলসভাবে কাজ করে যাচ্ছেন। তাঁর সুযোগ্য নেতৃত্বে এই এলাকা আজ একটি আধুনিক ও স্মার্ট নির্বাচনী এলাকায় রূপান্তরিত হচ্ছে। শিক্ষা, স্বাস্থ্য এবং অবকাঠামোগত উন্নয়নে তাঁর অবদান অবিস্মরণীয়।",
      feature1: "অভিজ্ঞ নেতৃত্ব",
      feature2: "জনবান্ধব সেবা",
      visionTitle: "আমাদের লক্ষ্য ও ভিশন",
      card1Title: "স্মার্ট এলাকা",
      card1Desc: "ডিজিটাল প্রযুক্তির মাধ্যমে এলাকার সকল সেবা জনগণের দোরগোড়ায় পৌঁছে দেওয়া।",
      card2Title: "শিক্ষার প্রসার",
      card2Desc: "নতুন স্কুল ভবন নির্মাণ ও আধুনিক ল্যাব স্থাপনের মাধ্যমে শিক্ষার মান উন্নয়ন।",
      card3Title: "সামাজিক নিরাপত্তা",
      card3Desc: "দরিদ্র ও অবহেলিত মানুষের পাশে দাঁড়িয়ে সামাজিক নিরাপত্তা নিশ্চিত করা।"
    },
    en: {
      badge: "Leader's Profile",
      heroTitle: "Dedicated to People's Service",
      name: "Nasir Rahman MP",
      description: "Nasir Rahman, the leader of the masses in Moulvibazar, has been working tirelessly for the development of the area for a long time. Under his capable leadership, this area is transforming into a modern and smart constituency. His contribution to education, health, and infrastructure development is unforgettable.",
      feature1: "Experienced Leadership",
      feature2: "People-Friendly Service",
      visionTitle: "Our Mission & Vision",
      card1Title: "Smart Area",
      card1Desc: "Delivering all local services to the people's doorstep through digital technology.",
      card2Title: "Education Expansion",
      card2Desc: "Improving the quality of education by constructing new school buildings and modern labs.",
      card3Title: "Social Security",
      card3Desc: "Ensuring social security by standing beside the poor and neglected people."
    }
  };

  const content = translations[lang] || translations['bn'];

  return (
    <div className="pt-20 bg-slate-50 overflow-x-hidden font-sans">
      
      {/* ১. হিরো সেকশন: জীবনী ও ছবি */}
      <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* ছবি সেকশন */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-full h-full bg-emerald-200 rounded-[2rem] md:rounded-[3rem] -z-10 group-hover:bg-emerald-300 transition-colors duration-500"></div>
              
              <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-gray-100">
                <img 
                  src={myImage} 
                  alt={content.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x1000?text=Leader+Image";
                  }}
                />
              </div>
            </div>
            
            {/* টেক্সট সেকশন */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold tracking-wide uppercase">
                {content.badge}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.2]">
                {content.heroTitle} <br className="hidden md:block" />
                <span className="text-emerald-600">{content.name}</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-justify md:text-left">
                {content.description}
              </p>
              
              {/* ফিচার বক্স */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4">
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                    <Award size={24} />
                  </div>
                  <span className="font-bold text-slate-800 text-sm md:text-base">{content.feature1}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <Users size={24} />
                  </div>
                  <span className="font-bold text-slate-800 text-sm md:text-base">{content.feature2}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ২. ভিশন ও মিশন */}
      <section className="py-20 bg-emerald-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.visionTitle}</h2>
            <div className="h-1.5 w-20 bg-teal-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-emerald-800/40 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-emerald-700/50 hover:bg-emerald-800/60 transition-all group shadow-xl">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-teal-400 text-emerald-900 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform shadow-lg shadow-teal-400/20">
                <Target size={30} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{content.card1Title}</h3>
              <p className="text-emerald-100/80 leading-relaxed text-sm md:text-base">{content.card1Desc}</p>
            </div>

            <div className="bg-emerald-800/40 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-emerald-700/50 hover:bg-emerald-800/60 transition-all group shadow-xl">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-400 text-emerald-900 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform shadow-lg shadow-blue-400/20">
                <BookOpen size={30} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{content.card2Title}</h3>
              <p className="text-emerald-100/80 leading-relaxed text-sm md:text-base">{content.card2Desc}</p>
            </div>

            <div className="bg-emerald-800/40 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-emerald-700/50 hover:bg-emerald-800/60 transition-all group shadow-xl sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-400 text-emerald-900 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform shadow-lg shadow-orange-400/20">
                <Users size={30} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{content.card3Title}</h3>
              <p className="text-emerald-100/80 leading-relaxed text-sm md:text-base">{content.card3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
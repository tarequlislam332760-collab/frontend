import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../component/Hero'; 
import Projects from '../component/Projects';      
import Blog from '../component/Blog';              
import About from './About'; 
import Contact from '../component/Contact';
import Complaint from '../component/Complaint'

const Home = ({ lang }) => {
  // ১. নিচে থাকা এক্সট্রা সেকশনটির জন্য ট্রান্সলেশন ডাটা
  const translations = {
    bn: {
      missionTitle: "আমাদের লক্ষ্য ও উদ্দেশ্য",
      quote: '"জনগণের দোরগোড়ায় সেবা পৌঁছে দেওয়া এবং একটি স্মার্ট নির্বাচনী এলাকা গড়ে তোলাই আমাদের মূল লক্ষ্য। श्रेष्ठ"',
      btnAbout: "বিস্তারিত জানুন",
      btnComplaint: "অভিযোগ জানান",
      btnComplaintSub: "সরাসরি এমপি মহোদয়কে",
      btnContact: "সরাসরি যোগাযোগ",
    },
    en: {
      missionTitle: "Our Mission & Vision",
      quote: '"Our main goal is to deliver services to the doorstep of the people and build a smart constituency."',
      btnAbout: "Learn More",
      btnComplaint: "File a Complaint",
      btnComplaintSub: "Directly to the MP",
      btnContact: "Direct Contact",
    }
  };

  const t = translations[lang] || translations['bn'];

  return (
    <main className="overflow-x-hidden">
      {/* ২. প্রতিটি সেকশনে lang={lang} পাস করা হয়েছে */}
      <Hero lang={lang} />
      <About lang={lang} />
      <Projects lang={lang} />
      <Blog lang={lang} />
      <Complaint lang={lang} />

      <section className="bg-gray-50">
         <Contact lang={lang} /> 
      </section>

      {/* ৩. লক্ষ্য ও উদ্দেশ্য সেকশন (ডাইনামিক টেক্সটসহ) */}
      <section className="py-20 md:py-32 bg-[#064e3b] relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 relative z-10">
            
            <div className="mb-10">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                {t.missionTitle}
              </h2>
              <div className="h-1.5 w-24 bg-teal-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-xl md:text-3xl text-emerald-50 font-medium leading-relaxed italic opacity-90">
                {t.quote}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-8">
              
              <Link 
                to="/about" 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-2xl transition-all duration-300 font-bold backdrop-blur-sm"
              >
                {t.btnAbout}
              </Link>
              
              <Link 
                to="/complaint" 
                className="w-full sm:w-auto px-12 py-5 bg-teal-500 hover:bg-teal-400 text-emerald-950 rounded-2xl shadow-2xl shadow-teal-500/30 transition-all duration-300 font-black transform hover:scale-105 active:scale-95 text-xl flex flex-col items-center leading-none"
              >
                <span>{t.btnComplaint}</span>
                <span className="text-[10px] uppercase mt-1 tracking-widest opacity-70 font-bold">{t.btnComplaintSub}</span>
              </Link>
              
              <Link 
                to="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-2xl transition-all duration-300 font-bold backdrop-blur-sm"
              >
                {t.btnContact}
              </Link>
              
            </div>

            <div className="mt-20 flex justify-center gap-3">
              <span className="w-12 h-1.5 bg-teal-400 rounded-full"></span>
              <span className="w-4 h-1.5 bg-teal-400/40 rounded-full"></span>
              <span className="w-4 h-1.5 bg-teal-400/20 rounded-full"></span>
            </div>

        </div>
      </section>
    </main>
  );
};

export default Home;
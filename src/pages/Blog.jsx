import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const Blog = ({ lang = 'bn' }) => {
  const navigate = useNavigate();

  // ১. ট্রান্সলেশন ডাটা (খবর সহ)
  const translations = {
    bn: {
      sectionTitle: "সর্বশেষ খবর ও আপডেট",
      btnSeeAll: "সব খবর দেখুন",
      readTimeLabel: "মিনিট",
      blogsList: [
        {
          id: 1,
          tag: "সংবাদ",
          title: "মৌলভীবাজারে নতুন আইটি পার্কের ভিত্তিপ্রস্তর স্থাপন করলেন এমপি মহোদয়",
          date: "২০ ফেব, ২০২৬",
          readTime: "৩ মিনিট",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: 2,
          tag: "নোটিশ",
          title: "উপজেলা পর্যায়ে বিনামূল্যে স্মার্ট কৃষি যন্ত্রপাতি বিতরণ কর্মসূচি",
          date: "১৮ ফেব, ২০২৬",
          readTime: "৫ মিনিট",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800",
        }
      ]
    },
    en: {
      sectionTitle: "Latest News & Updates",
      btnSeeAll: "See All News",
      readTimeLabel: "min read",
      blogsList: [
        {
          id: 1,
          tag: "News",
          title: "MP laid the foundation stone of new IT Park in Moulvibazar",
          date: "Feb 20, 2026",
          readTime: "3 min read",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: 2,
          tag: "Notice",
          title: "Free smart agricultural machinery distribution at Upazila level",
          date: "Feb 18, 2026",
          readTime: "5 min read",
          image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800",
        }
      ]
    }
  };

  const content = translations[lang] || translations['bn'];

  const handleSeeAll = () => {
    navigate('/Blog');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {content.sectionTitle}
            </h2>
            <div className="h-1.5 w-20 bg-emerald-600 mt-4 rounded-full mx-auto md:mx-0"></div>
          </div>
          
          <button 
            onClick={handleSeeAll}
            className="hidden md:flex items-center gap-2 text-emerald-700 font-bold px-6 py-2 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-all group"
          >
            {content.btnSeeAll} 
            <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ব্লগ কার্ড গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {content.blogsList.map((blog) => (
            <div 
              key={blog.id} 
              onClick={handleSeeAll}
              className="group cursor-pointer flex flex-col sm:flex-row bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500"
            >
              
              {/* ইমেজ কন্টেইনার */}
              <div className="w-full sm:w-[40%] h-56 sm:h-auto overflow-hidden relative">
                <img 
                  src={blog.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  alt="news"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x600?text=News+Image";
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* কন্টেন্ট কন্টেইনার */}
              <div className="w-full sm:w-[60%] p-6 md:p-8 flex flex-col justify-between bg-white">
                <div>
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {blog.tag}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-4 leading-snug group-hover:text-emerald-700 transition-colors duration-300">
                    {blog.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4 md:gap-6 mt-8 text-xs md:text-sm text-slate-500 border-t border-slate-100 pt-5 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-emerald-600" /> {blog.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-emerald-600" /> {blog.readTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* মোবাইল ভিউ বাটন */}
        <div className="mt-12 md:hidden">
          <button 
            onClick={handleSeeAll}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-transform"
          >
            {content.btnSeeAll} <ChevronRight size={22} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Blog;
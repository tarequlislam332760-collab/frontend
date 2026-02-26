import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

const Projects = ({ lang = 'bn' }) => {
  const navigate = useNavigate();

  // ১. ট্রান্সলেশন ডাটা
  const translations = {
    bn: {
      title: "উন্নয়ন প্রকল্পসমূহ",
      subtitle: "এলাকার অবকাঠামো এবং জনসেবার মান উন্নয়নে আমাদের চলমান ও সম্পন্নকৃত উদ্যোগসমূহ।",
      btnSeeAll: "সবগুলো দেখুন",
      btnDetails: "বিস্তারিত দেখুন",
      statusDone: "সম্পন্ন",
      statusRunning: "চলমান",
      statusProposed: "প্রস্তাবিত",
      projectsList: [
        {
          id: 1,
          title: "নতুন মডেল স্কুল ভবন নির্মাণ",
          location: "সদর উপজেলা",
          date: "জানুয়ারি ২০২৪",
          image: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "সম্পন্ন"
        },
        {
          id: 2,
          title: "৫ কিমি রাস্তা কার্পেটিং",
          location: "ইউনিয়ন পরিষদ এলাকা",
          date: "ফেব্রুয়ারি ২০২৪",
          image: "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "চলমান"
        },
        {
          id: 3,
          title: "ডিজিটাল ট্রেনিং সেন্টার স্থাপন",
          location: "পৌরসভা",
          date: "মার্চ ২০২৪",
          image: "https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "প্রস্তাবিত"
        }
      ]
    },
    en: {
      title: "Development Projects",
      subtitle: "Our ongoing and completed initiatives to improve infrastructure and public services in the area.",
      btnSeeAll: "See All Projects",
      btnDetails: "View Details",
      statusDone: "Completed",
      statusRunning: "Ongoing",
      statusProposed: "Proposed",
      projectsList: [
        {
          id: 1,
          title: "Construction of New Model School",
          location: "Sadar Upazila",
          date: "January 2024",
          image: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Completed"
        },
        {
          id: 2,
          title: "5 km Road Carpeting",
          location: "Union Parishad Area",
          date: "February 2024",
          image: "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Ongoing"
        },
        {
          id: 3,
          title: "Setting up Digital Training Center",
          location: "Municipality",
          date: "March 2024",
          image: "https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Proposed"
        }
      ]
    }
  };

  const content = translations[lang] || translations['bn'];

  const handleSeeAll = () => {
    navigate('/Projects');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 text-center md:text-left">
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 border-l-0 md:border-l-8 border-emerald-600 pl-0 md:pl-6">
              {content.title}
            </h2>
            <p className="text-slate-600 mt-4 text-base md:text-lg max-w-xl">
              {content.subtitle}
            </p>
          </div>
          
          <button 
            onClick={handleSeeAll} 
            className="hidden md:flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:gap-4 transition-all duration-300 border border-emerald-100"
          >
            {content.btnSeeAll} <ArrowRight size={20} />
          </button>
        </div>

        {/* প্রজেক্ট গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {content.projectsList.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 group"
            >
              {/* ইমেজ সেকশন */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-200">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src="https://via.placeholder.com/800x600?text=Image+Not+Found"
                  }}
                />
                
                <span className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold text-white shadow-xl z-10 tracking-wider ${
                  project.status === 'সম্পন্ন' || project.status === 'Completed' ? 'bg-emerald-500' : 
                  project.status === 'চলমান' || project.status === 'Ongoing' ? 'bg-blue-500' : 'bg-orange-500'
                }`}>
                  {project.status}
                </span>
              </div>
              
              {/* কন্টেন্ট সেকশন */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-50 text-sm md:text-base text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <MapPin size={16} />
                    </div>
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Calendar size={16} />
                    </div>
                    <span>{project.date}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full py-3 bg-slate-50 text-emerald-700 font-bold rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    {content.btnDetails} <ArrowRight size={18} />
                  </button>
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
            {content.btnSeeAll} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
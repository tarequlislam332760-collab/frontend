import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Complaint from './Complaint'; 
// আপনার প্রজেক্ট এবং পরিচিতি কম্পোনেন্টগুলো এখানে ইমপোর্ট করুন
// import AboutSection from '../components/AboutSection'; 
// import ProjectSection from '../components/ProjectSection';

const Home = ({ lang }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => setContents(res.data))
      .catch(err => console.log(err));
  }, []);

  // ডাটাবেস থেকে ক্যাটাগরি অনুযায়ী ডাটা ফিল্টার করা
  const heroData = contents.find(item => item.category === 'hero' && item.lang === lang);
  const aboutData = contents.find(item => item.category === 'about' && item.lang === lang);

  return (
    <main className="min-h-screen">
      {/* ১. হিরো সেকশন */}
      <section id="home">
        <Hero lang={lang} data={heroData} />
      </section>

      {/* ২. পরিচিতি সেকশন */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            {lang === 'bn' ? 'পরিচিতি' : 'About Us'}
          </h2>
          {/* এখানে নমুনা লেখার বদলে ডাটাবেসের লেখা দেখাচ্ছি */}
          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed text-center">
            {aboutData ? aboutData.title : (lang === 'bn' ? 'লোড হচ্ছে...' : 'Loading...')}
          </div>
        </div>
      </section>

      {/* ৩. প্রজেক্ট সেকশন */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            {lang === 'bn' ? 'প্রজেক্ট' : 'Our Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ডাটাবেস থেকে শুধু প্রজেক্টগুলো লুপ করা */}
            {contents.filter(item => item.category === 'project' && item.lang === lang).map(project => (
              <div key={project._id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-4 font-bold text-slate-800">{project.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ৪. অভিযোগ সেকশন */}
      <section id="complaint" className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-emerald-900 uppercase">
              {lang === 'bn' ? 'আপনার অভিযোগ বা পরামর্শ' : 'Your Complaints or Suggestions'}
            </h2>
          </div>
          <div className="bg-white p-2 rounded-[2.5rem] shadow-xl">
             <Complaint lang={lang} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
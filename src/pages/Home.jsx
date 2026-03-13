import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Complaint from './Complaint'; 

const Home = ({ lang }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => {
        setContents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ক্যাটাগরি এবং ভাষা অনুযায়ী ডাটা ফিল্টার করা
  const heroData = contents.find(item => item.category === 'hero' && item.lang === lang);
  const aboutData = contents.find(item => item.category === 'about' && item.lang === lang);
  const projects = contents.filter(item => item.category === 'project' && item.lang === lang);

  return (
    <main className="min-h-screen">
      {/* ১. হিরো সেকশন */}
      <section id="home">
        <Hero lang={lang} data={heroData} />
      </section>

      {/* ২. পরিচিতি সেকশন (ডাইনামিক) */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-900">
            {lang === 'bn' ? 'পরিচিতি' : 'About Us'}
          </h2>
          <div className="max-w-3xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
            {aboutData ? (
              <p>{aboutData.title}</p> 
            ) : (
              <p className="text-gray-400 italic">
                {lang === 'bn' ? 'তথ্য লোড হচ্ছে...' : 'Information is loading...'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ৩. প্রজেক্ট সেকশন (ডাইনামিক কার্ড) */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-900">
            {lang === 'bn' ? 'প্রজেক্ট সমূহ' : 'Our Projects'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800">{project.title}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">
                {lang === 'bn' ? 'কোনো প্রজেক্ট পাওয়া যায়নি' : 'No projects found'}
              </div>
            )}
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
            <div className="h-1 w-20 bg-emerald-500 mx-auto mt-2"></div>
          </div>
          <div className="bg-white p-2 rounded-[2.5rem] shadow-xl border border-emerald-100">
             <Complaint lang={lang} />
          </div>
        </div>
      </section>

      {/* ৫. যোগাযোগ সেকশন */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold mb-4 text-emerald-900">
            {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
          </h2>
          <p className="text-gray-600">
            {lang === 'bn' 
              ? 'যেকোনো প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করুন।' 
              : 'Feel free to contact us for any inquiries.'}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Complaint from './Complaint'; 
// যদি আলাদা কম্পোনেন্ট থাকে তবে ইমপোর্ট করুন, না থাকলে নিচের কোড কাজ করবে

const Home = ({ lang }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => setContents(res.data))
      .catch(err => console.log(err));
  }, []);

  // ক্যাটাগরি অনুযায়ী ডাটা ফিল্টার
  const heroData = contents.find(item => item.category === 'hero' && item.lang === lang);
  const aboutData = contents.find(item => item.category === 'about' && item.lang === lang);
  const projects = contents.filter(item => item.category === 'project' && item.lang === lang);

  return (
    <main className="min-h-screen">
      {/* ১. হিরো সেকশন */}
      <section>
        <Hero lang={lang} data={heroData} />
      </section>

      {/* ২. পরিচিতি সেকশন (হোম পেজে যতটুকু দেখাতে চান) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-emerald-900">
            {lang === 'bn' ? 'পরিচিতি' : 'About Us'}
          </h2>
          <div className="max-w-3xl mx-auto text-gray-700 text-lg">
            {aboutData?.title}
          </div>
        </div>
      </section>

      {/* ৩. প্রজেক্ট সেকশন (হোম পেজে প্রজেক্টের লিস্ট) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-900">
            {lang === 'bn' ? 'প্রজেক্ট সমূহ' : 'Our Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => ( // হোম পেজে মাত্র ৩টি প্রজেক্ট দেখাবে
              <div key={project._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-5 font-bold text-slate-800">{project.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ৪. অভিযোগ সেকশন (হোম পেজেই সরাসরি ফর্ম) */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-emerald-900 uppercase mb-10">
            {lang === 'bn' ? 'আপনার অভিযোগ বা পরামর্শ' : 'Your Complaints'}
          </h2>
          <div className="bg-white p-2 rounded-[2.5rem] shadow-xl">
             <Complaint lang={lang} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
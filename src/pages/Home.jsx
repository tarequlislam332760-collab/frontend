import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Complaint from './Complaint'; 
// আপনার প্রজেক্ট, ব্লগ এবং কন্টাক্ট সেকশন যদি আলাদা কম্পোনেন্ট থাকে তবে ইমপোর্ট করে নিন
// উদাহরণ: import BlogSection from '../components/BlogSection';

const Home = ({ lang }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => setContents(res.data))
      .catch(err => console.log(err));
  }, []);

  // ডাটা ফিল্টারিং
  const heroData = contents.find(item => item.category === 'hero' && item.lang === lang);
  const aboutData = contents.find(item => item.category === 'about' && item.lang === lang);
  const projects = contents.filter(item => item.category === 'project' && item.lang === lang);
  const blogs = contents.filter(item => item.category === 'blog' && item.lang === lang);

  return (
    <main className="min-h-screen">
      
      {/* ১. HOME (Hero Section) */}
      <section id="home">
        <Hero lang={lang} data={heroData} />
      </section>

      {/* ২. ABOUT (পরিচিতি) */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-emerald-900">
            {lang === 'bn' ? 'পরিচিতি' : 'About Us'}
          </h2>
          <div className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
            {aboutData?.title}
          </div>
        </div>
      </section>

      {/* ৩. PROJECT (প্রজেক্ট সমূহ) */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-900">
            {lang === 'bn' ? 'প্রজেক্ট সমূহ' : 'Our Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <div key={project._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-5 font-bold text-slate-800">{project.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ৪. BLOG (ব্লগ) */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-emerald-900">
            {lang === 'bn' ? 'ব্লগ' : 'Latest Blogs'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog) => (
              <div key={blog._id} className="text-left border p-4 rounded-xl">
                <h3 className="font-bold text-emerald-800">{blog.title}</h3>
                <p className="text-sm text-gray-500 mt-2">আরও পড়ুন...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ৫. CONTACT (যোগাযোগ) */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-emerald-900">
            {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
          </h2>
          <div className="text-gray-600">
             <p>কুসুমবাগ, মৌলভীবাজার সদর, মৌলভীবাজার।</p>
             <p className="mt-2 font-bold text-emerald-700">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
          </div>
        </div>
      </section>

      {/* ৬. COMPLAINT (অভিযোগ) */}
      <section id="complaint" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-emerald-900 uppercase mb-10">
            {lang === 'bn' ? 'আপনার অভিযোগ বা পরামর্শ' : 'Your Complaints'}
          </h2>
          <div className="bg-white p-2 rounded-[2.5rem] shadow-xl border border-emerald-100">
             <Complaint lang={lang} />
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
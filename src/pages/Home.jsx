import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Complaint from './Complaint'; // অভিযোগ কম্পোনেন্টটি ইমপোর্ট করুন

const Home = ({ lang }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => setContents(res.data))
      .catch(err => console.log(err));
  }, []);

  const heroData = contents.find(item => item.category === 'hero');

  return (
    <main className="min-h-screen">
      {/* Home / Hero Section */}
      <section id="home">
        <Hero lang={lang} data={heroData} />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {lang === 'bn' ? 'পরিচিতি' : 'About Us'}
          </h2>
          <p className="text-gray-600">এখানে আপনার পরিচিতি টেক্সট বসাতে পারেন।</p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {lang === 'bn' ? 'প্রজেক্ট' : 'Our Projects'}
          </h2>
          <p className="text-gray-600">আমাদের বর্তমান ও চলমান প্রজেক্ট সমূহ।</p>
        </div>
      </section>

      {/* --- অভিযোগ সেকশন (নতুন যোগ করা হয়েছে) --- */}
      <section id="complaint" className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-emerald-900 uppercase">
              {lang === 'bn' ? 'আপনার অভিযোগ বা পরামর্শ' : 'Your Complaints or Suggestions'}
            </h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto mt-2"></div>
          </div>
          
          {/* সরাসরি Complaint কম্পোনেন্টটি এখানে কল করা হলো */}
          <div className="bg-white p-2 rounded-[2.5rem] shadow-xl">
             <Complaint lang={lang} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold mb-4">
            {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
          </h2>
          <p className="text-gray-600">সরাসরি আমাদের সাথে যোগাযোগ করুন।</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
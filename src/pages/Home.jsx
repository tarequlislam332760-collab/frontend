import React, { useState, useEffect } from 'react';
import axios from 'axios';

// কম্পোনেন্টগুলো ইমপোর্ট করুন
import Hero from '../components/Hero';
import About from './About';
import Projects from './Projects';
import Blog from './Blog';
import Contact from './Contact';

const Home = ({ lang, t }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // ডাটাবেজ থেকে ডাটা নিয়ে আসা
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => setContents(res.data))
      .catch(err => console.log(err));
  }, []);

  // হিরো ডাটা আলাদা করা
  const heroData = contents.find(item => item.category === 'hero');

  return (
    <main className="scroll-smooth">
      {/* ১. হিরো সেকশন */}
      <section id="home">
        <Hero lang={lang} data={heroData} />
      </section>

      {/* ২. পরিচিতি সেকশন */}
      <section id="about" className="py-16">
        <About lang={lang} t={t} />
      </section>

      {/* ৩. প্রজেক্ট সেকশন */}
      <section id="projects" className="py-16 bg-slate-50">
        <Projects lang={lang} t={t} />
      </section>

      {/* ৪. ব্লগ সেকশন */}
      <section id="blog" className="py-16">
        <Blog lang={lang} t={t} />
      </section>

      {/* ৫. যোগাযোগ সেকশন */}
      <section id="contact" className="py-16 bg-slate-50">
        <Contact lang={lang} t={t} />
      </section>
    </main>
  );
};

export default Home;
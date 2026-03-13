import React, { useState, useEffect } from 'react';
import axios from 'axios';

// আপনার তৈরি করা আলাদা আলাদা পেজ/কম্পোনেন্টগুলো ইমপোর্ট করুন
import Hero from '../components/Hero';
import About from './About';
import Projects from './Projects';
import Blog from './Blog';
import Contact from './Contact';
import Complaint from './Complaint';

const Home = ({ lang }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // হিরো সেকশনের ডাটার জন্য কল
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => setContents(res.data))
      .catch(err => console.log(err));
  }, []);

  // হিরো ডাটা ফিল্টার
  const heroData = contents.find(item => item.category === 'hero' && item.lang === lang);

  return (
    <main className="min-h-screen scroll-smooth">
      
      {/* ১. হোম / হিরো সেকশন */}
      <section id="home">
        <Hero lang={lang} data={heroData} />
      </section>

      {/* ২. পরিচিতি (About) সেকশন */}
      <section id="about">
        <About lang={lang} />
      </section>

      {/* ৩. প্রজেক্ট (Projects) সেকশন */}
      <section id="projects">
        <Projects lang={lang} />
      </section>

      {/* ৪. ব্লগ (Blog) সেকশন */}
      <section id="blog">
        <Blog lang={lang} />
      </section>

      {/* ৫. যোগাযোগ (Contact) সেকশন */}
      <section id="contact">
        <Contact lang={lang} />
      </section>

      {/* ৬. অভিযোগ (Complaint) সেকশন */}
      <section id="complaint">
        <Complaint lang={lang} />
      </section>

    </main>
  );
};

export default Home;
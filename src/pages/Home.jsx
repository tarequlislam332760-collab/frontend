import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero'; 
// ... অন্যান্য ইমপোর্ট

const Home = ({ lang }) => {
  const [heroContent, setHeroContent] = useState(null);

  useEffect(() => {
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => {
        const hero = res.data.find(item => item.category === 'hero' && item.lang === lang);
        setHeroContent(hero);
      })
      .catch(err => console.log(err));
  }, [lang]);

  return (
    <main className="overflow-x-hidden">
      {/* হিরো কম্পোনেন্টে ডাইনামিক ডাটা পাস করা হলো */}
      <Hero 
        lang={lang} 
        data={heroContent} 
      />
      {/* বাকি সেকশনগুলো আগের মতোই থাকবে */}
    </main>
  );
};
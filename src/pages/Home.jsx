import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero'; 

const Home = ({ lang }) => {
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://mybackendv1.vercel.app/api/content')
      .then(res => {
        const hero = res.data.find(item => item.category === 'hero' && item.lang === lang);
        setHeroContent(hero);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [lang]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;

  return (
    <main className="overflow-x-hidden min-h-screen">
      {heroContent ? (
        <Hero lang={lang} data={heroContent} />
      ) : (
        <div className="py-20 text-center">
           <h2 className="text-2xl font-bold text-gray-400">অ্যাডমিন থেকে Hero ডাটা যোগ করুন</h2>
        </div>
      )}
    </main>
  );
};

export default Home;
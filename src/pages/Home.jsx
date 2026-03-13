import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';

const Home = ({ lang }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // আপনার লাইভ ব্যাকএন্ড লিঙ্ক এখানে দিন
    axios.get('https://your-backend-url.vercel.app/api/content')
      .then(res => setContents(res.data))
      .catch(err => console.log(err));
  }, []);

  // শুধুমাত্র Hero ক্যাটাগরির ডাটা আলাদা করা
  const heroData = contents.find(item => item.category === 'hero');

  return (
    <main className="min-h-screen bg-slate-50">
      <Hero lang={lang} data={heroData} />
      
      {/* বাকি সেকশনগুলো নিচে একইভাবে সাজাতে পারেন */}
    </main>
  );
};

export default Home;
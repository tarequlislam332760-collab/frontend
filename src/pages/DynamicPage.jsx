import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DynamicPage = ({ lang }) => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`https://mybackendv1.vercel.app/api/content`);
        // slug এর সাথে মিল রেখে কন্টেন্ট খুঁজে বের করা
        const currentData = res.data.find(item => 
          item.title.toLowerCase().replace(/ /g, '-') === slug && item.lang === lang
        );
        setPageData(currentData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug, lang]);

  if (loading) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="pt-32 min-h-screen max-w-5xl mx-auto px-6 pb-20">
      {pageData ? (
        <>
          <img src={pageData.image} alt={pageData.title} className="w-full h-96 object-cover rounded-3xl mb-10 shadow-2xl" />
          <h1 className="text-4xl font-black text-slate-800 mb-6">{pageData.title}</h1>
          <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
             {/* এখানে বিস্তারিত বর্ণনা (যদি থাকে) বসবে */}
             {pageData.description || 'পেজটির বর্ণনা শীঘ্রই যুক্ত করা হবে।'}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-red-400">পেজটি পাওয়া যায়নি!</h1>
        </div>
      )}
    </div>
  );
};

export default DynamicPage;
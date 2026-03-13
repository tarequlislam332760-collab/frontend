import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const Blog = ({ lang = 'bn' }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // ✅ আপনার নতুন ব্যাকএন্ড লিঙ্কটি এখানে আপডেট করে দিলাম
        const res = await axios.get('https://mybackendv1.vercel.app/api/content');
        
        // শুধু 'blog' ক্যাটাগরির ডাটা ফিল্টার করা হচ্ছে
        const onlyBlogs = res.data.filter(item => item.category === 'blog');
        setBlogs(onlyBlogs);
      } catch (err) {
        console.error("ব্লগ লোড করতে সমস্যা:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-20 font-bold">খবর লোড হচ্ছে...</div>;

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-12 border-l-8 border-blue-600 pl-6">
          {lang === 'bn' ? 'সর্বশেষ খবর ও আপডেট' : 'Latest News & Updates'}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col md:flex-row bg-slate-50 rounded-[2rem] overflow-hidden border hover:shadow-lg transition-shadow">
              <img src={blog.image} className="w-full md:w-1/3 h-52 object-cover" alt="news" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    {lang === 'bn' ? 'সংবাদ' : 'News'}
                  </span>
                  <h3 className="text-xl font-bold mt-4">{blog.title}</h3>
                </div>
                <div className="flex items-center gap-4 mt-6 text-slate-500 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16}/> 
                    {new Date(blog.createdAt).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {blogs.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-400 italic">
              {lang === 'bn' ? 'এখনো কোনো খবর আপলোড করা হয়নি।' : 'No news uploaded yet.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
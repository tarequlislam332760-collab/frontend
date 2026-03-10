import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const Blog = ({ lang = 'bn' }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://backend-phi-eight-82.vercel.app/api/content');
        // শুধু ব্লগগুলো ফিল্টার করা
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
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-12">
          {lang === 'bn' ? 'সর্বশেষ খবর ও আপডেট' : 'Latest News & Updates'}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col md:flex-row bg-slate-50 rounded-[2rem] overflow-hidden border">
              <img src={blog.image} className="w-full md:w-1/3 h-52 object-cover" alt="news" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">সংবাদ</span>
                  <h3 className="text-xl font-bold mt-4">{blog.title}</h3>
                </div>
                <div className="flex items-center gap-4 mt-6 text-slate-500 text-sm">
                  <div className="flex items-center gap-2"><Calendar size={16}/> {new Date(blog.createdAt).toLocaleDateString('bn-BD')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {blogs.length === 0 && <p className="text-center text-slate-400">এখনো কোনো খবর আপলোড করা হয়নি।</p>}
      </div>
    </section>
  );
};

export default Blog;
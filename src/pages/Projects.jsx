import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const Projects = ({ lang = 'bn' }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // ✅ এখানে আপনার নতুন ব্যাকএন্ড লিঙ্কটি আপডেট করে দিলাম
        const res = await axios.get('https://mybackendv1.vercel.app/api/content');
        
        // শুধু প্রজেক্টগুলো ফিল্টার করা (ডাটাবেজে ক্যাটাগরি 'project' ছোট হাতের অক্ষরে আছে)
        const onlyProjects = res.data.filter(item => item.category === 'project');
        setProjects(onlyProjects);
      } catch (err) {
        console.error("প্রজেক্ট লোড করতে সমস্যা:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-20 font-bold">প্রজেক্ট লোড হচ্ছে...</div>;

  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-12 border-l-8 border-emerald-600 pl-6">
          {lang === 'bn' ? 'উন্নয়ন প্রকল্পসমূহ' : 'Development Projects'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all">
              <img src={project.image} alt={project.title} className="h-60 w-full object-cover" />
              <div className="p-6">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs">{project.status || 'সম্পন্ন'}</span>
                <h3 className="text-xl font-bold mt-3">{project.title}</h3>
                <div className="mt-4 text-slate-500 text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={16}/> {project.location || 'এলাকা নির্দিষ্ট নয়'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <p className="text-center text-slate-400 py-10">
            {lang === 'bn' ? 'এখনো কোনো প্রজেক্ট আপলোড করা হয়নি।' : 'No projects uploaded yet.'}
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
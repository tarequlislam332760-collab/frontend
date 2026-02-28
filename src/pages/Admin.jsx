import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, MessageSquare, Phone, User, LogOut, ShieldCheck, Trash2, PlusCircle, LayoutGrid } from 'lucide-react';

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // নতুন কার্ড সেভ করার জন্য স্টেট
  const [form, setForm] = useState({ title: '', image: '', desc: '', category: 'project' });

  const ADMIN_EMAIL = "vemanavijaykumar154@gmail.com";
  const ADMIN_PASS = "doctor tuhin"; // আপনার পাসওয়ার্ড
  const API_URL = "https://backend-phi-eight-82.vercel.app";

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const resC = await axios.get(`${API_URL}/api/complaints`);
      const resP = await axios.get(`${API_URL}/api/projects`);
      setComplaints(resC.data);
      setProjects(resP.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ নতুন কার্ড (Project/Blog) সেভ করার ফাংশন
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/projects`, form);
      alert("সফলভাবে সেভ হয়েছে!");
      setForm({ title: '', image: '', desc: '', category: 'project' });
      fetchData(); // লিস্ট আপডেট করার জন্য
    } catch (err) {
      alert("সেভ করা সম্ভব হয়নি।");
    }
  };

  // ✅ কার্ড ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিত যে এটি মুছে ফেলবেন?")) {
      try {
        await axios.delete(`${API_URL}/api/projects/${id}`);
        fetchData();
      } catch (err) {
        alert("ডিলিট করা সম্ভব হয়নি।");
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <ShieldCheck className="mx-auto text-emerald-600 mb-2" size={48} />
            <h2 className="text-2xl font-bold">অ্যাডমিন লগইন</h2>
          </div>
          <input type="email" placeholder="ইমেইল" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-emerald-500" required />
          <input type="password" placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-xl mb-6 outline-none focus:ring-2 focus:ring-emerald-500" required />
          <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition">লগইন করুন</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-slate-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-slate-800">মাস্টার ড্যাশবোর্ড</h1>
          <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold border border-red-100 flex items-center gap-2"><LogOut size={18}/> লগআউট</button>
        </div>

        {/* --- ১. নতুন কার্ড যোগ করার ফর্ম --- */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600"><PlusCircle/> নতুন প্রজেক্ট বা ব্লগ যোগ করুন</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="টাইটেল" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50" required />
            <input type="text" placeholder="ইমেজ লিঙ্ক" value={form.image} onChange={(e)=>setForm({...form, image: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50" required />
            <select value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50 font-bold">
              <option value="project">Project</option>
              <option value="blog">Blog</option>
            </select>
            <input type="text" placeholder="ছোট বর্ণনা" value={form.desc} onChange={(e)=>setForm({...form, desc: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50" required />
            <button type="submit" className="bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-emerald-700 transition lg:col-span-4">Save to Website</button>
          </form>
        </div>

        {/* --- ২. লাইভ কার্ড লিস্ট (ডিলিট অপশনসহ) --- */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-700"><LayoutGrid/> লাইভ কন্টেন্ট</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map(p => (
            <div key={p._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative group">
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.category === 'blog' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{p.category}</span>
              <h3 className="font-bold text-lg text-slate-800">{p.title}</h3>
              <p className="text-sm text-slate-500 mt-2 mb-4 line-clamp-2">{p.desc}</p>
              <button onClick={() => handleDelete(p._id)} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition"><Trash2 size={16}/> Delete</button>
            </div>
          ))}
        </div>

        {/* --- ৩. অভিযোগ তালিকা --- */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-700"><MessageSquare/> অভিযোগ তালিকা</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((item) => (
            <div key={item._id} className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="font-bold text-slate-800 flex items-center gap-2"><User size={16} className="text-emerald-500"/> {item.name}</div>
              <div className="text-sm text-slate-500 mt-1 mb-4 italic">"{item.message}"</div>
              <div className="text-xs text-slate-400 font-medium bg-slate-50 p-2 rounded-lg"><Phone size={12} className="inline mr-1"/> {item.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
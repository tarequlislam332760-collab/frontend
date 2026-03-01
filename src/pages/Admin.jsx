import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, MessageSquare, Phone, User, LogOut, ShieldCheck, Trash2, PlusCircle, LayoutGrid, Image as ImageIcon } from 'lucide-react';

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // নতুন কন্টেন্ট আপলোড করার স্টেট
  const [form, setForm] = useState({ title: '', image: '', desc: '', category: 'project' });

  const ADMIN_EMAIL = "vemanavijaykumar154@gmail.com";
  const ADMIN_PASS = "doctor tuhin"; 
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

  // ✅ নতুন প্রোজেক্ট/ব্লগ সেভ করার ফাংশন
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/projects`, form);
      alert("সফলভাবে ওয়েবসাইটে যোগ করা হয়েছে!");
      setForm({ title: '', image: '', desc: '', category: 'project' });
      fetchData(); 
    } catch (err) {
      alert("সেভ করা সম্ভব হয়নি। নেটওয়ার্ক চেক করুন।");
    }
  };

  // ✅ কার্ড ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি এটি মুছে ফেলতে চান?")) {
      try {
        await axios.delete(`${API_URL}/api/projects/${id}`);
        fetchData();
      } catch (err) {
        alert("মুছে ফেলা সম্ভব হয়নি।");
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 pt-20">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-200">
          <div className="text-center mb-6">
            <ShieldCheck className="mx-auto text-emerald-600 mb-2" size={48} />
            <h2 className="text-2xl font-bold text-slate-800">অ্যাডমিন লগইন</h2>
            <p className="text-slate-500 text-sm mt-1">সুরক্ষিত প্রবেশের জন্য তথ্য দিন</p>
          </div>
          <input type="email" placeholder="ইমেইল" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 border rounded-xl mb-4 bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500" required />
          <input type="password" placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 border rounded-xl mb-6 bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500" required />
          <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg">লগইন করুন</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-slate-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">অ্যাডমিন কন্ট্রোল প্যানেল</h1>
            <p className="text-slate-500">প্রোজেক্ট আপলোড এবং অভিযোগ ব্যবস্থাপনা</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-bold border border-red-100 flex items-center gap-2 hover:bg-red-100 transition"><LogOut size={18}/> লগআউট</button>
        </div>

        {/* --- কন্টেন্ট আপলোড ফর্ম --- */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600"><PlusCircle/> নতুন প্রোজেক্ট বা ব্লগ যোগ করুন</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="টাইটেল (যেমন: রাস্তা সংস্কার)" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50 focus:ring-2 focus:ring-emerald-500" required />
            <input type="text" placeholder="ইমেজ লিঙ্ক (URL)" value={form.image} onChange={(e)=>setForm({...form, image: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50 focus:ring-2 focus:ring-emerald-500" required />
            <select value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50 font-bold focus:ring-2 focus:ring-emerald-500">
              <option value="project">প্রোজেক্ট</option>
              <option value="blog">ব্লগ</option>
            </select>
            <input type="text" placeholder="ছোট বর্ণনা" value={form.desc} onChange={(e)=>setForm({...form, desc: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50 focus:ring-2 focus:ring-emerald-500" required />
            <button type="submit" className="bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-emerald-700 transition lg:col-span-4 flex justify-center items-center gap-2"><RefreshCw size={20}/> ওয়েবসাইটে সেভ করুন</button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* --- আপলোড করা কাজসমূহ --- */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-700"><LayoutGrid/> আপনার আপলোড করা কাজ</h2>
            <div className="space-y-4">
              {projects.length === 0 && <p className="text-slate-400">কোনো প্রোজেক্ট পাওয়া যায়নি।</p>}
              {projects.map(p => (
                <div key={p._id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition"><ImageIcon size={24}/></div>
                    <div>
                      <h3 className="font-bold text-slate-800">{p.title}</h3>
                      <p className="text-xs text-slate-400 uppercase font-black tracking-tighter">{p.category}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(p._id)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition"><Trash2 size={20}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* --- অভিযোগ তালিকা --- */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-700"><MessageSquare/> জনগণের অভিযোগসমূহ</h2>
            <div className="space-y-4">
              {complaints.length === 0 && <p className="text-slate-400">কোনো অভিযোগ জমা পড়েনি।</p>}
              {complaints.map(item => (
                <div key={item._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
                   <div className="flex items-center gap-3 text-slate-800 font-bold mb-2">
                    <User size={16} className="text-emerald-500" /> {item.name}
                  </div>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed italic">"{item.message}"</p>
                  <div className="text-[11px] font-bold text-slate-400 bg-slate-50 inline-block px-3 py-1 rounded-lg">ফোন: {item.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
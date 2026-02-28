import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, MessageSquare, Phone, User, MapPin, LogOut, ShieldCheck, Trash2, Edit, PlusCircle, LayoutGrid, Image as ImageIcon } from 'lucide-react';

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Project Form State
  const [form, setForm] = useState({ title: '', image: '', desc: '', category: 'project' });
  const [editingId, setEditingId] = useState(null);

  const API_BASE_URL = 'https://backend-phi-eight-82.vercel.app';
  const ADMIN_EMAIL = "vemanavijaykumar154@gmail.com";
  const ADMIN_PASS = "doctor tuhin"; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      fetchAllData();
    } else {
      alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const resC = await axios.get(`${API_BASE_URL}/api/complaints`);
      const resP = await axios.get(`${API_BASE_URL}/api/projects`);
      setComplaints(resC.data);
      setProjects(resP.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ নতুন প্রজেক্ট সেভ বা এডিট করার ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`${API_BASE_URL}/api/projects/${editingId}`, form);
        alert("সফলভাবে আপডেট হয়েছে!");
      } else {
        // Create
        await axios.post(`${API_BASE_URL}/api/projects`, form);
        alert("সফলভাবে সেভ হয়েছে!");
      }
      setForm({ title: '', image: '', desc: '', category: 'project' });
      setEditingId(null);
      fetchAllData();
    } catch (err) {
      alert("ব্যর্থ হয়েছে! ব্যাকএন্ড চেক করুন।");
    }
  };

  // ✅ ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিত যে এটি মুছে ফেলবেন?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/projects/${id}`);
        fetchAllData();
      } catch (err) {
        alert("মুছে ফেলা সম্ভব হয়নি।");
      }
    }
  };

  // ✅ এডিট মোড অন করার ফাংশন
  const startEdit = (project) => {
    setForm({ title: project.title, image: project.image, desc: project.desc, category: project.category });
    setEditingId(project._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 pt-20">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-slate-200">
          <div className="text-center mb-8">
            <ShieldCheck className="mx-auto text-emerald-600 mb-2" size={48} />
            <h2 className="text-2xl font-bold">অ্যাডমিন লগইন</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="email" placeholder="ইমেইল" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500" required />
            <input type="password" placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500" required />
            <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all">লগইন করুন</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-slate-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-slate-800">মাস্টার ড্যাশবোর্ড</h1>
          <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2"><LogOut size={18}/> লগআউট</button>
        </div>

        {/* --- ১. নতুন প্রজেক্ট/ব্লগ যোগ করার ফর্ম --- */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600">
            {editingId ? <Edit size={24}/> : <PlusCircle size={24}/>}
            {editingId ? "তথ্য আপডেট করুন" : "নতুন প্রজেক্ট বা ব্লগ যোগ করুন"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="টাইটেল" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50" required />
            <input type="text" placeholder="ছবির লিঙ্ক (URL)" value={form.image} onChange={(e)=>setForm({...form, image: e.target.value})} className="border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50" required />
            <select value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} className="border p-4 rounded-2xl outline-none bg-slate-50 font-bold">
              <option value="project">Project (প্রজেক্ট)</option>
              <option value="blog">Blog (ব্লগ)</option>
            </select>
            <input type="text" placeholder="ছোট বর্ণনা" value={form.desc} onChange={(e)=>setForm({...form, desc: e.target.value})} className="border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50" required />
            <div className="lg:col-span-4">
               <button type="submit" className={`px-10 py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${editingId ? 'bg-orange-500' : 'bg-emerald-600'}`}>
                {editingId ? "Update Now" : "Save to Website"}
              </button>
              {editingId && <button onClick={()=>{setEditingId(null); setForm({title:'',image:'',desc:'',category:'project'})}} className="ml-4 text-slate-500 font-bold underline">Cancel</button>}
            </div>
          </form>
        </div>

        {/* --- ২. ওয়েবসাইট কন্টেন্ট তালিকা (Edit/Delete) --- */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-700"><LayoutGrid size={24}/> লাইভ কন্টেন্ট তালিকা</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map(p => (
            <div key={p._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.category === 'blog' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                {p.category}
              </span>
              <h3 className="font-bold text-lg text-slate-800 pr-12">{p.title}</h3>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">{p.desc}</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => startEdit(p)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-all"><Edit size={16}/> Edit</button>
                <button onClick={() => handleDelete(p._id)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all"><Trash2 size={16}/> Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* --- ৩. জনগণের অভিযোগ তালিকা --- */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-700"><MessageSquare size={24}/> জনগণের অভিযোগ ও মেসেজ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((item) => (
            <div key={item._id} className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${item.type === 'complaint' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{item.type === 'complaint' ? 'অভিযোগ' : 'মেসেজ'}</span>
                <span className="text-[11px] text-slate-400">{new Date(item.date).toLocaleDateString('bn-BD')}</span>
              </div>
              <div className="font-bold text-slate-800 mb-2 flex items-center gap-2"><User size={16} className="text-emerald-500"/> {item.name}</div>
              <div className="text-sm text-slate-600 mb-4 flex items-center gap-2"><Phone size={14}/> {item.phone}</div>
              <div className="p-4 bg-slate-50 rounded-2xl text-slate-700 text-sm border border-slate-100 italic">"{item.message}"</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Admin;
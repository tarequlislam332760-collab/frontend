import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, MessageSquare, Phone, User, LogOut, ShieldCheck, Trash2, Edit, PlusCircle, LayoutGrid } from 'lucide-react';

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({ title: '', image: '', desc: '', category: 'project' });
  const [editingId, setEditingId] = useState(null);

  const ADMIN_EMAIL = "vemanavijaykumar154@gmail.com";
  const ADMIN_PASS = "doctor tuhin"; // এখানে আপনার সেই বড় পাসওয়ার্ডটি দিন

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      fetchAllData();
    } else { alert("ভুল ইমেইল বা পাসওয়ার্ড!"); }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const resC = await axios.get('https://backend-phi-eight-82.vercel.app/api/complaints');
      const resP = await axios.get('https://backend-phi-eight-82.vercel.app/api/projects');
      setComplaints(resC.data);
      setProjects(resP.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://backend-phi-eight-82.vercel.app/api/projects/${editingId}`, form);
        alert("সফলভাবে আপডেট হয়েছে!");
      } else {
        await axios.post('https://backend-phi-eight-82.vercel.app/api/projects', form);
        alert("সফলভাবে সেভ হয়েছে!");
      }
      setForm({ title: '', image: '', desc: '', category: 'project' });
      setEditingId(null);
      fetchAllData();
    } catch (err) { alert("ব্যর্থ হয়েছে!"); }
  };

  const deleteItem = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিত যে এটি মুছে ফেলবেন?")) {
      await axios.delete(`https://backend-phi-eight-82.vercel.app/api/projects/${id}`);
      fetchAllData();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 pt-20 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-slate-200">
          <div className="text-center mb-6">
            <ShieldCheck className="mx-auto text-emerald-600 mb-2" size={48} />
            <h2 className="text-2xl font-bold text-slate-800">অ্যাডমিন লগইন</h2>
          </div>
          <input type="email" placeholder="ইমেইল" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-3.5 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50" required />
          <input type="password" placeholder="পাসওয়ার্ড" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-3.5 border rounded-xl mb-6 outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50" required />
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition-all active:scale-95">লগইন করুন</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-slate-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800">মাস্টার ড্যাশবোর্ড</h1>
            <p className="text-slate-500">সবকিছু এখান থেকে নিয়ন্ত্রণ করুন</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-bold border border-red-100 flex items-center gap-2 hover:bg-red-100">
            <LogOut size={18}/> লগআউট
          </button>
        </div>

        {/* নতুন ডাটা যোগ করার ফর্ম */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600">
            <PlusCircle size={24}/> {editingId ? "তথ্য এডিট করুন" : "নতুন প্রজেক্ট বা ব্লগ যোগ করুন"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="টাইটেল" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="border p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
            <input type="text" placeholder="ছবির লিঙ্ক (URL)" value={form.image} onChange={(e)=>setForm({...form, image: e.target.value})} className="border p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
            <select value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} className="border p-3.5 rounded-xl outline-none bg-slate-50">
              <option value="project">Project (প্রজেক্ট)</option>
              <option value="blog">Blog (ব্লগ)</option>
            </select>
            <input type="text" placeholder="ছোট বর্ণনা" value={form.desc} onChange={(e)=>setForm({...form, desc: e.target.value})} className="border p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
          </div>
          <button onClick={handleSubmit} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-xl font-bold shadow-lg transition-all active:scale-95">
            {editingId ? "Update Now" : "Save to Website"}
          </button>
        </div>

        {/* প্রজেক্ট ও ব্লগ লিস্ট */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-700"><LayoutGrid size={24}/> ওয়েবসাইট কন্টেন্ট তালিকা</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p._id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${p.category === 'blog' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                  {p.category}
                </span>
                <h3 className="font-bold text-lg mt-3 text-slate-800 line-clamp-1">{p.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{p.desc}</p>
                <div className="flex gap-3 mt-5 pt-4 border-t border-slate-50">
                  <button onClick={() => {setEditingId(p._id); setForm(p)}} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold transition-all"><Edit size={16}/> Edit</button>
                  <button onClick={() => deleteItem(p._id)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold transition-all"><Trash2 size={16}/> Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* অভিযোগের তালিকা */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-700"><MessageSquare size={24}/> জনগণের অভিযোগ সমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map(item => (
            <div key={item._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl uppercase">{item.name[0]}</div>
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1"><Phone size={12}/> {item.phone}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 text-sm leading-relaxed">"{item.message}"</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, PlusCircle, LayoutDashboard, Menu, Image as ImageIcon, Settings, Save, Loader2 } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    
    const [editingId, setEditingId] = useState(null);
    const [contentForm, setContentForm] = useState({ title: '', image: '', category: 'project', lang: 'bn' });
    const [navForm, setNavForm] = useState({ name: '', link: '', lang: 'bn' });

    // আপনার দেওয়া নতুন ব্যাকএন্ড লিঙ্ক অনুযায়ী আপডেট করা হয়েছে
    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";
    
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    useEffect(() => { 
        if (isLoggedIn) fetchData(); 
    }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // একে একে ডাটা ফেচ করা হচ্ছে যাতে একটি ফেইল করলেও অন্যটি চলে
            const contRes = await axios.get(`${API_BASE}/content`).catch(() => ({ data: [] }));
            const navRes = await axios.get(`${API_BASE}/nav`).catch(() => ({ data: [] }));
            
            setContents(contRes.data); 
            setNavItems(navRes.data);
            setComplaints([]); // কমপ্লেইন্ট রুট এখনো তৈরি না থাকলে খালি অ্যারে থাকবে
        } catch (err) { 
            console.error("Data Fetch Error:", err); 
        } finally { 
            setLoading(false); 
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await axios.put(`${API_BASE}/content/${editingId}`, contentForm);
            else await axios.post(`${API_BASE}/content`, contentForm);
            
            setEditingId(null); 
            setContentForm({ title: '', image: '', category: 'project', lang: 'bn' });
            fetchData();
            alert("কন্টেন্ট সফলভাবে সেভ হয়েছে! ✅");
        } catch (err) {
            alert("সেভ করতে সমস্যা হয়েছে। আপনার ব্যাকএন্ড কানেকশন চেক করুন।");
        }
    };

    const handleNavSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/nav`, navForm);
            setNavForm({ name: '', link: '', lang: 'bn' });
            fetchData();
            alert("নেভবার মেনু যোগ হয়েছে! ✅");
        } catch (err) {
            alert("নেভবার মেনু যোগ করা যায়নি।");
        }
    };

    const deleteItem = async (route, id) => {
        if (window.confirm("আপনি কি নিশ্চিতভাবে এটি মুছে ফেলতে চান?")) {
            try {
                await axios.delete(`${API_BASE}/${route}/${id}`);
                fetchData();
            } catch (err) {
                alert("মুছে ফেলা সম্ভব হয়নি।");
            }
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border-t-8 border-blue-600">
                    <h2 className="text-3xl font-black text-center mb-6 text-slate-800 uppercase tracking-tight">Admin Login</h2>
                    <div className="space-y-4">
                        <input type="email" placeholder="ইমেইল" className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="পাসওয়ার্ড" className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg">লগইন করুন</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-72 bg-slate-900 text-white fixed h-full hidden lg:block shadow-2xl">
                <div className="p-8 border-b border-slate-800">
                    <h2 className="text-2xl font-black text-blue-400 tracking-tighter italic">ADMIN PANEL</h2>
                </div>
                <nav className="p-4 space-y-2 mt-4">
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800'}`}><LayoutDashboard size={20}/> ড্যাশবোর্ড</button>
                    <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800'}`}><ImageIcon size={20}/> হিরো ও কন্টেন্ট</button>
                    <button onClick={() => setActiveTab('navbar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'navbar' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800'}`}><Menu size={20}/> নেভবার সেটিংস</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-72 p-6 md:p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-slate-800">ম্যানেজমেন্ট এরিয়া</h1>
                    <button onClick={() => window.location.reload()} className="bg-slate-200 p-2 rounded-full hover:bg-slate-300 transition-colors"><Loader2 className={loading ? 'animate-spin' : ''}/></button>
                </header>

                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-3xl border shadow-sm border-b-4 border-b-blue-600">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">মোট কন্টেন্ট</p>
                            <h3 className="text-4xl font-black mt-2">{contents.length}</h3>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border shadow-sm border-b-4 border-b-green-600">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">নেভবার আইটেম</p>
                            <h3 className="text-4xl font-black mt-2">{navItems.length}</h3>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border shadow-sm border-b-4 border-b-purple-600">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">নতুন মেসেজ</p>
                            <h3 className="text-4xl font-black mt-2">{complaints.length}</h3>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <form onSubmit={handleContentSubmit} className="bg-white p-8 rounded-[2rem] border shadow-xl space-y-4 h-fit sticky top-10">
                            <h2 className="font-black text-xl mb-4 flex items-center gap-2"><PlusCircle className="text-blue-600"/> নতুন আপলোড</h2>
                            <input type="text" placeholder="টাইটেল (যেমন: এমপি নাসের রহমান)" className="w-full p-4 border rounded-2xl bg-gray-50 focus:bg-white transition-all outline-none" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                            <input type="text" placeholder="ছবির ডাইরেক্ট লিঙ্ক (ImgBB)" className="w-full p-4 border rounded-2xl bg-gray-50 focus:bg-white transition-all outline-none" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                            <select className="w-full p-4 border rounded-2xl font-bold bg-gray-50" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                <option value="hero">হিরো ব্যানার (মেইন ছবি)</option>
                                <option value="project">প্রজেক্ট</option>
                                <option value="blog">ব্লগ</option>
                            </select>
                            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all">SAVE CONTENT</button>
                        </form>
                        
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="font-bold text-gray-500 mb-2 uppercase tracking-widest text-sm">আপলোড করা কন্টেন্ট সমূহ</h2>
                            {contents.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center justify-between hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-gray-100" alt="" />
                                        <div>
                                            <p className="font-bold text-slate-800">{item.title}</p>
                                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${item.category === 'hero' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>{item.category}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteItem('content', item._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={20}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'navbar' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <form onSubmit={handleNavSubmit} className="bg-white p-8 rounded-[2rem] border shadow-xl space-y-4 h-fit">
                            <h2 className="font-black text-xl mb-4">মেনু সেটিংস</h2>
                            <input type="text" placeholder="নাম (যেমন: হোম)" className="w-full p-4 border rounded-2xl" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                            <input type="text" placeholder="পাথ (যেমন: /)" className="w-full p-4 border rounded-2xl" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                            <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black">ADD TO NAVBAR</button>
                        </form>
                        <div className="lg:col-span-2 space-y-4">
                            {navItems.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center justify-between">
                                    <div><p className="font-bold text-slate-800">{item.name}</p><p className="text-xs text-gray-400">{item.link}</p></div>
                                    <button onClick={() => deleteItem('nav', item._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={20}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
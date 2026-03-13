import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, PlusCircle, LayoutDashboard, Menu, Image as ImageIcon, Settings, Save, Loader2, Globe } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    
    // এডিট মুডের জন্য স্টেট
    const [editingId, setEditingId] = useState(null);
    const [contentForm, setContentForm] = useState({ title: '', image: '', category: 'hero', lang: 'bn' });
    const [navForm, setNavForm] = useState({ name: '', link: '', lang: 'bn' });

    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    useEffect(() => { 
        if (isLoggedIn) fetchData(); 
    }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const contRes = await axios.get(`${API_BASE}/content`).catch(() => ({ data: [] }));
            const navRes = await axios.get(`${API_BASE}/nav`).catch(() => ({ data: [] }));
            setContents(contRes.data); 
            setNavItems(navRes.data);
        } catch (err) { console.error("Fetch Error:", err); }
        finally { setLoading(false); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    };

    // কন্টেন্ট এডিট শুরু করা
    const startEditContent = (item) => {
        setEditingId(item._id);
        setContentForm({ title: item.title, image: item.image, category: item.category, lang: item.lang || 'bn' });
        setActiveTab('content'); // ফর্মের কাছে নিয়ে যাওয়া
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                // এডিট বা আপডেট রিকোয়েস্ট
                await axios.put(`${API_BASE}/content/${editingId}`, contentForm);
                alert("আপডেট সফল হয়েছে! ✅");
            } else {
                // নতুন তৈরি রিকোয়েস্ট
                await axios.post(`${API_BASE}/content`, contentForm);
                alert("কন্টেন্ট সেভ হয়েছে! ✅");
            }
            setEditingId(null);
            setContentForm({ title: '', image: '', category: 'hero', lang: 'bn' });
            fetchData();
        } catch (err) { alert("অপারেশন ফেইল হয়েছে!"); }
        finally { setLoading(false); }
    };

    const handleNavSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/nav`, navForm);
            setNavForm({ name: '', link: '', lang: 'bn' });
            fetchData();
            alert("নেভবার মেনু সেভ হয়েছে! ✅");
        } catch (err) { alert("নেভবার সেভ করা যায়নি।"); }
    };

    const deleteItem = async (route, id) => {
        if (window.confirm("আপনি কি নিশ্চিতভাবে এটি মুছে ফেলতে চান?")) {
            try {
                await axios.delete(`${API_BASE}/${route}/${id}`);
                fetchData();
            } catch (err) { alert("মুছে ফেলা সম্ভব হয়নি।"); }
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
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg">লগইন করুন</button>
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
                    <h2 className="text-2xl font-black text-blue-400 tracking-tighter italic uppercase">Admin</h2>
                </div>
                <nav className="p-4 space-y-2 mt-4">
                    <button onClick={() => {setActiveTab('dashboard'); setEditingId(null);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800'}`}><LayoutDashboard size={20}/> ড্যাশবোর্ড</button>
                    <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800'}`}><ImageIcon size={20}/> হিরো ও কন্টেন্ট</button>
                    <button onClick={() => setActiveTab('navbar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'navbar' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800'}`}><Menu size={20}/> নেভবার সেটিংস</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-72 p-6 md:p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-slate-800 uppercase">Management</h1>
                    <button onClick={() => fetchData()} className="bg-slate-200 p-2 rounded-full hover:bg-slate-300"><Loader2 className={loading ? 'animate-spin' : ''}/></button>
                </header>

                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-3xl border shadow-sm border-b-4 border-b-blue-600">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">মোট কন্টেন্ট</p>
                            <h3 className="text-4xl font-black mt-2 text-slate-800">{contents.length}</h3>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border shadow-sm border-b-4 border-b-green-600">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">নেভবার আইটেম</p>
                            <h3 className="text-4xl font-black mt-2 text-slate-800">{navItems.length}</h3>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* কন্টেন্ট ফর্ম */}
                        <form onSubmit={handleContentSubmit} className="bg-white p-8 rounded-[2rem] border shadow-xl space-y-4 h-fit sticky top-10">
                            <h2 className="font-black text-xl mb-4 flex items-center gap-2 text-slate-800">
                                {editingId ? <Edit3 className="text-amber-500"/> : <PlusCircle className="text-blue-600"/>} 
                                {editingId ? "আপডেট করুন" : "নতুন আপলোড"}
                            </h2>
                            
                            {/* ল্যাঙ্গুয়েজ সুইচ বাটন */}
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button type="button" onClick={() => setContentForm({...contentForm, lang: 'bn'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${contentForm.lang === 'bn' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>বাংলা</button>
                                <button type="button" onClick={() => setContentForm({...contentForm, lang: 'en'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${contentForm.lang === 'en' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>English</button>
                            </div>

                            <input type="text" placeholder="টাইটেল" className="w-full p-4 border rounded-2xl bg-gray-50 focus:bg-white outline-none" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                            <input type="text" placeholder="ছবির ইউআরএল" className="w-full p-4 border rounded-2xl bg-gray-50 focus:bg-white outline-none" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                            
                            <select className="w-full p-4 border rounded-2xl font-bold bg-gray-50 text-slate-700" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                <option value="hero">হিরো ব্যানার (হোম)</option>
                                <option value="project">প্রজেক্ট</option>
                                <option value="blog">ব্লগ</option>
                                <option value="logo">লোগো (Logo)</option>
                            </select>

                            <div className="flex gap-2">
                                <button type="submit" className={`flex-1 text-white py-4 rounded-2xl font-black shadow-lg transition-all ${editingId ? 'bg-amber-500' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                    {editingId ? "UPDATE" : "SAVE CONTENT"}
                                </button>
                                {editingId && <button type="button" onClick={() => {setEditingId(null); setContentForm({title:'', image:'', category:'hero', lang:'bn'});}} className="bg-gray-200 px-6 rounded-2xl font-bold text-gray-600">X</button>}
                            </div>
                        </form>
                        
                        {/* কন্টেন্ট লিস্ট */}
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="font-bold text-gray-400 mb-2 uppercase tracking-widest text-xs">আপলোড করা কন্টেন্ট সমূহ</h2>
                            {contents.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center justify-between hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-gray-100 shadow-inner" alt="" />
                                        <div>
                                            <p className="font-bold text-slate-800">{item.title}</p>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-600">{item.category}</span>
                                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">{item.lang}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEditContent(item)} className="p-3 text-amber-500 hover:bg-amber-50 rounded-full transition-colors"><Edit3 size={18}/></button>
                                        <button onClick={() => deleteItem('content', item._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={18}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'navbar' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <form onSubmit={handleNavSubmit} className="bg-white p-8 rounded-[2rem] border shadow-xl space-y-4 h-fit">
                            <h2 className="font-black text-xl mb-4 text-slate-800 flex items-center gap-2"><Globe size={20} className="text-green-600"/> নেভবার মেনু</h2>
                            
                            <div className="flex bg-gray-100 p-1 rounded-xl mb-2">
                                <button type="button" onClick={() => setNavForm({...navForm, lang: 'bn'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${navForm.lang === 'bn' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>বাংলা</button>
                                <button type="button" onClick={() => setNavForm({...navForm, lang: 'en'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${navForm.lang === 'en' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>English</button>
                            </div>

                            <input type="text" placeholder="মেনুর নাম (উদা: হোম)" className="w-full p-4 border rounded-2xl outline-none bg-gray-50 focus:bg-white" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                            <input type="text" placeholder="লিঙ্ক (উদা: /)" className="w-full p-4 border rounded-2xl outline-none bg-gray-50 focus:bg-white" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                            <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black shadow-lg shadow-slate-800/20">ADD MENU</button>
                        </form>
                        
                        <div className="lg:col-span-2 space-y-4">
                            {navItems.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500">{item.lang}</div>
                                        <div><p className="font-bold text-slate-800">{item.name}</p><p className="text-xs text-gray-400">{item.link}</p></div>
                                    </div>
                                    <button onClick={() => deleteItem('nav', item._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={18}/></button>
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
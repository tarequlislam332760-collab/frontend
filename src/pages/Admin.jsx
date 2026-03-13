import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, LogOut, PlusCircle, Layout, Globe, Image as ImageIcon, X, Save } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [loading, setLoading] = useState(false);
    
    // --- States for Edit/Add ---
    const [editingId, setEditingId] = useState(null);
    const [contentForm, setContentForm] = useState({ title: '', image: '', category: 'project' });
    const [navForm, setNavForm] = useState({ name: '', link: '' });

    const API_BASE = "https://mybackendv1.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    useEffect(() => { 
        if (isLoggedIn) fetchData(); 
    }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [comp, cont, nav] = await Promise.all([
                axios.get(`${API_BASE}/complaints`),
                axios.get(`${API_BASE}/content`),
                axios.get(`${API_BASE}/nav`)
            ]);
            setComplaints(Array.isArray(comp.data) ? comp.data : []);
            setContents(Array.isArray(cont.data) ? cont.data : []);
            setNavItems(Array.isArray(nav.data) ? nav.data : []);
        } catch (err) { console.error("Fetch error:", err); }
        finally { setLoading(false); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("ভুল পাসওয়ার্ড!");
    };

    // --- Actions (Delete) ---
    const deleteItem = async (route, id) => {
        if (window.confirm("আপনি কি এটি মুছে ফেলতে চান?")) {
            try {
                await axios.delete(`${API_BASE}/${route}/${id}`);
                fetchData();
            } catch (err) { alert("Delete failed!"); }
        }
    };

    // --- Content (Hero/Project/Blog) Submit ---
    const handleContentSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await axios.put(`${API_BASE}/content/${editingId}`, contentForm);
            else await axios.post(`${API_BASE}/content`, contentForm);
            
            setEditingId(null);
            setContentForm({ title: '', image: '', category: 'project' });
            fetchData();
            alert("সফলভাবে সেভ হয়েছে!");
        } catch (err) { alert("ব্যর্থ হয়েছে!"); }
    };

    // --- Navbar Submit ---
    const handleNavSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await axios.put(`${API_BASE}/nav/${editingId}`, navForm);
            else await axios.post(`${API_BASE}/nav`, navForm);
            
            setEditingId(null);
            setNavForm({ name: '', link: '' });
            fetchData();
            alert("Navbar আপডেট হয়েছে!");
        } catch (err) { alert("ব্যর্থ হয়েছে!"); }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-black text-center mb-8 text-slate-800 tracking-tighter">ADMIN LOGIN</h2>
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">LOGIN</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-xl font-black text-blue-600">DASHBOARD</h1>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Control Center</p>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="text-red-500 font-bold flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition"><LogOut size={18}/> Logout</button>
                </div>

                {/* Main Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {[
                        { id: 'complaints', label: `Complaints (${complaints.length})` },
                        { id: 'navbar', label: 'Navbar Settings' },
                        { id: 'content', label: 'Hero & Projects' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => {setActiveTab(tab.id); setEditingId(null);}} 
                            className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border text-gray-500 hover:border-blue-300'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {loading ? <div className="text-center py-20 font-black text-gray-200 text-4xl animate-pulse">LOADING...</div> : (
                    <>
                    {/* 1. Complaints List */}
                    {activeTab === 'complaints' && (
                        <div className="grid gap-4">
                            {complaints.length === 0 ? <p className="text-center py-20 bg-white rounded-3xl border-2 border-dashed text-gray-400 font-bold">No complaints received yet.</p> : 
                            complaints.map(c => (
                                <div key={c._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start hover:border-blue-200 transition">
                                    <div className="space-y-1">
                                        <p className="font-black text-slate-800 text-lg">{c.name}</p>
                                        <p className="text-blue-600 font-bold text-sm">{c.phone} • <span className="text-gray-400">{c.area || 'No Area'}</span></p>
                                        <div className="mt-4 bg-slate-50 p-4 rounded-xl text-slate-600 italic border border-slate-100 italic">
                                            "{c.message}"
                                        </div>
                                    </div>
                                    <button onClick={() => deleteItem('complaints', c._id)} className="text-red-300 hover:text-red-500 p-2 transition"><Trash2/></button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 2. Navbar Settings */}
                    {activeTab === 'navbar' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <form onSubmit={handleNavSubmit} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 h-fit sticky top-28">
                                <h2 className="font-black text-slate-800 flex items-center gap-2 underline decoration-blue-500 underline-offset-4">
                                    {editingId ? "EDIT MENU" : "ADD NEW MENU"}
                                </h2>
                                <input type="text" placeholder="Menu Name (Home, Projects...)" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                                <input type="text" placeholder="Link (#home, /about...)" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-black hover:bg-blue-600 transition flex items-center justify-center gap-2">
                                    <Save size={18}/> {editingId ? "Update" : "Save Menu"}
                                </button>
                                {editingId && <button onClick={() => {setEditingId(null); setNavForm({name:'', link:''})}} className="w-full text-gray-400 font-bold text-sm">Cancel Edit</button>}
                            </form>
                            <div className="lg:col-span-2 space-y-3">
                                {navItems.map(n => (
                                    <div key={n._id} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition">
                                        <div>
                                            <p className="font-black text-slate-800">{n.name}</p>
                                            <p className="text-xs text-blue-500 font-bold uppercase">{n.link}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => {setEditingId(n._id); setNavForm({name: n.name, link: n.link})}} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit3 size={20}/></button>
                                            <button onClick={() => deleteItem('nav', n._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 3. Content Settings (Hero, Projects, Blogs) */}
                    {activeTab === 'content' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <form onSubmit={handleContentSubmit} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 h-fit sticky top-28">
                                <h2 className="font-black text-slate-800 flex items-center gap-2 underline decoration-blue-500 underline-offset-4">
                                    UPLOAD SECTION
                                </h2>
                                <input type="text" placeholder="Title / Headline" className="w-full p-3 bg-gray-50 border-none rounded-xl" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                                <input type="text" placeholder="Image URL" className="w-full p-3 bg-gray-50 border-none rounded-xl" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                                <select className="w-full p-3 bg-gray-50 border-none rounded-xl font-bold" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                    <option value="project">Project Item</option>
                                    <option value="blog">Blog Post</option>
                                    <option value="hero">Hero Section (Banner)</option>
                                </select>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-black hover:bg-blue-700 shadow-lg shadow-blue-100">
                                    {editingId ? "Update Content" : "Upload Now"}
                                </button>
                            </form>
                            <div className="lg:col-span-2 grid gap-4">
                                {contents.map(item => (
                                    <div key={item._id} className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-4 hover:shadow-lg transition group">
                                        <img src={item.image} className="w-20 h-20 rounded-2xl object-cover bg-gray-100 group-hover:scale-105 transition" alt="" />
                                        <div className="flex-1">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${item.category === 'hero' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {item.category}
                                            </span>
                                            <p className="font-black text-slate-800 leading-tight mt-1">{item.title}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <button onClick={() => {setEditingId(item._id); setContentForm({title: item.title, image: item.image, category: item.category});}} className="p-2 text-blue-500"><Edit3 size={18}/></button>
                                            <button onClick={() => deleteItem('content', item._id)} className="p-2 text-red-400"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Admin;
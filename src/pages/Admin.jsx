import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, PlusCircle, LayoutDashboard, Menu, Image as ImageIcon, Settings, Save } from 'lucide-react';

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

    const API_BASE = "https://mybackendv1.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    useEffect(() => { if (isLoggedIn) fetchData(); }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [comp, cont, nav] = await Promise.all([
                axios.get(`${API_BASE}/complaints`),
                axios.get(`${API_BASE}/content`),
                axios.get(`${API_BASE}/nav`)
            ]);
            setComplaints(comp.data); 
            setContents(cont.data); 
            setNavItems(nav.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("Wrong Credentials!");
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        if (editingId) await axios.put(`${API_BASE}/content/${editingId}`, contentForm);
        else await axios.post(`${API_BASE}/content`, contentForm);
        setEditingId(null); setContentForm({ title: '', image: '', category: 'project', lang: 'bn' });
        fetchData();
        alert("কন্টেন্ট সেভ হয়েছে! ✅");
    };

    const handleNavSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${API_BASE}/nav`, navForm);
        setNavForm({ name: '', link: '', lang: 'bn' });
        fetchData();
        alert("নেভবার মেনু যোগ হয়েছে! ✅");
    };

    const deleteItem = async (route, id) => {
        if (window.confirm("মুছে ফেলতে চান?")) {
            await axios.delete(`${API_BASE}/${route}/${id}`);
            fetchData();
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md">
                    <h2 className="text-3xl font-black text-center mb-6 text-slate-800">ADMIN LOGIN</h2>
                    <input type="email" placeholder="ইমেইল" className="w-full p-4 border rounded-2xl mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="পাসওয়ার্ড" className="w-full p-4 border rounded-2xl mb-6" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">LOGIN</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-72 bg-slate-900 text-white fixed h-full hidden md:block">
                <div className="p-8 border-b border-slate-800"><h2 className="text-2xl font-black text-blue-400">ADMIN PANEL</h2></div>
                <nav className="p-4 space-y-2 mt-4">
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'dashboard' ? 'bg-blue-600' : ''}`}><LayoutDashboard size={20}/> ড্যাশবোর্ড</button>
                    <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'content' ? 'bg-blue-600' : ''}`}><ImageIcon size={20}/> হিরো ও কন্টেন্ট</button>
                    <button onClick={() => setActiveTab('navbar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'navbar' ? 'bg-blue-600' : ''}`}><Menu size={20}/> নেভবার সেটিংস</button>
                    <button onClick={() => setActiveTab('complaints')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'complaints' ? 'bg-blue-600' : ''}`}><Settings size={20}/> ইউজার মেসেজ</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-72 p-10">
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-3xl border shadow-sm">
                            <p className="text-gray-500 font-bold">মেসেজ: {complaints.length}</p>
                            <p className="text-gray-500 font-bold">কন্টেন্ট: {contents.length}</p>
                            <p className="text-gray-500 font-bold">নেভবার: {navItems.length}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <form onSubmit={handleContentSubmit} className="bg-white p-8 rounded-3xl border shadow-xl space-y-4">
                            <h2 className="font-black text-xl mb-4">নতুন আপলোড</h2>
                            <input type="text" placeholder="টাইটেল" className="w-full p-4 border rounded-2xl" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                            <input type="text" placeholder="ছবির ইউআরএল" className="w-full p-4 border rounded-2xl" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                            <select className="w-full p-4 border rounded-2xl font-bold" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                <option value="project">প্রজেক্ট</option>
                                <option value="hero">হিরো ব্যানার (হোম পেজ)</option>
                                <option value="blog">ব্লগ</option>
                            </select>
                            <select className="w-full p-4 border rounded-2xl font-bold" value={contentForm.lang} onChange={(e)=>setContentForm({...contentForm, lang: e.target.value})}>
                                <option value="bn">বাংলা</option>
                                <option value="en">English</option>
                            </select>
                            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">SAVE</button>
                        </form>
                        <div className="lg:col-span-2 space-y-4">
                            {contents.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                                        <div>
                                            <p className="font-bold">{item.title}</p>
                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{item.category}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteItem('content', item._id)} className="text-red-500"><Trash2/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'navbar' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <form onSubmit={handleNavSubmit} className="bg-white p-8 rounded-3xl border shadow-xl space-y-4">
                            <h2 className="font-black text-xl mb-4 text-slate-800">মেনু যোগ করুন</h2>
                            <input type="text" placeholder="মেনুর নাম (যেমন: হোম)" className="w-full p-4 border rounded-2xl" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                            <input type="text" placeholder="লিংক (যেমন: /about)" className="w-full p-4 border rounded-2xl" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                            <select className="w-full p-4 border rounded-2xl font-bold" value={navForm.lang} onChange={(e)=>setNavForm({...navForm, lang: e.target.value})}>
                                <option value="bn">বাংলা</option>
                                <option value="en">English</option>
                            </select>
                            <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-black">ADD MENU</button>
                        </form>
                        <div className="lg:col-span-2 space-y-4">
                            {navItems.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center justify-between">
                                    <div><p className="font-bold">{item.name}</p><p className="text-sm text-gray-500">{item.link}</p></div>
                                    <button onClick={() => deleteItem('nav', item._id)} className="text-red-500"><Trash2/></button>
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
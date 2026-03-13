import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, LogOut, PlusCircle, LayoutDashboard, Menu, Image as ImageIcon, Settings, X, Save } from 'lucide-react';

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
    const [siteSettings, setSiteSettings] = useState({ logo: '', heroImage: '' });

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
            
            // হিরো এবং লোগো ডাটা আলাদা করার জন্য
            const hero = cont.data.find(c => c.category === 'hero');
            if(hero) setSiteSettings({ logo: '', heroImage: hero.image });
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("Wrong Credentials!");
    };

    const deleteItem = async (route, id) => {
        if (window.confirm("এটি মুছে ফেলতে চান?")) {
            await axios.delete(`${API_BASE}/${route}/${id}`);
            fetchData();
        }
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        if (editingId) await axios.put(`${API_BASE}/content/${editingId}`, contentForm);
        else await axios.post(`${API_BASE}/content`, contentForm);
        setEditingId(null); setContentForm({ title: '', image: '', category: 'project', lang: 'bn' });
        fetchData();
        alert("সফলভাবে সেভ হয়েছে! ✅");
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
                <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md">
                    <div className="bg-blue-600 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Settings size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-center mb-2 text-slate-800 tracking-tight">ADMIN PANEL</h2>
                    <p className="text-slate-400 text-center mb-8">সবকিছু ম্যানেজ করতে লগইন করুন</p>
                    <input type="email" placeholder="ইমেইল" className="w-full p-4 border-2 border-slate-100 rounded-2xl mb-4 focus:border-blue-500 outline-none transition" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="পাসওয়ার্ড" className="w-full p-4 border-2 border-slate-100 rounded-2xl mb-6 focus:border-blue-500 outline-none transition" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg transition hover:bg-blue-700 shadow-xl shadow-blue-100 uppercase tracking-widest">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <div className="w-72 bg-slate-900 text-white fixed h-full hidden md:block z-50">
                <div className="p-8 border-b border-slate-800">
                    <h2 className="text-2xl font-black text-blue-400">ADMIN <span className="text-white">PRO</span></h2>
                </div>
                <nav className="p-4 space-y-2 mt-4">
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'dashboard' ? 'bg-blue-600 shadow-lg shadow-blue-900' : 'hover:bg-slate-800 text-slate-400'}`}>
                        <LayoutDashboard size={20}/> ড্যাশবোর্ড
                    </button>
                    <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'content' ? 'bg-blue-600 shadow-lg shadow-blue-900' : 'hover:bg-slate-800 text-slate-400'}`}>
                        <ImageIcon size={20}/> হিরো ও কন্টেন্ট
                    </button>
                    <button onClick={() => setActiveTab('navbar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'navbar' ? 'bg-blue-600 shadow-lg shadow-blue-900' : 'hover:bg-slate-800 text-slate-400'}`}>
                        <Menu size={20}/> নেভবার সেটিংস
                    </button>
                    <button onClick={() => setActiveTab('complaints')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'complaints' ? 'bg-blue-600 shadow-lg shadow-blue-900' : 'hover:bg-slate-800 text-slate-400'}`}>
                        <Settings size={20}/> ইউজার মেসেজ
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-72 p-6 md:p-10 pt-24">
                <div className="max-w-6xl mx-auto">
                    {loading ? <p className="text-center font-bold animate-pulse text-blue-600">Loading Dashboard...</p> : (
                        <>
                        {activeTab === 'dashboard' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-8 rounded-3xl border shadow-sm">
                                    <p className="text-slate-500 font-bold mb-1">মোট মেসেজ</p>
                                    <h3 className="text-4xl font-black text-blue-600">{complaints.length}</h3>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border shadow-sm">
                                    <p className="text-slate-500 font-bold mb-1">আপলোড কন্টেন্ট</p>
                                    <h3 className="text-4xl font-black text-green-600">{contents.length}</h3>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border shadow-sm">
                                    <p className="text-slate-500 font-bold mb-1">নেভবার লিংক</p>
                                    <h3 className="text-4xl font-black text-orange-600">{navItems.length}</h3>
                                </div>
                            </div>
                        )}

                        {activeTab === 'content' && (
                            <div className="grid lg:grid-cols-3 gap-10">
                                <form onSubmit={handleContentSubmit} className="bg-white p-8 rounded-3xl border shadow-xl space-y-4 h-fit sticky top-28">
                                    <h2 className="font-black text-xl mb-4 text-slate-800 flex items-center gap-2"> <PlusCircle className="text-blue-600"/> নতুন আপলোড</h2>
                                    <input type="text" placeholder="টাইটেল" className="w-full p-4 bg-gray-50 border rounded-2xl" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                                    <input type="text" placeholder="ছবির লিংক (URL)" className="w-full p-4 bg-gray-50 border rounded-2xl" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                                    <select className="w-full p-4 bg-gray-50 border rounded-2xl font-bold" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                        <option value="project">প্রজেক্ট</option>
                                        <option value="hero">হিরো ব্যানার (হোম পেজ)</option>
                                        <option value="logo">ওয়েবসাইট লোগো</option>
                                        <option value="blog">ব্লগ</option>
                                    </select>
                                    <select className="w-full p-4 bg-gray-50 border rounded-2xl font-bold" value={contentForm.lang} onChange={(e)=>setContentForm({...contentForm, lang: e.target.value})}>
                                        <option value="bn">বাংলা</option>
                                        <option value="en">English</option>
                                    </select>
                                    <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition">SAVE</button>
                                </form>
                                <div className="lg:col-span-2 grid gap-4">
                                    {contents.map(item => (
                                        <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center gap-4 hover:shadow-md transition">
                                            <img src={item.image} className="w-20 h-20 rounded-2xl object-cover border" alt='' />
                                            <div className="flex-1">
                                                <p className="font-black text-slate-800 text-lg leading-tight mb-1">{item.title}</p>
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase font-black">{item.category}</span>
                                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase font-black">{item.lang}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => {setEditingId(item._id); setContentForm({title: item.title, image: item.image, category: item.category, lang: item.lang})}} className="text-blue-400 p-2 hover:bg-blue-50 rounded-full transition"><Edit3 size={20}/></button>
                                            <button onClick={() => deleteItem('content', item._id)} className="text-red-400 p-2 hover:bg-red-50 rounded-full transition"><Trash2 size={20}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'complaints' && (
                             <div className="grid gap-6">
                                {complaints.map(c => (
                                    <div key={c._id} className="bg-white p-6 rounded-3xl border shadow-sm flex justify-between items-start hover:border-blue-200 transition">
                                        <div>
                                            <p className="font-black text-xl text-blue-600">{c.name}</p>
                                            <p className="text-slate-400 font-bold mb-4">{c.phone}</p>
                                            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600 italic text-slate-700">"{c.message}"</div>
                                        </div>
                                        <button onClick={() => deleteItem('complaints', c._id)} className="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition"><Trash2/></button>
                                    </div>
                                ))}
                             </div>
                        )}
                        
                        {/* Navbar Settings Tab similarly structured... */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
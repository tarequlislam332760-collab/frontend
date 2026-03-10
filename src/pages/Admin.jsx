import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, MessageSquare, LogOut, Settings, PlusCircle, RefreshCcw } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [lang, setLang] = useState('bn');

    // Content Form State
    const [formData, setFormData] = useState({ title: '', image: '', category: 'project' });
    
    // Page Content State (Home/About)
    const [pageData, setPageData] = useState({ homeTitle: '', homeSubtitle: '', aboutBio: '' });

    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin"; 

    const translations = {
        bn: {
            dash: "ড্যাশবোর্ড", comp: "অভিযোগ", upload: "কন্টেন্ট আপলোড", editPage: "পেজ এডিট",
            title: "টাইটেল", imgUrl: "ছবির লিঙ্ক", save: "সেভ করুন", logout: "লগ আউট",
            project: "প্রজেক্ট", blog: "ব্লগ", update: "আপডেট করুন"
        },
        en: {
            dash: "Dashboard", comp: "Complaints", upload: "Add Content", editPage: "Edit Pages",
            title: "Title", imgUrl: "Image URL", save: "Save", logout: "Log Out",
            project: "Project", blog: "Blog", update: "Update"
        }
    };

    const t = translations[lang];

    useEffect(() => {
        if (isLoggedIn) fetchData();
    }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            const [compRes, contentRes] = await Promise.all([
                axios.get(`${API_BASE}/complaints`),
                axios.get(`${API_BASE}/content`)
            ]);
            setComplaints(compRes.data);
            setContents(contentRes.data);
        } catch (err) { console.error("Error:", err); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("Wrong Credentials!");
    };

    // ✅ কন্টেন্ট আপলোড (Project/Blog)
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/content`, formData);
            alert("সফলভাবে আপলোড হয়েছে!");
            setFormData({ title: '', image: '', category: 'project' });
            fetchData();
        } catch (err) { alert("ব্যর্থ হয়েছে!"); }
    };

    // ✅ কন্টেন্ট ডিলিট (Delete Project/Blog)
    const handleDelete = async (id) => {
        if (window.confirm("আপনি কি এটি ডিলিট করতে চান?")) {
            try {
                await axios.delete(`${API_BASE}/content/${id}`);
                fetchData();
            } catch (err) { alert("ডিলিট করা যায়নি!"); }
        }
    };

    // ✅ হোম/এবাউট কন্টেন্ট আপডেট (Page Content)
    const handlePageUpdate = async (type) => {
        try {
            // আপনার ব্যাকএন্ডে যদি '/page-content' রাউট থাকে তবে এটি কাজ করবে
            await axios.post(`${API_BASE}/page-content`, { type, data: pageData });
            alert(`${type} আপডেট হয়েছে!`);
        } catch (err) { alert("আপডেট ব্যর্থ হয়েছে!"); }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-black text-center mb-8 italic text-slate-800">ADMIN LOGIN</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-20">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-black text-slate-800">{t.dash}</h1>
                        <button onClick={fetchData} className="p-2 bg-gray-100 rounded-full hover:rotate-180 transition-all duration-500"><RefreshCcw size={16}/></button>
                    </div>
                    <div className="flex items-center gap-4">
                        <select onChange={(e) => setLang(e.target.value)} className="p-1 border rounded font-bold text-xs uppercase">
                            <option value="bn">BN</option>
                            <option value="en">EN</option>
                        </select>
                        <button onClick={() => setIsLoggedIn(false)} className="text-red-600 font-bold flex items-center gap-2"><LogOut size={18}/> {t.logout}</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {['complaints', 'upload', 'editPages'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-gray-600'}`}>
                            {t[tab === 'editPages' ? 'editPage' : tab === 'complaints' ? 'comp' : 'upload']}
                        </button>
                    ))}
                </div>

                {/* 1. Complaints List */}
                {activeTab === 'complaints' && (
                    <div className="bg-white rounded-3xl border p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><MessageSquare className="text-blue-500"/> {t.comp} ({complaints.length})</h2>
                        <div className="grid gap-4">
                            {complaints.map((c) => (
                                <div key={c._id} className="p-4 rounded-2xl bg-slate-50 border">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold text-blue-700">{c.name} <span className="text-slate-400">|</span> {c.phone}</p>
                                    </div>
                                    <p className="bg-white p-3 rounded-xl border italic text-slate-600">"{c.message}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. Upload & Manage (Projects/Blogs) */}
                {activeTab === 'upload' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <form onSubmit={handleUpload} className="bg-white p-6 rounded-3xl border h-fit space-y-4 shadow-sm">
                            <h2 className="text-lg font-bold flex items-center gap-2"><PlusCircle className="text-green-500"/> New Item</h2>
                            <input type="text" placeholder={t.title} className="w-full p-3 border rounded-xl" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="text" placeholder={t.imgUrl} className="w-full p-3 border rounded-xl" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            <select className="w-full p-3 border rounded-xl font-bold bg-gray-50" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option value="project">{t.project}</option>
                                <option value="blog">{t.blog}</option>
                            </select>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-all">{t.save}</button>
                        </form>

                        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border shadow-sm">
                            <h2 className="text-lg font-bold mb-4">Manage Content</h2>
                            <div className="grid sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                                {contents.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border group">
                                        <img src={item.image} className="w-14 h-14 rounded-lg object-cover border" alt="" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm truncate">{item.title}</p>
                                            <span className="text-[10px] uppercase text-blue-500 font-bold">{item.category}</span>
                                        </div>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18}/></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Page Content Edit (Home/About) */}
                {activeTab === 'editPages' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-3xl border space-y-4 shadow-sm">
                            <h2 className="font-bold text-slate-800 border-b pb-2 flex items-center gap-2"><Settings size={18}/> Home Section</h2>
                            <input type="text" placeholder="Hero Title" className="w-full p-3 border rounded-xl" onChange={(e) => setPageData({...pageData, homeTitle: e.target.value})} />
                            <textarea placeholder="Hero Subtitle" className="w-full p-3 border rounded-xl h-24" onChange={(e) => setPageData({...pageData, homeSubtitle: e.target.value})}></textarea>
                            <button onClick={() => handlePageUpdate('home')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">{t.update} Home</button>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border space-y-4 shadow-sm">
                            <h2 className="font-bold text-slate-800 border-b pb-2 flex items-center gap-2"><Settings size={18}/> About Section</h2>
                            <textarea placeholder="About Biography" className="w-full p-3 border rounded-xl h-44" onChange={(e) => setPageData({...pageData, aboutBio: e.target.value})}></textarea>
                            <button onClick={() => handlePageUpdate('about')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">{t.update} About</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Admin;
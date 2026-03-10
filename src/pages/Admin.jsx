import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, PlusCircle, MessageSquare, Lock, Mail, LogOut, Globe } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [lang, setLang] = useState('bn'); // ডিফল্ট ভাষা বাংলা
    const [formData, setFormData] = useState({
        title: '', description: '', image: '', category: 'project', status: 'সম্পন্ন'
    });

    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    // অনুবাদ ডাটা (Translations)
    const t = {
        bn: {
            dash: "ড্যাশবোর্ড",
            comp: "অভিযোগসমূহ",
            upload: "নতুন কন্টেন্ট",
            title: "টাইটেল",
            imgUrl: "ছবির লিঙ্ক",
            cat: "ক্যাটাগরি",
            save: "সেভ করুন",
            logout: "লগ আউট",
            noData: "কোনো তথ্য পাওয়া যায়নি",
            project: "প্রজেক্ট",
            blog: "খবর/ব্লগ"
        },
        en: {
            dash: "Dashboard",
            comp: "Complaints",
            upload: "New Content",
            title: "Title",
            imgUrl: "Image URL",
            cat: "Category",
            save: "Save Data",
            logout: "Log Out",
            noData: "No data found",
            project: "Project",
            blog: "Blog/News"
        }
    }[lang];

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            const compRes = await axios.get(`${API_BASE}/complaints`);
            setComplaints(compRes.data);
            const contentRes = await axios.get(`${API_BASE}/content`);
            setContents(contentRes.data);
        } catch (err) { console.error("Error fetching data:", err); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
        } else {
            alert("Wrong Credentials!");
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/content`, formData);
            alert(lang === 'bn' ? "সফলভাবে আপলোড হয়েছে!" : "Uploaded Successfully!");
            setFormData({ title: '', description: '', image: '', category: 'project', status: 'সম্পন্ন' });
            fetchData();
        } catch (err) { alert("Upload Failed!"); }
    };

    const deleteContent = async (id) => {
        if(window.confirm("Are you sure?")) {
            await axios.delete(`${API_BASE}/content/${id}`);
            fetchData();
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border">
                    <h2 className="text-2xl font-black text-center text-slate-800 mb-8 tracking-tighter italic">ADMIN LOGIN</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-28"> 
            <div className="max-w-7xl mx-auto">
                
                {/* Header with Language Switch */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{t.dash}</h1>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button onClick={() => setLang('bn')} className={`px-3 py-1 rounded-md text-xs font-bold ${lang === 'bn' ? 'bg-white shadow-sm' : 'text-gray-400'}`}>BN</button>
                            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-md text-xs font-bold ${lang === 'en' ? 'bg-white shadow-sm' : 'text-gray-400'}`}>EN</button>
                        </div>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-100">
                        <LogOut size={18} /> {t.logout}
                    </button>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button onClick={() => setActiveTab('complaints')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'complaints' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border'}`}>
                        {t.comp} ({complaints.length})
                    </button>
                    <button onClick={() => setActiveTab('upload')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border'}`}>
                        {t.upload}
                    </button>
                </div>

                {activeTab === 'complaints' ? (
                    <div className="bg-white rounded-3xl shadow-sm border p-6">
                        <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2"><MessageSquare className="text-blue-500" /> {t.comp}</h2>
                        <div className="grid gap-4">
                            {complaints.length > 0 ? complaints.map((c) => (
                                <div key={c._id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-black text-blue-600">{c.name} <span className="text-gray-400 font-normal">| {c.phone}</span></p>
                                        <span className="text-[10px] bg-white border px-3 py-1 rounded-full">{new Date(c.date).toLocaleDateString('bn-BD')}</span>
                                    </div>
                                    <p className="text-gray-700 bg-white p-4 rounded-xl border italic mt-2">"{c.message}"</p>
                                </div>
                            )) : <p className="text-center py-10 text-gray-400">{t.noData}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <form onSubmit={handleUpload} className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border space-y-4 h-fit">
                            <h2 className="text-xl font-bold text-slate-800 mb-2">{t.upload}</h2>
                            <input type="text" placeholder={t.title} className="w-full p-3 bg-gray-50 border rounded-xl" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="text" placeholder={t.imgUrl} className="w-full p-3 bg-gray-50 border rounded-xl" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            <select className="w-full p-3 bg-gray-50 border rounded-xl font-bold" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option value="project">{t.project}</option>
                                <option value="blog">{t.blog}</option>
                            </select>
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-900 transition-all">{t.save}</button>
                        </form>

                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border overflow-y-auto max-h-[600px]">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">{t.upload} ({contents.length})</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {contents.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border group relative">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-white shadow-sm" alt="" />
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-bold text-slate-800 truncate text-sm">{item.title}</p>
                                            <span className="text-[10px] uppercase font-bold text-blue-500">{item.category}</span>
                                        </div>
                                        <button onClick={() => deleteContent(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                            <Trash2 size={18}/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
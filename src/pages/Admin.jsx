import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, MessageSquare, LogOut, Settings, Layout, PlusCircle } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [lang, setLang] = useState('bn');

    const [formData, setFormData] = useState({ title: '', image: '', category: 'project' });
    const [pageData, setPageData] = useState({ homeTitle: '', homeSubtitle: '', aboutBio: '' });

    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin"; // পাসওয়ার্ড এখানে দিয়ে দিলাম

    const translations = {
        bn: {
            dash: "ড্যাশবোর্ড",
            comp: "অভিযোগসমূহ",
            upload: "নতুন কন্টেন্ট",
            editPage: "পেজ এডিট (Home/About)",
            title: "টাইটেল",
            imgUrl: "ছবির লিঙ্ক",
            save: "সেভ করুন",
            logout: "লগ আউট",
            noData: "কোনো তথ্য পাওয়া যায়নি",
            project: "প্রজেক্ট",
            blog: "খবর/ব্লগ"
        },
        en: {
            dash: "Dashboard",
            comp: "Complaints",
            upload: "Add Content",
            editPage: "Edit Pages",
            title: "Title",
            imgUrl: "Image URL",
            save: "Save Data",
            logout: "Log Out",
            noData: "No data found",
            project: "Project",
            blog: "Blog/News"
        }
    };

    // ✅ সমাধান: t কে সরাসরি রেন্ডারের আগে ডিফাইন করা হয়েছে
    const t = translations[lang] || translations.bn;

    useEffect(() => {
        if (isLoggedIn) fetchData();
    }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            const compRes = await axios.get(`${API_BASE}/complaints`);
            setComplaints(compRes.data);
            const contentRes = await axios.get(`${API_BASE}/content`);
            setContents(contentRes.data);
        } catch (err) { console.error("Error:", err); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("Wrong Credentials!");
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/content`, formData);
            alert(lang === 'bn' ? "সফলভাবে আপলোড হয়েছে!" : "Uploaded!");
            setFormData({ title: '', image: '', category: 'project' });
            fetchData();
        } catch (err) { alert("Failed!"); }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-black text-center mb-8 italic">ADMIN ACCESS</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 mt-24">
            <div className="max-w-7xl mx-auto">
                
                {/* Header with Language Switch Fix */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-black text-slate-800 uppercase">{t.dash}</h1>
                        <div className="flex bg-gray-200 p-1 rounded-lg border">
                            <button 
                                type="button"
                                onClick={() => setLang('bn')} 
                                className={`px-4 py-1 rounded-md font-bold text-xs transition-all ${lang === 'bn' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                            >
                                BN
                            </button>
                            <button 
                                type="button"
                                onClick={() => setLang('en')} 
                                className={`px-4 py-1 rounded-md font-bold text-xs transition-all ${lang === 'en' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                            >
                                EN
                            </button>
                        </div>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                        <LogOut size={16} /> {t.logout}
                    </button>
                </div>
                
                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button type="button" onClick={() => setActiveTab('complaints')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'complaints' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-gray-600'}`}>
                        {t.comp} ({complaints.length})
                    </button>
                    <button type="button" onClick={() => setActiveTab('upload')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-gray-600'}`}>
                        {t.upload}
                    </button>
                    <button type="button" onClick={() => setActiveTab('editPages')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'editPages' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border text-gray-600'}`}>
                        {t.editPage}
                    </button>
                </div>

                {/* Complaints Section */}
                {activeTab === 'complaints' && (
                    <div className="bg-white rounded-3xl shadow-sm border p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><MessageSquare className="text-blue-500" /> {t.comp}</h2>
                        <div className="grid gap-4">
                            {complaints.length > 0 ? complaints.map((c) => (
                                <div key={c._id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <p className="font-bold text-blue-600">{c.name} <span className="text-gray-400 font-normal ml-2">| {c.phone}</span></p>
                                    <p className="text-gray-600 mt-2 italic bg-white p-3 rounded-lg border leading-relaxed">"{c.message}"</p>
                                </div>
                            )) : <p className="text-center py-10 text-gray-400 font-medium">{t.noData}</p>}
                        </div>
                    </div>
                )}

                {/* Edit Page Content Section */}
                {activeTab === 'editPages' && (
                    <div className="bg-white rounded-3xl shadow-sm border p-8 animate-in fade-in duration-500">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600"><Settings /> {t.editPage}</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border">
                                <h3 className="font-bold border-b pb-2 text-slate-700">Home Page Content</h3>
                                <input type="text" placeholder="Hero Title (e.g. Welcome to MP Site)" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
                                <textarea placeholder="Hero Subtitle" className="w-full p-3 border rounded-xl h-24 outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                                <button type="button" className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold w-full hover:bg-emerald-700 transition-colors">Update Home</button>
                            </div>
                            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border">
                                <h3 className="font-bold border-b pb-2 text-slate-700">About Section</h3>
                                <textarea placeholder="Biography details..." className="w-full p-3 border rounded-xl h-44 outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                                <button type="button" className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold w-full hover:bg-emerald-700 transition-colors">Update About</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Section */}
                {activeTab === 'upload' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <form onSubmit={handleUpload} className="bg-white p-8 rounded-3xl shadow-sm border space-y-4 h-fit">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><PlusCircle className="text-blue-500" /> {t.upload}</h2>
                            <input type="text" placeholder={t.title} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="text" placeholder={t.imgUrl} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            <select className="w-full p-3 border rounded-xl font-bold outline-none bg-gray-50" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option value="project">{t.project}</option>
                                <option value="blog">{t.blog}</option>
                            </select>
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-900 transition-all uppercase tracking-wider">{t.save}</button>
                        </form>

                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border overflow-y-auto max-h-[600px]">
                            <h2 className="text-xl font-bold mb-6 text-slate-800">{t.upload} ({contents.length})</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {contents.length > 0 ? contents.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border hover:bg-white transition-all group">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-white shadow-sm border" alt="" />
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-bold text-slate-800 truncate text-sm">{item.title}</p>
                                            <span className="text-[10px] uppercase font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md">{item.category}</span>
                                        </div>
                                    </div>
                                )) : <p className="text-center col-span-2 py-10 text-gray-400">{t.noData}</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
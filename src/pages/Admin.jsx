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
    const [lang, setLang] = useState('bn'); // Language State

    // Form Data for Projects/Blogs
    const [formData, setFormData] = useState({ title: '', image: '', category: 'project' });
    
    // Form Data for Home/About (Dynamic Content)
    const [pageData, setPageData] = useState({ homeTitle: '', homeSubtitle: '', aboutBio: '' });

    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    // ✅ Translation Data (Language Fix)
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
            noData: "কোনো তথ্য পাওয়া যায়নি",
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

    const t = translations[lang]; // Current Translation

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
            alert(lang === 'bn' ? "সফলভাবে আপলোড হয়েছে!" : "Uploaded!");
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
                
                {/* Header with Language Fix */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-black text-slate-800 uppercase">{t.dash}</h1>
                        <div className="flex bg-gray-200 p-1 rounded-lg">
                            <button onClick={() => setLang('bn')} className={`px-4 py-1 rounded-md font-bold text-xs ${lang === 'bn' ? 'bg-white shadow' : 'text-gray-500'}`}>BN</button>
                            <button onClick={() => setLang('en')} className={`px-4 py-1 rounded-md font-bold text-xs ${lang === 'en' ? 'bg-white shadow' : 'text-gray-500'}`}>EN</button>
                        </div>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                        <LogOut size={16} /> {t.logout}
                    </button>
                </div>
                
                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button onClick={() => setActiveTab('complaints')} className={`px-6 py-3 rounded-xl font-bold ${activeTab === 'complaints' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{t.comp} ({complaints.length})</button>
                    <button onClick={() => setActiveTab('upload')} className={`px-6 py-3 rounded-xl font-bold ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{t.upload}</button>
                    <button onClick={() => setActiveTab('editPages')} className={`px-6 py-3 rounded-xl font-bold ${activeTab === 'editPages' ? 'bg-emerald-600 text-white' : 'bg-white border'}`}>{t.editPage}</button>
                </div>

                {activeTab === 'complaints' && (
                    <div className="bg-white rounded-3xl shadow-sm border p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><MessageSquare /> {t.comp}</h2>
                        <div className="grid gap-4">
                            {complaints.map((c) => (
                                <div key={c._id} className="p-4 rounded-xl bg-gray-50 border">
                                    <p className="font-bold text-blue-600">{c.name} | {c.phone}</p>
                                    <p className="text-gray-600 mt-2 italic bg-white p-3 rounded-lg border">"{c.message}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'editPages' && (
                    <div className="bg-white rounded-3xl shadow-sm border p-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600"><Settings /> {t.editPage}</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border">
                                <h3 className="font-bold border-b pb-2">Home Page Content</h3>
                                <input type="text" placeholder="Hero Title" className="w-full p-3 border rounded-xl" />
                                <textarea placeholder="Hero Subtitle" className="w-full p-3 border rounded-xl h-24"></textarea>
                                <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold w-full">Update Home</button>
                            </div>
                            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border">
                                <h3 className="font-bold border-b pb-2">About Section</h3>
                                <textarea placeholder="Full Biography (Life of MP)" className="w-full p-3 border rounded-xl h-44"></textarea>
                                <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold w-full">Update About</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'upload' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <form onSubmit={handleUpload} className="bg-white p-8 rounded-3xl shadow-sm border space-y-4">
                            <h2 className="text-xl font-bold mb-4">{t.upload}</h2>
                            <input type="text" placeholder={t.title} className="w-full p-3 border rounded-xl" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="text" placeholder={t.imgUrl} className="w-full p-3 border rounded-xl" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            <select className="w-full p-3 border rounded-xl font-bold" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option value="project">{t.project}</option>
                                <option value="blog">{t.blog}</option>
                            </select>
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-900 transition-all">{t.save}</button>
                        </form>

                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border overflow-y-auto max-h-[500px]">
                            <h2 className="text-xl font-bold mb-6">{t.upload} ({contents.length})</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {contents.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-white shadow-sm" alt="" />
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-bold text-slate-800 truncate text-sm">{item.title}</p>
                                            <span className="text-[10px] uppercase font-bold text-blue-500">{item.category}</span>
                                        </div>
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
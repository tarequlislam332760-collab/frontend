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

    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin"; // এখানে পাসওয়ার্ড দিয়ে দিলাম

    const [formData, setFormData] = useState({ title: '', image: '', category: 'project' });

    const translations = {
        bn: {
            dash: "ড্যাশবোর্ড",
            comp: "অভিযোগসমূহ",
            upload: "নতুন কন্টেন্ট",
            editPage: "পেজ এডিট",
            title: "টাইটেল",
            imgUrl: "ছবির লিঙ্ক",
            save: "সেভ করুন",
            logout: "লগ আউট",
            noData: "কোনো অভিযোগ পাওয়া যায়নি",
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
            noData: "No complaints found",
            project: "Project",
            blog: "Blog/News"
        }
    };

    // ল্যাঙ্গুয়েজ ফিক্স: t কে সরাসরি রেন্ডার ব্লকের আগে রাখা হয়েছে
    const t = translations[lang] || translations.bn;

    useEffect(() => {
        if (isLoggedIn) fetchData();
    }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            // অভিযোগগুলো লোড করা
            const compRes = await axios.get(`${API_BASE}/complaints`);
            setComplaints(compRes.data);
            
            // কন্টেন্টগুলো লোড করা
            const contentRes = await axios.get(`${API_BASE}/content`);
            setContents(contentRes.data);
        } catch (err) { 
            console.error("Fetch Error:", err); 
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/content`, formData);
            alert(lang === 'bn' ? "সফলভাবে আপলোড হয়েছে!" : "Uploaded Successfully!");
            setFormData({ title: '', image: '', category: 'project' });
            fetchData();
        } catch (err) { alert("Upload Failed!"); }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-black text-center mb-8 italic">ADMIN ACCESS</h2>
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
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 mt-24">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-black text-slate-800 uppercase">{t.dash}</h1>
                        <div className="flex bg-gray-200 p-1 rounded-lg">
                            <button onClick={() => setLang('bn')} className={`px-4 py-1 rounded-md font-bold text-xs transition-all ${lang === 'bn' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>BN</button>
                            <button onClick={() => setLang('en')} className={`px-4 py-1 rounded-md font-bold text-xs transition-all ${lang === 'en' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>EN</button>
                        </div>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-red-100 transition-all">
                        <LogOut size={16} /> {t.logout}
                    </button>
                </div>
                
                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button onClick={() => setActiveTab('complaints')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'complaints' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border'}`}>{t.comp} ({complaints.length})</button>
                    <button onClick={() => setActiveTab('upload')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border'}`}>{t.upload}</button>
                    <button onClick={() => setActiveTab('editPages')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'editPages' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border'}`}>{t.editPage}</button>
                </div>

                {/* Complaints View */}
                {activeTab === 'complaints' && (
                    <div className="bg-white rounded-3xl shadow-sm border p-6 animate-in fade-in duration-500">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><MessageSquare className="text-blue-500" /> {t.comp}</h2>
                        <div className="grid gap-4">
                            {complaints.length > 0 ? complaints.map((c) => (
                                <div key={c._id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-bold text-slate-800">{c.name} <span className="text-blue-500 ml-2">📞 {c.phone}</span></p>
                                        <span className="text-[10px] bg-white px-2 py-1 rounded border text-gray-400">New</span>
                                    </div>
                                    <p className="text-gray-600 italic bg-white p-4 rounded-xl border mt-2 leading-relaxed">"{c.message}"</p>
                                </div>
                            )) : (
                                <div className="text-center py-20 text-gray-400">
                                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>{t.noData}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Upload Form */}
                {activeTab === 'upload' && (
                    <div className="grid lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
                        <form onSubmit={handleUpload} className="bg-white p-8 rounded-3xl shadow-sm border space-y-4 h-fit">
                            <h2 className="text-xl font-bold mb-4">{t.upload}</h2>
                            <input type="text" placeholder={t.title} className="w-full p-3 border rounded-xl" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="text" placeholder={t.imgUrl} className="w-full p-3 border rounded-xl" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            <select className="w-full p-3 border rounded-xl font-bold bg-gray-50" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option value="project">{t.project}</option>
                                <option value="blog">{t.blog}</option>
                            </select>
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition-all uppercase">{t.save}</button>
                        </form>

                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border overflow-y-auto max-h-[600px]">
                            <h2 className="text-xl font-bold mb-6">{t.upload} ({contents.length})</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {contents.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border hover:bg-white transition-all">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover border" alt="" />
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
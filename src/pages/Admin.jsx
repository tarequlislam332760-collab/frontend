import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, PlusCircle, MessageSquare, Lock, Mail, LogOut } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [formData, setFormData] = useState({
        title: '', description: '', image: '', category: 'project', status: 'সম্পন্ন'
    });

    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";

    // আপনার পছন্দের ইমেইল ও পাসওয়ার্ড এখানে সেট করুন
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

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
        } catch (err) { console.error("ডাটা লোড করতে সমস্যা:", err); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
        } else {
            alert("ইমেইল বা পাসওয়ার্ড ভুল!");
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/content`, formData);
            alert("সফলভাবে আপলোড হয়েছে!");
            setFormData({ title: '', description: '', image: '', category: 'project', status: 'সম্পন্ন' });
            fetchData();
        } catch (err) { alert("আপলোড ব্যর্থ হয়েছে!"); }
    };

    const deleteContent = async (id) => {
        if(window.confirm("আপনি কি এটি ডিলিট করতে চান?")) {
            await axios.delete(`${API_BASE}/content/${id}`);
            fetchData();
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
                    <div className="flex justify-center mb-4 text-emerald-600">
                        <div className="p-4 bg-emerald-50 rounded-full">
                            <Lock size={40} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-center text-slate-800 mb-8">অ্যাডমিন এক্সেস</h2>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input 
                                type="email" 
                                placeholder="ইমেইল এড্রেস" 
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input 
                                type="password" 
                                placeholder="পাসওয়ার্ড" 
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg">
                            লগইন করুন
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* হেডার */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">ড্যাশবোর্ড</h1>
                        <p className="text-sm text-gray-500">স্বাগতম, আপনি এখন সিস্টেম পরিচালনা করছেন।</p>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-100 transition-all">
                        <LogOut size={18} /> লগ আউট
                    </button>
                </div>
                
                {/* নেভিগেশন ট্যাব */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <button onClick={() => setActiveTab('complaints')} className={`whitespace-nowrap px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${activeTab === 'complaints' ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg' : 'bg-white text-gray-600 border'}`}>
                        <MessageSquare size={20}/> অভিযোগ ও মতামত ({complaints.length})
                    </button>
                    <button onClick={() => setActiveTab('upload')} className={`whitespace-nowrap px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${activeTab === 'upload' ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg' : 'bg-white text-gray-600 border'}`}>
                        <PlusCircle size={20}/> নতুন কন্টেন্ট যোগ করুন
                    </button>
                </div>

                {activeTab === 'complaints' ? (
                    <div className="bg-white rounded-3xl shadow-sm border p-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                            <MessageSquare className="text-emerald-500" /> সাম্প্রতিক মেসেজসমূহ
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {complaints.length > 0 ? complaints.map((c) => (
                                <div key={c._id} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-black text-slate-800 text-lg">{c.name}</p>
                                            <p className="text-sm text-emerald-600 font-medium">{c.phone}</p>
                                        </div>
                                        <span className="text-[10px] bg-white border px-3 py-1 rounded-full text-gray-400">{new Date(c.date).toLocaleDateString('bn-BD')}</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 italic text-gray-600">
                                        "{c.message}"
                                    </div>
                                </div>
                            )) : <p className="text-gray-400 text-center col-span-2 py-10">কোনো অভিযোগ পাওয়া যায়নি।</p>}
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* আপলোড ফর্ম */}
                        <form onSubmit={handleUpload} className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border space-y-5 h-fit">
                            <h2 className="text-xl font-bold text-slate-800 mb-2">নতুন তথ্য আপলোড</h2>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">টাইটেল</label>
                                <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl mt-1 outline-none focus:ring-2 focus:ring-emerald-500" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">ছবির লিঙ্ক (URL)</label>
                                <input type="text" className="w-full p-3 bg-gray-50 border rounded-xl mt-1 outline-none focus:ring-2 focus:ring-emerald-500" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">বিভাগ বা ক্যাটাগরি</label>
                                <select className="w-full p-3 bg-gray-50 border rounded-xl mt-1 outline-none focus:ring-2 focus:ring-emerald-500 font-bold" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                    <option value="project">উন্নয়ন প্রজেক্ট</option>
                                    <option value="blog">সর্বশেষ খবর</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                                ডাটাবেসে সেভ করুন
                            </button>
                        </form>

                        {/* লিস্ট */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border overflow-y-auto max-h-[700px]">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex justify-between items-center">
                                আপলোড করা কন্টেন্ট 
                                <span className="bg-emerald-100 text-emerald-600 text-xs px-3 py-1 rounded-full">{contents.length}টি</span>
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {contents.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                                        <img src={item.image} className="w-20 h-20 rounded-xl object-cover bg-white shadow-sm" alt="" />
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-bold text-slate-800 truncate text-sm">{item.title}</p>
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${item.category === 'project' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                                {item.category === 'project' ? 'Project' : 'News'}
                                            </span>
                                        </div>
                                        <button onClick={() => deleteContent(item._id)} className="p-2 bg-white text-red-500 rounded-lg shadow-sm border opacity-0 group-hover:opacity-100 transition-all">
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
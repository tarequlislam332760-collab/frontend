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

    // আপনার ব্যাকএন্ড লিঙ্কটি এখানে ঠিক করে নিন
    const API_BASE = "https://backend-phi-eight-82.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
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
            console.error("ডাটা লোড করতে সমস্যা:", err); 
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
        } else {
            alert("ভুল ইমেইল বা পাসওয়ার্ড!");
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
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-black text-center text-slate-800 mb-8">অ্যাডমিন এক্সেস</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" placeholder="ইমেইল" className="w-full p-3 border rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="পাসওয়ার্ড" className="w-full p-3 border rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">লগইন</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        // এখানে mt-24 দেওয়া হয়েছে যাতে নববারের নিচে লেখা ঢাকা না পড়ে
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-20 md:mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800">ড্যাশবোর্ড</h1>
                        <p className="text-sm text-gray-500 italic">নাসের রহমান এমপি - অ্যাডমিন প্যানেল</p>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-2 rounded-full font-bold">
                        <LogOut size={18} /> লগ আউট
                    </button>
                </div>
                
                {/* ট্যাব বাটন */}
                <div className="flex gap-4 mb-8">
                    <button onClick={() => setActiveTab('complaints')} className={`px-6 py-3 rounded-xl font-bold ${activeTab === 'complaints' ? 'bg-emerald-600 text-white' : 'bg-white border'}`}>
                        অভিযোগসমূহ ({complaints.length})
                    </button>
                    <button onClick={() => setActiveTab('upload')} className={`px-6 py-3 rounded-xl font-bold ${activeTab === 'upload' ? 'bg-emerald-600 text-white' : 'bg-white border'}`}>
                        নতুন কন্টেন্ট যোগ করুন
                    </button>
                </div>

                {activeTab === 'complaints' ? (
                    <div className="bg-white rounded-3xl shadow-sm border p-6">
                        <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-2">সাম্প্রতিক অভিযোগসমূহ</h2>
                        <div className="grid gap-4">
                            {complaints.length > 0 ? complaints.map((c) => (
                                <div key={c._id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-black text-blue-600">{c.name} ({c.phone})</p>
                                        <span className="text-xs text-gray-400">{new Date(c.date).toLocaleDateString('bn-BD')}</span>
                                    </div>
                                    <p className="text-gray-700 font-medium">বিষয়: {c.subject}</p>
                                    <p className="text-gray-600 mt-2 bg-white p-3 rounded-lg border italic">"{c.message}"</p>
                                </div>
                            )) : <p className="text-center py-10 text-gray-400">কোনো অভিযোগ এখনো জমা পড়েনি।</p>}
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* আপলোড ফর্ম */}
                        <form onSubmit={handleUpload} className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border space-y-5">
                            <h2 className="text-xl font-bold mb-2">নতুন তথ্য আপলোড</h2>
                            <input type="text" placeholder="টাইটেল" className="w-full p-3 border rounded-xl" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="text" placeholder="ছবির লিঙ্ক (URL)" className="w-full p-3 border rounded-xl" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            <select className="w-full p-3 border rounded-xl" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option value="project">উন্নয়ন প্রজেক্ট</option>
                                <option value="blog">সর্বশেষ খবর</option>
                            </select>
                            <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg">সেভ করুন</button>
                        </form>

                        {/* লিস্ট */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border">
                            <h2 className="text-xl font-bold mb-6">আপলোড করা কন্টেন্ট ({contents.length})</h2>
                            <div className="space-y-4">
                                {contents.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                                            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{item.category}</span>
                                        </div>
                                        <button onClick={() => deleteContent(item._id)} className="p-2 text-red-500 bg-white rounded-lg border">
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, MessageSquare, LogOut, PlusCircle, Link2, Globe } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [lang, setLang] = useState('bn'); // ডিফল্ট ভাষা বাংলা
    
    const [formData, setFormData] = useState({ title: '', image: '', category: 'project' });
    const [navForm, setNavForm] = useState({ name: '', link: '' });

    const API_BASE = "https://mybackendv1.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    const t = {
        en: {
            title: "Admin Dashboard",
            logout: "Logout",
            tabs: { comp: "Complaints", upload: "Upload Content", nav: "Navbar Setup" },
            forms: { addLink: "Add Page Link", liveMenu: "Live Menu Items", newContent: "New Content", save: "Save" }
        },
        bn: {
            title: "অ্যাডমিন ড্যাশবোর্ড",
            logout: "লগআউট",
            tabs: { comp: "অভিযোগসমূহ", upload: "কন্টেন্ট আপলোড", nav: "নেভিবার সেটআপ" },
            forms: { addLink: "পেজ লিঙ্ক যুক্ত করুন", liveMenu: "লাইভ মেনু আইটেম", newContent: "নতুন কন্টেন্ট", save: "সেভ করুন" }
        }
    };

    useEffect(() => { if (isLoggedIn) fetchData(); }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            const [comp, cont, nav] = await Promise.all([
                axios.get(`${API_BASE}/complaints`),
                axios.get(`${API_BASE}/content`),
                axios.get(`${API_BASE}/nav`)
            ]);
            setComplaints(comp.data);
            setContents(cont.data);
            setNavItems(nav.data);
        } catch (err) { 
            console.error("Error:", err);
            alert(lang === 'bn' ? "নেটওয়ার্ক এরর!" : "Network Error!");
        }
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
            alert(lang === 'bn' ? "সফলভাবে আপলোড হয়েছে!" : "Upload Successful!");
            setFormData({ title: '', image: '', category: 'project' });
            fetchData();
        } catch (err) { alert("Failed!"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm(lang === 'bn' ? "ডিলিট করতে চান?" : "Want to delete?")) {
            await axios.delete(`${API_BASE}/content/${id}`);
            fetchData();
        }
    };

    const addNavItem = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/nav`, navForm);
            alert("Success!");
            setNavForm({ name: '', link: '' });
            fetchData();
        } catch (err) { alert("Failed!"); }
    };

    const deleteNav = async (id) => {
        if(window.confirm("Delete?")) {
            await axios.delete(`${API_BASE}/nav/${id}`);
            fetchData();
        }
    };

    // --- লগইন পেজ ---
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

    // --- ড্যাশবোর্ড পেজ (যেখানে pt-28 যোগ করা হয়েছে) ---
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-28"> 
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex flex-wrap justify-between items-center gap-4">
                    <h1 className="text-xl font-bold">{t[lang].title}</h1>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200"
                        >
                            <Globe size={16} /> {lang === 'bn' ? 'English' : 'বাংলা'}
                        </button>
                        
                        <button onClick={() => setIsLoggedIn(false)} className="text-red-600 font-bold flex items-center gap-2">
                            <LogOut size={18}/> {t[lang].logout}
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button onClick={() => setActiveTab('complaints')} className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'complaints' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-gray-600'}`}>{t[lang].tabs.comp}</button>
                    <button onClick={() => setActiveTab('upload')} className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'upload' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-gray-600'}`}>{t[lang].tabs.upload}</button>
                    <button onClick={() => setActiveTab('manageNav')} className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'manageNav' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-gray-600'}`}>{t[lang].tabs.nav}</button>
                </div>

                {/* Complaints Tab */}
                {activeTab === 'complaints' && (
                    <div className="bg-white rounded-3xl border p-6 shadow-sm space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2"><MessageSquare className="text-blue-500"/> {t[lang].tabs.comp} ({complaints.length})</h2>
                        {complaints.length === 0 && <p className="text-gray-400 italic">No data found.</p>}
                        {complaints.map(c => (
                            <div key={c._id} className="p-4 rounded-2xl bg-slate-50 border">
                                <p className="font-bold text-blue-700">{c.name} | {c.phone}</p>
                                <p className="bg-white p-3 rounded-xl border italic text-slate-600">"{c.message}"</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Navbar Setup Tab */}
                {activeTab === 'manageNav' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <form onSubmit={addNavItem} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 h-fit">
                            <h2 className="font-bold flex items-center gap-2 text-blue-600"><PlusCircle size={20}/> {t[lang].forms.addLink}</h2>
                            <input type="text" placeholder="Page Name" className="w-full p-3 border rounded-xl" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                            <input type="text" placeholder="URL (e.g. /services)" className="w-full p-3 border rounded-xl" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">{t[lang].forms.save}</button>
                        </form>
                        <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-3">
                            <h2 className="font-bold flex items-center gap-2 text-slate-700"><Link2 size={20}/> {t[lang].forms.liveMenu}</h2>
                            {navItems.map(item => (
                                <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border">
                                    <span className="font-medium">{item.name} ({item.link})</span>
                                    <button onClick={() => deleteNav(item._id)} className="text-red-500"><Trash2 size={16}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload Content Tab */}
                {activeTab === 'upload' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <form onSubmit={handleUpload} className="bg-white p-6 rounded-3xl border h-fit space-y-4 shadow-sm">
                            <h2 className="text-lg font-bold flex items-center gap-2 text-blue-600"><PlusCircle size={20}/> {t[lang].forms.newContent}</h2>
                            <input type="text" placeholder="Title" className="w-full p-3 border rounded-xl" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="text" placeholder="Image URL" className="w-full p-3 border rounded-xl" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            <select className="w-full p-3 border rounded-xl font-bold" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option value="project">Project</option>
                                <option value="blog">Blog</option>
                            </select>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">{t[lang].forms.save}</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
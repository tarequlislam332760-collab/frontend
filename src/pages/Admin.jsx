import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, MessageSquare, LogOut, PlusCircle, Link2, Globe, Edit3, X, Layout } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [lang, setLang] = useState('bn');
    
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', image: '', category: 'project' });
    const [navForm, setNavForm] = useState({ name: '', link: '' });
    const [heroForm, setHeroForm] = useState({ heroTitle: '', heroSubtitle: '', heroImage: '' });

    const API_BASE = "https://mybackendv1.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    const t = {
        en: { 
            title: "Admin Dashboard", 
            logout: "Logout", 
            tabs: { comp: "Complaints", upload: "Upload Content", nav: "Navbar Setup", hero: "Hero Section" }, 
            forms: { addLink: "Add Page Link", liveMenu: "Live Menu Items", newContent: editingId ? "Edit Content" : "New Content", save: editingId ? "Update" : "Save", cancel: "Cancel", updateHero: "Update Hero Section" } 
        },
        bn: { 
            title: "অ্যাডমিন ড্যাশবোর্ড", 
            logout: "লগআউট", 
            tabs: { comp: "অভিযোগসমূহ", upload: "কন্টেন্ট আপলোড", nav: "নেভিবার সেটআপ", hero: "হিরো সেকশন" }, 
            forms: { addLink: "পেজ লিঙ্ক যুক্ত করুন", liveMenu: "লাইভ মেনু আইটেম", newContent: editingId ? "কন্টেন্ট এডিট করুন" : "নতুন কন্টেন্ট", save: editingId ? "আপডেট করুন" : "সেভ করুন", cancel: "বাতিল", updateHero: "হিরো সেকশন আপডেট করুন" } 
        }
    };

    useEffect(() => { if (isLoggedIn) fetchData(); }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            // ✅ complaints এর জায়গায় complaint করে দেওয়া হয়েছে
            const [comp, cont, nav, hero] = await Promise.all([
                axios.get(`${API_BASE}/complaint`), 
                axios.get(`${API_BASE}/content`),
                axios.get(`${API_BASE}/nav`),
                axios.get(`${API_BASE}/settings`)
            ]);
            setComplaints(comp.data);
            setContents(cont.data);
            setNavItems(nav.data);
            if (hero.data) {
                setHeroForm({
                    heroTitle: hero.data.heroTitle || '',
                    heroSubtitle: hero.data.heroSubtitle || '',
                    heroImage: hero.data.heroImage || ''
                });
            }
        } catch (err) { console.error("Data fetch error:", err); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("Wrong Credentials!");
    };

    const handleHeroUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE}/settings/update`, heroForm);
            alert(lang === 'bn' ? "হিরো সেকশন আপডেট হয়েছে!" : "Hero Section Updated!");
            fetchData();
        } catch (err) { alert("Failed to update hero!"); }
    };

    // অভিযোগ ডিলিট করার ফাংশন
    const deleteComplaint = async (id) => {
        if (window.confirm(lang === 'bn' ? "অভিযোগটি ডিলিট করতে চান?" : "Delete this complaint?")) {
            try {
                await axios.delete(`${API_BASE}/complaint/${id}`);
                fetchData();
            } catch (err) { alert("Delete failed!"); }
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_BASE}/content/${editingId}`, formData);
            } else {
                await axios.post(`${API_BASE}/content`, formData);
            }
            cancelEdit();
            fetchData();
            alert("Success!");
        } catch (err) { alert("Failed!"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete?")) {
            await axios.delete(`${API_BASE}/content/${id}`);
            fetchData();
        }
    };

    const startEdit = (item) => {
        setEditingId(item._id);
        setFormData({ title: item.title, image: item.image, category: item.category });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ title: '', image: '', category: 'project' });
    };

    const addNavItem = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE}/nav`, navForm);
            setNavForm({ name: '', link: '' });
            fetchData();
            alert("Success!");
        } catch (err) { alert("Failed!"); }
    };

    const deleteNav = async (id) => {
        if(window.confirm("Delete?")) {
            await axios.delete(`${API_BASE}/nav/${id}`);
            fetchData();
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-black text-center mb-8 italic text-slate-800">ADMIN LOGIN</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-28"> 
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8 flex flex-wrap justify-between items-center gap-4">
                    <h1 className="text-xl font-bold">{t[lang].title}</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full font-bold text-sm">
                            <Globe size={16} /> {lang === 'bn' ? 'English' : 'বাংলা'}
                        </button>
                        <button onClick={() => setIsLoggedIn(false)} className="text-red-600 font-bold flex items-center gap-2"><LogOut size={18}/> {t[lang].logout}</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button onClick={() => setActiveTab('complaints')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'complaints' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{t[lang].tabs.comp}</button>
                    <button onClick={() => setActiveTab('hero')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'hero' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{t[lang].tabs.hero}</button>
                    <button onClick={() => setActiveTab('upload')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{t[lang].tabs.upload}</button>
                    <button onClick={() => setActiveTab('manageNav')} className={`px-6 py-2 rounded-full font-bold ${activeTab === 'manageNav' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{t[lang].tabs.nav}</button>
                </div>

                {/* Complaints Tab */}
                {activeTab === 'complaints' && (
                    <div className="bg-white rounded-3xl border p-6 shadow-sm space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2"><MessageSquare className="text-blue-500"/> {t[lang].tabs.comp} ({complaints.length})</h2>
                        <div className="grid gap-4">
                            {complaints.length === 0 ? <p className="text-center text-gray-500 py-10">কোনো অভিযোগ পাওয়া যায়নি।</p> : 
                            complaints.map(c => (
                                <div key={c._id} className="p-4 rounded-2xl bg-slate-50 border flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-blue-700">{c.name} | {c.phone}</p>
                                        <p className="bg-white p-3 rounded-xl border mt-2 italic text-slate-600">"{c.message}"</p>
                                    </div>
                                    <button onClick={() => deleteComplaint(c._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                        <Trash2 size={20}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hero Tab */}
                {activeTab === 'hero' && (
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handleHeroUpdate} className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
                            <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2 mb-4"><Layout size={22}/> {t[lang].forms.updateHero}</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">Main Title</label>
                                <input type="text" className="w-full p-3 border rounded-xl outline-none" value={heroForm.heroTitle} onChange={(e)=>setHeroForm({...heroForm, heroTitle: e.target.value})} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">Subtitle</label>
                                <textarea className="w-full p-3 border rounded-xl outline-none" rows="3" value={heroForm.heroSubtitle} onChange={(e)=>setHeroForm({...heroForm, heroSubtitle: e.target.value})} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">Hero Image URL</label>
                                <input type="text" className="w-full p-3 border rounded-xl outline-none" value={heroForm.heroImage} onChange={(e)=>setHeroForm({...heroForm, heroImage: e.target.value})} required />
                            </div>
                            <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg">Save Changes</button>
                        </form>
                    </div>
                )}

                {/* Upload Content Tab */}
                {activeTab === 'upload' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <form onSubmit={handleUpload} className={`bg-white p-6 rounded-3xl border h-fit space-y-4 shadow-sm ${editingId ? 'ring-2 ring-blue-500' : ''}`}>
                            <div className="flex justify-between items-center text-blue-600">
                                <h2 className="text-lg font-bold flex items-center gap-2"><PlusCircle size={20}/> {t[lang].forms.newContent}</h2>
                                {editingId && <button type="button" onClick={cancelEdit} className="text-gray-400 hover:text-red-500"><X size={20}/></button>}
                            </div>
                            <input type="text" placeholder="Title" className="w-full p-3 border rounded-xl outline-none" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            <input type="text" placeholder="Image URL" className="w-full p-3 border rounded-xl outline-none" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            <select className="w-full p-3 border rounded-xl font-bold outline-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                <option value="project">Project</option>
                                <option value="blog">Blog</option>
                            </select>
                            <button type="submit" className={`w-full text-white py-3 rounded-xl font-bold ${editingId ? 'bg-green-600' : 'bg-blue-600'}`}>{t[lang].forms.save}</button>
                        </form>

                        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border shadow-sm">
                            <h2 className="font-bold text-slate-700 mb-4">সব আপলোড ({contents.length})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                                {contents.map(item => (
                                    <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl border">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                                            <div>
                                                <p className="font-bold text-sm leading-tight">{item.title}</p>
                                                <span className="text-[10px] uppercase bg-gray-200 px-2 py-0.5 rounded-full">{item.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => startEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"><Edit3 size={18}/></button>
                                            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navbar Tab */}
                {activeTab === 'manageNav' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <form onSubmit={addNavItem} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 h-fit">
                            <h2 className="font-bold flex items-center gap-2 text-blue-600"><PlusCircle size={20}/> {t[lang].forms.addLink}</h2>
                            <input type="text" placeholder="Page Name" className="w-full p-3 border rounded-xl outline-none" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                            <input type="text" placeholder="URL (e.g. /about)" className="w-full p-3 border rounded-xl outline-none" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">সেভ করুন</button>
                        </form>
                        <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-3">
                            <h2 className="font-bold flex items-center gap-2 text-slate-700"><Link2 size={20}/> {t[lang].forms.liveMenu}</h2>
                            {navItems.map(item => (
                                <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border">
                                    <span className="font-medium">{item.name}</span>
                                    <button onClick={() => deleteNav(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={16}/></button>
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
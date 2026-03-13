import React, { useState, useEffect } from 'react';
import axios from 'axios';
// ফাইল আইকন যোগ করা হয়েছে
import { Trash2, Edit3, LayoutDashboard, Menu, Image as ImageIcon, MessageSquare, Loader2, FileText } from 'lucide-react';

const Admin = () => {
    // ... আপনার আগের সব State ...
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [pages, setPages] = useState([]); // নতুন পেজের জন্য
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    
    const [editingId, setEditingId] = useState(null);
    const [contentForm, setContentForm] = useState({ title: '', image: '', category: 'hero', lang: 'bn' });
    const [navForm, setNavForm] = useState({ name: '', link: '', lang: 'bn' });
    // নতুন পেজ তৈরির ফর্ম
    const [pageForm, setPageForm] = useState({ title: '', content: '', lang: 'bn' });

    const API_BASE = "https://mybackendv1.vercel.app/api"; 
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    useEffect(() => { 
        if (isLoggedIn) fetchData(); 
    }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contRes, navRes, compRes, pageRes] = await Promise.all([
                axios.get(`${API_BASE}/content`).catch(() => ({ data: [] })),
                axios.get(`${API_BASE}/nav`).catch(() => ({ data: [] })),
                axios.get(`${API_BASE}/complaints`).catch(() => ({ data: [] })),
                axios.get(`${API_BASE}/pages`).catch(() => ({ data: [] })) // পেজ ডাটা আনা
            ]);
            setContents(contRes.data); 
            setNavItems(navRes.data);
            setComplaints(compRes.data);
            setPages(pageRes.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    // নতুন পেজ সেভ করার ফাংশন
    const handlePageSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const slug = pageForm.title.toLowerCase().replace(/ /g, '-'); // টাইটেল থেকে লিঙ্ক তৈরি
            const response = await axios.post(`${API_BASE}/pages`, { ...pageForm, slug });
            if (response.status === 200 || response.data.success) {
                alert("নতুন পেজ তৈরি হয়েছে! ✅");
                setPageForm({ title: '', content: '', lang: 'bn' });
                fetchData();
            }
        } catch (err) { alert("পেজ সেভ করা যায়নি।"); } finally { setLoading(false); }
    };

    // ... handleLogin, handleContentSubmit, handleNavSubmit, deleteItem আগের মতোই থাকবে ...
    // (আপনার আগের সব ফাংশন এখানে থাকবে)
    const handleLogin = (e) => { /* ... */ e.preventDefault(); if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true); else alert("ভুল ইমেইল বা পাসওয়ার্ড!"); };
    const handleContentSubmit = async (e) => { /* ... (আপনার আগের কোড) */ e.preventDefault(); setLoading(true); try { const url = editingId ? `${API_BASE}/content/${editingId}` : `${API_BASE}/content`; const method = editingId ? 'put' : 'post'; const response = await axios({ method: method, url: url, data: contentForm }); if (response.data.success || response.status === 200) { alert(editingId ? "আপডেট সফল! ✅" : "সেভ সফল! ✅"); setEditingId(null); setContentForm({ title: '', image: '', category: 'hero', lang: 'bn' }); fetchData(); } } catch (err) { console.error(err); } finally { setLoading(false); } };
    const handleNavSubmit = async (e) => { /* ... (আপনার আগের কোড) */ e.preventDefault(); setLoading(true); try { const response = await axios.post(`${API_BASE}/nav`, navForm); if (response.data.success || response.status === 200) { setNavForm({ name: '', link: '', lang: 'bn' }); fetchData(); alert("মেনু সেভ হয়েছে! ✅"); } } catch (err) { alert("সেভ করা যায়নি।"); } finally { setLoading(false); } };
    const deleteItem = async (route, id) => { /* ... (আপনার আগের কোড) */ if (window.confirm("আপনি কি নিশ্চিত?")) { try { const response = await axios.delete(`${API_BASE}/${route}/${id}`); if (response.data.success || response.status === 200) { fetchData(); } } catch (err) { alert("মুছে ফেলা সম্ভব হয়নি।"); } } };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border-t-8 border-blue-600">
                    <h2 className="text-3xl font-black text-center mb-6 text-slate-800 uppercase tracking-tight">Admin Login</h2>
                    <div className="space-y-4">
                        <input type="email" placeholder="ইমেইল" className="w-full p-4 border rounded-2xl outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="পাসওয়ার্ড" className="w-full p-4 border rounded-2xl outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition">লগইন করুন</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-72 bg-slate-900 text-white fixed h-full hidden lg:block">
                <div className="p-8 border-b border-slate-800 font-black text-2xl text-blue-400">ADMIN</div>
                <nav className="p-4 space-y-2 mt-4">
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><LayoutDashboard size={20}/> ড্যাশবোর্ড</button>
                    <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'content' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><ImageIcon size={20}/> হিরো ও কন্টেন্ট</button>
                    <button onClick={() => setActiveTab('pages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'pages' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><FileText size={20}/> নতুন পেজ তৈরি</button>
                    <button onClick={() => setActiveTab('navbar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'navbar' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><Menu size={20}/> নেভবার সেটিংস</button>
                    <button onClick={() => setActiveTab('complaints')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'complaints' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><MessageSquare size={20}/> অভিযোগ সমূহ</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-72 p-6 md:p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-slate-800 uppercase">{activeTab}</h1>
                    <button onClick={() => fetchData()} className="bg-slate-200 p-2 rounded-full hover:bg-slate-300">
                        <Loader2 className={loading ? 'animate-spin' : ''}/>
                    </button>
                </header>

                {/* Dashboard & Other Tabs (আপনার আগের কোড থাকবে) */}
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-8 rounded-3xl border-b-4 border-blue-600 shadow-sm text-center">
                            <p className="text-gray-400 font-bold uppercase text-xs">মোট কন্টেন্ট</p>
                            <h3 className="text-4xl font-black mt-2 text-slate-800">{contents.length}</h3>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border-b-4 border-purple-600 shadow-sm text-center">
                            <p className="text-gray-400 font-bold uppercase text-xs">তৈরি করা পেজ</p>
                            <h3 className="text-4xl font-black mt-2 text-slate-800">{pages.length}</h3>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border-b-4 border-green-600 shadow-sm text-center">
                            <p className="text-gray-400 font-bold uppercase text-xs">মেনু আইটেম</p>
                            <h3 className="text-4xl font-black mt-2 text-slate-800">{navItems.length}</h3>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border-b-4 border-red-600 shadow-sm text-center">
                            <p className="text-gray-400 font-bold uppercase text-xs">অভিযোগ</p>
                            <h3 className="text-4xl font-black mt-2 text-slate-800">{complaints.length}</h3>
                        </div>
                    </div>
                )}

                {/* Content Tab (আপনার আগের কোড) */}
                {activeTab === 'content' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <form onSubmit={handleContentSubmit} className="bg-white p-8 rounded-[2rem] border shadow-xl space-y-4 h-fit sticky top-10">
                            <h2 className="font-black text-xl mb-4 text-slate-800">{editingId ? "আপডেট করুন" : "নতুন আপলোড"}</h2>
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button type="button" onClick={() => setContentForm({...contentForm, lang: 'bn'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${contentForm.lang === 'bn' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>বাংলা</button>
                                <button type="button" onClick={() => setContentForm({...contentForm, lang: 'en'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${contentForm.lang === 'en' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>English</button>
                            </div>
                            <input type="text" placeholder="টাইটেল" className="w-full p-4 border rounded-2xl bg-gray-50 outline-none" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                            <input type="text" placeholder="ছবির ইউআরএল" className="w-full p-4 border rounded-2xl bg-gray-50 outline-none" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                            <select className="w-full p-4 border rounded-2xl font-bold bg-gray-50 text-slate-700" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                <option value="hero">হিরো ব্যানার</option>
                                <option value="project">প্রজেক্ট</option>
                                <option value="blog">ব্লগ</option>
                                <option value="logo">লোগো (Logo)</option>
                            </select>
                            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">
                                {loading ? "প্রসেসিং..." : (editingId ? "UPDATE" : "SAVE CONTENT")}
                            </button>
                            {editingId && <button type="button" onClick={() => setEditingId(null)} className="w-full text-gray-500 font-bold">বাতিল করুন</button>}
                        </form>
                        <div className="lg:col-span-2 space-y-4">
                            {contents.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                                        <div>
                                            <p className="font-bold text-slate-800">{item.title}</p>
                                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-600">{item.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setEditingId(item._id); setContentForm({title: item.title, image: item.image, category: item.category, lang: item.lang}); }} className="p-3 text-amber-500 hover:bg-amber-50 rounded-full"><Edit3 size={18}/></button>
                                        <button onClick={() => deleteItem('content', item._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- নতুন পেজ তৈরির ট্যাব --- */}
                {activeTab === 'pages' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <form onSubmit={handlePageSubmit} className="bg-white p-8 rounded-[2rem] border shadow-xl space-y-4 h-fit sticky top-10">
                            <h2 className="font-black text-xl mb-4 text-slate-800">নতুন পেজ তৈরি</h2>
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button type="button" onClick={() => setPageForm({...pageForm, lang: 'bn'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${pageForm.lang === 'bn' ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}>বাংলা</button>
                                <button type="button" onClick={() => setPageForm({...pageForm, lang: 'en'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${pageForm.lang === 'en' ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}>English</button>
                            </div>
                            <input type="text" placeholder="পেজের টাইটেল" className="w-full p-4 border rounded-2xl bg-gray-50 outline-none font-bold" value={pageForm.title} onChange={(e)=>setPageForm({...pageForm, title: e.target.value})} required />
                            <textarea rows="6" placeholder="পেজের কন্টেন্ট (HTML বা টেক্সট)" className="w-full p-4 border rounded-2xl bg-gray-50 outline-none" value={pageForm.content} onChange={(e)=>setPageForm({...pageForm, content: e.target.value})} required></textarea>
                            <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black shadow-lg">
                                {loading ? "প্রসেসিং..." : "CREATE PAGE"}
                            </button>
                        </form>

                        <div className="lg:col-span-2 space-y-4">
                            {pages.map(item => (
                                <div key={item._id} className="bg-white p-6 rounded-2xl border flex items-center justify-between shadow-sm hover:border-purple-200 transition">
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg">{item.title}</p>
                                        <p className="text-xs text-gray-400">লিঙ্ক: /page/{item.slug}</p>
                                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-600">{item.lang}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => deleteItem('pages', item._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition"><Trash2 size={18}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navbar & Complaints Tabs (আপনার আগের কোড) */}
                {activeTab === 'navbar' && (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <form onSubmit={handleNavSubmit} className="bg-white p-8 rounded-[2rem] border shadow-xl space-y-4 h-fit">
                            <h2 className="font-black text-xl mb-4 text-slate-800">নেভবার মেনু</h2>
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button type="button" onClick={() => setNavForm({...navForm, lang: 'bn'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${navForm.lang === 'bn' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>বাংলা</button>
                                <button type="button" onClick={() => setNavForm({...navForm, lang: 'en'})} className={`flex-1 py-2 rounded-lg font-bold text-sm ${navForm.lang === 'en' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>English</button>
                            </div>
                            <input type="text" placeholder="নাম" className="w-full p-4 border rounded-2xl outline-none" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                            <input type="text" placeholder="লিঙ্ক (যেমন: #about বা /page/slug)" className="w-full p-4 border rounded-2xl outline-none" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                            <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black" disabled={loading}>
                                {loading ? "লোডিং..." : "ADD MENU"}
                            </button>
                        </form>
                        <div className="lg:col-span-2 space-y-4">
                            {navItems.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border flex items-center justify-between">
                                    <p className="font-bold text-slate-800">{item.name} ({item.lang})</p>
                                    <button onClick={() => deleteItem('nav', item._id)} className="text-red-500 p-2"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'complaints' && (
                    <div className="space-y-4">
                        {complaints.length === 0 ? <p className="text-gray-500 text-center py-10">কোনো অভিযোগ নেই।</p> : 
                        complaints.map(comp => (
                            <div key={comp._id} className="bg-white p-6 rounded-3xl border shadow-sm flex justify-between items-start">
                                <div>
                                    <h4 className="font-black text-slate-800">{comp.name} <span className="text-gray-400 font-normal text-sm">({comp.email})</span></h4>
                                    <p className="text-gray-600 mt-2">{comp.message}</p>
                                    <p className="text-[10px] text-gray-400 mt-3 uppercase font-bold">{new Date(comp.createdAt).toLocaleString()}</p>
                                </div>
                                <button onClick={() => deleteItem('complaints', comp._id)} className="text-red-500 p-2 hover:bg-red-50 rounded-full"><Trash2 size={20}/></button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
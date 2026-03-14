import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, LayoutDashboard, Menu, Image as ImageIcon, MessageSquare, Loader2, FileText, X, PlusCircle } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [pages, setPages] = useState([]); 
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const [editingId, setEditingId] = useState(null);
    const [contentForm, setContentForm] = useState({ title: '', image: '', category: 'hero', lang: 'bn' });
    const [navForm, setNavForm] = useState({ name: '', link: '', lang: 'bn' });
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
                axios.get(`${API_BASE}/pages`).catch(() => ({ data: [] }))
            ]);
            setContents(contRes.data); 
            setNavItems(navRes.data);
            setComplaints(compRes.data);
            setPages(pageRes.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    };

    // --- Submit Handlers ---
    const handleContentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editingId ? `${API_BASE}/content/${editingId}` : `${API_BASE}/content`;
            const method = editingId ? 'put' : 'post';
            await axios({ method, url, data: contentForm });
            alert("সফলভাবে সেভ হয়েছে! ✅");
            setEditingId(null);
            setContentForm({ title: '', image: '', category: 'hero', lang: 'bn' });
            fetchData();
        } catch (err) { alert("সেভ করা যায়নি।"); } finally { setLoading(false); }
    };

    const handlePageSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const slug = pageForm.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
            await axios.post(`${API_BASE}/pages`, { ...pageForm, slug });
            alert("নতুন পেজ তৈরি হয়েছে! ✅");
            setPageForm({ title: '', content: '', lang: 'bn' });
            fetchData();
        } catch (err) { alert("পেজ সেভ করা যায়নি।"); } finally { setLoading(false); }
    };

    const handleNavSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_BASE}/nav`, navForm);
            setNavForm({ name: '', link: '', lang: 'bn' });
            fetchData();
            alert("মেনু সেভ হয়েছে! ✅");
        } catch (err) { alert("সেভ করা যায়নি।"); } finally { setLoading(false); }
    };

    const deleteItem = async (route, id) => {
        if (window.confirm("আপনি কি নিশ্চিত?")) {
            try {
                await axios.delete(`${API_BASE}/${route}/${id}`);
                fetchData();
            } catch (err) { alert("মুছে ফেলা সম্ভব হয়নি।"); }
        }
    };

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
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            
            {/* Mobile Header (Hamburger) */}
            <div className="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
                <span className="font-black text-xl text-blue-400 tracking-widest">ADMIN PANEL</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-800 rounded-xl">
                    {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`w-72 bg-slate-900 text-white fixed h-full z-40 transition-transform duration-300 transform 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 border-r border-slate-800`}>
                <div className="p-8 border-b border-slate-800 font-black text-2xl text-blue-400 hidden lg:block">ADMIN PANEL</div>
                <nav className="p-4 space-y-2 mt-4">
                    {[
                        { id: 'dashboard', icon: <LayoutDashboard size={20}/>, label: 'ড্যাশবোর্ড' },
                        { id: 'content', icon: <ImageIcon size={20}/>, label: 'হিরো ও কন্টেন্ট' },
                        { id: 'pages', icon: <FileText size={20}/>, label: 'নতুন পেজ তৈরি' },
                        { id: 'navbar', icon: <Menu size={20}/>, label: 'নেভবার সেটিংস' },
                        { id: 'complaints', icon: <MessageSquare size={20}/>, label: 'অভিযোগ সমূহ' }
                    ].map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} 
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${activeTab === item.id ? 'bg-blue-600 shadow-lg text-white font-bold' : 'hover:bg-slate-800 text-slate-400'}`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-72 p-4 md:p-8 lg:p-10 w-full max-w-[1600px] mx-auto overflow-x-hidden">
                <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">{activeTab}</h1>
                    <button onClick={() => fetchData()} className="bg-blue-50 text-blue-600 p-3 rounded-2xl hover:bg-blue-100 transition shadow-sm">
                        <Loader2 className={loading ? 'animate-spin' : ''}/>
                    </button>
                </header>

                {/* Dashboard Stats */}
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                        {[
                            { label: 'মোট কন্টেন্ট', val: contents.length, color: 'border-blue-600' },
                            { label: 'তৈরি করা পেজ', val: pages.length, color: 'border-purple-600' },
                            { label: 'মেনু আইটেম', val: navItems.length, color: 'border-green-600' },
                            { label: 'অভিযোগ', val: complaints.length, color: 'border-red-600' }
                        ].map((stat, i) => (
                            <div key={i} className={`bg-white p-8 rounded-[2.5rem] border-b-8 ${stat.color} shadow-sm hover:translate-y-[-5px] transition-all`}>
                                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">{stat.label}</p>
                                <h3 className="text-5xl font-black mt-2 text-slate-800 tracking-tighter">{stat.val}</h3>
                            </div>
                        ))}
                    </div>
                )}

                {/* Content Management Tab */}
                {activeTab === 'content' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <form onSubmit={handleContentSubmit} className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4 h-fit">
                            <h2 className="font-black text-xl mb-4 text-slate-800">কন্টেন্ট আপলোড</h2>
                            <input type="text" placeholder="টাইটেল" className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:border-blue-400" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                            <input type="text" placeholder="ইমেজ লিঙ্ক (URL)" className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:border-blue-400" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                            <select className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                <option value="hero">হিরো সেকশন</option>
                                <option value="project">প্রজেক্ট</option>
                                <option value="blog">ব্লগ</option>
                            </select>
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition uppercase">
                                {editingId ? "Update Content" : "Upload Content"}
                            </button>
                        </form>
                        <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                            {contents.map(item => (
                                <div key={item._id} className="bg-white p-4 rounded-3xl border flex gap-4 items-center shadow-sm">
                                    <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800 line-clamp-1">{item.title}</p>
                                        <p className="text-xs text-blue-500 font-bold uppercase">{item.category}</p>
                                    </div>
                                    <button onClick={() => deleteItem('content', item._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-full transition"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pages Tab */}
                {activeTab === 'pages' && (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <form onSubmit={handlePageSubmit} className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4 h-fit sticky top-10">
                            <h2 className="font-black text-xl mb-4 text-slate-800">নতুন পেজ তৈরি</h2>
                            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                                <button type="button" onClick={() => setPageForm({...pageForm, lang: 'bn'})} className={`flex-1 py-2 rounded-xl font-bold text-sm ${pageForm.lang === 'bn' ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}>বাংলা</button>
                                <button type="button" onClick={() => setPageForm({...pageForm, lang: 'en'})} className={`flex-1 py-2 rounded-xl font-bold text-sm ${pageForm.lang === 'en' ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}>English</button>
                            </div>
                            <input type="text" placeholder="টাইটেল" className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:border-purple-300 transition" value={pageForm.title} onChange={(e)=>setPageForm({...pageForm, title: e.target.value})} required />
                            <textarea rows="8" placeholder="কন্টেন্ট..." className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:border-purple-300 transition" value={pageForm.content} onChange={(e)=>setPageForm({...pageForm, content: e.target.value})} required></textarea>
                            <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-purple-700 transition uppercase">Create Page</button>
                        </form>
                        <div className="xl:col-span-2 space-y-4">
                            {pages.map(item => (
                                <div key={item._id} className="bg-white p-6 rounded-[2rem] border-2 border-transparent hover:border-purple-100 flex items-center justify-between shadow-sm transition-all group">
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg group-hover:text-purple-600">{item.title}</p>
                                        <p className="text-xs text-gray-400 font-mono">/page/{item.slug}</p>
                                        <span className="inline-block mt-2 text-[10px] font-black uppercase px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100">{item.lang}</span>
                                    </div>
                                    <button onClick={() => deleteItem('pages', item._id)} className="p-4 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-all"><Trash2 size={20}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navbar Settings Tab */}
                {activeTab === 'navbar' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <form onSubmit={handleNavSubmit} className="bg-white p-8 rounded-[2rem] border shadow-sm space-y-4 h-fit">
                            <h2 className="font-black text-xl mb-4 text-slate-800">মেনু যোগ করুন</h2>
                            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                                <button type="button" onClick={() => setNavForm({...navForm, lang: 'bn'})} className={`flex-1 py-2 rounded-xl font-bold text-sm ${navForm.lang === 'bn' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>বাংলা</button>
                                <button type="button" onClick={() => setNavForm({...navForm, lang: 'en'})} className={`flex-1 py-2 rounded-xl font-bold text-sm ${navForm.lang === 'en' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}>English</button>
                            </div>
                            <input type="text" placeholder="মেনুর নাম" className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                            <input type="text" placeholder="লিঙ্ক (যেমন: #about বা /page/link)" className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                            <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition">ADD MENU</button>
                        </form>
                        <div className="lg:col-span-2 space-y-3">
                            {navItems.map(item => (
                                <div key={item._id} className="bg-white p-5 rounded-2xl border flex items-center justify-between shadow-sm">
                                    <p className="font-bold text-slate-800">{item.name} <span className="text-gray-400 font-normal">({item.lang})</span> → <span className="text-blue-500">{item.link}</span></p>
                                    <button onClick={() => deleteItem('nav', item._id)} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Complaints Tab */}
                {activeTab === 'complaints' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {complaints.length === 0 ? <p className="text-gray-500 text-center py-20 col-span-2">কোনো অভিযোগ পাওয়া যায়নি।</p> : 
                        complaints.map(comp => (
                            <div key={comp._id} className="bg-white p-8 rounded-[2.5rem] border shadow-sm flex flex-col justify-between hover:border-red-100 transition-all">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-black text-xl text-slate-800">{comp.name}</h4>
                                        <button onClick={() => deleteItem('complaints', comp._id)} className="text-red-400 p-2 hover:bg-red-50 rounded-full transition"><Trash2 size={22}/></button>
                                    </div>
                                    <p className="text-gray-600 font-medium leading-relaxed mb-4">"{comp.message}"</p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-100">📞 {comp.phone}</span>
                                        <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold border border-orange-100">📍 {comp.area}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-6 uppercase font-bold tracking-widest border-t pt-4">{new Date(comp.createdAt).toLocaleString('bn-BD')}</p>
                            </div>
                        ))}
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default Admin;
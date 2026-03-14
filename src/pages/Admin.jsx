import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, LayoutDashboard, Menu, X, Image as ImageIcon, MessageSquare, Loader2, FileText } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // মোবাইলের জন্য নতুন স্টেট
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [pages, setPages] = useState([]); 
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    
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

    // ট্যাব পরিবর্তনের সময় মোবাইল মেনু অটো বন্ধ হবে
    const changeTab = (tab) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
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
            
            {/* Mobile Header - শুধুমাত্র মোবাইলে দেখা যাবে */}
            <div className="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
                <div className="font-black text-xl text-blue-400">ADMIN</div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-800 rounded-lg">
                    {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </div>

            {/* Sidebar - এখন মোবাইল এবং ডেস্কটপ দুই জায়গাতেই কাজ করবে */}
            <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out z-40 w-72 bg-slate-900 text-white h-full overflow-y-auto`}>
                <div className="p-8 border-b border-slate-800 font-black text-2xl text-blue-400 hidden lg:block">ADMIN PANEL</div>
                <nav className="p-4 space-y-2 mt-4">
                    <button onClick={() => changeTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><LayoutDashboard size={20}/> ড্যাশবোর্ড</button>
                    <button onClick={() => changeTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'content' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><ImageIcon size={20}/> হিরো ও কন্টেন্ট</button>
                    <button onClick={() => changeTab('pages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'pages' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><FileText size={20}/> নতুন পেজ তৈরি</button>
                    <button onClick={() => changeTab('navbar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'navbar' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><Menu size={20}/> নেভবার সেটিংস</button>
                    <button onClick={() => changeTab('complaints')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'complaints' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><MessageSquare size={20}/> অভিযোগ সমূহ</button>
                </nav>
            </div>

            {/* Overlay - মোবাইলে সাইডবার খুললে ব্যাকগ্রাউন্ড ঝাপসা করার জন্য */}
            {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden"></div>}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-10 w-full overflow-x-hidden">
                <header className="flex justify-between items-center mb-6 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 uppercase">{activeTab}</h1>
                    <button onClick={() => fetchData()} className="bg-slate-200 p-2 rounded-full hover:bg-slate-300">
                        <Loader2 className={loading ? 'animate-spin' : ''}/>
                    </button>
                </header>

                {/* Dashboard Stats */}
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border-b-4 border-blue-600 shadow-sm text-center">
                            <p className="text-gray-400 font-bold uppercase text-[10px] md:text-xs">মোট কন্টেন্ট</p>
                            <h3 className="text-2xl md:text-4xl font-black mt-2 text-slate-800">{contents.length}</h3>
                        </div>
                        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border-b-4 border-purple-600 shadow-sm text-center">
                            <p className="text-gray-400 font-bold uppercase text-[10px] md:text-xs">তৈরি করা পেজ</p>
                            <h3 className="text-2xl md:text-4xl font-black mt-2 text-slate-800">{pages.length}</h3>
                        </div>
                        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border-b-4 border-green-600 shadow-sm text-center">
                            <p className="text-gray-400 font-bold uppercase text-[10px] md:text-xs">মেনু আইটেম</p>
                            <h3 className="text-2xl md:text-4xl font-black mt-2 text-slate-800">{navItems.length}</h3>
                        </div>
                        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border-b-4 border-red-600 shadow-sm text-center">
                            <p className="text-gray-400 font-bold uppercase text-[10px] md:text-xs">অভিযোগ</p>
                            <h3 className="text-2xl md:text-4xl font-black mt-2 text-slate-800">{complaints.length}</h3>
                        </div>
                    </div>
                )}

                {/* বাকি ট্যাবগুলোর কোড (Pages, Navbar, Complaints) আপনার আগের কোডই থাকবে */}
                {/* উদাহরণস্বরূপ 'pages' এর লিস্ট মোবাইলে সুন্দর দেখানোর জন্য সামান্য পরিবর্তন করা হলো: */}
                {activeTab === 'pages' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                        <form onSubmit={handlePageSubmit} className="bg-white p-6 md:p-8 rounded-[2rem] border shadow-xl space-y-4 h-fit">
                            <h2 className="font-black text-xl mb-2 text-slate-800">নতুন পেজ তৈরি</h2>
                            <input type="text" placeholder="পেজের টাইটেল" className="w-full p-3 md:p-4 border rounded-2xl bg-gray-50 outline-none font-bold" value={pageForm.title} onChange={(e)=>setPageForm({...pageForm, title: e.target.value})} required />
                            <textarea rows="5" placeholder="পেজের কন্টেন্ট" className="w-full p-3 md:p-4 border rounded-2xl bg-gray-50 outline-none" value={pageForm.content} onChange={(e)=>setPageForm({...pageForm, content: e.target.value})} required></textarea>
                            <button type="submit" className="w-full bg-purple-600 text-white py-3 md:py-4 rounded-2xl font-black shadow-lg">CREATE PAGE</button>
                        </form>
                        
                        <div className="lg:col-span-2 space-y-3">
                             {pages.map(item => (
                                <div key={item._id} className="bg-white p-4 md:p-6 rounded-2xl border flex items-center justify-between shadow-sm">
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-slate-800 truncate">{item.title}</p>
                                        <p className="text-[10px] text-gray-400 truncate">/page/{item.slug}</p>
                                    </div>
                                    <button onClick={() => deleteItem('pages', item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18}/></button>
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
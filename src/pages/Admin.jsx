import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, LogOut, PlusCircle, Globe, Image as ImageIcon, Save, X } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [loading, setLoading] = useState(false);
    
    const [editingId, setEditingId] = useState(null);
    const [contentForm, setContentForm] = useState({ title: '', image: '', category: 'project', lang: 'bn' });
    const [navForm, setNavForm] = useState({ name: '', link: '', lang: 'bn' });

    const API_BASE = "https://mybackendv1.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    useEffect(() => { if (isLoggedIn) fetchData(); }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [comp, cont, nav] = await Promise.all([
                axios.get(`${API_BASE}/complaints`),
                axios.get(`${API_BASE}/content`),
                axios.get(`${API_BASE}/nav`)
            ]);
            setComplaints(comp.data); setContents(cont.data); setNavItems(nav.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("Wrong Credentials!");
    };

    const deleteItem = async (route, id) => {
        if (window.confirm("Delete this?")) {
            await axios.delete(`${API_BASE}/${route}/${id}`);
            fetchData();
        }
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        if (editingId) await axios.put(`${API_BASE}/content/${editingId}`, contentForm);
        else await axios.post(`${API_BASE}/content`, contentForm);
        setEditingId(null); setContentForm({ title: '', image: '', category: 'project', lang: 'bn' });
        fetchData();
    };

    const handleNavSubmit = async (e) => {
        e.preventDefault();
        if (editingId) await axios.put(`${API_BASE}/nav/${editingId}`, navForm);
        else await axios.post(`${API_BASE}/nav`, navForm);
        setEditingId(null); setNavForm({ name: '', link: '', lang: 'bn' });
        fetchData();
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-black text-center mb-8 text-slate-800">ADMIN LOGIN</h2>
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl mb-6" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold transition hover:bg-blue-700">LOGIN</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    <button onClick={() => setActiveTab('complaints')} className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'complaints' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Complaints</button>
                    <button onClick={() => setActiveTab('navbar')} className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'navbar' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Navbar Settings</button>
                    <button onClick={() => setActiveTab('content')} className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'content' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Content Upload</button>
                </div>

                {loading ? <p className="text-center font-bold">Loading...</p> : (
                    <>
                    {activeTab === 'complaints' && (
                        <div className="grid gap-4">
                            {complaints.map(c => (
                                <div key={c._id} className="bg-white p-5 rounded-2xl border flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-blue-600">{c.name} ({c.phone})</p>
                                        <p className="text-slate-700 italic bg-gray-50 p-3 rounded-lg mt-2">"{c.message}"</p>
                                    </div>
                                    <button onClick={() => deleteItem('complaints', c._id)} className="text-red-400 p-2"><Trash2/></button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'navbar' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <form onSubmit={handleNavSubmit} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 h-fit">
                                <h2 className="font-bold text-blue-600">Add/Edit Navbar Item</h2>
                                <input type="text" placeholder="Menu Name" className="w-full p-3 border rounded-xl" value={navForm.name} onChange={(e)=>setNavForm({...navForm, name: e.target.value})} required />
                                <input type="text" placeholder="Link" className="w-full p-3 border rounded-xl" value={navForm.link} onChange={(e)=>setNavForm({...navForm, link: e.target.value})} required />
                                <select className="w-full p-3 border rounded-xl font-bold" value={navForm.lang} onChange={(e)=>setNavForm({...navForm, lang: e.target.value})}>
                                    <option value="bn">Bengali (বাংলা)</option>
                                    <option value="en">English (ইংরেজি)</option>
                                </select>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Save</button>
                            </form>
                            <div className="lg:col-span-2 space-y-2">
                                {navItems.map(n => (
                                    <div key={n._id} className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-sm">
                                        <p className="font-bold">{n.name} <span className="text-[10px] bg-gray-100 px-2 rounded-full uppercase ml-2 text-gray-500">{n.lang}</span></p>
                                        <div className="flex gap-2">
                                            <button onClick={() => {setEditingId(n._id); setNavForm({name: n.name, link: n.link, lang: n.lang})}} className="text-blue-400"><Edit3 size={18}/></button>
                                            <button onClick={() => deleteItem('nav', n._id)} className="text-red-400"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <form onSubmit={handleContentSubmit} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 h-fit">
                                <h2 className="font-bold text-blue-600">Upload Project/Hero</h2>
                                <input type="text" placeholder="Title" className="w-full p-3 border rounded-xl" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                                <input type="text" placeholder="Image URL" className="w-full p-3 border rounded-xl" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                                <select className="w-full p-3 border rounded-xl" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                    <option value="project">Project</option>
                                    <option value="blog">Blog</option>
                                    <option value="hero">Hero Banner</option>
                                </select>
                                <select className="w-full p-3 border rounded-xl font-bold" value={contentForm.lang} onChange={(e)=>setContentForm({...contentForm, lang: e.target.value})}>
                                    <option value="bn">Bengali (বাংলা)</option>
                                    <option value="en">English (ইংরেজি)</option>
                                </select>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Save Content</button>
                            </form>
                            <div className="lg:col-span-2 grid gap-4">
                                {contents.map(item => (
                                    <div key={item._id} className="bg-white p-3 rounded-2xl border flex items-center gap-4">
                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-800">{item.title}</p>
                                            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 rounded-full uppercase font-black">{item.lang}</span>
                                        </div>
                                        <button onClick={() => {setEditingId(item._id); setContentForm({title: item.title, image: item.image, category: item.category, lang: item.lang})}} className="text-blue-400"><Edit3/></button>
                                        <button onClick={() => deleteItem('content', item._id)} className="text-red-400"><Trash2/></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Admin;
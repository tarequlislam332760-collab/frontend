import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit3, LogOut, PlusCircle, Save, X } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [contents, setContents] = useState([]);
    const [activeTab, setActiveTab] = useState('complaints');
    const [loading, setLoading] = useState(false);
    
    // Edit States
    const [editingContentId, setEditingContentId] = useState(null);
    const [contentForm, setContentForm] = useState({ title: '', image: '', category: 'project' });

    const API_BASE = "https://mybackendv1.vercel.app/api";
    const ADMIN_EMAIL = "admin@mp.com"; 
    const ADMIN_PASSWORD = "doctor tuhin";

    useEffect(() => { 
        if (isLoggedIn) fetchData(); 
    }, [isLoggedIn]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [comp, cont] = await Promise.all([
                axios.get(`${API_BASE}/complaints`),
                axios.get(`${API_BASE}/content`)
            ]);
            setComplaints(Array.isArray(comp.data) ? comp.data : []);
            setContents(Array.isArray(cont.data) ? cont.data : []);
        } catch (err) { 
            console.error("Fetch error:", err);
        } finally { setLoading(false); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("Wrong Credentials!");
    };

    // --- Complaint Functions ---
    const deleteComplaint = async (id) => {
        if (window.confirm("অভিযোগটি মুছে ফেলতে চান?")) {
            try {
                await axios.delete(`${API_BASE}/complaints/${id}`);
                fetchData();
            } catch (err) { alert("Delete failed!"); }
        }
    };

    // --- Content Functions (Project/Blog) ---
    const handleContentSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingContentId) {
                // Edit Mode
                await axios.put(`${API_BASE}/content/${editingContentId}`, contentForm);
                alert("Updated successfully!");
            } else {
                // Add Mode
                await axios.post(`${API_BASE}/content`, contentForm);
                alert("Added successfully!");
            }
            setEditingContentId(null);
            setContentForm({ title: '', image: '', category: 'project' });
            fetchData();
        } catch (err) { alert("Operation failed!"); }
    };

    const startEditContent = (item) => {
        setEditingContentId(item._id);
        setContentForm({ title: item.title, image: item.image, category: item.category });
        setActiveTab('upload'); // এডিট মোডে গেলে ফর্ম ট্যাবে নিয়ে যাবে
    };

    const deleteContent = async (id) => {
        if (window.confirm("কন্টেন্টটি মুছে ফেলতে চান?")) {
            try {
                await axios.delete(`${API_BASE}/content/${id}`);
                fetchData();
            } catch (err) { alert("Delete failed!"); }
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-black text-center mb-8 text-slate-800">ADMIN LOGIN</h2>
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl mb-6" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">LOGIN</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border">
                    <h1 className="text-xl font-bold italic text-blue-600">ADMIN PANEL</h1>
                    <button onClick={() => setIsLoggedIn(false)} className="text-red-600 font-bold flex items-center gap-2"><LogOut size={18}/> Logout</button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    <button onClick={() => {setActiveTab('complaints'); setEditingContentId(null);}} className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'complaints' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Complaints ({complaints.length})</button>
                    <button onClick={() => setActiveTab('upload')} className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{editingContentId ? 'Editing Content' : 'Upload Content'}</button>
                </div>

                {loading ? <p className="text-center py-10 font-bold">Loading data...</p> : (
                    <>
                    {/* Complaints Section */}
                    {activeTab === 'complaints' && (
                        <div className="grid gap-4">
                            {complaints.length === 0 ? <p className="text-center py-10 bg-white rounded-2xl border">কোনো অভিযোগ নেই।</p> : 
                            complaints.map(c => (
                                <div key={c._id} className="bg-white p-5 rounded-2xl border shadow-sm flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-blue-600">{c.name} ({c.phone})</p>
                                        <p className="text-sm text-slate-500 mb-2 font-medium">এলাকা: {c.area || 'N/A'}</p>
                                        <p className="text-slate-700 italic bg-gray-50 p-3 rounded-lg border">"{c.message}"</p>
                                    </div>
                                    <button onClick={() => deleteComplaint(c._id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={20}/></button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Content Section (Upload & List with Edit/Delete) */}
                    {activeTab === 'upload' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Form */}
                            <form onSubmit={handleContentSubmit} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 h-fit sticky top-24">
                                <h2 className="font-bold text-blue-600 flex items-center gap-2">
                                    {editingContentId ? <Edit3 size={20}/> : <PlusCircle size={20}/>}
                                    {editingContentId ? "Edit Content" : "Add New Content"}
                                </h2>
                                <input type="text" placeholder="Title" className="w-full p-3 border rounded-xl" value={contentForm.title} onChange={(e)=>setContentForm({...contentForm, title: e.target.value})} required />
                                <input type="text" placeholder="Image URL" className="w-full p-3 border rounded-xl" value={contentForm.image} onChange={(e)=>setContentForm({...contentForm, image: e.target.value})} required />
                                <select className="w-full p-3 border rounded-xl" value={contentForm.category} onChange={(e)=>setContentForm({...contentForm, category: e.target.value})}>
                                    <option value="project">Project</option>
                                    <option value="blog">Blog</option>
                                </select>
                                <div className="flex gap-2">
                                    <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                                        {editingContentId ? "Update" : "Save"}
                                    </button>
                                    {editingContentId && (
                                        <button type="button" onClick={() => {setEditingContentId(null); setContentForm({title:'', image:'', category:'project'});}} className="bg-gray-200 p-3 rounded-xl text-gray-600"><X/></button>
                                    )}
                                </div>
                            </form>

                            {/* List with Edit/Delete */}
                            <div className="lg:col-span-2 grid gap-4">
                                <h3 className="font-bold text-gray-400 px-2 uppercase text-sm">Existing Content</h3>
                                {contents.map(item => (
                                    <div key={item._id} className="bg-white p-3 rounded-2xl border flex justify-between items-center hover:shadow-md transition">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} className="w-14 h-14 rounded-xl object-cover bg-gray-100" />
                                            <div>
                                                <p className="font-bold text-slate-800">{item.title}</p>
                                                <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">{item.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => startEditContent(item)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition"><Edit3 size={18}/></button>
                                            <button onClick={() => deleteContent(item._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"><Trash2 size={18}/></button>
                                        </div>
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
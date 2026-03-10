// frontend/src/pages/Admin.jsx (Update this)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit, PlusCircle, RefreshCw, LogOut } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('complaints'); // complaints or content
  const [data, setData] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // আপলোড ফর্মের স্টেট
  const [formData, setFormData] = useState({ title: '', description: '', image: '', category: 'project', location: '', status: 'সম্পন্ন' });

  const API_URL = "https://backend-phi-eight-82.vercel.app/api";

  const fetchData = async () => {
    setLoading(true);
    try {
      const resC = await axios.get(`${API_URL}/complaints`);
      const resP = await axios.get(`${API_URL}/content`);
      setData(resC.data);
      setContentList(resP.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/content`, formData);
    alert("সফলভাবে আপলোড হয়েছে!");
    fetchData();
  };

  const handleDelete = async (id) => {
    if(window.confirm("আপনি কি এটি ডিলিট করতে চান?")) {
      await axios.delete(`${API_URL}/content/${id}`);
      fetchData();
    }
  };

  // লগইন চেক এবং ড্যাশবোর্ড UI... (বাকি কোড আগের মতোই থাকবে শুধু নিচের অংশ যোগ হবে)

  return (
    <div className="pt-24 min-h-screen bg-slate-50 p-4">
      {/* ট্যাব সিস্টেম */}
      <div className="flex gap-4 mb-8 justify-center">
        <button onClick={() => setActiveTab('complaints')} className={`px-6 py-2 rounded-full ${activeTab === 'complaints' ? 'bg-emerald-600 text-white' : 'bg-white'}`}>অভিযোগসমূহ</button>
        <button onClick={() => setActiveTab('upload')} className={`px-6 py-2 rounded-full ${activeTab === 'upload' ? 'bg-emerald-600 text-white' : 'bg-white'}`}>নতুন আপলোড</button>
        <button onClick={() => setActiveTab('manage')} className={`px-6 py-2 rounded-full ${activeTab === 'manage' ? 'bg-emerald-600 text-white' : 'bg-white'}`}>কন্টেন্ট ম্যানেজ</button>
      </div>

      {activeTab === 'upload' && (
        <form onSubmit={handleUpload} className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg space-y-4">
          <h2 className="text-xl font-bold">নতুন প্রজেক্ট বা ব্লগ যোগ করুন</h2>
          <input type="text" placeholder="টাইটেল" className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, title: e.target.value})} required />
          <textarea placeholder="বিস্তারিত বর্ণনা" className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          <input type="text" placeholder="ছবির লিঙ্ক (Direct Image URL)" className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, image: e.target.value})} />
          <select className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="project">প্রজেক্ট</option>
            <option value="blog">ব্লগ/খবর</option>
          </select>
          <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">সাবমিট করুন</button>
        </form>
      )}

      {activeTab === 'manage' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentList.map(item => (
            <div key={item._id} className="bg-white p-4 rounded-2xl shadow relative">
              <img src={item.image} className="h-40 w-full object-cover rounded-xl mb-3" />
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <button onClick={() => handleDelete(item._id)} className="absolute top-2 right-2 bg-red-100 p-2 rounded-full text-red-600"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
      )}
      
      {/* অভিযোগ দেখার কোড আপনার আগের মতোই থাকবে */}
    </div>
  );
};
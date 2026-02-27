import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, MessageSquare, Phone, User, MapPin, Lock, LogOut, ShieldCheck } from 'lucide-react';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // আপনার দেওয়া লগইন তথ্য
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ADMIN_EMAIL = "vemanavijaykumar154@gmail.com";
  const ADMIN_PASS = "12345";

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      alert("ভুল ইমেইল বা পাসওয়ার্ড!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://backend-phi-eight-82.vercel.app/api/complaints');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // লগইন না থাকলে এই স্ক্রিনটি দেখাবে
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">অ্যাডমিন লগইন</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input 
              type="email" 
              placeholder="ইমেইল" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border outline-none focus:border-emerald-500" 
              required 
            />
            <input 
              type="password" 
              placeholder="পাসওয়ার্ড" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border outline-none focus:border-emerald-500" 
              required 
            />
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg">
              লগইন করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  // লগইন থাকলে এই ড্যাশবোর্ড দেখাবে
  return (
    <div className="pt-24 bg-slate-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">অ্যাডমিন ড্যাশবোর্ড</h1>
          <div className="flex gap-2">
            <button onClick={fetchData} className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg">
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> রিফ্রেশ
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100">
              লগআউট
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">ডাটা লোড হচ্ছে...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.type === 'complaint' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    {item.type === 'complaint' ? 'অভিযোগ' : 'মেসেজ'}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString('bn-BD')}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-700 font-bold">
                    <User size={16} className="text-emerald-500" /> {item.name}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <Phone size={16} className="text-blue-500" /> {item.phone}
                  </div>
                  {item.area && (
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                      <MapPin size={16} className="text-red-500" /> {item.area}
                    </div>
                  )}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl text-slate-700 text-sm italic">
                    <MessageSquare size={16} className="inline mr-2 text-slate-400" />
                    "{item.message}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
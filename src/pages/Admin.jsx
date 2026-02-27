import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, MessageSquare, Phone, User, MapPin, LogOut, ShieldCheck } from 'lucide-react';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ এখানে আপনার ইমেইল এবং বড় পাসওয়ার্ডটি দিন
  const ADMIN_EMAIL = "vemanavijaykumar154@gmail.com";
  const ADMIN_PASS = "আপনার_বড়_পাসওয়ার্ড_এখানে_লিখুন"; // উদাহরণ: "Bangla12345678"

  const handleLogin = (e) => {
    e.preventDefault();
    // ইমেইল এবং পাসওয়ার্ড চেক
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      alert("ভুল ইমেইল বা পাসওয়ার্ড! আবার চেষ্টা করুন।");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://backend-phi-eight-82.vercel.app/api/complaints');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("ডাটা লোড করতে সমস্যা হয়েছে। ব্যাকএন্ড চেক করুন।");
    } finally {
      setLoading(false);
    }
  };

  // লগইন স্ক্রিন
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 pt-20">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-emerald-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">অ্যাডমিন লগইন</h2>
            <p className="text-slate-500 text-sm mt-1">সুরক্ষিত প্রবেশের জন্য তথ্য দিন</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input 
                type="email" 
                placeholder="ইমেইল অ্যাড্রেস" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
                required 
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="পাসওয়ার্ড" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95">
              লগইন করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  // অ্যাডমিন ড্যাশবোর্ড
  return (
    <div className="pt-24 bg-slate-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">অ্যাডমিন ড্যাশবোর্ড</h1>
            <p className="text-slate-500 mt-1">জনগণের অভিযোগ ও মেসেজ তালিকা</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> রিফ্রেশ
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-medium border border-red-100 hover:bg-red-100 transition">
              <LogOut size={18} /> লগআউট
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="animate-bounce mb-4 text-emerald-600 font-bold text-lg text-center">লোড হচ্ছে...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div key={item._id} className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 relative">
                <div className="flex justify-between items-start mb-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.type === 'complaint' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    {item.type === 'complaint' ? 'অভিযোগ' : 'মেসেজ'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{new Date(item.date).toLocaleDateString('bn-BD')}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-800 font-bold text-lg">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                       <User size={16} />
                    </div>
                    {item.name}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone size={16} className="text-slate-400" /> {item.phone}
                  </div>
                  {item.area && (
                    <div className="flex items-center gap-3 text-slate-600">
                      <MapPin size={16} className="text-slate-400" /> {item.area}
                    </div>
                  )}
                  <div className="mt-5 p-4 bg-slate-50 rounded-2xl text-slate-700 text-sm leading-relaxed border border-slate-100">
                    <MessageSquare size={16} className="mb-2 text-emerald-500" />
                    "{item.message}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && data.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium text-lg">এখনো কোনো ডাটা পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
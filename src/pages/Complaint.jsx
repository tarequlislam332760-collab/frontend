import React, { useState } from 'react';
import { Send, ShieldCheck, Clock, CheckCircle2, MapPin, Phone, User } from 'lucide-react';
import axios from 'axios';

const Complaint = ({ lang = 'bn' }) => {
  const translations = {
    bn: {
      badge: "সরাসরি অ্যাকশন বক্স",
      titleMain: "জনগণের",
      titleSub: "অভিযোগ বক্স",
      privacyTitle: "গোপনীয়তা রক্ষা",
      privacyDesc: "আপনার নাম এবং তথ্য সম্পূর্ণ গোপন রাখা হবে।",
      actionTitle: "দ্রুত ব্যবস্থা",
      actionDesc: "অভিযোগ পাওয়ার ৭২ ঘণ্টার মধ্যে প্রাথমিক পদক্ষেপ নেওয়া হবে।",
      formTitle: "আপনার অভিযোগ জমা দিন",
      placeholderName: "আপনার নাম লিখুন",
      placeholderPhone: "নম্বরটি দিন",
      placeholderArea: "কোন এলাকার সমস্যা?",
      placeholderMessage: "এখানে বিস্তারিতভাবে আপনার সমস্যার কথা লিখুন...",
      btnSubmit: "অভিযোগ জমা দিন",
      alertSuccess: "ধন্যবাদ! আপনার অভিযোগটি সফলভাবে জমা হয়েছে।",
      alertError: "দুঃখিত, অভিযোগ জমা দিতে সমস্যা হয়েছে। পুনরায় আপনার ব্যাকএন্ড চালু আছে কি না চেক করুন।"
    },
    en: {
      badge: "Direct Action Box",
      titleMain: "Public",
      titleSub: "Complaint Box",
      privacyTitle: "Privacy Protection",
      privacyDesc: "Your name and information will be kept strictly confidential.",
      actionTitle: "Fast Action",
      actionDesc: "Initial steps will be taken within 72 hours of receiving the complaint.",
      formTitle: "Submit Your Complaint",
      placeholderName: "Enter your name",
      placeholderPhone: "Enter mobile number",
      placeholderArea: "Which area is facing the problem?",
      placeholderMessage: "Write details of your problem here...",
      btnSubmit: "Submit Complaint",
      alertSuccess: "Thank you! Your complaint has been submitted successfully.",
      alertError: "Sorry, there was an error. Please check if the server is running."
    }
  };

  const content = translations[lang] || translations['bn'];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // বাটন লোডিং স্টেট
    
    try {
      // ব্যাকএন্ড লিঙ্কটি নিশ্চিত করুন। পোর্ট ৫০০০ এবং রাউট /api/complaints
      const response = await axios.post('http://localhost:5000/api/complaints', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        alert(content.alertSuccess);
        setFormData({ name: '', phone: '', area: '', message: '' });
      } else {
        alert("Server responded with error: " + response.data.message);
      }
    } catch (error) {
      console.error("Submission error details:", error.response?.data || error.message);
      // এরর মেসেজটি অ্যালার্টে দেখানো যাতে আপনি বুঝতে পারেন কি হচ্ছে
      alert(`${content.alertError} (Error: ${error.message})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 bg-[#f0f9f4] min-h-screen font-sans pb-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <CheckCircle2 size={14} />
            {content.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            {content.titleMain} <span className="text-emerald-600">{content.titleSub}</span>
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            আমরা আপনার সমস্যার কথা গুরুত্বের সাথে শুনছি। নিচের ফর্মটি পূরণ করে আপনার অভিযোগটি আমাদের জানান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Info Cards */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-2xl border-b-4 border-emerald-500 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{content.privacyTitle}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">{content.privacyDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-b-4 border-blue-500 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{content.actionTitle}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">{content.actionDesc}</p>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-emerald-50 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-8 border-b border-emerald-50 pb-6">
              <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <Send size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{content.formTitle}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative group">
                  <User className="absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} 
                    placeholder={content.placeholderName} required 
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700" 
                  />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="text" name="phone" value={formData.phone} onChange={handleChange} 
                    placeholder={content.placeholderPhone} required 
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700" 
                  />
                </div>
              </div>

              <div className="relative group">
                <MapPin className="absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="text" name="area" value={formData.area} onChange={handleChange} 
                  placeholder={content.placeholderArea} required 
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700" 
                />
              </div>

              <div className="space-y-1">
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} 
                  rows="4" placeholder={content.placeholderMessage} required 
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full ${loading ? 'bg-slate-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-3 text-lg transform hover:-translate-y-0.5 active:scale-95`}
              >
                {loading ? "জমা হচ্ছে..." : content.btnSubmit}
                <Send size={18} className={loading ? "" : "animate-pulse"} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
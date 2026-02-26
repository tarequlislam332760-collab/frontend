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
      alertError: "দুঃখিত, অভিযোগ জমা দিতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।"
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
      alertError: "Sorry, there was an error. Please try again."
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
    setLoading(true); 
    
    try {
      // ✅ Live Backend URL updated here
      const response = await axios.post('https://tareq-backend-server.vercel.app/api/complaints', formData);
      
      if (response.data.success) {
        alert(content.alertSuccess);
        setFormData({ name: '', phone: '', area: '', message: '' });
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(`${content.alertError}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 bg-[#f0f9f4] min-h-screen font-sans pb-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <CheckCircle2 size={14} />
            {content.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            {content.titleMain} <span className="text-emerald-600">{content.titleSub}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-2xl border-b-4 border-emerald-500 shadow-md">
              <ShieldCheck size={28} className="text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">{content.privacyTitle}</h3>
              <p className="text-slate-500 mt-2 text-sm">{content.privacyDesc}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-b-4 border-blue-500 shadow-md">
              <Clock size={28} className="text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">{content.actionTitle}</h3>
              <p className="text-slate-500 mt-2 text-sm">{content.actionDesc}</p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-emerald-50 order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">{content.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={content.placeholderName} required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border outline-none focus:border-emerald-500" />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder={content.placeholderPhone} required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border outline-none focus:border-emerald-500" />
              </div>
              <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder={content.placeholderArea} required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border outline-none focus:border-emerald-500" />
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder={content.placeholderMessage} required className="w-full px-5 py-4 rounded-xl bg-slate-50 border outline-none focus:border-emerald-500 resize-none"></textarea>
              <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3">
                {loading ? "জমা হচ্ছে..." : content.btnSubmit}
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
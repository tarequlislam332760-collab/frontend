import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Youtube, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Contact = ({ lang = 'bn' }) => {
  // ১. ট্রান্সলেশন অবজেক্ট
  const translations = {
    bn: {
      title: "যোগাযোগ করুন",
      subtitle: "আপনার যেকোনো সমস্যা, পরামর্শ বা তথ্যের জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন। আমরা আপনার সেবায় সর্বদা নিয়োজিত।",
      addressTitle: "অফিসের ঠিকানা",
      address: "নাসের রহমান এমপি ভবন, কুসুমবাগ, মৌলভীবাজার সদর, মৌলভীবাজার।",
      phoneTitle: "ফোন করুন",
      emailTitle: "ইমেল করুন",
      socialTitle: "আমাদের সোশ্যাল মিডিয়া:",
      formTitle: "সরাসরি মেসেজ দিন",
      placeholderName: "নাম লিখুন",
      placeholderPhone: "নম্বর লিখুন",
      placeholderSubject: "কি বিষয়ে লিখতে চান?",
      placeholderMessage: "এখানে বিস্তারিত লিখুন...",
      btnSend: "মেসেজ পাঠান",
      btnSending: "পাঠানো হচ্ছে...",
      alertSuccess: "ধন্যবাদ! আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে।",
      alertError: "দুঃখিত! মেসেজ পাঠানো সম্ভব হয়নি। পুনরায় চেষ্টা করুন।"
    },
    en: {
      title: "Contact Us",
      subtitle: "For any issues, suggestions, or information, please contact us directly. We are always at your service.",
      addressTitle: "Office Address",
      address: "Nasir Rahman MP Bhaban, Kusumbagh, Moulvibazar Sadar, Moulvibazar.",
      phoneTitle: "Call Us",
      emailTitle: "Email Us",
      socialTitle: "Our Social Media:",
      formTitle: "Send a Direct Message",
      placeholderName: "Enter your name",
      placeholderPhone: "Enter phone number",
      placeholderSubject: "What is this about?",
      placeholderMessage: "Write details here...",
      btnSend: "Send Message",
      btnSending: "Sending...",
      alertSuccess: "Thank you! Your message has been sent successfully.",
      alertError: "Sorry! Failed to send message. Please try again."
    }
  };

  const content = translations[lang] || translations['bn'];

  // ২. স্টেট ডিক্লেয়ারেশন
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false); // লোডিং স্টেট

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ৩. ডাটা সাবমিট ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // ব্যাকএন্ড কানেকশন
      const response = await axios.post('http://localhost:5000/api/messages', formData);
      
      if (response.data.success) {
        alert(content.alertSuccess);
        setFormData({ name: '', phone: '', subject: '', message: '' });
      } else {
        alert(content.alertError);
      }
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert(content.alertError);
    } finally {
      setIsSubmitting(false); // কাজ শেষ হলে লোডিং বন্ধ
    }
  };

  return (
    <div className="pt-24 bg-[#f0fdf4] min-h-screen font-sans pb-16">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4 tracking-widest shadow-sm border border-emerald-200">
            <CheckCircle size={14} /> GET IN TOUCH
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            {content.title}
          </h1>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-base md:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* Info Cards Side */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-3xl border-b-4 border-emerald-500 shadow-xl flex items-start gap-5 hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{content.addressTitle}</h3>
                <p className="text-slate-500 mt-2 leading-relaxed">{content.address}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border-b-4 border-blue-500 shadow-xl flex items-start gap-5 hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{content.phoneTitle}</h3>
                <p className="text-slate-500 mt-2 font-bold">+880 1712-345678</p>
              </div>
            </div>

            <div className="pt-8">
                <h4 className="text-slate-800 font-bold mb-4">{content.socialTitle}</h4>
                <div className="flex gap-4">
                   <Facebook className="text-blue-600 cursor-pointer hover:text-emerald-600 transition-all hover:-translate-y-1" />
                   <Twitter className="text-blue-400 cursor-pointer hover:text-emerald-600 transition-all hover:-translate-y-1" />
                   <Youtube className="text-red-600 cursor-pointer hover:text-emerald-600 transition-all hover:-translate-y-1" />
                </div>
            </div>
          </div>

          {/* Form Card Side */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-emerald-100 order-1 lg:order-2">
            <h2 className="text-3xl font-black text-slate-800 mb-8">{content.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder={content.placeholderName} 
                  required 
                  className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-sm" 
                />
                <input 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  type="tel" 
                  placeholder={content.placeholderPhone} 
                  required 
                  className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-sm" 
                />
              </div>
              <input 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                type="text" 
                placeholder={content.placeholderSubject} 
                required 
                className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-sm" 
              />
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4" 
                placeholder={content.placeholderMessage} 
                required 
                className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition-all resize-none shadow-sm"
              ></textarea>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-black py-5 rounded-xl shadow-xl hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg`}
              >
                {isSubmitting ? content.btnSending : content.btnSend} 
                {!isSubmitting && <Send size={20} />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
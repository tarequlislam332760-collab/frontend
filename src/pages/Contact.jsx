import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Youtube, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Contact = ({ lang = 'bn' }) => {
  const translations = {
    bn: {
      title: "যোগাযোগ করুন",
      subtitle: "আপনার যেকোনো সমস্যা, পরামর্শ বা তথ্যের জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন।",
      addressTitle: "অফিসের ঠিকানা",
      address: "নাসের রহমান এমপি ভবন, কুসুমবাগ, মৌলভীবাজার সদর, মৌলভীবাজার।",
      phoneTitle: "ফোন করুন",
      emailTitle: "ইমেল করুন",
      formTitle: "সরাসরি মেসেজ দিন",
      placeholderName: "নাম লিখুন",
      placeholderPhone: "নম্বর লিখুন",
      placeholderSubject: "কি বিষয়ে লিখতে চান?",
      placeholderMessage: "এখানে বিস্তারিত লিখুন...",
      btnSend: "মেসেজ পাঠান",
      btnSending: "পাঠানো হচ্ছে...",
      alertSuccess: "ধন্যবাদ! আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে।",
      alertError: "দুঃখিত! মেসেজ পাঠানো সম্ভব হয়নি।"
    },
    en: {
      title: "Contact Us",
      subtitle: "For any issues or information, please contact us directly.",
      addressTitle: "Office Address",
      address: "Nasir Rahman MP Bhaban, Kusumbagh, Moulvibazar Sadar, Moulvibazar.",
      phoneTitle: "Call Us",
      emailTitle: "Email Us",
      formTitle: "Send a Direct Message",
      placeholderName: "Enter name",
      placeholderPhone: "Enter phone",
      placeholderSubject: "Subject",
      placeholderMessage: "Message details...",
      btnSend: "Send Message",
      btnSending: "Sending...",
      alertSuccess: "Message sent successfully!",
      alertError: "Failed to send message."
    }
  };

  const content = translations[lang] || translations['bn'];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // ✅ Live Backend URL updated here
      const response = await axios.post('https://tareq-backend-server.vercel.app/api/messages', formData);
      
      if (response.data.success) {
        alert(content.alertSuccess);
        setFormData({ name: '', phone: '', subject: '', message: '' });
      } else {
        alert(content.alertError);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(content.alertError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 bg-[#f0fdf4] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-800">{content.title}</h1>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border-b-4 border-emerald-500 shadow-xl flex items-start gap-5">
              <MapPin size={28} className="text-emerald-600" />
              <div>
                <h3 className="text-xl font-bold">{content.addressTitle}</h3>
                <p className="text-slate-500 mt-2">{content.address}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border-b-4 border-blue-500 shadow-xl flex items-start gap-5">
              <Phone size={28} className="text-blue-600" />
              <div>
                <h3 className="text-xl font-bold">{content.phoneTitle}</h3>
                <p className="text-slate-500 mt-2">+880 1712-345678</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-emerald-100">
            <h2 className="text-2xl font-bold mb-8">{content.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder={content.placeholderName} required className="w-full px-5 py-4 rounded-xl border bg-slate-50 outline-none focus:border-emerald-500" />
                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder={content.placeholderPhone} required className="w-full px-5 py-4 rounded-xl border bg-slate-50 outline-none focus:border-emerald-500" />
              </div>
              <input name="subject" value={formData.subject} onChange={handleChange} type="text" placeholder={content.placeholderSubject} required className="w-full px-5 py-4 rounded-xl border bg-slate-50 outline-none focus:border-emerald-500" />
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder={content.placeholderMessage} required className="w-full px-5 py-4 rounded-xl border bg-slate-50 outline-none focus:border-emerald-500 resize-none"></textarea>
              <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white font-bold py-5 rounded-xl shadow-xl flex items-center justify-center gap-3">
                {isSubmitting ? content.btnSending : content.btnSend} 
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
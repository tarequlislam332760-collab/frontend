import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import axios from 'axios';

const Contact = ({ lang = 'bn' }) => {
  const translations = {
    bn: {
      title: "যোগাযোগ করুন",
      subtitle: "যেকোনো পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন।",
      addressTitle: "অফিসের ঠিকানা",
      address: "নাসের রহমান এমপি ভবন, মৌলভীবাজার।",
      phoneTitle: "ফোন করুন",
      formTitle: "সরাসরি মেসেজ দিন",
      placeholderName: "নাম",
      placeholderPhone: "নম্বর",
      placeholderSubject: "বিষয়",
      placeholderMessage: "বিস্তারিত...",
      btnSend: "মেসেজ পাঠান",
      alertSuccess: "মেসেজ সফলভাবে পাঠানো হয়েছে।",
      alertError: "মেসেজ পাঠানো সম্ভব হয়নি।"
    },
    en: {
      title: "Contact Us",
      subtitle: "Contact us directly for any feedback.",
      addressTitle: "Office Address",
      address: "Nasir Rahman MP Bhaban, Moulvibazar.",
      phoneTitle: "Call Us",
      formTitle: "Send Message",
      placeholderName: "Name",
      placeholderPhone: "Phone",
      placeholderSubject: "Subject",
      placeholderMessage: "Details...",
      btnSend: "Send Now",
      alertSuccess: "Sent successfully!",
      alertError: "Failed to send."
    }
  };

  const content = translations[lang] || translations['bn'];
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // ✅ নতুন লিঙ্ক আপডেট করা হয়েছে
      const response = await axios.post('https://mybackendv1.vercel.app/api/complaints', formData);
      if (response.data.success) {
        alert(content.alertSuccess);
        setFormData({ name: '', phone: '', subject: '', message: '' });
      } else {
        alert(content.alertError);
      }
    } catch (error) {
      alert("নেটওয়ার্ক এরর!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 bg-[#f0fdf4] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-emerald-100">
            <h2 className="text-2xl font-bold mb-8">{content.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder={content.placeholderName} required className="w-full px-5 py-4 rounded-xl border bg-slate-50 outline-none" />
              <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder={content.placeholderPhone} required className="w-full px-5 py-4 rounded-xl border bg-slate-50 outline-none" />
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder={content.placeholderMessage} required className="w-full px-5 py-4 rounded-xl border bg-slate-50 outline-none resize-none"></textarea>
              <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3">
                {isSubmitting ? "পাঠানো হচ্ছে..." : content.btnSend} <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
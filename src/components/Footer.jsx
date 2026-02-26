import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* কলাম ১: পরিচিতি */}
        <div className="space-y-6 text-center sm:text-left">
          <h3 className="text-white text-2xl font-bold tracking-tight">
            নাসের রহমান <span className="text-emerald-500">এমপি</span>
          </h3>
          <p className="text-sm leading-relaxed">
            মৌলভীবাজারের উন্নয়ন ও জনগণের সেবায় উৎসর্গীকৃত। আমাদের লক্ষ্য একটি স্মার্ট এবং উন্নত নির্বাচনী এলাকা গড়ে তোলা।
          </p>
        </div>

        {/* কলাম ২: কুইক লিঙ্কস */}
        <div className="text-center sm:text-left">
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">গুরুত্বপূর্ণ লিঙ্ক</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/" className="hover:text-emerald-500 transition-all flex items-center justify-center sm:justify-start gap-2 group"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span> হোমপেজ</Link></li>
            <li><Link to="/about" className="hover:text-emerald-500 transition-all flex items-center justify-center sm:justify-start gap-2 group"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span> এমপি মহোদয় সম্পর্কে</Link></li>
            <li><Link to="/projects" className="hover:text-emerald-500 transition-all flex items-center justify-center sm:justify-start gap-2 group"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span> উন্নয়ন প্রকল্পসমূহ</Link></li>
            <li><Link to="/complaint" className="hover:text-emerald-500 transition-all flex items-center justify-center sm:justify-start gap-2 group"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span> অভিযোগ বক্স</Link></li>
          </ul>
        </div>

        {/* কলাম ৩: যোগাযোগ */}
        <div className="text-center sm:text-left">
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">যোগাযোগ</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center justify-center sm:justify-start gap-3 group">
              <Phone size={18} className="text-emerald-500 group-hover:rotate-12 transition-transform" /> 
              <span>+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-3 group">
              <Mail size={18} className="text-emerald-500 group-hover:-translate-y-1 transition-transform" /> 
              <span>info@nasirrahman.com</span>
            </li>
            <li className="flex items-start justify-center sm:justify-start gap-3 leading-relaxed">
              <MapPin size={18} className="text-emerald-500 shrink-0" />
              <span>কুসুমবাগ, মৌলভীবাজার সদর, মৌলভীবাজার।</span>
            </li>
          </ul>
        </div>

        {/* কলাম ৪: সোশ্যাল মিডিয়া (লিঙ্ক আপডেট করা হয়েছে) */}
        <div className="text-center sm:text-left">
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">আমাদের সাথে থাকুন</h4>
          <div className="flex justify-center sm:justify-start gap-4">
            {/* ফেসবুক */}
            <a 
              href="https://facebook.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:-translate-y-2 transition-all duration-300 shadow-lg"
            >
              <Facebook size={22} />
            </a>
            {/* টুইটার */}
            <a 
              href="https://twitter.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-sky-500 hover:-translate-y-2 transition-all duration-300 shadow-lg"
            >
              <Twitter size={22} />
            </a>
            {/* ইউটিউব */}
            <a 
              href="https://youtube.com/yourchannel" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:-translate-y-2 transition-all duration-300 shadow-lg"
            >
              <Youtube size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* কপিরাইট */}
      <div className="border-t border-gray-800/50 mt-16 pt-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-xs">
          <p className="text-gray-500 italic">© ২০২৬ নাসের রহমান এমপি। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Developed by</span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full font-bold">Tareq</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
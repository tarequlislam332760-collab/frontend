import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const FloatingContact = ({ lang }) => {
  const whatsappNumber = "+8801700000000"; // এখানে আপনার আসল নাম্বার দিন
  const callNumber = "+8801700000000";     // এখানে আপনার কল করার নাম্বার দিন

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none"
        style={{ animationDuration: '3s' }}
      >
        <MessageCircle size={30} fill="currentColor" />
      </a>

      {/* Direct Call Button */}
      <a
        href={`tel:${callNumber}`}
        className="flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <Phone size={24} fill="currentColor" />
      </a>
    </div>
  );
};

export default FloatingContact;
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Complaint from "./pages/Complaint";
import Admin from "./pages/Admin"; 
import Navbar from "./component/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

// মূল লজিকটি এখানে আলাদা করা হয়েছে যাতে useLocation কাজ করে
function AppContent() {
  const [lang, setLang] = useState("bn");
  const location = useLocation();

  // চেক করা হচ্ছে আমরা কি এখন অ্যাডমিন পেজে আছি কি না
  const isAdminPage = location.pathname === "/admin";

  const translations = {
    bn: { welcome: "স্বাগতম" },
    en: { welcome: "Welcome" }
  };

  const t = translations[lang];

  return (
    <>
      {/* যদি অ্যাডমিন পেজ না হয়, তবেই কেবল সাধারণ নেভবার দেখাবে */}
      {!isAdminPage && <Navbar lang={lang} setLang={setLang} />}
      
      <Routes>
        <Route path="/" element={<Home lang={lang} t={t} />} />
        <Route path="/about" element={<About lang={lang} t={t} />} />
        <Route path="/Projects" element={<Projects lang={lang} t={t} />} />
        <Route path="/Blog" element={<Blog lang={lang} t={t} />} />
        <Route path="/Contact" element={<Contact lang={lang} t={t} />} />
        <Route path="/Complaint" element={<Complaint lang={lang} t={t} />} />
        <Route path="/admin" element={<Admin lang={lang} />} /> 
      </Routes>

      {/* অ্যাডমিন পেজে ফুটার এবং ফ্লোটিং বাটন দেখাবে না */}
      {!isAdminPage && <Footer lang={lang} t={t} />} 
      {!isAdminPage && <FloatingContact lang={lang} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
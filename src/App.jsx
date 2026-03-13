import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Complaint from "./pages/Complaint";
import Admin from "./pages/Admin"; 
// ✅ নতুন পেজ ইমপোর্ট করুন (যদি ফাইলটি তৈরি করে থাকেন)
// import Gallery from "./pages/Gallery"; 

import Navbar from "./component/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

function AppContent() {
  const [lang, setLang] = useState("bn");
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  const translations = {
    bn: { welcome: "স্বাগতম" },
    en: { welcome: "Welcome" }
  };
  const t = translations[lang];

  return (
    <>
      {!isAdminPage && <Navbar lang={lang} setLang={setLang} />}
      
      <Routes>
        <Route path="/" element={<Home lang={lang} t={t} />} />
        <Route path="/about" element={<About lang={lang} t={t} />} />
        <Route path="/Projects" element={<Projects lang={lang} t={t} />} />
        <Route path="/Blog" element={<Blog lang={lang} t={t} />} />
        <Route path="/Contact" element={<Contact lang={lang} t={t} />} />
        <Route path="/Complaint" element={<Complaint lang={lang} t={t} />} />
        <Route path="/admin" element={<Admin lang={lang} />} /> 

        {/* ✅ নতুন কোনো পেজ অ্যাড করলে নিচের মতো করে লাইন যোগ করবেন */}
        {/* <Route path="/gallery" element={<Gallery lang={lang} t={t} />} /> */}
      </Routes>

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
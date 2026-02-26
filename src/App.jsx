import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Complaint from "./pages/Complaint";
import Navbar from "./component/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact"; // এটি ইমপোর্ট করুন

function App() {
  const [lang, setLang] = useState("bn");

  const translations = {
    bn: { welcome: "স্বাগতম" },
    en: { welcome: "Welcome" }
  };

  const t = translations[lang];

  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} />
      
      <Routes>
        <Route path="/" element={<Home lang={lang} t={t} />} />
        <Route path="/about" element={<About lang={lang} t={t} />} />
        <Route path="/Projects" element={<Projects lang={lang} t={t} />} />
        <Route path="/Blog" element={<Blog lang={lang} t={t} />} />
        <Route path="/Contact" element={<Contact lang={lang} t={t} />} />
        <Route path="/Complaint" element={<Complaint lang={lang} t={t} />} />
      </Routes>

      <Footer lang={lang} t={t} /> 

      {/* 🔥 স্ক্রিনের নিচে ডানে ভেসে থাকবে এই বাটনটি */}
      <FloatingContact lang={lang} />
    </BrowserRouter>
  );
}

export default App;
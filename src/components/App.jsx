import React, { useState } from "react"; // 'import' must be lowercase
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import DynamicPage from "./pages/DynamicPage";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Complaint from "./pages/Complaint";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

function AppContent() {
  const [lang, setLang] = useState("bn");
  const location = useLocation();

  // Admin page বা তার সাব-পেজ হলে Navbar এবং Footer hide হবে
  const isAdminPage = location.pathname.startsWith("/admin");

  // Language system
  const translations = {
    bn: { welcome: "স্বাগতম" },
    en: { welcome: "Welcome" }
  };

  const t = translations[lang];

  return (
    <>
      {/* Admin page না হলে Navbar দেখাবে */}
      {!isAdminPage && <Navbar lang={lang} setLang={setLang} />}

      <Routes>
        <Route path="/" element={<Home lang={lang} t={t} />} />
        <Route path="/about" element={<About lang={lang} t={t} />} />
        <Route path="/projects" element={<Projects lang={lang} t={t} />} />
        <Route path="/blog" element={<Blog lang={lang} t={t} />} />
        <Route path="/contact" element={<Contact lang={lang} t={t} />} />
        <Route path="/complaint" element={<Complaint lang={lang} t={t} />} />

        {/* Admin Route */}
        <Route path="/admin/*" element={<Admin lang={lang} />} />

        {/* Dynamic Page Route */}
        <Route path="/page/:slug" element={<DynamicPage lang={lang} />} />
      </Routes>

      {/* Admin page না হলে Footer এবং Floating button দেখাবে */}
      {!isAdminPage && <Footer lang={lang} t={t} />}
      {!isAdminPage && <FloatingContact lang={lang} />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
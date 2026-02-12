import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';

type Language = 'ID' | 'EN';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: lang === 'ID' ? 'Fitur' : 'Features', path: '/features' },
    { name: lang === 'ID' ? 'Harga' : 'Pricing', path: '/pricing' },
    { name: lang === 'ID' ? 'Tentang Kami' : 'About', path: '/about' },
    { name: lang === 'ID' ? 'Kontak' : 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-esthirae-bg/80 backdrop-blur-md border-b border-esthirae-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/logo%20esthirae.png" 
            alt="Esthirae Logo" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs tracking-widest uppercase transition-colors duration-300 ${
                location.pathname === link.path ? 'text-esthirae-accent font-semibold' : 'text-esthirae-muted hover:text-esthirae-text'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center bg-esthirae-bgSecondary rounded-full px-1 py-1 border border-esthirae-border">
            <button 
              onClick={() => setLang('ID')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ID' ? 'bg-white text-esthirae-text shadow-sm' : 'text-esthirae-muted'}`}
            >
              ID
            </button>
            <button 
              onClick={() => setLang('EN')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'EN' ? 'bg-white text-esthirae-text shadow-sm' : 'text-esthirae-muted'}`}
            >
              ENG
            </button>
          </div>

          <Link
            to="/contact"
            className="bg-esthirae-text text-white px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-esthirae-accent transition-all duration-300 shadow-sm"
          >
            Request Demo
          </Link>
        </div>
        
        <button className="md:hidden text-esthirae-text">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { lang, setLang } = useLanguage();
  return (
    <footer className="bg-esthirae-footer text-esthirae-border py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-6">
            <img 
              src="https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/logo%20esthirae.png" 
              alt="Esthirae Logo" 
              className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-esthirae-muted max-w-sm mb-8 leading-relaxed font-light">
            {lang === 'ID' 
              ? 'AI-Based Aesthetic Clinic Management System. Upgrade standar klinik Anda lewat kecerdasan digital.'
              : 'AI-Based Aesthetic Clinic Management System. Elevating the standard of aesthetic services through digital intelligence.'}
          </p>
          
          <div className="flex items-center space-x-1 bg-[#2a2a2a] w-fit rounded-full p-1 border border-esthirae-muted/20">
            <button 
              onClick={() => setLang('ID')}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all uppercase ${lang === 'ID' ? 'bg-esthirae-accent text-white' : 'text-esthirae-muted hover:text-white'}`}
            >
              ID
            </button>
            <button 
              onClick={() => setLang('EN')}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all uppercase ${lang === 'EN' ? 'bg-esthirae-accent text-white' : 'text-esthirae-muted hover:text-white'}`}
            >
              ENG
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6 text-white tracking-wide">{lang === 'ID' ? 'Menu' : 'Quick Links'}</h4>
          <ul className="space-y-4 text-esthirae-muted text-sm font-light">
            <li><Link to="/" className="hover:text-esthirae-accent transition-colors">Home</Link></li>
            <li><Link to="/features" className="hover:text-esthirae-accent transition-colors">{lang === 'ID' ? 'Fitur' : 'Features'}</Link></li>
            <li><Link to="/pricing" className="hover:text-esthirae-accent transition-colors">{lang === 'ID' ? 'Harga' : 'Pricing'}</Link></li>
            <li><Link to="/contact" className="hover:text-esthirae-accent transition-colors">{lang === 'ID' ? 'Kontak' : 'Contact'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6 text-white tracking-wide">Connect</h4>
          <ul className="space-y-4 text-esthirae-muted text-sm font-light">
            <li>Email: <a href="mailto:hello@esthirae.com" className="hover:text-esthirae-accent transition-colors">hello@esthirae.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/628980966611?text=Halo%20Esthirae%2C%20saya%20ingin%20tahu%20lebih%20lanjut" target="_blank" rel="noopener noreferrer" className="hover:text-esthirae-accent transition-colors">+62 898-0966-611</a></li>
            <li>Yogyakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-esthirae-muted/20 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.3em] uppercase text-esthirae-muted font-semibold">
        <span>&copy; {new Date().getFullYear()} Esthirae. All rights reserved.</span>
        <div className="h-[1px] w-20 bg-esthirae-accent/30 my-4 md:my-0"></div>
        <span>Refined. Structured. Premium. Scalable.</span>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('ID');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col pt-20 font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}
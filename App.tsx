import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
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

/**
 * Utility to ensure every navigation resets the scroll position to the top.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: lang === 'ID' ? 'Fitur' : 'Features', path: '/features' },
    { name: lang === 'ID' ? 'Harga' : 'Pricing', path: '/pricing' },
    { name: lang === 'ID' ? 'Tentang Kami' : 'About', path: '/about' },
    { name: lang === 'ID' ? 'Kontak' : 'Contact', path: '/contact' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-esthirae-bg/90 backdrop-blur-xl border-b border-esthirae-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/logo%20esthirae.png" 
            alt="Esthirae Logo" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
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
        
        {/* Hamburger Button */}
        <button 
          className="md:hidden text-esthirae-text p-2 -mr-2 focus:outline-none z-[110]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-500 ease-in-out ${isOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-500 ease-in-out top-2 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-500 ease-in-out ${isOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-esthirae-bg border-b border-esthirae-border transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100 py-10 px-8 shadow-2xl' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base tracking-[0.25em] uppercase transition-colors duration-300 ${
                location.pathname === link.path ? 'text-esthirae-accent font-bold' : 'text-esthirae-muted hover:text-esthirae-text'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-8 border-t border-esthirae-border flex flex-col space-y-8">
            <div className="flex items-center bg-esthirae-bgSecondary rounded-full p-1 border border-esthirae-border w-fit">
              <button 
                onClick={() => setLang('ID')}
                className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-all ${lang === 'ID' ? 'bg-white text-esthirae-text shadow-sm' : 'text-esthirae-muted'}`}
              >
                INDONESIA
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest transition-all ${lang === 'EN' ? 'bg-white text-esthirae-text shadow-sm' : 'text-esthirae-muted'}`}
              >
                ENGLISH
              </button>
            </div>

            <Link
              to="/contact"
              className="bg-esthirae-text text-white text-center py-5 rounded-full text-xs font-bold tracking-[0.3em] uppercase hover:bg-esthirae-accent transition-all duration-300 shadow-xl"
            >
              Request Private Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { lang, setLang } = useLanguage();

  // Explicit scroll function for footer links to handle same-page clicks
  const handleFooterClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-esthirae-footer text-esthirae-border py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-8">
            <img 
              src="https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/logo%20esthirae.png" 
              alt="Esthirae Logo" 
              className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-esthirae-muted max-w-sm mb-10 leading-relaxed font-light text-sm">
            {lang === 'ID' 
              ? 'AI-Based Aesthetic Clinic Management System. Upgrade standar klinik Anda lewat kecerdasan digital yang presisi.'
              : 'AI-Based Aesthetic Clinic Management System. Elevating the standard of aesthetic services through precise digital intelligence.'}
          </p>
          
          <div className="flex items-center space-x-1 bg-[#2a2a2a] w-fit rounded-full p-1 border border-esthirae-muted/20">
            <button 
              onClick={() => setLang('ID')}
              className={`px-5 py-2 rounded-full text-[9px] font-bold tracking-[0.2em] transition-all uppercase ${lang === 'ID' ? 'bg-esthirae-accent text-white' : 'text-esthirae-muted hover:text-white'}`}
            >
              IND
            </button>
            <button 
              onClick={() => setLang('EN')}
              className={`px-5 py-2 rounded-full text-[9px] font-bold tracking-[0.2em] transition-all uppercase ${lang === 'EN' ? 'bg-esthirae-accent text-white' : 'text-esthirae-muted hover:text-white'}`}
            >
              ENG
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-2xl mb-8 text-white tracking-wide italic font-bold">{lang === 'ID' ? 'Navigasi' : 'Navigation'}</h4>
          <ul className="space-y-5 text-esthirae-muted text-sm font-light">
            <li><Link to="/" onClick={handleFooterClick} className="hover:text-esthirae-accent transition-colors">Home</Link></li>
            <li><Link to="/features" onClick={handleFooterClick} className="hover:text-esthirae-accent transition-colors">{lang === 'ID' ? 'Fitur Unggulan' : 'Core Features'}</Link></li>
            <li><Link to="/pricing" onClick={handleFooterClick} className="hover:text-esthirae-accent transition-colors">{lang === 'ID' ? 'Harga & ROI' : 'Pricing & ROI'}</Link></li>
            <li><Link to="/about" onClick={handleFooterClick} className="hover:text-esthirae-accent transition-colors">{lang === 'ID' ? 'Tentang Kami' : 'About Esthirae'}</Link></li>
            <li><Link to="/contact" onClick={handleFooterClick} className="hover:text-esthirae-accent transition-colors">{lang === 'ID' ? 'Kontak Konsultasi' : 'Contact Consultation'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-2xl mb-8 text-white tracking-wide italic font-bold">Connect</h4>
          <ul className="space-y-5 text-esthirae-muted text-sm font-light">
            <li>Email: <a href="mailto:hello@esthirae.com" className="hover:text-esthirae-accent transition-colors">hello@esthirae.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/628980966611?text=Halo%20Esthirae%2C%20saya%20ingin%20tahu%20lebih%20lanjut" target="_blank" rel="noopener noreferrer" className="hover:text-esthirae-accent transition-colors block mt-1">+62 898-0966-611</a></li>
            <li className="pt-4 opacity-50 text-[10px] tracking-widest uppercase font-bold">Yogyakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-esthirae-muted/20 mt-24 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.4em] uppercase text-esthirae-muted font-bold">
        <span>&copy; {new Date().getFullYear()} Esthirae | AI-based Aesthetic Clinic Management System.</span>
        <div className="hidden md:block h-[1px] w-24 bg-esthirae-accent/30 mx-8"></div>
        <span className="mt-4 md:mt-0 opacity-60">Refined. Structured. Premium. Scalable.</span>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('ID');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans selection:bg-esthirae-accent selection:text-white">
          <Navbar />
          <main className="flex-grow pt-16">
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
      </HashRouter>
    </LanguageContext.Provider>
  );
}